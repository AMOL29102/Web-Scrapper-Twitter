// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const trendsRoute = require('./routes/trends');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/', trendsRoute);

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const path = require('path');
const trendsRoute = require('./routes/trends'); // Update path as necessary
const PORT = 3000;

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use absolute path for the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, JS, images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define application routes
app.use('/', trendsRoute);

// Export the app for Vercel
module.exports = app;


// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
