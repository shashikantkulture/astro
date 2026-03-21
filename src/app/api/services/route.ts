import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            include: {
                category: true
            },
            orderBy: { order: "asc" }
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { title, price, duration, description, popular, categoryId, order } = data;

        const service = await prisma.service.create({
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

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
