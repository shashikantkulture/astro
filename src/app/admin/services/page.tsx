"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, Layers, List } from "lucide-react";

export default function ServicesAdmin() {
    const [categories, setCategories] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'categories' | 'services'>('services');
    const [loading, setLoading] = useState(true);

    // Modals state
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

    const [editingCategory, setEditingCategory] = useState<any | null>(null);
    const [editingService, setEditingService] = useState<any | null>(null);

    const [categoryFormData, setCategoryFormData] = useState({ name: "", description: "", order: 0 });
    const [serviceFormData, setServiceFormData] = useState({
        title: "", price: "", duration: "", description: "", popular: false, categoryId: "", order: 0
    });

    const fetchData = async () => {
        try {
            const [catRes, servRes] = await Promise.all([
                fetch("/api/categories"),
                fetch("/api/services")
            ]);

            if (catRes.ok) setCategories(await catRes.json());
            if (servRes.ok) setServices(await servRes.json());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Category Handlers ---
    const handleOpenCategoryModal = (cat?: any) => {
        if (cat) {
            setEditingCategory(cat);
            setCategoryFormData({ name: cat.name, description: cat.description || "", order: cat.order });
        } else {
            setEditingCategory(null);
            setCategoryFormData({ name: "", description: "", order: categories.length });
        }
        setIsCategoryModalOpen(true);
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories";
            const res = await fetch(url, {
                method: editingCategory ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryFormData),
            });
            if (res.ok) {
                fetchData();
                setIsCategoryModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryDelete = async (id: string) => {
        if (!confirm("Are you sure? This might fail if services are attached to this category.")) return;
        try {
            const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    // --- Service Handlers ---
    const handleOpenServiceModal = (serv?: any) => {
        if (serv) {
            setEditingService(serv);
            setServiceFormData({
                title: serv.title, price: serv.price, duration: serv.duration,
                description: serv.description, popular: serv.popular,
                categoryId: serv.categoryId, order: serv.order
            });
        } else {
            setEditingService(null);
            setServiceFormData({
                title: "", price: "", duration: "", description: "",
                popular: false, categoryId: categories[0]?.id || "", order: services.length
            });
        }
        setIsServiceModalOpen(true);
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingService ? `/api/services/${editingService.id}` : "/api/services";
            const res = await fetch(url, {
                method: editingService ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceFormData),
            });
            if (res.ok) {
                fetchData();
                setIsServiceModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleServiceDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-lavender-dark">Loading...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="font-serif text-3xl font-bold text-white">Consultations Management</h1>

                <div className="flex space-x-2">
                    <button
                        onClick={() => handleOpenCategoryModal()}
                        className="flex items-center px-4 py-2 bg-primary/20 text-white rounded-lg hover:bg-primary/40 transition-colors border border-primary/40 font-medium text-sm"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Category
                    </button>
                    <button
                        onClick={() => handleOpenServiceModal()}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-[#8A2BE2] text-white rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(138,43,226,0.6)] transition-all font-medium text-sm"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Service
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-primary/20 mb-6">
                <button
                    onClick={() => setActiveTab('services')}
                    className={`px-6 py-3 font-medium text-sm flex items-center transition-colors ${activeTab === 'services' ? 'text-gold border-b-2 border-gold' : 'text-lavender-dark hover:text-white'}`}
                >
                    <List className="h-4 w-4 mr-2" /> Services ({services.length})
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-6 py-3 font-medium text-sm flex items-center transition-colors ${activeTab === 'categories' ? 'text-gold border-b-2 border-gold' : 'text-lavender-dark hover:text-white'}`}
                >
                    <Layers className="h-4 w-4 mr-2" /> Categories ({categories.length})
                </button>
            </div>

            {/* Content */}
            <div className="bg-background/50 border border-primary/20 backdrop-blur-sm rounded-2xl p-6">

                {activeTab === 'categories' && (
                    <div className="space-y-4">
                        {categories.length === 0 ? (
                            <p className="text-center text-lavender-dark py-8">No categories found. Create your first category.</p>
                        ) : (
                            categories.map(cat => (
                                <div key={cat.id} className="flex justify-between items-center p-4 border border-primary/10 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                                    <div>
                                        <h3 className="text-white font-medium">{cat.name}</h3>
                                        {cat.description && <p className="text-sm text-lavender-dark line-clamp-1">{cat.description}</p>}
                                        <p className="text-xs text-lavender-dark mt-1">Order: {cat.order} • Services: {cat.services?.length || 0}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleOpenCategoryModal(cat)} className="p-2 text-gold hover:text-white transition-colors"><Edit className="h-4 w-4" /></button>
                                        <button onClick={() => handleCategoryDelete(cat.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="space-y-4">
                        {services.length === 0 ? (
                            <p className="text-center text-lavender-dark py-8">No services found. Create your first service.</p>
                        ) : (
                            services.map(serv => (
                                <div key={serv.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-primary/10 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-white font-medium">{serv.title}</h3>
                                            {serv.popular && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold uppercase tracking-wider font-bold">Popular</span>}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-lavender-dark mb-2">
                                            <span className="bg-primary/20 px-2 py-1 rounded">{serv.price}</span>
                                            <span className="bg-primary/20 px-2 py-1 rounded">{serv.duration}</span>
                                            <span>Category: <strong className="text-lavender">{serv.category?.name || 'Unknown'}</strong></span>
                                            <span>Order: {serv.order}</span>
                                        </div>
                                        <p className="text-sm text-lavender-dark line-clamp-1">{serv.description}</p>
                                    </div>
                                    <div className="flex space-x-2 shrink-0">
                                        <button onClick={() => handleOpenServiceModal(serv)} className="p-2 text-gold hover:text-white transition-colors"><Edit className="h-4 w-4" /></button>
                                        <button onClick={() => handleServiceDelete(serv.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modals Logic */}
            {/* Category Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                    <div className="relative w-full max-w-md bg-[#1A0033] border border-primary/40 rounded-2xl shadow-2xl p-6">
                        <h2 className="font-serif text-2xl font-bold text-white mb-6">
                            {editingCategory ? "Edit Category" : "New Category"}
                        </h2>
                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <input
                                type="text" required placeholder="Category Name"
                                value={categoryFormData.name} onChange={e => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                            />
                            <textarea
                                placeholder="Description (Optional)" rows={3}
                                value={categoryFormData.description} onChange={e => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white resize-none"
                            />
                            <input
                                type="number" placeholder="Display Order (e.g. 0)"
                                value={categoryFormData.order} onChange={e => setCategoryFormData({ ...categoryFormData, order: parseInt(e.target.value) || 0 })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                            />
                            <div className="flex gap-2 justify-end pt-2">
                                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 text-lavender hover:text-white">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative w-full max-w-lg bg-[#1A0033] border border-primary/40 rounded-2xl shadow-2xl p-6 my-8">
                        <h2 className="font-serif text-2xl font-bold text-white mb-6">
                            {editingService ? "Edit Service" : "New Service"}
                        </h2>
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                            <input
                                type="text" required placeholder="Service Title"
                                value={serviceFormData.title} onChange={e => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text" required placeholder="Price (e.g. $45)"
                                    value={serviceFormData.price} onChange={e => setServiceFormData({ ...serviceFormData, price: e.target.value })}
                                    className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                                />
                                <input
                                    type="text" required placeholder="Duration (e.g. 30 Mins)"
                                    value={serviceFormData.duration} onChange={e => setServiceFormData({ ...serviceFormData, duration: e.target.value })}
                                    className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                                />
                            </div>
                            <textarea
                                required placeholder="Description" rows={4}
                                value={serviceFormData.description} onChange={e => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white resize-none"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-lavender-dark mb-1">Category</label>
                                    <select
                                        required
                                        value={serviceFormData.categoryId}
                                        onChange={e => setServiceFormData({ ...serviceFormData, categoryId: e.target.value })}
                                        className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-lavender-dark mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={serviceFormData.order} onChange={e => setServiceFormData({ ...serviceFormData, order: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center space-x-2 cursor-pointer mt-4">
                                <input
                                    type="checkbox"
                                    checked={serviceFormData.popular}
                                    onChange={e => setServiceFormData({ ...serviceFormData, popular: e.target.checked })}
                                    className="rounded border-primary bg-primary/20 text-gold focus:ring-gold"
                                />
                                <span className="text-white text-sm">Mark as "Most Popular"</span>
                            </label>

                            <div className="flex gap-2 justify-end pt-4 border-t border-primary/20">
                                <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-4 py-2 text-lavender hover:text-white">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
