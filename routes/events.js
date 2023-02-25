const router = require('express').Router();

const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events_controller.js');


router.get('/all', getAllEvents);
router.get('/get_by_id/:event_id', getEventById);

router.post('/create', createEvent);
router.put('/update/:event_id', updateEvent);
router.delete('/delete/:event_id', deleteEvent);


module.exports = router;