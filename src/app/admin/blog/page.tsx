"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { BlogPost } from "@/lib/db";

export default function BlogAdmin() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchPosts(); // refresh list
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-lavender-dark">Loading posts...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-white">Blog Management</h1>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-[#8A2BE2] text-white rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(138,43,226,0.6)] transition-all font-medium"
                >
                    <Plus className="h-5 w-5 mr-1" /> New Post
                </Link>
            </div>

            <div className="bg-background/50 border border-primary/20 backdrop-blur-sm rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-primary/20 bg-primary/10">
                            <th className="px-6 py-4 text-sm font-semibold text-lavender max-w-[300px]">Title</th>
                            <th className="px-6 py-4 text-sm font-semibold text-lavender">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-lavender">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-lavender text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-lavender-dark">
                                    No blog posts found. Create your first post!
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-white truncate max-w-[280px]">{post.title}</p>
                                        <p className="text-xs text-lavender-dark truncate max-w-[280px]">/{post.slug}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-lavender-dark">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link href={`/admin/blog/${post.id}`} className="text-gold hover:text-gold-light transition-colors inline-block">
                                            <Edit className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300 transition-colors inline-block">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
