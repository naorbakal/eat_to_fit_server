const Menu = require ('../../../models/menu');
const Meal = require ('../../../models/meal');
const MealItem = require('../../../models/mealItem');
const Product = require ('../../../models/product');
const mongoose = require("mongoose");


async function createMenuJson(menu){
    const name = menu.name;
    const pArray = menu.mealsIds.map( async mealId=>{
        let meal = await Meal.findById(mealId).exec();
        const mealItems = await getMealItems(meal.mealItemsIds);
        return({
            title: meal.title,
            mealItems
        })
    })
    const meals = await Promise.all(pArray);
    return {
        name:name,
        meals:meals
    }
}

async function saveMenuFromJson(jsonMenu,getNutValues){
    const mealsIds =  await saveMeals(jsonMenu.meals);
    let menu = new Menu({
        author:jsonMenu.author,
        name:jsonMenu.name,
        mealsIds:mealsIds,
        date: new Date()
    });
    if(getNutValues){
       menu = await getNutritionalValues(menu);
    }
    const res = await menu.save();
    return res;
}

async function getNutritionalValues(menu){
    console.log(menu)
    let amountItem;
    let meal;
    let mealItem;
    let product;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    for (const mealId of menu.mealsIds){
        meal = await Meal.findById(mealId).exec();
        for(const mealId of meal.mealItemsIds){
            mealItem = await MealItem.findById(mealId).exec();
            product = await Product.findById(mealItem.productId);
            amountItem = (mealItem.quantity / product.unitQuantity);
            
            calories +=amountItem * product.calories;
            protein += amountItem * product.protein;
            carbs += amountItem * product.carbs;
            fat += amountItem * product.fat;
        }
    }

    menu.calories = calories;
    menu.protein = protein;
    menu.carbs = carbs;
    menu.fat = fat;

    return menu;
}

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
    let mealItem =await MealItem.findOne({quantity:item.quantity, productId:mongoose.Types.ObjectId(item.product._id),status:item.status}).exec();
    if(!mealItem){
        mealItem = new MealItem({ 
           quantity:item.quantity,
           productId:item.product._id,
           productName:item.product.name,
           status:item.status
       })
       mealItem = await mealItem.save();
    }
    return mealItem._id
}

async function getMealItems(mealItemsIds){
    const pArray = mealItemsIds.map(async mealItemId =>{
        const mealItem = await MealItem.findById(mealItemId).exec();
        const quantity=mealItem.quantity;
        const product = await Product.findById(mealItem.productId).exec();
        return({
            quantity:quantity,
            product:{_id:mealItem.productId,name:mealItem.productName,unitType:product?product.unitType:null},
            status:mealItem.status
        })
    });
    const mealItems = await Promise.all(pArray);
    return(
        mealItems
    )
}

function deppCopy(menu){
    return({

    })
}
module.exports={createMenuJson,saveMenuFromJson};