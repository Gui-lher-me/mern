const { v4 } = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    { id: 'u1', name: 'Gui', email: 'test@test.com', password: 'testers' },
];

const getUsers = (req, res, next) => {
    res.status(200).json(DUMMY_USERS);
};

const signup = (req, res, next) => {
    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find((user) => user.email === email);

    if (hasUser)
        throw new HttpError(
            'Could not create user, email already exists.',
            422
        );

    const createdUser = {
        id: v4(),
        name,
        email,
        password,
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json(createdUser);
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError(
            'Could not identify user, credentials seem to be wrong.',
            401
        );
    }

    res.status(200).json({ msg: 'Logged in!' });
};

module.exports = { getUsers, signup, login };
