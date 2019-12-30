import API_KEY from "./ApiKey";
import ObservableModel from "./ObservableModel";
import Dish from "./Dish"

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
		this.selectedDishes = []
		this.currentDish = new Dish()
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
		console.log("add dish to menu");
		let dish = new Dish(dishType, dishTitle)
		this.currentDish = dish
		// this.selectedDishes.push(dish);
		this.notifyObservers("addDishToMenu");
	}

	getSelectedDish() {
		return this.currentDish
	}

	getDishType() {
		return this.dishType;
	}
}


export const modelInstance = new DataModel();
export default modelInstance;