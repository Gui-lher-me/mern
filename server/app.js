// imports
const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
// **************************************************

// vars
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
// **************************************************

// init
const app = express();
// **************************************************

// middlewares
app.use(bodyParser.json());

// routes
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
// handling unsupported routes
app.use((req, res, next) => {
    throw new HttpError('Could not find this route.', 404);
});

// handling errors
app.use((error, req, res, next) => {
    if (res.headerSent) return next(error);

    res.status(error.code || 500).json({
        msg: error.message || 'An unknown error occurred!',
    });
});
// **************************************************

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
