const router = require('express').Router();

const {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
} = require('../controllers/dishes_controller.js');


router.get('/all', getAllDishes);
router.get('/get_by_id/:dish_id', getDishById);

router.post('/create', createDish);
router.put('/update/:dish_id', updateDish);
router.delete('/delete/:dish_id', deleteDish);


module.exports = router;