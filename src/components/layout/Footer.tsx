"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative z-10 mt-auto border-t border-primary/20 bg-background/80 pt-16 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* Brand & Main Info */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="font-serif text-3xl font-bold text-foreground">
                            Astro<span className="text-gold">Hemani</span>
                        </Link>
                        <p className="mt-4 text-sm text-lavender-dark leading-relaxed">
                            {t("footer.desc1")}<br /><br />
                            {t("footer.desc2")}<br /><br />
                            <span className="text-lavender italic">{t("footer.desc3")}</span>
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-lavender-dark transition-colors hover:text-gold">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-lavender-dark transition-colors hover:text-gold">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-lavender-dark transition-colors hover:text-gold">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="mailto:hello@astrohemani.com" className="text-lavender-dark transition-colors hover:text-gold">
                                <span className="sr-only">Email</span>
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="lg:col-span-3">
                        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                            <span>⚖️</span> {t("footer.disclaimer")}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-lavender-dark">
                            <li>{t("footer.disclaimer1")}</li>
                            <li>{t("footer.disclaimer2")}</li>
                            <li>{t("footer.disclaimer3")}</li>
                            <li>{t("footer.disclaimer4")}</li>
                        </ul>
                    </div>

                    {/* Appointment Policy */}
                    <div className="lg:col-span-3">
                        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                            <span>📞</span> {t("footer.appointment")}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-lavender-dark">
                            <li>{t("footer.appointment1")}</li>
                            <li>{t("footer.appointment2")}</li>
                            <li>{t("footer.appointment3")}</li>
                        </ul>
                    </div>

                    {/* Privacy Note & Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                            <span>🔒</span> {t("footer.privacy")}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-lavender-dark">
                            <li>{t("footer.privacy1")}</li>
                            <li>{t("footer.privacy2")}</li>
                        </ul>

                        <h3 className="font-serif text-lg font-semibold text-foreground mt-8">{t("footer.quickLinks")}</h3>
                        <ul className="mt-4 space-y-2 text-sm text-lavender-dark">
                            <li>
                                <Link href="/about" className="transition-colors hover:text-gold">{t("footer.linkAbout")}</Link>
                            </li>
                            <li>
                                <Link href="/services" className="transition-colors hover:text-gold">{t("footer.linkServices")}</Link>
                            </li>
                            <li>
                                <Link href="/free-tarot" className="transition-colors hover:text-gold">{t("footer.linkTarot")}</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="transition-colors hover:text-gold">{t("footer.linkContact")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-primary/20 pt-8 text-center text-sm text-lavender-dark flex flex-col items-center justify-center gap-2">
                    <p>{t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    );
}
