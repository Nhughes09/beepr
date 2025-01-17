import { z } from "zod";
import { adminProcedure, router } from "../utils/trpc";
import { db } from "../utils/db";
import { count, desc, eq } from "drizzle-orm";
import { payment } from "../../drizzle/schema";

export const paymentRouter = router({
  payments: adminProcedure
    .input(
      z.object({
        offset: z.number(),
        limit: z.number(),
        userId: z.string().optional()
      })
    )
    .query(async ({ input }) => {
      const where = input.userId ? eq(payment.user_id, input.userId) : undefined;

      const payments = await db.query.payment.findMany({
        orderBy: desc(payment.created),
        limit: input.limit,
        offset: input.offset,
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

      const paymentsCount = await db
        .select({ count: count() })
        .from(payment)
        .where(where);

      return {
        payments,
        count: paymentsCount[0].count,
      };
    })
});
