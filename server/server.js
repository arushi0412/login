const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors(
    origin: "https://PixelPops.netlify.app"
));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secretKey123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true only with HTTPS
}));

// Hardcoded user credentials (you can switch to DB later)
const USERS = [
    { email: 'hello@digital.com', password: '123456' }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
        req.session.user = user;
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Protected route example
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.json({ message: `Welcome ${req.session.user.email}!` });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
