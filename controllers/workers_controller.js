const Worker = require('../models/Workers.js');

module.exports = {

    getAllWorkers: async (req, res) => {
        try {
            const allWorkers = await Worker.find();
            return res.status(200).json({
                success: true,
                message: "allWorkers found",
                allWorkers: allWorkers
            })
        }
        catch (err) {
            return res.status(500).json({
                message: "Error in getting allWorkers request",
                message: err.message
            })
        }
    },
    getWorkerById: async (req, res) => {
        //return "getWorkerById successfully"

        try {
            const worker_id = req.params.worker_id;
            console.log("worker_id: " + worker_id);
            const worker = await Worker.findById(worker_id);

            return res.status(200).json({
                success: true,
                message: "success to get workers by id",
                worker
            })

        } catch (error) {
            return res.status(500).json({
                message: "error in get workers by id request",
                error: error.message
            })
        }
    },
    createWorker: async (req, res) => {

        try {
            const {
                workers_name,
                workers_role

            } = req.body;

            if (!workers_name) {
                throw new Error("mandatory fields are missings");
            }


            const new_workers = new Worker({
                workers_name,
                workers_role: workers_role || 'Waitress'
            });

            await new_workers.save();

            return res.status(200).json({
                success: true,
                message: "success to create new workers"
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in create new workers request",
                error: error.message
            })
        }

    },
    updateWorker: async (req, res) => {
        try {
            const workers_id = req.params.worker_id;
            console.log(workers_id);

            await Worker.findByIdAndUpdate(workers_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to update workers"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in update workers request",
                error: err.message
            })
        }
    },
    deleteWorker: async (req, res) => {
        try {
            const workers_id = req.params.worker_id;
            await Worker.findByIdAndDelete(workers_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to delete workers"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in delete workers request",
                error: err.message
            })
        }
    }
}