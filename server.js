require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});