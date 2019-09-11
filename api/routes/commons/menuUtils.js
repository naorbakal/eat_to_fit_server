const Menu = require ('../../../models/menu');
const Meal = require ('../../../models/meal');
const MealItem = require('../../../models/mealItem');
const Product = require ('../../../models/product');

async function createMenuJson(menu){
    const name = menu.name;
    const pArray = menu.mealsIds.map( async mealId=>{
        let meal = await Meal.findById(mealId).exec();
        const mealItems = await getMealItems(meal.mealItemsIds);
        return({
            title: meal.title,
            mealItems:mealItems
        })
    })
    const meals = await Promise.all(pArray);
    console.log({
        name:name,
        meals:meals
    })
    return {
        name:name,
        meals:meals
    }
}


async function getMealItems(mealItemsIds){
    const pArray = mealItemsIds.map(async mealItemId =>{
        const mealItem = await MealItem.findById(mealItemId).exec();
        const quantity=mealItem.quantity;
        const product = await Product.findById(mealItem.productId).exec();
        return({
            quantity:quantity,
            product:{_id:product._id,name:product.name,unitType:product.unitType}
        })
    });
    const mealItems = await Promise.all(pArray);
    return({
        mealItems:mealItems
    })
}

module.exports={createMenuJson};