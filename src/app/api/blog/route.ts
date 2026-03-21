import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { title, slug, excerpt, content, imageUrl, published } = data;

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                imageUrl,
                published: Boolean(published),
            }
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    }
}
