import { prisma } from "@/lib/db";
import ServicesClient from "./ServicesClient";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function Services() {
    const categories = await prisma.consultationCategory.findMany({
        include: {
            services: {
                orderBy: { order: "asc" }
            }
        },
        orderBy: { order: "asc" }
    });

    const settings = await prisma.settings.findUnique({ where: { id: "global" } });
    const whatsappNumber = settings?.whatsappNumber || "7376916925";

    // Client component wrapper for i18n
    return <ServicesClient categories={categories} whatsappNumber={whatsappNumber} />;
}
