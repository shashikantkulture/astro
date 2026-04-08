"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(t("contact.alertMsg"));
    };

    return (
        <div className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-[#6A0DAD]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6">{t("contact.heroTitle")}</h1>
                        <p className="text-lg text-lavender-dark">
                            {t("contact.heroDesc")}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 backdrop-blur-sm shadow-xl">
                            <h3 className="font-serif text-2xl font-semibold text-white mb-8 border-b border-primary/30 pb-4">{t("contact.directTitle")}</h3>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-primary/20 p-3 rounded-lg text-gold border border-gold/20">
                                        <MessageCircle className="h-6 w-6" />
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-medium text-white mb-1">{t("contact.waTitle")}</h4>
                                        <p className="text-lavender-dark mb-2">{t("contact.waDesc")}</p>
                                        <a href="https://wa.me/7376916925" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors font-semibold">
                                            +1 (234) 567-890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-primary/20 p-3 rounded-lg text-gold border border-gold/20">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-medium text-white mb-1">{t("contact.emailTitle")}</h4>
                                        <p className="text-lavender-dark mb-2">{t("contact.emailDesc")}</p>
                                        <a href="mailto:hello@mystictarot.com" className="text-gold hover:text-gold-light transition-colors font-semibold">
                                            hello@mystictarot.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-primary/20 p-3 rounded-lg text-gold border border-gold/20">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-medium text-white mb-1">{t("contact.locTitle")}</h4>
                                        <p className="text-lavender-dark mb-2">{t("contact.locDesc")}</p>
                                        <span className="text-lavender font-semibold">
                                            {t("contact.locNote")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof Mini */}
                        <div className="rounded-2xl border border-gold/20 bg-background/60 p-6 backdrop-blur-md">
                            <p className="text-sm text-lavender-dark italic">
                                {t("contact.quoteText")}
                            </p>
                            <p className="mt-2 text-gold font-semibold text-xs text-right">{t("contact.quoteAuthor")}</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="rounded-2xl border border-primary/30 bg-[#1A0033]/60 p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative">
                            {/* Form aesthetic corner accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-2xl"></div>

                            <h2 className="font-serif text-3xl font-semibold text-white mb-8 border-b border-primary/20 pb-4">{t("contact.formTitle")}</h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-lavender-dark mb-2">{t("contact.formName")}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background/50 border border-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all"
                                        placeholder={t("contact.formNamePlace")}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-lavender-dark mb-2">{t("contact.formEmail")}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-background/50 border border-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all"
                                        placeholder={t("contact.formEmailPlace")}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-lavender-dark mb-2">{t("contact.formSubject")}</label>
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-background/50 border border-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all"
                                    >
                                        <option value="" disabled className="text-gray-500">{t("contact.formSubjDefault")}</option>
                                        <option value="booking">{t("contact.formSubjOpt1")}</option>
                                        <option value="media">{t("contact.formSubjOpt2")}</option>
                                        <option value="general">{t("contact.formSubjOpt3")}</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-lavender-dark mb-2">{t("contact.formMsg")}</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-background/50 border border-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all resize-none"
                                        placeholder={t("contact.formMsgPlace")}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#8A2BE2] px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(75,0,130,0.4)] transition-all hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] group"
                                >
                                    {t("contact.formBtn")}
                                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
