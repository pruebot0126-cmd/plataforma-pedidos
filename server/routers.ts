import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createOrder, getAllOrders } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  orders: router({
    create: publicProcedure
      .input(z.object({
        clientName: z.string(),
        clientPhone: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        products: z.string(),
        total: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createOrder({
            clientName: input.clientName,
            clientPhone: input.clientPhone,
            latitude: input.latitude,
            longitude: input.longitude,
            products: input.products,
            total: input.total,
            status: "pendiente",
          });
          return { success: true, result };
        } catch (error) {
          console.error("Error creating order:", error);
          return { success: false, error: "Failed to create order" };
        }
      }),
    getAll: publicProcedure.query(async () => {
      try {
        const orders = await getAllOrders();
        return orders;
      } catch (error) {
        console.error("Error getting orders:", error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
