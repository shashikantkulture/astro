"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, Moon, Sun, ArrowRight, CheckCircle2 } from "lucide-react";
import { TarotCard } from "@/components/ui/TarotCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useEffect } from "react";

export default function Home() {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("7376916925");
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    fetch('/api/settings').then(res => res.json()).then(data => {
      if (data?.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
    }).catch(() => { });
  }, []);

  const cardBaseData = [
    { id: "card-1", imageUrl: "https://images.unsplash.com/photo-1616782291438-fb11ce0c1737?auto=format&fit=crop&q=80" },
    { id: "card-2", imageUrl: "https://images.unsplash.com/photo-1510257088463-2287f3b8112c?auto=format&fit=crop&q=80" },
    { id: "card-3", imageUrl: "https://images.unsplash.com/photo-1549487922-b0625c2d3ca4?auto=format&fit=crop&q=80" },
    { id: "card-4", imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80" },
    { id: "card-5", imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80" },
    { id: "card-6", imageUrl: "https://images.unsplash.com/photo-1550784400-b6ab711018dc?auto=format&fit=crop&q=80" },
    { id: "card-7", imageUrl: "https://images.unsplash.com/photo-1601000676451-24da8399581a?auto=format&fit=crop&q=80" },
    { id: "card-8", imageUrl: "https://images.unsplash.com/photo-1502318217862-aa4e294ba65c?auto=format&fit=crop&q=80" },
    { id: "card-9", imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83164bb?auto=format&fit=crop&q=80" },
    { id: "card-10", imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80" },
    { id: "card-11", imageUrl: "https://images.unsplash.com/photo-1517721865910-3882f02fbcac?auto=format&fit=crop&q=80" },
    { id: "card-12", imageUrl: "https://images.unsplash.com/photo-1444044205806-38f4ed10eb1b?auto=format&fit=crop&q=80" },
    { id: "card-13", imageUrl: "https://images.unsplash.com/photo-1528643567073-63bf72b8347f?auto=format&fit=crop&q=80" },
    { id: "card-14", imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80" },
    { id: "card-15", imageUrl: "https://images.unsplash.com/photo-1558000143-a60d0061e8fa?auto=format&fit=crop&q=80" },
    { id: "card-16", imageUrl: "https://images.unsplash.com/photo-1505635552518-3448ff116afe?auto=format&fit=crop&q=80" },
    { id: "card-17", imageUrl: "https://images.unsplash.com/photo-1507676184212-d0330a151f7b?auto=format&fit=crop&q=80" },
    { id: "card-18", imageUrl: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80" },
    { id: "card-19", imageUrl: "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?auto=format&fit=crop&q=80" },
    { id: "card-20", imageUrl: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&q=80" },
    { id: "card-21", imageUrl: "https://images.unsplash.com/photo-1605646194729-eb38ea1221b0?auto=format&fit=crop&q=80" }
  ];

  const handleCardClick = (id: string) => {
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  if (!mounted) return null;

  const mockCards = cardBaseData.map(card => ({
    ...card,
    name: t(`home.cards.${card.id}.name`),
    description: t(`home.cards.${card.id}.desc`)
  }));

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden w-full">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#8A2BE2]/10 blur-[150px]" />
          <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-gold/5 blur-[100px]" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto w-full">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 rounded-full border border-gold/40 bg-primary/20 px-4 py-1.5 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold tracking-wide uppercase">{t("home.heroBadge")}</span>
              </div>

              <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-7xl mb-6 text-white drop-shadow-[0_0_30px_rgba(106,13,173,0.8)]">
                {t("home.heroTitle1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender to-gold">{t("home.heroTitleHighlight")}</span>{t("home.heroTitle2")}
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-lavender-dark max-w-2xl mx-auto font-light leading-relaxed">
                {t("home.heroDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=Namaste,%20main%20tarot%20consultation%20book%20karna%20chahta/chahti%20hoon.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#8A2BE2] px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(75,0,130,0.6)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(138,43,226,0.8)] group"
              >
                {t("home.heroBtn1")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-lavender/30 bg-transparent px-8 py-4 text-base font-medium text-lavender shadow-sm backdrop-blur-sm transition-all hover:bg-white/5 hover:text-white"
              >
                {t("home.heroBtn2")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pick a Card Interactive Section */}
      <section className="relative py-24 bg-[#0A0012]/80 backdrop-blur-md border-y border-primary/20 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">{t("home.pickTitle")}</h2>
            <p className="text-lavender-dark max-w-2xl mx-auto">{t("home.pickDesc")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {mockCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.2 }}
                className="relative"
              >
                <div className="relative group">
                  <TarotCard
                    {...card}
                    isFlipped={selectedCardId === card.id}
                    onFlip={handleCardClick}
                    interactive={!selectedCardId}
                    blurredReading={true}
                    className="mx-auto"
                  />

                  {/* CTA overlay when flipped */}
                  {selectedCardId === card.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-0 bottom-4 flex justify-center z-20"
                    >
                      <Link
                        href="/services"
                        className="shadow-[0_0_20px_rgba(212,175,55,0.6)] font-semibold px-6 py-2.5 rounded-full bg-gold text-[#4B0082] transition-transform hover:scale-105"
                      >
                        {t("home.unlockBtn")}
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Pillars */}
      <section className="py-24 relative w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("home.feat1Title"), desc: t("home.feat1Desc"), icon: Moon },
              { title: t("home.feat2Title"), desc: t("home.feat2Desc"), icon: Star },
              { title: t("home.feat3Title"), desc: t("home.feat3Desc"), icon: Sun },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-primary/30 bg-primary/5 p-8 backdrop-blur-sm group hover:bg-primary/10 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#2D004C] shadow-lg mb-6 border border-gold/30">
                  <feature.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-lavender-dark leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden bg-primary/10 pt-32 pb-32 w-full">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">{t("home.testiTitle")}</h2>
            <p className="text-lavender-dark max-w-2xl mx-auto">{t("home.testiDesc")}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { text: t("home.testi1"), author: "Sarah J.", role: "Creative Director" },
              { text: t("home.testi2"), author: "Michael T.", role: "Entrepreneur" },
              { text: t("home.testi3"), author: "Elena R.", role: "Wellness Coach" }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-gold/20 bg-background/60 p-8 backdrop-blur-md relative"
              >
                <Star className="absolute top-8 right-8 h-6 w-6 text-primary/20" />
                <p className="text-lavender leading-relaxed italic mb-6">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold text-gold">{testimonial.author}</h4>
                  <p className="text-sm text-lavender-dark">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative w-full">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">{t("home.faqTitle")}</h2>
          </div>

          <div className="space-y-6">
            {[
              { q: t("home.faq1q"), a: t("home.faq1a") },
              { q: t("home.faq2q"), a: t("home.faq2a") },
              { q: t("home.faq3q"), a: t("home.faq3a") }
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
                <h3 className="flex items-center text-lg font-medium text-white mb-3">
                  <CheckCircle2 className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-lavender-dark pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
