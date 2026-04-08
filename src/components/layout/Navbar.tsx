"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Navbar({ whatsappNumber = "7376916925" }: { whatsappNumber?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.about"), href: "/about" },
        { name: t("nav.services"), href: "/services" },
        { name: t("nav.freeTarot"), href: "/free-tarot" },
        { name: t("nav.blog"), href: "/blog" },
    ];

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md shadow-[0_4px_30px_rgba(75,0,130,0.1)] border-b border-primary/20"
                : "bg-transparent py-4"
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="font-serif text-2xl font-bold text-foreground">
                            Astro<span className="text-gold">Hemani</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={toggleLanguage}
                                className="font-sans text-sm font-bold text-gold hover:text-white transition-colors uppercase bg-primary/20 px-3 py-1 rounded-full border border-gold/30"
                            >
                                {t("nav.toggle")}
                            </button>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Namaste,%20main%20consultation%20book%20karna%20chahta/chahti%20hoon.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-light hover:shadow-[0_0_15px_rgba(106,13,173,0.5)]"
                            >
                                {t("nav.bookConsultation")}
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="font-sans text-xs font-bold text-gold hover:text-white transition-colors uppercase bg-primary/20 px-3 py-1.5 rounded-full border border-gold/30"
                        >
                            {t("nav.toggle")}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-gold focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-primary/10 hover:text-gold"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=Namaste,%20main%20consultation%20book%20karna%20chahta/chahti%20hoon.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 block rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-light"
                        >
                            {t("nav.bookConsultation")}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
