const { v4 } = require('uuid');

const HttpError = require('../models/http-error');

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

const getPlaceById = (req, res, next) => {
    const { pid: placeId } = req.params;
    const place = DUMMY_PLACES.find((p) => p.id === placeId);

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided id.', 404)
        ); // better approach
    }

    res.json(place);
};

const getPlacesByUserId = (req, res, next) => {
    const { uid: userId } = req.params;
    const places = DUMMY_PLACES.filter((p) => p.creator === userId);

    if (!places || places.length === 0) {
        throw new HttpError(
            'Could not find any places for the provided user id.',
            404
        );
    }

    res.json(places);
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: v4(),
        title,
        description,
        address,
        location: coordinates,
        creator,
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json(createdPlace);
};

const updatePlace = (req, res, next) => {
    const { pid: placeId } = req.params;
    const { title, description } = req.body;

    const updatedPlace = {
        ...DUMMY_PLACES.find((place) => place.id === placeId),
        title,
        description,
    };

    const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json(updatedPlace);
};

const deletePlace = (req, res, next) => {
    const { pid: placeId } = req.params;

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
