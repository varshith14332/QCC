const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Logging

// Simple in-memory storage (persisted to JSON file for "Project Owner" demo)
const DB_FILE = path.join(__dirname, 'submissions.json');

// Helper to read DB
const readDb = () => {
    if (!fs.existsSync(DB_FILE)) return { contacts: [], applications: [] };
    return JSON.parse(fs.readFileSync(DB_FILE));
};

// Helper to write DB
const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- API Routes ---

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date(), service: 'QCC Backend' });
});

// 2. Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = {
        id: Date.now().toString(),
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    };

    const db = readDb();
    db.contacts.push(newContact);
    writeDb(db);

    console.log(`[Contact] New message from ${name}`);

    // Simulate email dispatch delay
    setTimeout(() => {
        res.status(201).json({ message: 'Message sent successfully!', id: newContact.id });
    }, 500);
});

// 3. Join Club Application
app.post('/api/join', (req, res) => {
    const { fullName, email, studentId, department, year, interest } = req.body;

    // Validation
    if (!fullName || !email || !studentId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newApplication = {
        id: Date.now().toString(),
        fullName,
        email,
        studentId,
        department,
        year,
        interest,
        status: 'pending',
        date: new Date().toISOString()
    };

    const db = readDb();
    db.applications.push(newApplication);
    writeDb(db);

    console.log(`[Join] New application from ${fullName}`);

    res.status(201).json({ message: 'Application received!', id: newApplication.id });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 QCC Backend running on http://localhost:${PORT}`);
    console.log(`   - Health: http://localhost:${PORT}/api/health`);
    console.log(`   - Data stored in: ${DB_FILE}\n`);
});
