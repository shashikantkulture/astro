import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const data = await req.json();
        const { title, price, duration, description, popular, categoryId, order } = data;

        const service = await prisma.service.update({
            where: { id: resolvedParams.id },
            data: {
                title,
                price,
                duration,
                description,
                popular: Boolean(popular),
                categoryId,
                order: Number(order) || 0,
            }
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        await prisma.service.delete({
            where: { id: resolvedParams.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}
