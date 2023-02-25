const Dish = require('../models/Dishes');

module.exports = {

    getAllDishes: async (req, res) => {
        try {
            const allDishes = await Dish.find();
            return res.status(200).json({
                success: true,
                message: "allDishes found",
                allDishes: allDishes
            })
        }
        catch (err) {
            return res.status(500).json({
                message: "Error in getting allDishs request",
                message: err.message
            })
        }
    },
    getDishById: async (req, res) => {
        //return "getDishById successfully"

        try {
            const dish_id = req.params.dish_id;
            const dish = await Dish.findById(dish_id);

            return res.status(200).json({
                success: true,
                message: "success to get dish by id",
                dish
            })

        } catch (error) {
            return res.status(500).json({
                message: "error in get dish by id request",
                error: error.message
            })
        }
    },
    createDish: async (req, res) => {

        try {
            const {
                dish_name,
                dish_description,
                dish_allergy_inform,
                dish_category,
                //dish_status
            } = req.body;

            if (!dish_name || !dish_description) {
                throw new Error("mandatory fields are missings");
            }


            const new_dish = new Dish({
                dish_name,
                dish_description,
                dish_allergy_inform,
                dish_category: dish_category || "Other",

            });

            await new_dish.save();

            return res.status(200).json({
                success: true,
                message: "success to create new dish"
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in create new dish request",
                error: error.message
            })
        }

    },
    updateDish: async (req, res) => {
        try {
            const dish_id = req.params._id;
            console.log(dish_id);

            await Dish.findByIdAndUpdate(dish_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to update dish"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in update dish request",
                error: err.message
            })
        }
    },
    deleteDish: async (req, res) => {
        try {
            const dish_id = req.params._id;
            await Dish.findByIdAndDelete(dish_id, req.body);
            return res.status(200).json({
                success: true,
                message: "success to delete dish"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "error in delete dish request",
                error: err.message
            })
        }
    }
}