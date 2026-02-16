require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Running...');
});

app.get('/test-user', async (req, res) => {
    const user = await User.create({
        name: "Ali",
        email: "ali@test.com",
        password: "123456"
    });

    res.json(user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});