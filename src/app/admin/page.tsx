export default function AdminDashboard() {
    return (
        <div>
            <h1 className="font-serif text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Quick Stats Cards */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
                    <h3 className="text-sm font-medium text-lavender-dark mb-1">Total Blog Posts</h3>
                    <p className="text-3xl font-bold text-gold">0</p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
                    <h3 className="text-sm font-medium text-lavender-dark mb-1">Active Services</h3>
                    <p className="text-3xl font-bold text-gold">5</p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
                    <h3 className="text-sm font-medium text-lavender-dark mb-1">Tarot Cards Indexed</h3>
                    <p className="text-3xl font-bold text-gold">0</p>
                </div>
            </div>

            <div className="mt-12 rounded-xl border border-primary/20 bg-background/50 p-8 backdrop-blur-sm">
                <h2 className="font-serif text-2xl font-semibold text-white mb-4">Welcome to Mystic CMS</h2>
                <p className="text-lavender-dark">
                    Use the navigation menu on the left to manage you site's content. You can update your settings, write blog posts, configure your consultation offerings, and manage the tarot card definitions for the free game.
                </p>
                <p className="text-lavender-dark mt-4">
                    All configuration changes apply instantly to the live website.
                </p>
            </div>
        </div>
    );
}
