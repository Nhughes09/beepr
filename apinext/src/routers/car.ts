import { z } from "zod";
import { adminProcedure, router } from "../utils/trpc";
import { db } from "../utils/db";
import { car } from "../../drizzle/schema";
import { count, desc, eq } from 'drizzle-orm';

export const carRouter = router({
  cars: adminProcedure
    .input(
      z.object({
        show: z.number(),
        offset: z.number(),
        userId: z.string().optional()
      })
    )
    .query(async ({ input }) => {
      const where = input.userId ? eq(car.user_id, input.userId) : undefined;

      const cars = await db.query.car.findMany({
        limit: input.show,
        offset: input.offset,
        orderBy: desc(car.created),
        where,
        with: {
          user: {
            columns: {
              id: true,
              first: true,
              last: true,
              photo: true,
            },
          }
        }
      });

      const carsCount = await db
        .select({ count: count() })
        .from(car)
        .where(where);

      return {
        cars,
        count: carsCount[0].count
      }
    })
});
