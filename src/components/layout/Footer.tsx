import Link from "next/link";
import { Twitter, Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
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
                            AstroHemani द्वारा वैदिक ज्योतिष, अंक ज्योतिष, टैरो रीडिंग, हस्त रेखा एवं फेस रीडिंग के माध्यम से व्यक्तिगत जीवन मार्गदर्शन प्रदान किया जाता है।<br /><br />
                            हमारा उद्देश्य व्यक्ति को स्वयं को समझने, सही निर्णय लेने और जीवन में संतुलन प्राप्त करने में सहायता करना है।<br /><br />
                            <span className="text-lavender italic">Guidance Based on Traditional Astrology & Numerology Principles.</span>
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
                            <span>⚖️</span> Disclaimer
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-lavender-dark">
                            <li>यह सेवाएँ आध्यात्मिक एवं वैदिक मार्गदर्शन पर आधारित हैं।</li>
                            <li>यह किसी प्रकार की मेडिकल, कानूनी या वित्तीय सलाह का विकल्प नहीं हैं।</li>
                            <li>Consultation का उद्देश्य व्यक्ति को जीवन की दिशा समझने और सकारात्मक निर्णय लेने में सहायता प्रदान करना है।</li>
                            <li>परिणाम व्यक्ति के कर्म, परिस्थितियों और निर्णयों पर भी निर्भर करते हैं।</li>
                        </ul>
                    </div>

                    {/* Appointment Policy */}
                    <div className="lg:col-span-3">
                        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                            <span>📞</span> Appointment Policy
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-lavender-dark">
                            <li>Consultation केवल Appointment द्वारा किया जाता है।</li>
                            <li>Booking Confirm होने के बाद ही समय निर्धारित किया जाता है।</li>
                            <li>Fees Advance में Booking के समय ली जाती है।</li>
                        </ul>
                    </div>

                    {/* Privacy Note & Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                            <span>🔒</span> Privacy Note
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-lavender-dark">
                            <li>आपकी दी गई सभी जानकारी पूर्णतः गोपनीय रखी जाती है।</li>
                            <li>किसी भी प्रकार का Personal Data किसी Third Party के साथ साझा नहीं किया जाता।</li>
                        </ul>

                        <h3 className="font-serif text-lg font-semibold text-foreground mt-8">Quick Links</h3>
                        <ul className="mt-4 space-y-2 text-sm text-lavender-dark">
                            <li>
                                <Link href="/about" className="transition-colors hover:text-gold">Mere Baare Mein</Link>
                            </li>
                            <li>
                                <Link href="/services" className="transition-colors hover:text-gold">Consultation Services</Link>
                            </li>
                            <li>
                                <Link href="/free-tarot" className="transition-colors hover:text-gold">Free Tarot Reading</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="transition-colors hover:text-gold">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-primary/20 pt-8 text-center text-sm text-lavender-dark flex flex-col items-center justify-center gap-2">
                    <p>© AstroHemani. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
