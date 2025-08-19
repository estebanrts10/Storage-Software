import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

/** Run a function inside a transaction with app.tenant_id set for RLS */
export async function withTenant<T>(
    tenantId: string,
    fn: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
    return prisma.$transaction(async (tx) => {
        await tx.$executeRawUnsafe(`SET app.tenant_id = '${tenantId}'`);
        try {
            const res = await fn(tx);
            return res;
        } finally {
            await tx.$executeRawUnsafe(`RESET app.tenant_id`);
        }
    });
}
