const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        // imageUrl:
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
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
        // imageUrl:
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: 'u2',
    },
];

router.get('/:pid', (req, res, next) => {
    const { pid: placeId } = req.params;
    const place = DUMMY_PLACES.find((p) => p.id === placeId);

    if (!place) {
        const error = new Error('Could not find a place for the provided id.');
        error.code = 404;
        return next(error); // better approach
    }

    res.json({ place });
});

router.get('/user/:uid', (req, res, next) => {
    const { uid: userId } = req.params;
    const place = DUMMY_PLACES.find((p) => p.creator === userId);

    if (!place) {
        const error = new Error(
            'Could not find a place for the provided user id.'
        );
        error.code = 404;
        throw error;
    }

    res.json({ place });
});

module.exports = router;

// 404 data not found
// 200 success
// 304 data already in the cache