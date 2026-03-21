import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const cards = await prisma.tarotCard.findMany({
            orderBy: { name: "asc" }
        });
        return NextResponse.json(cards);
    } catch (error) {
        console.error("Error fetching tarot cards:", error);
        return NextResponse.json({ error: "Failed to fetch tarot cards" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { cardId, name, imageUrl, description } = data;

        const card = await prisma.tarotCard.create({
            data: {
                cardId,
                name,
                imageUrl,
                description,
            }
        });

        return NextResponse.json(card, { status: 201 });
    } catch (error) {
        console.error("Error creating tarot card:", error);
        return NextResponse.json({ error: "Failed to create tarot card" }, { status: 500 });
    }
}
