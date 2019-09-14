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
            mealItems
        })
    })
    const meals = await Promise.all(pArray);
    return {
        name:name,
        meals:meals
    }
}

async function saveMenuFromJson(jsonMenu){
    const mealsIds =  await saveMeals(jsonMenu.meals);
    let menu = new Menu({
        author:jsonMenu.author,
        name:jsonMenu.name,
        mealsIds:mealsIds,
        date: new Date()
    });
    menu = await getNutritionalValues(menu);
    const res = await menu.save();
    return res;
}

async function getNutritionalValues(menu){
    let amountItem;
    let meal;
    let mealItem;
    let product;
    let calories = 0;
    let protein = 0;
    let crabs = 0;
    let fat = 0;

    for (const mealId of menu.mealsIds){
        meal = await Meal.findById(mealId).exec();
        for(const mealId of meal.mealItemsIds){
            mealItem = await MealItem.findById(mealId).exec();
            product = await Product.findById(mealItem.productId);
            amountItem = (mealItem.quantity / product.unitQuantity);
            
            calories +=amountItem * product.calories;
            protein += amountItem * product.protein;
            crabs += amountItem * product.crabs;
            fat += amountItem * product.fat;
        }
    }

    menu.calories = calories;
    menu.protein = protein;
    menu.crabs = crabs;
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
    let mealItem =await Product.findOne({quantity:item.quantity, productId:item.productId}).exec();
    if(!mealItem){
       const product = await Product.findById(item.product._id).exec();
        mealItem = new MealItem({ 
           quantity:item.quantity,
           productId:product?product._id:null,
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
            product:{_id:product._id,name:product.name,unitType:product.unitType},
            status:mealItem.status
        })
    });
    const mealItems = await Promise.all(pArray);
    return(
        mealItems
    )
}

module.exports={createMenuJson,saveMenuFromJson};