import { UserRole } from "../entities/User";
import { Args, Authorized, Ctx, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../utils/context";
import { Paginated, PaginationArgs } from "../utils/pagination";
import { Feedback } from "../entities/Feedback";
import { FeedbackArgs } from "./args";

@ObjectType()
class FeedbackResonse extends Paginated(Feedback) {}

@Resolver()
export class FeedbackResolver {
  @Query(() => FeedbackResonse)
  @Authorized(UserRole.ADMIN)
  public async getFeedback(@Ctx() ctx: Context, @Args() { offset, show }: PaginationArgs): Promise<FeedbackResonse> {
    const [items, count] = await ctx.em.findAndCount(Feedback, {}, { offset, limit: show });

    return { items, count };
  }

  @Mutation(() => Feedback)
  @Authorized()
  public async createFeedback(@Ctx() ctx: Context, @Args() { message }: FeedbackArgs): Promise<Feedback> {
    const feedback = new Feedback({
      user: ctx.user,
      message,
    });

    await ctx.em.persistAndFlush(feedback);

    return feedback;
  }

}