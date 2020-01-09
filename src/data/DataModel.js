import API_KEY from "./ApiKey";
import ObservableModel from "./ObservableModel";
import {STARTER, FIRST_DISH, SECOND_DISH, DESSERT} from "./Constants"

const BASE_URL= "http://sunset.nada.kth.se:8080/iprog/group/45";
const httpOptions = {
	headers: {
		"X-Mashape-Key": API_KEY,
	}
};

const my_recipes = JSON.parse(localStorage.getItem('my_recipes')) || [];

class DataModel extends ObservableModel{

	constructor() {
		super();
		this.selectedDishesMap = new Map();
		this.selectedDishesMap.set(STARTER, []);
		this.selectedDishesMap.set(FIRST_DISH, []);
		this.selectedDishesMap.set(SECOND_DISH, []);
		this.selectedDishesMap.set(DESSERT, []);
		this.customRecipes = my_recipes;
	}

	getRandomFoodJoke() {
		const url = `${BASE_URL}/food/jokes/random`;
		return fetch(url, httpOptions).then(this.processResponse);
	}

	getRandomRecipes(number_of_recipes) {
		const url = `${BASE_URL}/recipes/random?number=` + number_of_recipes;
		return fetch(url, httpOptions).then(this.processResponse);
	}

	getRecipes(limit, offset, query) {
		let url = null;
		if (query){
			url = `${BASE_URL}/recipes/search?query=${query}&number=${limit}&offset=${offset}`;
		} else {
			url = `${BASE_URL}/recipes/search?number=${limit}&offset=${offset}`;
		}
		return fetch(url, httpOptions).then(this.processResponse);
	}

	getComplexRecipes(limit, offset, query, filters){
		/**
		 * TODO: read filters and apply them to the url
		 * urlExample: https://api.spoonacular.com/recipes/complexSearch?query=burger&number=10&offset=0&diet=vegetarian,vegan&maxReadyTime=30&intolerances=gluten,dairy,egg
		 */
		let url = null;
		let diets = "";
		let intolerances = "";
		let mealType = "";
		let maxReadyTime = "";

		if (filters.diets.length){
			diets = "&diet="
			filters.diets.map((item, index)=>{
				diets = diets.concat(item);
				if (index < filters.diets.length-1){ diets = diets.concat(','); }
			})
		}
		if (filters.intolerances.length){
			intolerances = "&intolerances="
			filters.intolerances.map((item, index)=>{
				intolerances = intolerances.concat(item);
				if (index < filters.intolerances.length-1){ intolerances = intolerances.concat(','); }
			})
		}
		if (filters.mealType){ mealType = `&type=${filters.mealType}`; }
		if (filters.maxReadyTime){ maxReadyTime = `&maxReadyTime=${filters.maxReadyTime}`; }

		if (query){
			url = `${BASE_URL}/recipes/complexSearch?query=${query}&number=${limit}&offset=${offset}&addRecipeInformation=true${diets}${intolerances}${mealType}${maxReadyTime}`;
		} else {
			url = `${BASE_URL}/recipes/complexSearch?number=${limit}&offset=${offset}&addRecipeInformation=true${diets}${intolerances}${mealType}${maxReadyTime}`;
		}
		return fetch(url, httpOptions).then(this.processResponse);
	}

	getRecipeByID(recipeID) {
		const url = `${BASE_URL}/recipes/${recipeID}/information?includeNutrition=false`
		return fetch(url, httpOptions).then(this.processResponse);
	}

	processResponse(response) {
		if (response.ok) {
			return response.json();
		}
		throw response;
	}

	addDishToMenu(dishType, dishTitle, dishID) {
		let dishInfo = dishTitle + "/" + dishID
		this.selectedDishesMap.get(dishType).push(dishInfo)
		this.notifyObservers("addDishToMenu");
	}

	deleteDishFromMenu(dishType, dishTitle) {
		let listOfKey = this.selectedDishesMap.get(dishType)
		listOfKey.splice(listOfKey.indexOf(dishTitle), 1 );
		this.notifyObservers("deleteDishFromMenu");
	}

	getSelectedDishes() {
		return this.selectedDishesMap
	}

	addCustomRecipeToMenu(recipe) {
		this.customRecipes.push(recipe)
		this.notifyObservers("addCustomRecipeToMenu");
	}

	getCustomRecipes() {
		return this.customRecipes;
	}

	getCustomRecipe(title) {
		const obj = this.customRecipes.find(item => item.recipe.title === title);
		return obj;
	}

	async getSimilarRecipes(dishesInMenuList) {
		let result = new Map();
		let numberOfSimilar = 6;

		for (let i = 0; i < dishesInMenuList.length; i++) {
			let dishID = dishesInMenuList[i].split("/")[1];
			result.set(dishesInMenuList[i], []);	// we set the key as the name + id for uniqueness

			const url = `${BASE_URL}/recipes/${dishID}/similar?number=${numberOfSimilar}`;
			const response = await fetch(url, httpOptions);
			const similarDishes = await response.json();

			for(let j = 0; j < similarDishes.length; j++) {
				result.get(dishesInMenuList[i]).push(similarDishes[j]);
			}
		}
		return result;
	}
}


export const modelInstance = new DataModel();
export default modelInstance;