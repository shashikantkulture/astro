import { prisma } from "@/lib/db";
import { Star, Moon, Sun, ArrowRight, ShieldCheck, HeartHandshake, Layers } from "lucide-react";
import Link from "next/link";
import React from 'react';

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function Services() {
    const categories = await prisma.consultationCategory.findMany({
        include: {
            services: {
                orderBy: { order: "asc" }
            }
        },
        orderBy: { order: "asc" }
    });

    const settings = await prisma.settings.findUnique({ where: { id: "global" } });
    const whatsappNumber = settings?.whatsappNumber || "1234567890";

    // Array of lucide icons to cyclically assign for visual flair if no icon logic is complexly defined
    // Since we don't store icon names in DB, we'll pseudo-randomly pick based on ID to keep it deterministic.
    const icons = [Star, Moon, Sun, HeartHandshake, ShieldCheck, Layers];

    const getIconForId = (id: string, index: number) => {
        return icons[index % icons.length];
    };

    return (
        <div className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6">Consultations aur Prastav</h1>
                    <p className="text-lg text-lavender-dark">
                        Vah reading chunein jo aapki vartamaan yatra ke anukool ho. Sabhi paramarsh gehre sahaj aur kadai se gopniya hote hain.
                    </p>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-20 text-lavender-dark text-lg border border-primary/20 rounded-2xl bg-primary/5 backdrop-blur-sm">
                        Readings vartamaan mein update ki ja rahi hain. Kripya jald hi wapas dekhein.
                    </div>
                ) : (
                    <div className="space-y-20">
                        {categories.map((category, catIndex) => {
                            if (category.services.length === 0) return null;

                            return (
                                <div key={category.id} className="relative">
                                    <div className="text-center mb-10">
                                        <h2 className="font-serif text-3xl font-bold text-gold inline-block relative">
                                            {category.name}
                                            <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                                        </h2>
                                        {category.description && (
                                            <p className="mt-4 text-lavender-dark max-w-2xl mx-auto">{category.description}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {category.services.map((service, index) => {
                                            const ServiceIcon = getIconForId(service.id, index);

                                            return (
                                                <div
                                                    key={service.id}
                                                    className={`relative rounded-2xl border ${service.popular ? 'border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-gradient-to-b from-primary/20 to-background/80' : 'border-primary/30 bg-background/60'} p-8 backdrop-blur-md flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                                                >
                                                    {service.popular && (
                                                        <div className="absolute top-0 right-8 -translate-y-1/2 bg-gold text-[#4B0082] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
                                                            Sabse Lokpriya
                                                        </div>
                                                    )}

                                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-gold mb-6 border border-gold/20 flex-shrink-0">
                                                        <ServiceIcon className="h-6 w-6" />
                                                    </div>

                                                    <h3 className="font-serif text-2xl font-semibold text-white mb-2">{service.title}</h3>
                                                    <div className="flex items-baseline gap-2 mb-4">
                                                        <span className="text-3xl font-bold text-gold">{service.price}</span>
                                                        <span className="text-sm text-lavender-dark">/ {service.duration}</span>
                                                    </div>

                                                    <p className="text-lavender-dark mb-8 flex-grow">
                                                        {service.description}
                                                    </p>

                                                    <a
                                                        href={`https://wa.me/${whatsappNumber}?text=Namaste,%20main%20${encodeURIComponent(service.title)}%20book%20karna%20chahta/chahti%20hoon.`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`mt-auto w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all ${service.popular
                                                            ? 'bg-gold text-[#4B0082] hover:bg-gold-light hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                                            : 'bg-primary text-white hover:bg-primary-light hover:shadow-[0_0_15px_rgba(106,13,173,0.4)]'
                                                            }`}
                                                    >
                                                        WhatsApp ke madhyam se book karein
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Important Notes */}
                        <div className="mt-20 max-w-3xl mx-auto bg-primary/10 border border-gold/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                            <h3 className="text-2xl font-serif text-gold mb-6 text-center border-b border-gold/20 pb-4">Booking Information</h3>
                            <div className="space-y-4 text-lavender-dark text-lg font-light">
                                <p className="flex items-start">
                                    <span className="text-gold mr-3 mt-1">👉</span>
                                    <span>Consultation keval Appointment dwara kiya jata hai.</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-gold mr-3 mt-1">👉</span>
                                    <span>Fees Advance mein Booking ke samay li jati hai.</span>
                                </p>
                                <div className="flex items-start mt-8 pt-6 border-t border-primary/30">
                                    <span className="text-gold mr-4 text-2xl mt-1">📲</span>
                                    <div>
                                        <strong className="text-white block mb-1 font-medium">Payment Mode:</strong>
                                        <span className="text-gold-light font-semibold tracking-wide">UPI / Google Pay / PhonePe</span>
                                        <p className="text-sm mt-2 opacity-80 italic">(Payment ke baad hi Consultation Time Confirm kiya jayega)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
