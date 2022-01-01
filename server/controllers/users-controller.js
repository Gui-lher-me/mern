const { v4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, '-password');
    } catch (e) {
        return next(
            new HttpError('Fetching users failed, please try again later.', 500)
        );
    }

    res.status(200).json({
        users: users.map((user) => user.toObject({ getters: true })),
    });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (e) {
        return next(
            new HttpError('Signing up failed, please try again later.', 500)
        );
    }

    if (existingUser)
        return next(
            new HttpError('User exists already, please login instead.', 422)
        );

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://images.pexels.com/photos/9279230/pexels-photo-9279230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        places: [],
    });

    try {
        await createdUser.save();
    } catch (e) {
        return next(
            new HttpError('Signing up failed, please try again later.', 500)
        );
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (e) {
        return next(
            new HttpError('Logging in failed, please try again later.', 500)
        );
    }

    if (!existingUser || existingUser.password !== password)
        return next(
            new HttpError('Invalid credentials, could not log you in.', 401)
        );

    // const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

    // if (!identifiedUser || identifiedUser.password !== password) {
    //     throw new HttpError(
    //         'Could not identify user, credentials seem to be wrong.',
    //         401
    //     );
    // }

    res.status(200).json({ msg: 'Logged in!' });
};

module.exports = { getUsers, signup, login };
