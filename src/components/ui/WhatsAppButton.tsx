"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppButton({ whatsappNumber = "1234567890" }: { whatsappNumber?: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after scrolling a bit or after a delay
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            }
        };

        const timer = setTimeout(() => setIsVisible(true), 3000);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={`https://wa.me/${whatsappNumber}?text=Namaste,%20main%20tarot%20paramarsh%20book%20karna%20chahta/chahti%20hoon.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-colors hover:bg-[#1EBE5A]"
                    aria-label="WhatsApp par chat karein"
                >
                    <MessageCircle className="h-7 w-7" />

                    {/* Ping animation */}
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40"></span>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
