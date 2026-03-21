import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const data = await req.json();
        const { cardId, name, imageUrl, description } = data;

        const card = await prisma.tarotCard.update({
            where: { id: resolvedParams.id },
            data: {
                cardId,
                name,
                imageUrl,
                description,
            }
        });

        return NextResponse.json(card);
    } catch (error) {
        console.error("Error updating tarot card:", error);
        return NextResponse.json({ error: "Failed to update tarot card" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        await prisma.tarotCard.delete({
            where: { id: resolvedParams.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting tarot card:", error);
        return NextResponse.json({ error: "Failed to delete tarot card" }, { status: 500 });
    }
}
