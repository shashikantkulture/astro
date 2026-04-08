"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StarProps {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function TwinklingStars({ count = 100 }: { count?: number }) {
    const [stars, setStars] = useState<StarProps[]>([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = Array.from({ length: count }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1, // 1px to 3px
                duration: Math.random() * 3 + 2, // 2s to 5s
                delay: Math.random() * 5,
            }));
            setStars(newStars);
        };

        generateStars();
    }, [count]);

    if (stars.length === 0) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: star.size,
                        height: star.size,
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, 0.4)`
                    }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
