// Import required packages
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from your frontend
app.use(cors());
// Parse incoming JSON requests. This is crucial for handling POST/PUT requests.
app.use(express.json());


// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit the process with a failure code if we can't connect to the DB
        process.exit(1);
    }
};

// Execute the database connection function
connectDB();


// --- API Routes ---
// This section tells our app to use the route files we created.
// Any request starting with /api/auth will be handled by the auth.js router.
app.use('/api/auth', require('./routes/auth'));
// Any request starting with /api/resumes will be handled by the resumes.js router.
app.use('/api/resumes', require('./routes/resumes'));


// Define a basic root route for testing if the server is alive
app.get('/', (req, res) => {
    res.send('API is running...');
});


// --- Server Start ---
// Get the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;
// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

