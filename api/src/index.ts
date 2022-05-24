import "reflect-metadata";
import "dotenv/config";
import Redis from 'ioredis';
import express from "express";
import config from './mikro-orm.config';
import ws from 'ws';
import * as Sentry from "./utils/sentry";
import * as RealSentry from "@sentry/node";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { TokenEntry } from "./entities/TokenEntry";
import { GraphQLError, GraphQLSchema, parse } from "graphql";
import { buildSchema } from 'type-graphql';
import { authChecker } from "./utils/authentication";
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ValidationError } from 'class-validator';
import { createServer } from 'http';
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { ApolloError, ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { useServer } from 'graphql-ws/lib/use/ws';
import { Context, SubscribeMessage } from "graphql-ws";
import { REDIS_HOST, REDIS_PASSWROD } from "./utils/constants";

function formatError(error: GraphQLError) {
  if (error?.message === "Argument Validation Error") {
    const errors = error?.extensions?.exception?.validationErrors as ValidationError[];

    const output: { [key: string]: string[] } = {};

    for (const error of errors) {
      if (!error.constraints) continue;

      const items = Object.values<string>(error.constraints);

      output[error.property] = items;
    }

    return new ApolloError("Validation Error", undefined, output);
  }

  return error;
}

async function getContext(data: ExpressContext, orm: MikroORM<IDatabaseDriver<Connection>>) {
  RealSentry.configureScope(scope => scope.setTransactionName(data.req.body?.operationName));

  const em = orm.em.fork();

  const context = { em };

  const bearer = data.req.get("Authorization")?.split(" ")[1];

  if (!bearer) {
    return context;
  }

  const token = await em.findOne(
    TokenEntry,
    bearer,
    {
      populate: ['user'],
      // cache: true
    }
  );

  if (token?.user) {
    Sentry.setUserContext(token.user);

    return { user: token.user, token, em };
  }

  return context;
}

async function onSubscribe(
  { connectionParams }: Context<Record<string, unknown> | undefined>,
  msg: SubscribeMessage,
  schema: GraphQLSchema,
  orm: MikroORM<IDatabaseDriver<Connection>>
) {
  const bearer = connectionParams?.token as string | undefined;

  if (!bearer) {
    throw new Error("No Authentication Token Provided");
  }

  const token = await orm.em.fork().findOne(
    TokenEntry,
    bearer,
    {
      populate: ['user'],
      // cache: true
    }
  );

  if (token) {
    return {
      contextValue: { user: token.user, token },
      schema,
      document: parse(msg.payload.query),
      variableValues: msg.payload.variables
    }
  }
}

async function start() {
  const orm = await MikroORM.init(config);

  const app = express();

  const httpServer = createServer(app);

  Sentry.init(app);

  app.use(RealSentry.Handlers.requestHandler({
    transaction: 'handler'
  }));
  app.use(RealSentry.Handlers.tracingHandler());

  const options = {
    host: REDIS_HOST,
    password: REDIS_PASSWROD,
    port: 6379,
  };

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  });

  const schema: GraphQLSchema = await buildSchema({
    resolvers: [__dirname + '/**/resolver.{ts,js}'],
    authChecker: authChecker,
    pubSub
  });

  app.use(graphqlUploadExpress({ maxFiles: 1 }));

  const server = new ApolloServer({
    schema,
    formatError,
    context: (ctx) => getContext(ctx, orm),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  const wsServer = new ws.Server({
    server: httpServer,
    path: '/subscriptions',
  });

  useServer({
    schema,
    onSubscribe: (ctx, msg) => onSubscribe(ctx, msg, schema, orm),
  }, wsServer);

  await server.start();

  server.applyMiddleware({ app });

  app.use(RealSentry.Handlers.errorHandler());

  await new Promise<void>(resolve => httpServer.listen({ port: 3001 }, resolve));

  console.info(`🚕 Beep GraphQL Server Started at \x1b[36mhttp://0.0.0.0:3001${server.graphqlPath}\x1b[0m`);
}

start();