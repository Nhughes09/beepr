import { Arg, Args, Authorized, Ctx, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import type { Context } from '../utils/context';
import { Car } from '../entities/Car';
import { Paginated, PaginationArgs } from '../utils/pagination';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { CarArgs, DeleteCarArgs, EditCarArgs } from './args';
import { s3 } from '../utils/s3';
import { UserRole } from '../entities/User';
import { sendNotification } from '../utils/notifications';
import { S3_BUCKET_URL } from 'src/utils/constants';
import { GraphQLError } from 'graphql';

@ObjectType()
class CarsResponse extends Paginated(Car) {}

@Resolver(Car)
export class CarResolver {

  @Mutation(() => Car)
  @Authorized()
  public async createCar(@Ctx() ctx: Context, @Args(() => CarArgs) data: CarArgs): Promise<Car> {
    const { photo, ...input } = data;

    if (!photo) {
      throw new GraphQLError("You must upload a photo of your car");
    }

    const extention = photo.name.substring(photo.name.lastIndexOf("."), photo.name.length);

    const car = new Car({
      user: ctx.user,
      default: true,
    });

    const objectKey = `cars/${car.id}${extention}`;

    await s3.putObject(objectKey, photo.stream(), { metadata: { "x-amz-acl": "public-read" }});

    wrap(car).assign({
      ...input,
      photo: S3_BUCKET_URL + objectKey,
    });

    await ctx.em.nativeUpdate(Car, { user: ctx.user.id }, { default: false });

    await ctx.em.persistAndFlush(car);

    return car;
  }

  @Query(() => CarsResponse)
  @Authorized('self')
  public async getCars(@Ctx() ctx: Context, @Args(() => PaginationArgs) { offset, show }: PaginationArgs, @Arg('id', () => String, { nullable: true }) id?: string): Promise<CarsResponse> {
    const filter = id ? { user: id  } : {};

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

  @Mutation(() => Car)
  @Authorized()
  public async editCar(@Ctx() ctx: Context, @Arg("id", () => String) id: string, @Args(() => EditCarArgs) data: EditCarArgs): Promise<Car> {
    const car = await ctx.em.findOneOrFail(Car, id);

    if (ctx.user.role !== UserRole.ADMIN && car.user.id !== ctx.user.id) {
      throw new GraphQLError("You can't edit another user's car");
    }

    ctx.em.nativeUpdate(Car, { user: ctx.user.id, id: { $ne: id } }, { default: false });

    wrap(car).assign(data);

    await ctx.em.persistAndFlush(car);

    return car;
  }

  @Mutation(() => Boolean)
  @Authorized()
  public async deleteCar(@Ctx() ctx: Context, @Args(() => DeleteCarArgs) args: DeleteCarArgs): Promise<boolean> {
    const car = await ctx.em.findOneOrFail(Car, args.id);

    if (car.default && ctx.user.isBeeping) {
      throw new GraphQLError("You can't delete your default car while you are beeping.");
    }

    if (car.user.id !== ctx.user.id && ctx.user.role !== UserRole.ADMIN) {
      throw new GraphQLError("You can only delete your own cars.");
    }

    const count = await ctx.em.count(Car, { user: car.user.id });

    if (car.default && count > 1) {
      throw new GraphQLError("You must make another car default before you delete this one.");
    }

    await ctx.em.removeAndFlush(car);

    if (args.notification) {
      sendNotification({
        token: car.user.pushToken,
        title: `${car.make} ${car.model} deleted`,
        message: args.notification
      });
    }

    return true;
  }
}
