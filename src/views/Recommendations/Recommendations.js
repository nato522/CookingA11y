import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import {Accordion, AccordionPanel, Box, Button, Heading, Text} from 'grommet';
import {STARTER, FIRST_DISH, SECOND_DISH, DESSERT} from "../../data/Constants"
import {Link} from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

class Recommendations extends Component {

	constructor(props) {
		super(props)
		// this.ok = false
		this.state = {
			allDishesInMenu: [],
			similarRecipesMap: {}
		}
	}

	componentDidMount() {
		let dishesInMenuMap = modelInstance.getSelectedDishes();
		let allDishesInMenu = modelInstance.getAllDishesInMenu()

		this.setState({
			allDishesInMenu: allDishesInMenu
		})

		let map = new Map()
		let totalDishesInMenu = []
		for(let key of dishesInMenuMap.keys()) {
			totalDishesInMenu.push(dishesInMenuMap.get(key))
		}
		console.log(allDishesInMenu)
		for (let i = 0; i < allDishesInMenu.length; i++) {
			let dish = allDishesInMenu[i]
			if(dish != "") {
				map.set(dish, []);
				let recipeID = dish.toString().split("/")[1]
				modelInstance.getSimilarRecipes(recipeID)
					.then(similarRecipes => {
						map.get(dish).push(similarRecipes)
						this.setState({
							similarRecipesMap: map
						})
					}).catch(error => {
					console.error(error);
				});
			}
		}
	}

	render() {

		// when the list got fetched from the API
		let baseURLImage = "https://spoonacular.com/recipeImages/"
		let similarRecipes
		console.log(this.state.similarRecipesMap)
		if(this.state.similarRecipesMap.size === modelInstance.getAllDishesInMenu().length) {
			for (let key of this.state.similarRecipesMap.keys()) {
				let similarList = this.state.similarRecipesMap.get(key);
				// console.log(similarList[0])
				if(similarList != null) {
					console.log(similarList[0])
					similarRecipes = similarList[0].map(similarRecipe => (
						<Text>
							{similarRecipe.title}
						</Text>
					));
				}
			}
		}
			// 	similarRecipes = similarList.map(similarRecipe => (
			// 				<Link to={"/recipe_details/" + key.toString().split("/")[1]}>
			// 					<RecipeCard
			// 						recipeID={similarRecipe.id}
			// 						imageURL={`${baseURLImage}` + similarRecipe.image}
			// 						title={similarRecipe.title}
			// 						cookingTime={similarRecipe.readyInMinutes}
			// 					/>
			// 				</Link>
			// 			));
		// }





		// if(this.state.similarRecipesMap.size > 0) {
		// 	console.log("map")
		// 	console.log(this.state.similarRecipesMap)
		// 	for(let key of this.state.similarRecipesMap.keys()) {
		// 		console.log("elements from each key")
		// 		console.log(this.state.similarRecipesMap.get(key))
		// 		similarRecipes = this.state.similarRecipesMap.get(key)[0].map(similarRecipe => (
		// 			<Link to={"/recipe_details/" + key.toString().split("/")[1]}>
		// 				<RecipeCard
		// 					recipeID={similarRecipe.id}
		// 					imageURL={`${baseURLImage}` + similarRecipe.image}
		// 					title={similarRecipe.title}
		// 					cookingTime={similarRecipe.readyInMinutes}
		// 				/>
		// 			</Link>
		// 		));
		// 	}
		// }


		return(
			<Box>
				{/*<Text>Introduction text about this page. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
				{/*	eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud*/}
				{/*	exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
				{/*	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
				{/*	cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."*/}
				{/*</Text>*/}
				{similarRecipes}
			</Box>
		);
	}
}

export default Recommendations;