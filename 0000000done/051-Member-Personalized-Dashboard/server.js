const express = require('express');
const dotenv = require('dotenv').config();
const memberRoutes = require('./routes/memberRoutes');
const app = express();
app.use(express.json());
app.use('/api/members', memberRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Dashboard Server running on port ' + PORT));
