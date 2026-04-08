import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

// Revalidate every hour
export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function BlogArchive() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6">Adhyatmik Antardrishti aur Guide</h1>
                    <p className="text-lg text-lavender-dark">
                        Tarot imagery, jyotishiya ghatnaon aur adhyatmik upchar prathaon mein gehre gote lagakar apni chetna ka vistar karein.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 text-lavender-dark text-lg border border-primary/20 rounded-2xl bg-primary/5 backdrop-blur-sm">
                        Main vartamaan mein aakash me naye lekhon ko prasarit kar raha/rahi hoon. Jald hi wapas aayein.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <article key={post.id} className="group relative rounded-2xl border border-primary/30 bg-background/60 overflow-hidden backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(75,0,130,0.5)] flex flex-col h-full">
                                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
                                    <span className="sr-only">Read {post.title}</span>
                                </Link>

                                <div className="h-56 relative overflow-hidden border-b border-primary/30 bg-primary/20">
                                    {post.imageUrl ? (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.3]"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow relative z-20">
                                    <div className="flex items-center text-xs text-gold mb-4 font-medium uppercase tracking-wider">
                                        <Calendar className="h-3 w-3 mr-1.5" />
                                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>

                                    <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-lavender-dark mb-6 line-clamp-3 leading-relaxed flex-grow text-sm">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center text-gold font-medium text-sm group-hover:text-gold-light transition-colors">
                                        Lekh Padhein <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
