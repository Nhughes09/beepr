import fieldsToRelations from '@banksnussman/graphql-fields-to-relations';
import { Arg, Args, Authorized, Ctx, Info, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from '../utils/context';
import { RatingInput } from './args';
import { Beep } from '../entities/Beep';
import { Paginated, PaginationArgs } from '../utils/pagination';
import { Rating } from '../entities/Rating';
import { QueryOrder } from '@mikro-orm/core';
import { GraphQLResolveInfo } from 'graphql';
import { User, UserRole } from '../entities/User';
import { sendNotification } from '../utils/notifications';

@ObjectType()
class RatingsResponse extends Paginated(Rating) {}

@Resolver(Rating)
export class RatingResolver {

  @Mutation(() => Boolean)
  @Authorized()
  public async rateUser(@Ctx() ctx: Context, @Arg('input') input: RatingInput): Promise<boolean> {
    const user = await ctx.em.findOneOrFail(User, input.userId);

    const beep = input.beepId ? ctx.em.getReference(Beep, input.beepId) : undefined;

    if (!beep) throw new Error("You can only leave a rating when a beep is associated.");

    const rating = new Rating(ctx.user, user, input.stars, beep, input.message);

    if (!user.rating) {
      user.rating = input.stars;
    }
    else {
      const numberOfRatings = await ctx.em.count(Rating, { rated: input.userId });

      user.rating = ((user.rating * numberOfRatings) + input.stars) / (numberOfRatings + 1);
    }

    user.ratings.add(rating);

    await ctx.em.persistAndFlush(user);

    sendNotification(user.pushToken, `You got rated ⭐️`, `${ctx.user.name()} rated you ${input.stars} stars!`);

    return true;
  }

  @Query(() => RatingsResponse)
  @Authorized()
  public async getRatings(@Ctx() ctx: Context, @Args() { offset, show }: PaginationArgs, @Arg('id', { nullable: true }) id?: string, @Arg('filter', { nullable: true }) filter?: 'recieved' | 'given'): Promise<RatingsResponse> {
    let filters;

    if (filter && id) {
      filters = { [filter]: { id } };
    }
    else if (id) {
      filters = { involved: { id } };
    }
    else {
      filters = undefined;
    }

    const [ratings, count] = await ctx.em.findAndCount(Rating, {}, {
      orderBy: { timestamp: QueryOrder.DESC },
      populate: ['rater', 'rated'],
      offset: offset,
      limit: show,
      filters
    });

    return {
      items: ratings,
      count: count
    };
  }

  @Query(() => Rating)
  @Authorized(UserRole.ADMIN)
  public async getRating(@Ctx() ctx: Context, @Arg('id') id: string, @Info() info: GraphQLResolveInfo): Promise<Rating> {
    return await ctx.em.findOneOrFail(Rating, id, { populate: fieldsToRelations(info) as Array<keyof Rating> });
  }

  @Mutation(() => Boolean)
  @Authorized(UserRole.ADMIN)
  public async deleteRating(@Ctx() ctx: Context, @Arg('id') id: string): Promise<boolean> {
    const rating = await ctx.em.findOneOrFail(Rating, id, { populate: ['rated'] });

    if (!rating.rated.rating) throw new Error("You are trying to delete a rating for a user who's rating value is undefined");

    const numberOfRatings = await ctx.em.count(Rating, { rated: rating.rated.id });

    rating.rated.rating = numberOfRatings <= 1 ? undefined : rating.rated.rating = (rating.rated.rating * numberOfRatings - rating.stars) / (numberOfRatings - 1);

    ctx.em.persist(rating.rated);

    ctx.em.remove(rating);

    await ctx.em.flush();

    return true;
  }
}
