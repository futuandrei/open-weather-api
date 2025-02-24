require('dotenv').config();
const express = require('express'); // Import the Express library
const app = express(); // Initialize an Express application

// Serve static files from the 'public' directory
app.use(express.static('public'));

const PORT = 3000; // Port to run your local server

// API to send the OpenWeather API key to the frontend
app.get('/api/config', (req, res) => {
    res.json({ apiKey: process.env.OPENWEATHER_API_KEY });
});


// Middleware
app.use(express.json()); // Automatically parse JSON request bodies

// API route (dynamic data)
app.get('/api/data', (req, res) => {
    const name = req.query.name || 'Guest';
    res.json({ message: `Hello, ${name}!` });
});

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});