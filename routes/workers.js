const router = require('express').Router();

const {
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
} = require('../controllers/workers_controller.js');


router.get('/all', getAllWorkers);
router.get('/get_by_id/:worker_id', getWorkerById);

router.post('/create', createWorker);
router.put('/update/:worker_id', updateWorker);
router.delete('/delete/:worker_id', deleteWorker);


module.exports = router;