const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const { getCoordsForAddress } = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const { pid: placeId } = req.params;

    let place;

    try {
        place = await Place.findById(placeId); // does not return a promise
    } catch (e) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
        );
        return next(error);
    }

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided id.', 404)
        ); // better approach
    }

    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const { uid: userId } = req.params;

    let places;

    try {
        places = await Place.find({ creator: userId }); // does not return a promise
    } catch (e) {
        const error = new HttpError(
            'Fetching places failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!places || places.length === 0) {
        return next(
            new HttpError(
                'Could not find any places for the provided user id.',
                404
            )
        );
    }

    res.json({
        places: places.map((place) => place.toObject({ getters: true })),
    });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description, address, creator } = req.body;

    let coordinates;

    try {
        coordinates = getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://media.istockphoto.com/photos/vaccine-rocket-launch-picture-id1312586607',
        creator,
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch (e) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    if (!user)
        return next(new HttpError('Could not find user for provided id.', 404));

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (e) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { pid: placeId } = req.params;
    const { title, description } = req.body;

    let place;

    try {
        place = await Place.findById(placeId);
    } catch (error) {
        return next(
            new HttpError('Something went wrong, could not update place.', 500)
        );
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (error) {
        return next(
            new HttpError('Something went wrong, could not update place.', 500)
        );
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
    const { pid: placeId } = req.params;

    let place;

    try {
        place = await (await Place.findById(placeId)).populate('creator');
    } catch (error) {
        return next(
            new HttpError('Something went wrong, could not delete place.', 500)
        );
    }

    if (!place) {
        return next(new HttpError('Could not find place for this id.', 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        return next(
            new HttpError('Something went wrong, could not delete place.', 500)
        );
    }

    res.status(200).json({ message: 'Deleted place.' });
};

module.exports = {
    updatePlace,
    deletePlace,
    getPlaceById,
    getPlacesByUserId,
    createPlace,
};
