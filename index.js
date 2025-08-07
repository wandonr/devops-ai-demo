const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = []; // In-memory user store

const SECRET = process.env.SECRET_KEY; // Change for production

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashed });
    res.json({ message: 'Signup successful' });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));