import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { Event } from '../../types';
import { useState, useEffect } from 'react';

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        if (event.isPast) return;

        const calculateTimeLeft = () => {
            const eventDate = new Date(event.date).getTime();
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference <= 0) {
                setTimeLeft('Event started!');
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h`);
            } else if (hours > 0) {
                setTimeLeft(`${hours}h ${minutes}m`);
            } else {
                setTimeLeft(`${minutes}m`);
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [event.date, event.isPast]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEventTypeColor = (type: Event['type']) => {
        const colors = {
            workshop: 'text-neon-blue border-neon-blue/30 bg-neon-blue/20',
            seminar: 'text-neon-purple border-neon-purple/30 bg-neon-purple/20',
            hackathon: 'text-neon-pink border-neon-pink/30 bg-neon-pink/20',
            meetup: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/20',
        };
        return colors[type];
    };

    const getStatusBadge = () => {
        if (event.isPast) {
            return (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-white/60 border border-white/20">
                    Past
                </span>
            );
        }

        const eventDate = new Date(event.date).getTime();
        const now = new Date().getTime();
        const isToday = Math.abs(eventDate - now) < 24 * 60 * 60 * 1000;

        if (isToday) {
            return (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
                    Today
                </span>
            );
        }

        return (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                Upcoming
            </span>
        );
    };

    return (
        <motion.div
            className="h-full"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className={`h-full flex flex-col relative overflow-hidden group ${event.isPast ? 'opacity-75' : ''}`}>
                {/* Status Badge - Top Right */}
                <div className="absolute top-4 right-4">
                    {getStatusBadge()}
                </div>

                {/* Date Display */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <Calendar size={16} className="text-neon-blue" />
                            <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <Clock size={16} className="text-neon-purple" />
                            <span>{formatTime(event.date)}</span>
                        </div>
                    </div>

                    {/* Countdown Timer for Upcoming Events */}
                    {!event.isPast && timeLeft && (
                        <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 mb-3">
                            <span className="text-xs font-semibold text-neon-blue">
                                ⏱️ {timeLeft}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 font-display pr-20 group-hover:text-neon-blue transition-colors">
                        {event.title}
                    </h3>

                    {/* Event Type Badge */}
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border capitalize ${getEventTypeColor(event.type)}`}>
                        {event.type}
                    </span>
                </div>

                {/* Description */}
                <p className="text-white/70 mb-4 flex-grow leading-relaxed">
                    {event.description}
                </p>

                {/* Location */}
                {event.location && (
                    <div className="flex items-center gap-2 text-sm text-white/60 mt-auto pt-4 border-t border-white/10">
                        <MapPin size={16} className="text-neon-cyan flex-shrink-0" />
                        <span>{event.location}</span>
                    </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/5 group-hover:to-neon-purple/5 transition-all duration-300 rounded-xl pointer-events-none" />
            </Card>
        </motion.div>
    );
};
