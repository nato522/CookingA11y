import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import {Box, Text} from 'grommet';
import {Link} from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

class Recommendations extends Component {

	constructor(props) {
		super(props)
		this.state = {
			allDishesInMenu: [],
			similarRecipesMap: new Map()
		}
	}

	componentDidMount() {

		let resultMap = modelInstance.getSelectedDishes();
		for(let key of resultMap.keys()) {
			let listOfDishes = resultMap.get(key);
			for(let j = 0; j < listOfDishes.length; j++) {
				this.state.allDishesInMenu.push(listOfDishes[j])
			}
		}

		let dishesInMenuList = this.state.allDishesInMenu;
		modelInstance.getSimilarRecipes(dishesInMenuList)
			.then(resultMap => {
				this.setState({
					similarRecipesMap: resultMap
				})
		}).catch(error => {
			console.error(error);
		});
	}

	render() {

		let similarRecipes
		let allSimilarRecipes = []
		if(this.state.similarRecipesMap.size > 0) {
			let baseURLImage = "https://spoonacular.com/recipeImages/"
			for (let key of this.state.similarRecipesMap.keys()) {
				let dishName = key.split("/")[0]
				let similarList = this.state.similarRecipesMap.get(key);
				similarRecipes = similarList.map((similarRecipe, i) => (
					<Text
						size="large"
					>
						Because you cooked {dishName}, we recommend you:
						<Link to={"/recipe_details/" + similarRecipe.id} key={similarRecipe.id}>
							<RecipeCard key={i}
								recipeID={similarRecipe.id}
								imageURL={`${baseURLImage}` + similarRecipe.image}
								title={similarRecipe.title}
								cookingTime={similarRecipe.readyInMinutes}
							/>
						</Link>
					</Text>
				));
				allSimilarRecipes.push(similarRecipes)
			}
		}

		return(
			<Box>
				<Text>Introduction text about this page. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
					exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
					cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				</Text>
				{allSimilarRecipes}
			</Box>
		);
	}
}

export default Recommendations;