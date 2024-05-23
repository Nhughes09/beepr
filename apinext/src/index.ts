import { protectedProcedure, t } from "./trpc";
import { z } from "zod";
import { db } from "./db";
import { observable } from "@trpc/server/observable";
import { createBunHttpHandler, createBunWSHandler } from "trpc-bun-adapter";
import { createContext } from "./context";
import {
  TRPCError,
  octetInputParser,
} from "@trpc/server/unstable-core-do-not-import";
import { s3 } from "./s3";
import { user } from "./schema";
import { eq } from "drizzle-orm";
import { EventEmitter } from "events";
import { S3_BUCKET_URL } from "./constants";

type User = typeof user.$inferSelect;

const ee = new EventEmitter();

const appRouter = t.router({
  user: protectedProcedure
    .input(z.object({ id: z.string() }).optional())
    .query(async ({ ctx, input }) => {
      if (input?.id) {
        const u = await db.query.user.findFirst({
          where: eq(user.id, input.id),
        });
        if (!u) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found.",
          });
        }
        return u;
      }
      return ctx.user;
    }),
  updateProfilePicture: protectedProcedure
    .input(octetInputParser)
    .mutation(async ({ input, ctx }) => {
      const result = await s3.putObject("images/photo.png", input);
      const url = S3_BUCKET_URL + "images/photo.png";
      const u = await db
        .update(user)
        .set({ photo: url })
        .where(eq(user.id, ctx.user.id))
        .returning();
      return u[0];
    }),
  updateUser: protectedProcedure
    .input(
      z
        .object({
          first: z.string(),
          last: z.string(),
          email: z.string(),
          capacity: z.number(),
          groupRate: z.number(),
          singlesRate: z.number(),
          isBeeping: z.boolean(),
          location: z.object({
            longitude: z.number(),
            latitude: z.number(),
          }),
        })
        .partial(),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await db
        .update(user)
        .set(input)
        .where(eq(user.id, ctx.user.id))
        .returning();
      return result[0];
    }),
  // userUpdates: t.procedure.subscription(({ ctx }) =>
  //   observable<User>((emit) => {
  //     const onUpdate = (user: User) => {
  //       emit.next(user);
  //     };
  //     ee.on("userUpdate", onUpdate);
  //     (async () => {
  //       const u = (
  //         await db.select().from(user).where(eq(user.id, ctx.user.id))
  //       ).at(0);
  //       if (u) {
  //         emit.next(u);
  //       }
  //     })();
  //     return () => {
  //       ee.off("userUpdate", onUpdate);
  //     };
  //   }),
  // ),
});

export type AppRouter = typeof appRouter;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET,HEAD,PUT,PATCH,POST,DELETET, OPTIONS, POST",
  "Access-Control-Allow-Headers": "*",
};

const websocket = createBunWSHandler({
  router: appRouter,
  onError: console.error,
  createContext(params) {
    console.log(params);
  },
});

const bunHandler = createBunHttpHandler({
  router: appRouter,
  endpoint: "/trpc",
  createContext,
  batching: {
    enabled: true,
  },
  responseMeta: () => ({
    headers: CORS_HEADERS,
  }),
  emitWsUpgrades: false,
});

Bun.serve({
  async fetch(request, server) {
    const headers = new Headers(CORS_HEADERS);

    if (request.method === "OPTIONS") {
      // This is the preflight request. It should only return the CORS headers
      return new Response(null, {
        status: 200,
        headers,
      });
    }

    if (
      request.url.endsWith("/ws") &&
      server.upgrade(request, { data: { req: request } })
    ) {
      return;
    }

    // for (const header of Object.keys(CORS_HEADERS)) {
    //   response?.headers.set(header, CORS_HEADERS[header]);
    // }
    return bunHandler(request, server);
  },
  port: 3001,
  websocket,
});
