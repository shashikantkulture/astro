"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";
import { TarotCard } from "@prisma/client";

export default function TarotAdmin() {
    const [cards, setCards] = useState<TarotCard[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState<TarotCard | null>(null);

    const [formData, setFormData] = useState({
        cardId: "",
        name: "",
        imageUrl: "",
        description: "",
    });

    const fetchCards = async () => {
        try {
            const res = await fetch("/api/tarot");
            if (res.ok) {
                const data = await res.json();
                setCards(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleOpenModal = (card?: TarotCard) => {
        if (card) {
            setEditingCard(card);
            setFormData({
                cardId: card.cardId,
                name: card.name,
                imageUrl: card.imageUrl,
                description: card.description,
            });
        } else {
            setEditingCard(null);
            setFormData({
                cardId: "",
                name: "",
                imageUrl: "",
                description: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCard(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingCard ? `/api/tarot/${editingCard.id}` : "/api/tarot";
            const method = editingCard ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchCards();
                closeModal();
            } else {
                alert("Failed to save tarot card");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this card?")) return;

        try {
            const res = await fetch(`/api/tarot/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchCards();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-lavender-dark">Loading tarot cards...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-white">Tarot Cards Registry</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-[#8A2BE2] text-white rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(138,43,226,0.6)] transition-all font-medium"
                >
                    <Plus className="h-5 w-5 mr-1" /> Add Card
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cards.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-lavender-dark bg-background/50 border border-primary/20 rounded-2xl">
                        No tarot cards indexed yet. Add some for the free game!
                    </div>
                ) : (
                    cards.map((card) => (
                        <div key={card.id} className="bg-background/80 border border-primary/30 rounded-xl overflow-hidden shadow-lg flex flex-col group">
                            <div className="h-48 relative overflow-hidden bg-primary/20">
                                {card.imageUrl ? (
                                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-300 transform group-hover:scale-105" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-lavender-dark">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>

                                {/* Actions overlay */}
                                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenModal(card)} className="p-1.5 bg-background/80 rounded block text-gold hover:text-white transition-colors">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(card.id)} className="p-1.5 bg-background/80 rounded block text-red-400 hover:text-red-300 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-serif text-lg font-bold text-white mb-1">{card.name}</h3>
                                <p className="text-xs text-lavender-dark mb-3 font-mono">ID: {card.cardId}</p>
                                <p className="text-sm text-lavender-dark bg-primary/5 p-3 rounded-lg flex-grow line-clamp-4">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative w-full max-w-lg bg-[#1A0033] border border-primary/40 rounded-2xl shadow-2xl p-6 my-8">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-lavender-dark hover:text-white transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <h2 className="font-serif text-2xl font-bold text-white mb-6">
                            {editingCard ? "Edit Tarot Card" : "New Tarot Card"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-lavender-dark mb-1">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        const cardId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                        setFormData({ ...formData, name, cardId: editingCard ? formData.cardId : cardId });
                                    }}
                                    className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold"
                                    placeholder="e.g. The Magician"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-lavender-dark mb-1">Card ID (Unique slug)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.cardId}
                                    onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
                                    className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                                    placeholder="the-magician"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-lavender-dark mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold"
                                    placeholder="https://images.unsplash..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-lavender-dark mb-1">Reading / Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-primary/10 border border-primary/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold resize-none"
                                    placeholder="Action, power, and manifestation. You have the tools needed..."
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-transparent text-lavender hover:text-white transition-colors font-medium border border-transparent hover:border-primary/40 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center px-6 py-2 bg-gradient-to-r from-primary to-[#8A2BE2] text-white font-medium rounded-lg hover:shadow-[0_0_15px_rgba(138,43,226,0.6)] transition-all"
                                >
                                    <Save className="h-4 w-4 mr-2" /> Save Card
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
