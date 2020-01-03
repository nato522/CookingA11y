import API_KEY from "./ApiKey";
import ObservableModel from "./ObservableModel";
import {STARTER, FIRST_DISH, SECOND_DISH, DESERT} from "./Constants"

const BASE_URL= "http://sunset.nada.kth.se:8080/iprog/group/45";
const httpOptions = {
	headers: {
		"X-Mashape-Key": API_KEY,
	}
};


class DataModel extends ObservableModel{

	constructor() {
		super()
		this.dishType = ""
		this.dishTitle = ""
		this.selectedDishesMap = new Map()
		this.selectedDishesMap.set(STARTER, []);
		this.selectedDishesMap.set(FIRST_DISH, []);
		this.selectedDishesMap.set(SECOND_DISH, []);
		this.selectedDishesMap.set(DESERT, []);
	}

	getRandomFoodJoke() {
		const url = `${BASE_URL}/food/jokes/random`;
		return fetch(url, httpOptions).then(this.processResponse);
	}

	getRandomRecipes(number_of_recipes) {
		const url = `${BASE_URL}/recipes/random?number=` + number_of_recipes;
		return fetch(url, httpOptions).then(this.processResponse);
	}

	getRecipes(limit, offset) {
		const url = `${BASE_URL}/recipes/search?number=${limit}&offset=${offset}`;
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

	addDishToMenu(dishType, dishTitle) {
		this.selectedDishesMap.get(dishType).push(dishTitle)
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
}


export const modelInstance = new DataModel();
export default modelInstance;