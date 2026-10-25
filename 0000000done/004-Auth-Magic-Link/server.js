const express = require('express');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
// Add this to the bottom of your server.js (before the app.listen)
const { errorHandler } = require('./middleware/errorMiddleware');

app.use(errorHandler);
app.listen(PORT, () => console.log(`Auth Server on port ${PORT}`));
