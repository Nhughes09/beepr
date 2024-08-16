FROM oven/bun:alpine

WORKDIR /usr/api

COPY api/package.json ./

RUN bun install

COPY api/ .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["bun", "run", "src/index.ts" ]
