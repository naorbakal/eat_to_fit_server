const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const Menu = require ('../../models/menu');
const Meal = require ('../../models/meal');
const MealItem = require('../../models/mealItem');
const Product = require ('../../models/product');


router.post('/',async (req, res, next) => {
        const mealsIds =  saveMeals(req.body.meals);
        const menu = new Menu({
            name:req.body.name,
            mealsIDs:mealsIds
        });
        menu.save()
        .then(menu =>{
            res.status(201).json({
                message: "Handle SignUp req to /signUp",
                menu
            })
        });

});

 async function saveMeals(mealsRequestObj){
        const pArray = mealsRequestObj.map(async element =>{
            const response = await createMeal(element);
            return response;
        });
        const mealsIds = await Promise.all(pArray);
        return mealsIds;
}
async function createMeal(meal){
        const pArray = meal.mealItems.map(async elemnt =>{
            const mealItemID = createMealItem(elemnt);
            return mealItemID; 
         });
        const mealItemsIds = await Promise.all(pArray);
        meal = new Meal({ 
            title:meal.title,
            mealItemsIDs:mealItemsIds
        })
         const mealId = await meal.save()

         return mealId;
    
}

async function createMealItem(item){
        const productId = await Product.findById(item.product._id).exec();
        const mealItem = new MealItem({ 
            quantity:item.quantity,
            productId:productId
        })
        const user = await mealItem.save();
        return user._id;
}
module.exports = router;