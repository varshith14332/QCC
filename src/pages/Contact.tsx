import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Card } from '../components/ui/Card';
import { Input, TextArea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import type { ContactFormData } from '../types';
import { validateContactForm, sanitizeContactForm } from '../utils/validation';
import { formRateLimiter, generateFormToken } from '../utils/security';

export const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'qccvjit@gmail.com',
            link: 'mailto:qccvjit@gmail.com',
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+91 9032504904',
            link: 'tel:+919032504904',
        },
        {
            icon: MapPin,
            title: 'Location',
            value: 'VJIT University Campus',
            link: null,
        },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Security: Rate limiting
        if (!formRateLimiter.canAttempt('contact-form')) {
            setErrors({
                submit: 'Too many submission attempts. Please wait a minute and try again.',
            });
            return;
        }

        // Validate
        const validation = validateContactForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            // Security: Sanitize
            const sanitizedData = sanitizeContactForm(formData);

            // Send to Backend API
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sanitizedData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Message failed to send");
            }

            console.log('Contact form submitted successfully');

            setIsSubmitted(true);
            formRateLimiter.reset('contact-form');
        } catch (error) {
            console.error("Submission error:", error);
            setErrors({
                submit: 'An error occurred while connecting to the backend. Please ensure the server is running.',
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
                                Message Sent!
                            </h2>
                            <p className="text-white/70 text-lg mb-6">
                                Thank you for reaching out! We typically respond within 24-48 hours.
                            </p>
                            <Button onClick={() => setIsSubmitted(false)}>
                                Send Another Message
                            </Button>
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
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Have questions? Want to collaborate? We'd love to hear from you!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 font-display">
                            Contact Information
                        </h2>

                        {contactInfo.map((info) => (
                            <Card key={info.title} className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex-shrink-0">
                                    <info.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white/60 mb-1">{info.title}</h3>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            className="text-white hover:text-neon-blue transition-colors"
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                        <p className="text-white">{info.value}</p>
                                    )}
                                </div>
                            </Card>
                        ))}

                        <Card>
                            <h3 className="text-lg font-bold text-white mb-3 font-display">Office Hours</h3>
                            <div className="space-y-2 text-white/70">
                                <p className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span className="text-white">2:00 PM - 6:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span className="text-white">10:00 AM - 2:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span className="text-white/50">Closed</span>
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <Card gradient>
                            <h2 className="text-2xl font-bold text-white mb-6 font-display">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        error={errors.name}
                                    />

                                    <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        error={errors.email}
                                    />
                                </div>

                                <Input
                                    label="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help you?"
                                    error={errors.subject}
                                />

                                <TextArea
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us more about your inquiry..."
                                    rows={6}
                                    error={errors.message}
                                />

                                {errors.submit && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                                        <p className="text-red-400 text-sm">{errors.submit}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Send size={20} />
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </span>
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
