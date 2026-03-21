"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function BlogEditor() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isNew = id === "new";

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        published: false,
    });

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) {
            const fetchPost = async () => {
                try {
                    const res = await fetch(`/api/blog/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data) {
                            setFormData({
                                title: data.title || "",
                                slug: data.slug || "",
                                excerpt: data.excerpt || "",
                                content: data.content || "",
                                imageUrl: data.imageUrl || "",
                                published: data.published || false,
                            });
                        }
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }
    }, [id, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = isNew ? "/api/blog" : `/api/blog/${id}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/blog");
            } else {
                throw new Error("Failed to save post");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-lavender-dark">Loading post...</div>;

    return (
        <div className="max-w-5xl">
            <div className="flex items-center mb-8">
                <Link href="/admin/blog" className="mr-4 text-lavender-dark hover:text-white transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="font-serif text-3xl font-bold text-white">
                    {isNew ? "Create New Post" : "Edit Post"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-background/50 border border-primary/20 backdrop-blur-sm p-6 rounded-2xl">
                            <label className="block text-sm font-medium text-lavender-dark mb-1">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    setFormData({ ...formData, title, slug: isNew ? slug : formData.slug });
                                }}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold mb-4"
                                placeholder="Enter an intriguing title"
                            />

                            <label className="block text-sm font-medium text-lavender-dark mb-1">Content (Markdown supported)</label>
                            <textarea
                                required
                                rows={15}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold font-mono text-sm resize-y"
                                placeholder="# Write your spiritual insights here..."
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-background/50 border border-primary/20 backdrop-blur-sm p-6 rounded-2xl">
                            <h3 className="text-white font-semibold mb-4 pb-2 border-b border-primary/20">Meta & SEO</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-lavender-dark mb-1">URL Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-lavender-dark mb-1">Excerpt</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold resize-none"
                                        placeholder="Short description for preview..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-lavender-dark mb-1">Preview Image URL</label>
                                    <div className="flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-primary/40 bg-primary/20 text-lavender-dark">
                                            <ImageIcon className="h-4 w-4" />
                                        </span>
                                        <input
                                            type="url"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="flex-1 w-full bg-primary/10 border border-primary/40 rounded-none rounded-r-md px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    {formData.imageUrl && (
                                        <div className="mt-3 relative h-32 w-full rounded-md overflow-hidden border border-primary/30">
                                            <img src={formData.imageUrl} alt="Preview" className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                </div>

                                <div className="pt-2 border-t border-primary/20 mt-4 flex items-center justify-between">
                                    <span className="text-sm text-lavender-dark">Publish Status</span>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        />
                                        <div className="relative w-11 h-6 bg-primary/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary to-[#8A2BE2] text-white font-medium rounded-xl hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all shadow-lg disabled:opacity-50"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            {saving ? "Saving..." : isNew ? "Create Post" : "Update Post"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
