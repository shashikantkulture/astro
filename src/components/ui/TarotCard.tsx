"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TarotCardProps {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    isFlipped?: boolean;
    onFlip?: (id: string) => void;
    className?: string;
    interactive?: boolean;
    blurredReading?: boolean;
}

export function TarotCard({
    id,
    name,
    imageUrl,
    description,
    isFlipped: controlledIsFlipped,
    onFlip,
    className,
    interactive = true,
    blurredReading = false,
}: TarotCardProps) {
    const [internalIsFlipped, setInternalIsFlipped] = useState(false);

    const isFlipped = controlledIsFlipped !== undefined ? controlledIsFlipped : internalIsFlipped;

    const handleFlip = () => {
        if (!interactive) return;

        if (onFlip) {
            onFlip(id);
        } else {
            setInternalIsFlipped(!internalIsFlipped);
        }
    };

    return (
        <div
            className={cn("group relative h-[400px] w-[260px] perspective-1000", className)}
            onMouseEnter={() => interactive && !isFlipped && setInternalIsFlipped(true)}
            onMouseLeave={() => interactive && isFlipped && !controlledIsFlipped && setInternalIsFlipped(false)}
            onClick={handleFlip}
        >
            <motion.div
                className="h-full w-full transform-style-3d transition-all duration-700 ease-in-out cursor-pointer"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
                {/* Card Back (Default state) */}
                <div className="absolute inset-0 backface-hidden rounded-xl border border-gold/40 bg-gradient-to-br from-primary to-[#2D004C] shadow-[0_0_20px_rgba(75,0,130,0.6)] flex items-center justify-center p-4">
                    <div className="absolute inset-2 rounded-lg border border-gold/30 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
                        <div className="z-10 text-gold opacity-80 flex flex-col items-center">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                                <path d="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            <span className="font-serif text-sm tracking-[0.2em] uppercase">Mystic</span>
                        </div>
                    </div>
                </div>

                {/* Card Front (Flipped state) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-[#0B0014] border border-gold shadow-[0_0_30px_rgba(212,175,55,0.4)] overflow-hidden flex flex-col">
                    {/* Card Image */}
                    <div className="relative h-2/3 w-full bg-[#1A0033] p-3 pb-0">
                        <div className="h-full w-full border border-gold/40 rounded-t-lg overflow-hidden relative">
                            <img
                                src={imageUrl || "https://images.unsplash.com/photo-1616782291438-fb11ce0c1737?auto=format&fit=crop&q=80"}
                                alt={name}
                                className="w-full h-full object-cover opacity-80 sepia-[0.3]"
                            />
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="relative flex-grow bg-gradient-to-t from-primary/80 to-[#1A0033] p-4 text-center border-x border-b border-gold/40 rounded-b-lg flex flex-col justify-center">
                        <h3 className="font-serif text-lg font-bold text-gold mb-2">{name}</h3>

                        {blurredReading ? (
                            <div className="relative">
                                <p className="text-sm text-lavender-dark blur-[4px] select-none h-[60px] overflow-hidden">
                                    {description} This reading reveals deep secrets about your path and future.
                                </p>
                            </div>
                        ) : (
                            <p className="text-xs text-lavender-dark line-clamp-3">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
