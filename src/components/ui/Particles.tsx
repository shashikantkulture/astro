"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticleProps {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function Particles({ count = 30 }: { count?: number }) {
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: count }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // percentage
                y: Math.random() * 100, // percentage
                size: Math.random() * 4 + 1, // 1px to 5px
                duration: Math.random() * 20 + 10, // 10s to 30s
                delay: Math.random() * 5,
            }));
            setParticles(newParticles);
        };

        generateParticles();
    }, [count]);

    if (particles.length === 0) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-lavender/40 shadow-[0_0_10px_2px_rgba(230,230,250,0.5)]"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: ["0%", "-100%"],
                        x: ["0%", `${Math.random() * 20 - 10}%`],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
