import type { NextApiRequest } from "next";
import { prisma } from "./prisma";

export type TenantCtx = { id: string; slug: string };

export async function resolveTenant(req: NextApiRequest): Promise<TenantCtx> {
    // Priority: custom domain -> subdomain slug -> header override (for local dev)
    const host = (req.headers["x-forwarded-host"] || req.headers.host || "")
        .toString()
        .toLowerCase();
    const hdrSlug = (req.headers["x-tenant"] as string) || "";
    let tenant;

    if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
        tenant = await prisma.tenant.findFirst({ where: { customDomain: host } });
    }

    if (!tenant) {
        // subdomain like slug.myapp.com in dev/prod OR fallback header
        const maybeSlug = hdrSlug || host.split(".")[0];
        if (maybeSlug && maybeSlug !== "www" && !maybeSlug.includes(":")) {
            tenant = await prisma.tenant.findFirst({ where: { slug: maybeSlug } });
        }
    }

    // final fallback for local dev
    if (!tenant) tenant = await prisma.tenant.findFirst({ where: { slug: "demo" } });

    if (!tenant) throw new Error("Tenant not found");
    return { id: tenant.id, slug: tenant.slug };
}
