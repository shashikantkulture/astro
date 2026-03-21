import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const categories = await prisma.consultationCategory.findMany({
            include: {
                services: {
                    orderBy: { order: "asc" }
                }
            },
            orderBy: { order: "asc" }
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, description, order } = data;

        const category = await prisma.consultationCategory.create({
            data: {
                name,
                description,
                order: Number(order) || 0,
            }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
