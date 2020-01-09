import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import {Box, Grid, Heading, Main, ResponsiveContext, Text} from 'grommet';
import {Link} from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import burger from "../../images/burger.jpg";
import {RESPONSIVE} from "../../data/Constants"

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

	renderSimilarRecipes() {
		let result
		if(this.state.similarRecipesMap.size > 0) {
			let baseURLImage = "https://spoonacular.com/recipeImages/"

			result = Array.from(this.state.similarRecipesMap).map(([dishKey, dishValue]) => {
				return <ResponsiveContext.Consumer>
					{ size => (
						<Main id="mainContent">
							<Box>
								<Heading level={2}> Because you cooked {dishKey.split("/")[0]}, we recommend you: </Heading>
								<Grid
									as="ul"
									columns={RESPONSIVE["recommendations"][size]}
									background="#E0E3F0"
								>
									{dishValue.map((similarRecipe, i) => (
										<Box as="li">
											<Link to={"/recipe_details/" + similarRecipe.id} key={similarRecipe.id}>
												<RecipeCard
													recipeID={similarRecipe.id}
													imageURL={`${baseURLImage}` + similarRecipe.image}
													title={similarRecipe.title}
													cookingTime={similarRecipe.readyInMinutes}
												/>
											</Link>
										</Box>
									))}
								</Grid>
							</Box>
						</Main>
					)}
				</ResponsiveContext.Consumer>
			})
		}
		return result
	}

	render() {


		return(
					<Grid as="div" justify="stretch"
						  areas={[
							  { name: "cover", start: [0, 0], end: [2, 0] },
							  { name: "recommended_recipes", start: [0, 1], end: [2, 1] }
						  ]}
						  columns={["flex"]}
						  rows={["medium", "auto"]}
						  gap="medium"
					>
						<Box
							gridArea="cover"
							background={`url(${burger})`}
						>
						</Box>
							<Box
								gridArea="recommended_recipes"
							>
								{this.renderSimilarRecipes()}
							</Box>
					</Grid>
		);
	}
}

export default Recommendations;