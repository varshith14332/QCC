
import { motion } from 'framer-motion';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Card } from '../components/ui/Card';
import { Input, TextArea, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { CheckCircle, Sparkles } from 'lucide-react';
import type { JoinClubFormData } from '../types';
import { validateJoinClubForm, sanitizeJoinClubForm } from '../utils/validation';
import { formRateLimiter, generateFormToken } from '../utils/security';

export const JoinClub = () => {
    const [formData, setFormData] = useState<JoinClubFormData>({
        name: '',
        email: '',
        department: '',
        year: '',
        skills: '',
        motivation: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const yearOptions = [
        { value: '1', label: '1st Year' },
        { value: '2', label: '2nd Year' },
        { value: '3', label: '3rd Year' },
        { value: '4', label: '4th Year' },
        { value: 'graduate', label: 'Graduate Student' },
        { value: 'other', label: 'Other' },
    ];

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Security: Rate limiting check
        if (!formRateLimiter.canAttempt('join-club-form')) {
            setErrors({
                submit: 'Too many submission attempts. Please wait a minute and try again.',
            });
            return;
        }

        // Validate form
        const validation = validateJoinClubForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            // Security: Sanitize form data
            const sanitizedData = sanitizeJoinClubForm(formData);

            // Security: Generate CSRF-like token
            const token = generateFormToken();

            // TODO: Send to backend API
            // For now, simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Form submitted:', {
                ...sanitizedData,
                _token: token,
                timestamp: new Date().toISOString(),
            });

            // Success
            setIsSubmitted(true);
            formRateLimiter.reset('join-club-form');
        } catch (error) {
            setErrors({
                submit: 'An error occurred while submitting the form. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="section-padding">
                <div className="container-custom">
                    <motion.div
                        className="max-w-2xl mx-auto text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card gradient>
                            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple mb-6">
                                <CheckCircle className="w-16 h-16 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 font-display">
                                Application Submitted!
                            </h2>
                            <p className="text-white/70 text-lg mb-6">
                                Thank you for your interest in joining the Quantum Computing Club! We've received
                                your application and will review it shortly.
                            </p>
                            <p className="text-white/60">
                                You should receive a confirmation email at <strong className="text-neon-blue">{formData.email}</strong> within
                                24 hours. Follow us on social media to stay updated!
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                        <Sparkles size={16} className="text-neon-blue" />
                        <span className="text-sm text-white/90 font-medium">Join Our Community</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                        Join the <span className="gradient-text">Quantum Club</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Start your quantum journey today. All students are welcome, regardless of experience level!
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Card gradient>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                                error={errors.name}
                            />

                            {/* Email */}
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@university.edu"
                                error={errors.email}
                                helperText="We'll send important updates to this email"
                            />

                            {/* Department and Year */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Computer Science"
                                    error={errors.department}
                                />

                                <Select
                                    label="Year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    options={yearOptions}
                                    error={errors.year}
                                />
                            </div>

                            {/* Skills */}
                            <TextArea
                                label="Skills & Experience (Optional)"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="e.g., Python, Linear Algebra, Physics background..."
                                rows={3}
                                error={errors.skills}
                                helperText="This helps us match you with relevant projects"
                            />

                            {/* Motivation */}
                            <TextArea
                                label="Why do you want to join?"
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleChange}
                                required
                                placeholder="Tell us what excites you about quantum computing..."
                                rows={5}
                                error={errors.motivation}
                            />

                            {/* Submit Error */}
                            {errors.submit && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                                    <p className="text-red-400 text-sm">{errors.submit}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </Button>

                            {/* Privacy Notice */}
                            <p className="text-white/50 text-xs text-center">
                                By submitting this form, you agree to our privacy policy. We'll only use your
                                information to contact you about club activities.
                            </p>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
