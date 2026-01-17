import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, MapPin, Rocket, IndianRupee } from 'lucide-react';

export const Events = () => {
    return (
        <div className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                        Upcoming <span className="gradient-text">Events</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Join us for workshops, hackathons, and seminars.
                    </p>
                </motion.div>

                {/* Featured Event */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Card className="relative overflow-hidden group" gradient>
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px] -z-10 group-hover:bg-neon-blue/20 transition-all duration-500" />

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-sm font-medium mb-4 border border-neon-purple/30">
                                    <Rocket size={14} />
                                    <span>Flagship Event</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                                    Club Launch & Workshop
                                </h2>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    Be part of history as we officially launch the Quantum Computing Club!
                                    This event kicks off with a 3-day immersive workshop designed to take you from
                                    zero to hero in quantum concepts.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-white/80">
                                        <Calendar className="text-neon-cyan" size={20} />
                                        <span>Date to be announced soon</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80">
                                        <Clock className="text-neon-cyan" size={20} />
                                        <span>3 Days Duration</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80">
                                        <IndianRupee className="text-neon-cyan" size={20} />
                                        <span>Registration Fee: ₹50</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80">
                                        <MapPin className="text-neon-cyan" size={20} />
                                        <span>College Auditorium / Labs</span>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full md:w-auto"
                                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeAd5bWRfA7DhTNm4JFyCixpEjRH-BYC1YJoH6uBG1sabogaw/viewform?usp=publish-editor', '_blank')}
                                >
                                    Register
                                </Button>
                            </div>

                            <div className="relative">
                                {/* Placeholder for Event Image/Graphic */}
                                <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-purple/20 opacity-50" />
                                    <div className="text-center p-6 relative z-10">
                                        <Rocket className="w-24 h-24 text-white/20 mx-auto mb-4 group-hover:text-neon-purple/80 transition-colors duration-500 transform group-hover:-translate-y-2" />
                                        <h3 className="text-xl font-bold text-white font-display">
                                            Launch + Workshop
                                        </h3>
                                        <p className="text-white/50 text-sm mt-2">
                                            Limited Seats Available
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
