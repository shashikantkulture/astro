import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const data = await req.json();
        const { name, description, order } = data;

        const category = await prisma.consultationCategory.update({
            where: { id: resolvedParams.id },
            data: {
                name,
                description,
                order: Number(order) || 0,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        await prisma.consultationCategory.delete({
            where: { id: resolvedParams.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
