const mongoose = require("mongoose");
const express = require('express');
const menuUtils = require('./commons/menuUtils');
const router = express.Router();

const User=require('../../models/user');
const Menu = require ('../../models/menu');
const Meal = require ('../../models/meal');
const MealItem = require('../../models/mealItem');
const Product = require ('../../models/product');


router.post('/',async (req, res, next) => {
        const mealsIds =  await saveMeals(req.body.meals);
        const menu = new Menu({
            name:req.body.name,
            mealsIds:mealsIds
        });
        menu.save()
        .then(menu =>{
            User.findById(req.body.clientId).exec()
            .then(client=>{
                client.menusIDs.push(menu._id);
                client.save();
            });
            res.status(201).json({
                message: "Handle SignUp req to /signUp",
                menu
            })
        });
});

router.get('/:id/:index',async (req,res,next)=>{
    if(req.params.id){
        let menu = await Menu.find(req.query.id).exec();
        if(menu){
            menu = await menuUtils.createMenuJson(menu);
            res.status(200).json({
                name:menu.name,
                meals:menu.meals
            })
        }
        else{
            res.status(404).json({
                message:"Menu with the id "+ req.params.id +" doesnt exsist"
            })
        }
    }
    else{
        res.status(400).json({
            message:" 'id' field must be given as query param"
        }) 
    }
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
            mealItemsIds:mealItemsIds
        })
         const mealId = await meal.save()

         return mealId._id;
}

async function createMealItem(item){
        
        let mealItem =await Product.findOne({quantity:item.quantity, productId:item.productId}).exec();
        if(!mealItem){
           const product = await Product.findById(item.product.id).exec();
            mealItem = new MealItem({ 
               quantity:item.quantity,
               productId:product._id
           })
           mealItem = await mealItem.save();
           return mealItem._id;
        }
        else{
            return mealItem._id
        }
    
}
module.exports = router;