import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        let settings = await prisma.settings.findUnique({
            where: { id: "global" }
        });

        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    id: "global",
                    whatsappNumber: "1234567890",
                    metaTitle: "Mystic Tarot | Tarot Consultations",
                    metaDescription: "Experience profound spiritual clarity and guidance through our premium intuitive tarot readings.",
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { whatsappNumber, metaTitle, metaDescription } = data;

        const settings = await prisma.settings.upsert({
            where: { id: "global" },
            update: {
                whatsappNumber,
                metaTitle,
                metaDescription,
            },
            create: {
                id: "global",
                whatsappNumber: whatsappNumber || "1234567890",
                metaTitle: metaTitle || "Mystic Tarot | Tarot Consultations",
                metaDescription: metaDescription || "Experience profound spiritual clarity and guidance through our premium intuitive tarot readings.",
            }
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
