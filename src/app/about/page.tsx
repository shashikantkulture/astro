"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(75,0,130,0.5)]">
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                            <Image
                                src="/about-profile.jpg"
                                alt="Astro Hemani"
                                fill
                                className="object-cover filter contrast-110"
                            />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-spin-slow"></div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6">
                            {t("about.title1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">{t("about.titleHighlight")}</span>{t("about.title2")}
                        </h1>

                        <div className="space-y-6 text-lg text-lavender-dark leading-relaxed font-light">
                            <p>{t("about.p1")}</p>
                            <p>{t("about.p2")}</p>
                            <p>{t("about.p3")}</p>

                            <blockquote className="border-l-2 border-gold pl-6 py-2 my-8 italic text-lavender bg-primary/5 rounded-r-lg">
                                {t("about.quote")}
                            </blockquote>

                            <p>{t("about.p4")}</p>
                        </div>

                        <div className="mt-10">
                            <p className="font-serif text-2xl text-white mb-2">{t("about.signoff")}</p>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png" alt="Signature" className="h-16 filter invert opacity-70" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
