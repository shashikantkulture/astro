"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, Moon, Sun, ArrowRight, CheckCircle2 } from "lucide-react";
import { TarotCard } from "@/components/ui/TarotCard";

import { useEffect } from "react";

export default function Home() {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("1234567890");

  useEffect(() => {
    setMounted(true);
    fetch('/api/settings').then(res => res.json()).then(data => {
      if (data?.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
    }).catch(() => { });
  }, []);

  const mockCards = [
    {
      id: "card-1",
      name: "Mahan Pujarin (The High Priestess)",
      imageUrl: "https://images.unsplash.com/photo-1616782291438-fb11ce0c1737?auto=format&fit=crop&q=80",
      description: "Antargyan, rahasya aur avchetan mann aapko uttar ke liye bheetar dekhne ka ishara karte hain.",
    },
    {
      id: "card-2",
      name: "Sitara (The Star)",
      imageUrl: "https://images.unsplash.com/photo-1510257088463-2287f3b8112c?auto=format&fit=crop&q=80",
      description: "Asha, prerna, aur devdoot margdarshan aapke vartamaan aage ke marg ko roshan kar rahe hain.",
    },
    {
      id: "card-3",
      name: "Surya (The Sun)",
      imageUrl: "https://images.unsplash.com/photo-1549487922-b0625c2d3ca4?auto=format&fit=crop&q=80",
      description: "Safalta, anand aur shuddh jeevan shakti jald hi aapke prayason ko aashirwaad degi aur garmi layegi.",
    }
  ];

  const handleCardClick = (id: string) => {
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  if (!mounted) return null;

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
                <span className="text-sm font-medium text-gold tracking-wide uppercase">Apna Bhagya Khojein</span>
              </div>

              <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-7xl mb-6 text-white drop-shadow-[0_0_30px_rgba(106,13,173,0.8)]">
                Brahmand ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender to-gold">Rahasyon</span> ko unlock karein
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-lavender-dark max-w-2xl mx-auto font-light leading-relaxed">
                Hamare premium intuitive tarot readings ke madhyam se gehan adhyatmik spashtata aur margdarshan ka anubhav karein. Us marg ko prakat karein jo aapki pratiksha kar raha hai.
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
                Apna Consultation Book Karein
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-lavender/30 bg-transparent px-8 py-4 text-base font-medium text-lavender shadow-sm backdrop-blur-sm transition-all hover:bg-white/5 hover:text-white"
              >
                Services Dekhein
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pick a Card Interactive Section */}
      <section className="relative py-24 bg-[#0A0012]/80 backdrop-blur-md border-y border-primary/20 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">Aaj ke liye ek card chunein</h2>
            <p className="text-lavender-dark max-w-2xl mx-auto">Apni urja ko kendrit karein, apna irada batayein, aur apni vartamaan adhyatmik yatra ki ek jhalak paane ke liye ek card chunein.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {mockCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
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
                        Poori Reading Unlock Karein
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
              {
                title: "Gehra Antargyan",
                desc: "Pratyek reading gehre antargyan aur adhyatmik channels ke saath sakht sambandh dwara nirdeshit hoti hai.",
                icon: Moon,
              },
              {
                title: "Crystal Spashtata",
                desc: "Apne jeevan ki sabse jatil chunautiyon ko navigate karne ke liye actionable aur thos antardrishti prapt karein.",
                icon: Star,
              },
              {
                title: "Healing Urja",
                desc: "Samagra upchar aur sakaratmak urjawan badlavon par kendrit ek surakshit, poshan karne wale sthan ka anubhav karein.",
                icon: Sun,
              },
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
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">Adhyatmik Yatrayein</h2>
            <p className="text-lavender-dark max-w-2xl mx-auto">Un logon se sunein jinhone hamare sahaj paramarsh ke madhyam se apna margdarshak prakash paya hai.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                text: "Reading avishvasaniya roop se satik thi aur mujhe bilkul wahi spashtata di jiski mujhe apne career sankraman ke liye aavashyakta thi. Vastav mein jeevan badalne wala anubhav.",
                author: "Sarah J.",
                role: "Creative Director"
              },
              {
                text: "Mujhe turant judav mehsoos hua. Pradaan ki gayi antardrishti bahut gehri thi aur itne garmjoshi aur karuna ke saath di gayi thi.",
                author: "Michael T.",
                role: "Entrepreneur"
              },
              {
                text: "Mere paramarsh ne un patterns ke prati meri aankhein khol din jinka mujhe ehsaas nahi tha ki ve mujhe roke hue the. Ek sundar aur gehrai se theek karne wala satra.",
                author: "Elena R.",
                role: "Wellness Coach"
              }
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Aksar Pooche Jane Wale Prashn (FAQ)</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "WhatsApp consultation kaise kaam karta hai?",
                a: "Ek baar jab aap 'Consultation Book Karein' par click karte hain, toh aapko WhatsApp par redirect kiya jayega. Hum aapki aavashyaktaon par charcha karenge, ek samay nirdharit karenge, aur aapke chune hue package ke aadhar par text, voice notes ya live call ke madhyam se reading aayojit karenge."
              },
              {
                q: "Kya mujhe reading se pehle kuch taiyaar karne ki aavashyakta hai?",
                a: "Bas ek khula dimag aur ek shaant dil. Jeevan ke 1-3 vishisht prashnon ya kshetron par dhyan kendrit karna madadgaar hota hai, lekin samanya reading bhi poori tarah se theek hain."
              },
              {
                q: "Ek samanya satra kitne samay tak chalta hai?",
                a: "Reading ki gehrai aur aapke dwara chune gaye vishisht paramarsh package ke aadhar par satra aam taur par 30 se 60 minute tak chalte hain."
              }
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
