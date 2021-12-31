const { v4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const { getCoordsForAddress } = require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: 'u2',
    },
];

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

    try {
        await createdPlace.save(); // returns a promise
    } catch (e) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json(createdPlace);
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid inputs passed, please check your data.',
            422
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

const deletePlace = (req, res, next) => {
    const { pid: placeId } = req.params;

    const hasPlace = DUMMY_PLACES.find((place) => place.id === placeId);

    if (!hasPlace) {
        throw new HttpError('Could not find a place for that id.', 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter((place) => placeId !== place.id);

    res.status(200).json(DUMMY_PLACES);
};

module.exports = {
    updatePlace,
    deletePlace,
    getPlaceById,
    getPlacesByUserId,
    createPlace,
};
