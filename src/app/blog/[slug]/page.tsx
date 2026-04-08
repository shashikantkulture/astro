import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug: resolvedParams.slug }
    });

    if (!post) {
        return { title: 'Post Not Found | Mystic Tarot' };
    }

    return {
        title: `${post.title} | Mystic Tarot Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : [],
        },
    };
}

export default async function BlogPostDetails({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug: resolvedParams.slug }
    });

    if (!post || !post.published) {
        notFound();
    }

    return (
        <article className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
                <Link href="/blog" className="inline-flex items-center text-gold hover:text-white transition-colors mb-10 font-medium text-sm backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full border border-gold/20">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Wisdom Treasury
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center text-sm text-gold mb-6 font-medium uppercase tracking-widest">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-md">
                        {post.title}
                    </h1>

                    <p className="text-xl text-lavender-dark max-w-2xl mx-auto font-light leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                {post.imageUrl && (
                    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(75,0,130,0.4)] mb-16 border border-primary/40">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="object-cover w-full h-full filter sepia-[0.2] contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent mix-blend-overlay"></div>
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-gold prose-p:text-lavender-dark prose-p:leading-loose prose-a:text-gold hover:prose-a:text-gold-light prose-img:rounded-xl prose-img:border prose-img:border-primary/30">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                <div className="mt-20 pt-10 border-t border-primary/20 text-center">
                    <p className="font-serif text-2xl text-white mb-6">Seek deeper clarity?</p>
                    <a
                        href="https://wa.me/7376916925?text=Hi,%20I%20just%20read%20your%20blog%20post%20and%20want%20to%20book%20a%20consultation."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#8A2BE2] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(75,0,130,0.6)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(138,43,226,0.8)]"
                    >
                        Book a Personal Consultation
                    </a>
                </div>
            </div>
        </article>
    );
}
