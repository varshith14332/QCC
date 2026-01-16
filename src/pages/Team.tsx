import { motion } from 'framer-motion';
import { teamMembers } from '../data/team';
import { TeamCard } from '../components/shared/TeamCard';

export const Team = () => {
    // Separate team members by role
    const facultyAdvisor = teamMembers.filter(m => m.role.includes('Faculty'));
    const leadership = teamMembers.filter(m =>
        m.role.includes('President') || m.role.includes('Vice President')
    );
    const leads = teamMembers.filter(m =>
        m.role.includes('Lead') && !m.role.includes('President')
    );

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
                        Meet Our <span className="gradient-text">Team</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Passionate individuals driving quantum computing education and innovation
                    </p>
                </motion.div>

                {/* Faculty Advisor */}
                {facultyAdvisor.length > 0 && (
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center font-display">
                            Faculty Advisor
                        </h2>
                        <div className="max-w-md mx-auto">
                            {facultyAdvisor.map((member) => (
                                <TeamCard key={member.id} member={member} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Leadership Team */}
                {leadership.length > 0 && (
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center font-display">
                            Leadership Team
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {leadership.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <TeamCard member={member} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Department Leads */}
                {leads.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center font-display">
                            Department Leads
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {leads.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <TeamCard member={member} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Join Team CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="glass-card max-w-2xl mx-auto p-8 gradient-border">
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">
                            Want to Lead a Team?
                        </h3>
                        <p className="text-white/70 mb-6">
                            We're always looking for passionate members to take on leadership roles and drive
                            initiatives in education, research, and community outreach.
                        </p>
                        <a
                            href="/join"
                            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 hover:scale-105"
                        >
                            Join the Club
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
