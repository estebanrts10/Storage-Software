import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { withTenant } from "../../../lib/dbTenant";
import { resolveTenant } from "../../../lib/tenant";

const CreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    address: z.string().optional(),
});
const UpdateSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    slug: z.string().min(1),
    address: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const tenant = await resolveTenant(req);

    if (req.method === "GET") {
        const data = await withTenant(tenant.id, (tx) =>
            tx.facility.findMany({ orderBy: { createdAt: "desc" } })
        );
        return res.json(data);
    }

    if (req.method === "POST") {
        const body = CreateSchema.parse(req.body);
        const created = await withTenant(tenant.id, (tx) =>
            tx.facility.create({ data: { ...body, tenantId: tenant.id } })
        );
        return res.status(201).json(created);
    }

    if (req.method === "PUT") {
        const body = UpdateSchema.parse(req.body);
        const updated = await withTenant(tenant.id, (tx) =>
            tx.facility.update({
                where: { id: body.id },
                data: { name: body.name, slug: body.slug, address: body.address },
            })
        );
        return res.json(updated);
    }

    if (req.method === "DELETE") {
        const id = z.string().uuid().parse(req.query.id);
        await withTenant(tenant.id, (tx) => tx.facility.delete({ where: { id } }));
        return res.status(204).end();
    }

    res.setHeader("Allow", "GET,POST,PUT,DELETE");
    return res.status(405).end();
}
