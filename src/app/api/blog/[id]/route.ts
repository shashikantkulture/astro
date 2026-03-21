import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;

        if (resolvedParams.id === "new") {
            return NextResponse.json(null);
        }

        const post = await prisma.blogPost.findUnique({
            where: { id: resolvedParams.id }
        });

        if (!post) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const data = await req.json();
        const { title, slug, excerpt, content, imageUrl, published } = data;

        const post = await prisma.blogPost.update({
            where: { id: resolvedParams.id },
            data: {
                title,
                slug,
                excerpt,
                content,
                imageUrl,
                published: Boolean(published),
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        await prisma.blogPost.delete({
            where: { id: resolvedParams.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
