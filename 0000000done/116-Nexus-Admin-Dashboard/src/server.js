const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- 🛠️ GLOBAL MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 🏗️ PROJECT NEXUS: FEATURE IMPORT (BLOCK 07 & 03) ---
// Importing the index files we just completed
const healthMonitor = require('./07-Admin-Infrastructure/099-System-Health-Monitor');
const complianceGDPR = require('./07-Admin-Infrastructure/119-Nexus-Compliance-GDPR');
const adminDashboard = require('./07-Admin-Infrastructure/116-Nexus-Admin-Dashboard');
const memberFeedback = require('./03-User-Experience/057-Member-Feedback-System');

// --- 🛣️ Project Nexus: ROUTE REGISTRATION ---
// We mount the "Easy Numbers" we've finished so far
app.use('/api/v1/health', healthMonitor.routes);       // Feature 099
app.use('/api/v1/compliance', complianceGDPR.routes);   // Feature 119
app.use('/api/v1/admin', adminDashboard.routes);       // Feature 116
app.use('/api/v1/feedback', memberFeedback.routes);     // Feature 057

// --- 🌐 DATABASE & SERVER ACTIVATION ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Nexus Database Connected');
        app.listen(PORT, () => {
            console.log(`🚀 Nexus Core Online: Port ${PORT}`);
            console.log(`🔗 Health Check: http://localhost:${PORT}/api/v1/health/heartbeat`);
        });
    })
    .catch(err => {
        console.error('❌ Nexus Boot Error:', err.message);
    });