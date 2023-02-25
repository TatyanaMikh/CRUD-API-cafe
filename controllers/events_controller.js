const Event = require('../models/Events.js');

module.exports = {

    getAllEvents: async (req, res) => {
        try {
            const allEvents = await Event.find();
            return res.status(200).json({
                success: true,
                message: "allEvents found",
                allEvents: allEvents
            })
        }
        catch (err) {
            return res.status(500).json({
                message: "Error in getting allEvents request",
                message: err.message
            })
        }
    },
    getEventById: async (req, res) => {
        //return "getEventById successfully"

        try {
            const event_id = req.params.event_id;
            console.log("event_id: " + event_id);
            const event = await Event.findById(event_id);

            return res.status(200).json({
                success: true,
                message: "success to get events by id",
                event
            })

        } catch (error) {
            return res.status(500).json({
                message: "error in get events by id request",
                error: error.message
            })
        }
    },
    createEvent: async (req, res) => {

        try {
            const {
                events_name,
                events_description,
                events_expiry,
                //events_status

            } = req.body;

            if (!events_name || !events_description || !events_expiry) {
                throw new Error("mandatory fields are missings");
            }


            const new_events = new Event({
                events_name,
                events_description,
                events_expiry
            });

            await new_events.save();

            return res.status(200).json({
                success: true,
                message: "success to create new events"
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in create new events request",
                error: error.message
            })
        }

    },
    updateEvent: async (req, res) => {
        try {
            const events_id = req.params.event_id;
            console.log(events_id);

            await Event.findByIdAndUpdate(events_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to update events"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in update events request",
                error: err.message
            })
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const events_id = req.params.event_id;
            await Event.findByIdAndDelete(events_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to delete events"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in delete events request",
                error: err.message
            })
        }
    }
}