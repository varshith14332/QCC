# Quantum Computing Club Website

A modern, professional, and scalable website for a Quantum Computing Club, built with React, TypeScript, Tailwind CSS, and designed for future expansion into a full Quantum Computing Workspace and IDE.

![Quantum Computing Club](https://img.shields.io/badge/Quantum-Computing-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- **🎨 Modern Dark Theme**: Futuristic quantum-inspired design with neon accents and glassmorphism
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🔒 Security First**: XSS prevention, input sanitization, rate limiting, and CSRF protection
- **🎭 Smooth Animations**: Framer Motion animations and scroll effects
- **♿ Accessible**: Semantic HTML and ARIA labels
- **🚀 Scalable Architecture**: Ready for authentication, dashboards, and IDE integration

## 📚 Pages

1. **Home** - Hero section with club overview
2. **About** - Mission, vision, and quantum computing introduction
3. **Learn** - Learning roadmap (Beginner → Intermediate → Advanced)
4. **Projects** - Showcase of quantum computing projects
5. **Events** - Workshops, seminars, hackathons, and meetups
6. **Team** - Meet the core team members
7. **Join Club** - Registration form with validation
8. **Contact** - Contact form and information

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Google Fonts (Inter, Orbitron)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quantum-club-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
quantum-club-website/
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Layout
│   │   ├── ui/              # Reusable UI components
│   │   ├── home/            # Home page sections
│   │   └── shared/          # Shared components (cards)
│   ├── pages/               # Page components
│   ├── routes/              # React Router configuration
│   ├── data/                # Static data (projects, events, team)
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   │   ├── security.ts      # Security utilities
│   │   └── validation.ts    # Form validation
│   ├── hooks/               # Custom React hooks
│   ├── assets/              # Static assets
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Public static files
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── SECURITY.md              # Security documentation
└── README.md                # This file
```

## 🔒 Security Features

This project implements comprehensive security measures:

- **XSS Prevention**: Input sanitization and HTML escaping
- **CSRF Protection**: Token generation for forms
- **Rate Limiting**: Client-side form submission throttling
- **Input Validation**: Comprehensive form validation with error handling
- **URL Validation**: Whitelist for external links
- **SQL Injection Prevention**: Query sanitization (for future backend)
- **Secure Storage**: Encrypted localStorage wrapper (ready for production)

See [SECURITY.md](./SECURITY.md) for detailed security documentation.

## 🎨 Design System

### Colors

- **Dark Background**: `#0b0f1a` (quantum-dark)
- **Neon Accents**: 
  - Blue: `#00d4ff`
  - Purple: `#a855f7`
  - Cyan: `#06b6d4`
  - Pink: `#ec4899`

### Typography

- **Display Font**: Orbitron (headings, logos)
- **Body Font**: Inter (content)

### Effects

- Glassmorphism cards with backdrop blur
- Neon glow on hover
- Gradient animations
- Smooth scroll animations

## 🔮 Future Expansion

The architecture is designed to accommodate:

### Authentication System
```typescript
// Routes ready for:
- /login
- /signup  
- /dashboard
```

### Quantum Workspace
```typescript
// Planned features:
- Code editor with syntax highlighting
- Quantum circuit visualizer
- Real-time collaboration
- Quantum hardware simulators
```

### Quantum IDE
```typescript
// Future capabilities:
- Full-featured quantum development environment
- Integration with IBM Qiskit
- Circuit debugging tools
- Quantum algorithm library
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Other Platforms

The project can be deployed to any static hosting service that supports SPAs.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Customization Guide

### Update Club Information

1. **Team Members**: Edit `src/data/team.ts`
2. **Projects**: Edit `src/data/projects.ts`
3. **Events**: Edit `src/data/events.ts`
4. **Learning Topics**: Edit `src/data/learningTopics.ts`

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'quantum-dark': '#your-color',
  'neon-blue': '#your-color',
  // ... other colors
}
```

### Add New Pages

1. Create page in `src/pages/`
2. Add route in `src/routes/AppRouter.tsx`
3. Add link in `src/components/layout/Navbar.tsx`

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- IBM Quantum for quantum computing resources
- Qiskit community for inspiration
- React and Tailwind CSS teams for amazing tools

## 📧 Contact

- **Email**: contact@quantumclub.edu
- **Website**: [quantumclub.edu](https://quantumclub.edu)
- **GitHub**: [@quantum-club](https://github.com/quantum-club)

---

**Built with ⚛️ by the Quantum Computing Club**
