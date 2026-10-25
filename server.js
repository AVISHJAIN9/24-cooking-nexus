const express = require('express');
const app = express();
app.use(express.json());
const { detect } = require('./controllers/safetyController');
app.post('/api/vision', detect);
app.listen(5000, () => console.log('AI Vision Online'));