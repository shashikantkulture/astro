"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TarotCard } from "@/components/ui/TarotCard";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { TarotCard as DBTarotCard } from "@/lib/db";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FreeTarotGameClient({ initialCards }: { initialCards: DBTarotCard[] }) {
    const { t } = useLanguage();
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

    const fallbackCards = [
        {
            id: "game-1", cardId: "magician", name: t("freeTarot.fallbackName1"),
            imageUrl: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80",
            description: t("freeTarot.fallbackDesc1"), updatedAt: new Date()
        },
        ...Array.from({ length: 5 }).map((_, i) => ({
            id: `fb-${i}`, cardId: `fb-${i}`, name: t("freeTarot.fallbackName2"),
            imageUrl: "https://images.unsplash.com/photo-1549487955-4424619ad420?auto=format&fit=crop&q=80",
            description: t("freeTarot.fallbackDesc2"), updatedAt: new Date()
        }))
    ];

    const cardsToPlay = initialCards.length >= 6 ? initialCards.slice(0, 8) : fallbackCards;

    const handleCardClick = (id: string) => {
        if (!selectedCardId) {
            setSelectedCardId(id);
        }
    };

    const handleReset = () => {
        setSelectedCardId(null);
    };

    return (
        <div className="min-h-screen py-16 sm:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center space-x-2 rounded-full border border-gold/40 bg-primary/20 px-4 py-1.5 backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            <Sparkles className="h-4 w-4 text-gold" />
                            <span className="text-sm font-medium text-gold tracking-wide uppercase">{t("freeTarot.badge")}</span>
                        </div>
                        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6">{t("freeTarot.title")}</h1>
                        <p className="text-lg text-lavender-dark leading-relaxed">
                            {t("freeTarot.desc")}
                        </p>
                    </motion.div>
                </div>

                {/* The Game Area */}
                <div className="relative">
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
                        {cardsToPlay.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`${selectedCardId && selectedCardId !== card.id ? "opacity-50 grayscale scale-95" : "z-10"} transition-all duration-500`}
                            >
                                <div className="relative group">
                                    <TarotCard
                                        id={card.id}
                                        name={card.name}
                                        imageUrl={card.imageUrl}
                                        description={card.description}
                                        isFlipped={selectedCardId === card.id}
                                        onFlip={handleCardClick}
                                        interactive={!selectedCardId}
                                        blurredReading={true}
                                        className="w-[180px] h-[280px] sm:w-[220px] sm:h-[340px]"
                                    />

                                    {/* CTA overlay when flipped */}
                                    {selectedCardId === card.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="absolute inset-x-0 bottom-4 flex justify-center z-20"
                                        >
                                            <Link
                                                href="/services"
                                                className="shadow-[0_0_20px_rgba(212,175,55,0.6)] font-semibold px-4 py-2 text-sm sm:px-6 sm:py-2.5 rounded-full bg-gold text-[#4B0082] transition-transform hover:scale-105"
                                            >
                                                {t("freeTarot.btnFull")}
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reset Button */}
                    {selectedCardId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-16 text-center"
                        >
                            <button
                                onClick={handleReset}
                                className="text-lavender hover:text-gold transition-colors font-medium border-b border-dashed border-lavender/40 hover:border-gold pb-1"
                            >
                                {t("freeTarot.btnReset")}
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
