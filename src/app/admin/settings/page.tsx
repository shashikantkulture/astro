"use client";

import { useState, useEffect } from "react";
import { Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SettingsAdmin() {
    const [formData, setFormData] = useState({
        whatsappNumber: "",
        metaTitle: "",
        metaDescription: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await fetch("/api/settings");
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        whatsappNumber: data.whatsappNumber || "",
                        metaTitle: data.metaTitle || "",
                        metaDescription: data.metaDescription || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching settings", error);
                setStatus({ type: 'error', message: "Failed to load settings" });
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus({ type: 'success', message: "Settings updated successfully" });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: "An error occurred while saving" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-lavender-dark">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl">
            <h1 className="font-serif text-3xl font-bold text-white mb-8">Global Settings</h1>

            {status && (
                <div className={`p-4 rounded-lg mb-6 flex items-start ${status.type === 'success' ? 'bg-[#25D366]/10 border border-[#25D366]/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    {status.type === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 text-[#25D366] mr-3 mt-0.5" />
                    ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    )}
                    <p className={status.type === 'success' ? 'text-[#25D366]' : 'text-red-400'}>{status.message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-background/50 border border-primary/20 backdrop-blur-sm p-8 rounded-2xl">

                {/* WhatsApp Configuration */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4 border-b border-primary/20 pb-2">Contact Details</h2>
                    <div className="space-y-4 max-w-xl">
                        <div>
                            <label className="block text-sm font-medium text-lavender-dark mb-1">WhatsApp Number</label>
                            <p className="text-xs text-lavender-dark/70 mb-2">Include country code without the + sign. Example: 1234567890</p>
                            <input
                                type="text"
                                required
                                value={formData.whatsappNumber}
                                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Configuration */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4 border-b border-primary/20 pb-2">SEO Metadata</h2>
                    <div className="space-y-6 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-lavender-dark mb-1">Global Meta Title</label>
                            <input
                                type="text"
                                required
                                value={formData.metaTitle}
                                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-lavender-dark mb-1">Global Meta Description</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.metaDescription}
                                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                className="w-full bg-primary/10 border border-primary/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors shadow-lg disabled:opacity-50"
                    >
                        {saving ? (
                            "Saving..."
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" /> Save Settings
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
