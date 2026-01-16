import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Github, Linkedin, Twitter, Mail, Award } from 'lucide-react';
import type { TeamMember } from '../../types';
import { isSafeExternalUrl } from '../../utils/security';

interface TeamCardProps {
    member: TeamMember;
}

export const TeamCard = ({ member }: TeamCardProps) => {
    const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        email: Mail,
    };

    const getSocialLink = (platform: keyof typeof socialIcons, url: string) => {
        // Security: Validate external URLs
        if (platform === 'email') {
            return `mailto:${url}`;
        }
        return isSafeExternalUrl(url) ? url : '#';
    };

    const getRoleBadgeColor = (role: string) => {
        const lowerRole = role.toLowerCase();
        if (lowerRole.includes('president') || lowerRole.includes('lead') || lowerRole.includes('head')) {
            return 'bg-gradient-to-r from-neon-blue to-neon-purple text-white';
        }
        if (lowerRole.includes('vice') || lowerRole.includes('co-')) {
            return 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30';
        }
        if (lowerRole.includes('tech') || lowerRole.includes('dev')) {
            return 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30';
        }
        return 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30';
    };

    return (
        <motion.div
            className="h-full"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="h-full flex flex-col items-center text-center group relative overflow-hidden">
                {/* Avatar with Gradient Border */}
                <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-[3px] animate-pulse-glow">
                        <div className="w-full h-full rounded-full bg-quantum-dark" />
                    </div>
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-4xl font-bold text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-neon-blue transition-colors">
                    {member.name}
                </h3>

                {/* Role Badge */}
                <div className={`px-4 py-1.5 rounded-full text-sm font-semibold mb-2 ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                </div>

                {/* Department */}
                {member.department && (
                    <div className="flex items-center gap-1.5 text-sm text-white/60 mb-4">
                        <Award size={14} />
                        <span>{member.department}</span>
                    </div>
                )}

                {/* Bio */}
                {member.bio && (
                    <p className="text-white/70 text-sm mb-4 flex-grow leading-relaxed px-2">
                        {member.bio}
                    </p>
                )}

                {/* Expertise Tags (if available in data) */}
                {member.expertise && member.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.expertise.slice(0, 3).map((skill) => (
                            <span
                                key={skill}
                                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* Social Links */}
                {member.social && Object.keys(member.social).length > 0 && (
                    <div className="flex gap-2 mt-auto pt-4 border-t border-white/10 w-full justify-center">
                        {Object.entries(member.social).map(([platform, url]) => {
                            const Icon = socialIcons[platform as keyof typeof socialIcons];
                            if (!Icon || !url) return null;

                            return (
                                <motion.a
                                    key={platform}
                                    href={getSocialLink(platform as keyof typeof socialIcons, url)}
                                    target={platform !== 'email' ? '_blank' : undefined}
                                    rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
                                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-blue/50 transition-all duration-300"
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={platform}
                                >
                                    <Icon size={16} className="text-white/80 group-hover:text-neon-blue transition-colors" />
                                </motion.a>
                            );
                        })}
                    </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/5 group-hover:to-neon-purple/5 transition-all duration-300 rounded-xl pointer-events-none" />
            </Card>
        </motion.div>
    );
};
