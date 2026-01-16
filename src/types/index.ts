// Core Types
export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    status?: 'completed' | 'ongoing' | 'planned';
    github?: string;
    demo?: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'workshop' | 'seminar' | 'hackathon' | 'meetup';
    isPast: boolean;
    location?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    department?: string;
    bio?: string;
    image?: string;
    expertise?: string[];
    social?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export interface LearningTopic {
    id: string;
    title: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    icon?: string;
}

// Form Data Types
export interface JoinClubFormData {
    name: string;
    email: string;
    department: string;
    year: string;
    skills: string;
    motivation: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Validation Result
export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

// Future Auth Types (Placeholder for scalability)
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'member' | 'guest';
    joinedAt: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
