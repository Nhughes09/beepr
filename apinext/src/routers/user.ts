import { observable } from "@trpc/server/observable";
import { authedProcedure, router } from "../trpc";
import { user } from '../../drizzle/schema';
import { EventEmitter } from 'events';

type User = typeof user.$inferSelect;

const ee = new EventEmitter();

export const userRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  updates: authedProcedure.subscription(({ ctx }) => {
    // return an `observable` with a callback which is triggered immediately
    return observable<User>((emit) => {
      const onAdd = (data: User) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on('add', onAdd);
      (() => emit.next(ctx.user))()
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
})
