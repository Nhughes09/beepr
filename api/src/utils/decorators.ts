import { User } from "../entities/User";
import { MiddlewareFn } from "type-graphql";
import { Context } from "./context";
import * as Sentry from '@sentry/node';
import { Beep, Status } from "../entities/Beep";
import { QueryOrder } from "@mikro-orm/core";

export const MustBeInAcceptedBeep: MiddlewareFn<Context> = async ({ context, info, root }, next) => {
  const user = root as User;

  if (info.parentType.name !== "User") {
    Sentry.captureException("MustBeInAcceptedBeep middleware was used on a non-user entity");
    throw new Error("You can only use this middleware with the the User entity");
  }

  // User is not authenticated so trust that our main auth handler
  if (!context.user) {
    return await next();
  }

  // User is getting their own information, so just resolve
  if (user.id === context.user.id) {
    return await next();
  }

  // console.log(`making sure ${context.user.name()} can see ${user.name()}'s ${info.fieldName}`)

  const beep = await context.em.findOne(
    Beep,
    {
      $or: [
        { rider: { id: context.user.id } },
        { beeper: { id: context.user.id } }
      ],
      $and: [
        { status: { $ne: Status.DENIED } },
        { status: { $ne: Status.COMPLETE } },
        { status: { $ne: Status.CANCELED } },
        { status: { $ne: Status.WAITING } },
      ]
    },
    {
      filters: ['inProgress'],
      orderBy: { start: QueryOrder.DESC }
    }
  );

  // console.log(beep)

  if (!beep) {
    console.log(`${context.user.name()} did NOT have permission to see ${user.first}'s ${info.fieldName}`)
    return null;
  }

  console.log(`${context.user.name()} had permission to see ${user.first}'s ${info.fieldName}`)

  return await next();
};