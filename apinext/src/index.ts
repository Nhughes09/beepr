import { authedProcedure, createContext, router } from './utils/trpc';
import { redis, redisSubscriber } from './utils/redis';
import { observable } from '@trpc/server/observable';
import { db } from './utils/db';
import { user } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import cors from 'cors';
import { EventEmitter } from 'events';

const ee = new EventEmitter();

type User = typeof user.$inferSelect;

const appRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  update: authedProcedure.mutation(async ({ ctx }) => {
    const u = await db.update(user).set({ location: { latitude: 5, longitude: 5 } }).where(eq(user.id, ctx.user.id)).returning();
    redis.publish(`user-${ctx.user.id}`, JSON.stringify(u[0]))
    return u[0];
  }),
  updates: authedProcedure.subscription(({ ctx }) => {
    // return an `observable` with a callback which is triggered immediately
    return observable<User>((emit) => {
      const onUserUpdate = (message: string) => {
        // emit data to client
        console.log("Emitting to WS", message);
        emit.next(JSON.parse(message));
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      const listener = (message: string) => onUserUpdate(message);
      redisSubscriber.subscribe(`user-${ctx.user.id}`, listener);
      // (async () => emit.next(ctx.user))();
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        redisSubscriber.unsubscribe(`user-${ctx.user.id}`, listener);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const httpServer = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

const wss = new ws.Server({ server: httpServer });

applyWSSHandler<AppRouter>({
  onError: console.error,
  wss,
  router: appRouter,
  createContext,
});

setInterval(() => {
  console.log('Connected clients', wss.clients.size);
}, 10_000);

httpServer.listen(3001);
