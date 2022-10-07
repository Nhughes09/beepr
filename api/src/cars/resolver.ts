import { Arg, Args, Authorized, Ctx, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from '../utils/context';
import { Car } from '../entities/Car';
import { Paginated, PaginationArgs } from '../utils/pagination';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { CarArgs, EditCarArgs } from './args';
import { s3 } from '../utils/s3';
import { FileUpload } from 'graphql-upload';
import { UserRole } from '../entities/User';

@ObjectType()
class CarsResponse extends Paginated(Car) {}

@Resolver(Car)
export class CarResolver {

  @Mutation(() => Car)
  @Authorized()
  public async createCar(@Ctx() ctx: Context, @Args() data: CarArgs): Promise<Car> {
    const { photo, ...input } = data;

    const { createReadStream, filename } = await (photo as unknown as Promise<FileUpload>);

    const extention = filename.substring(filename.lastIndexOf("."), filename.length);

    const car = new Car();

    const uploadParams = {
      Body: createReadStream(),
      Key: `cars/${car.id}${extention}`,
      Bucket: "beep",
      ACL: "public-read"
    };

    const upload = await s3.upload(uploadParams).promise();

    wrap(car).assign({
      ...input,
      user: ctx.user,
      photo: upload.Location,
      default: true,
    }, { em: ctx.em });

    await ctx.em.nativeUpdate(Car, { user: ctx.user.id }, { default: false });
    await ctx.em.persistAndFlush(car);

    return car;
  }

  @Query(() => CarsResponse)
  @Authorized('self')
  public async getCars(@Ctx() ctx: Context, @Args() { offset, show }: PaginationArgs, @Arg('id', { nullable: true }) id?: string): Promise<CarsResponse> {
    const filter = id || !id && ctx.user.role !== UserRole.ADMIN ? { user: id } : {};

    const [cars, count] = await ctx.em.findAndCount(Car, filter, {
      orderBy: { created: QueryOrder.DESC },
      populate: ['user'],
      offset: offset,
      limit: show,
    });

    return {
      items: cars,
      count: count
    };
  }

  @Mutation(() => Boolean)
  @Authorized('self')
  public async editCar(@Ctx() ctx: Context, @Arg("id") id: string, @Args() data: EditCarArgs): Promise<boolean> {
    await ctx.em.nativeUpdate(Car, { user: ctx.user.id, id: { $ne: id } }, { default: false });
    await ctx.em.nativeUpdate(Car, { user: ctx.user.id, id }, data);

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized('self')
  public async deleteCar(@Ctx() ctx: Context, @Arg("id") id: string): Promise<boolean> {
    const car = await ctx.em.findOneOrFail(Car, id);
    const count = await ctx.em.count(Car, { user: ctx.user.id });

    if (car.default && count > 1) {
      throw new Error("You must make another car default before you delete this one.");
    }

    await ctx.em.removeAndFlush(car);

    return true;
  }
}
