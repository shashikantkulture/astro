import Link from "next/link";
import { LayoutDashboard, Settings, FileText, List, Layers, Star } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const adminLinks = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Settings", href: "/admin/settings", icon: Settings },
        { name: "Blog Posts", href: "/admin/blog", icon: FileText },
        { name: "Categories", href: "/admin/categories", icon: Layers },
        { name: "Services", href: "/admin/services", icon: List },
        { name: "Tarot Cards", href: "/admin/tarot", icon: Star },
    ];

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-primary/20 bg-background/95 backdrop-blur-md hidden md:flex flex-col fixed inset-y-0 z-10 pt-20">
                <div className="px-4 py-6">
                    <nav className="space-y-2">
                        {adminLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-lavender hover:bg-primary/20 hover:text-white transition-colors"
                            >
                                <link.icon className="mr-3 h-5 w-5 text-gold" />
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t border-primary/20">
                    <Link href="/" className="flex items-center justify-center rounded-lg px-4 py-2 text-sm text-lavender-dark hover:text-white bg-primary/10">
                        Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
