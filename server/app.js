// imports
const express = require('express');
const bodyParser = require('body-parser');

// routes
const placesRoutes = require('./routes/places-routes');

// vars
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

// init
const app = express();

// middlewares
// routes
app.use('/api/places', placesRoutes);
// handling errors
app.use((error, req, res, next) => {
    if (res.headerSent) return next(error);

    res.status(error.code || 500).json({
        msg: error.message || 'An unknown error occurred!',
    });
});

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
