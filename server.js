const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const { detect } = require('./controllers/safetyController');
app.post('/api/vision', detect);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`AI Vision Online on port ${port}`));