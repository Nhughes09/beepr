import ws from 'ws';
import { createContext, router } from './trpc';
import { userRouter } from './routers/user';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
  user: userRouter,
});

const server =  createHTTPServer({
  router: appRouter,
  createContext,
})

const wss = new ws.Server({
  server,
});

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext,
});

server.listen(3001);

export type AppRouter = typeof appRouter;
