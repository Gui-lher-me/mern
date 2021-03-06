const express = require('express');
const { check } = require('express-validator');

const { getUsers, login, signup } = require('../controllers/users-controller');

const router = express.Router();

router.get('/', getUsers);

router.post(
    '/signup',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    signup
);

router.post('/login', login);

module.exports = router;

// 404 data not found
// 200 success
// 304 data already in the cache
// 201 created success
// 500 server error
// 401 auth failed
// 422 invalid user
