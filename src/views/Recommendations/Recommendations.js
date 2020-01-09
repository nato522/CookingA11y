import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import {Box, Grid, Heading, Main, Paragraph, ResponsiveContext, Text} from 'grommet';
import {Link} from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadingContent from '../../components/LoadingContent/LoadingContent';
import burger from "../../images/burger.jpg";
import {RESPONSIVE} from "../../data/Constants"
import Emoji from "a11y-react-emoji";

class Recommendations extends Component {


	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
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
					isLoading: false,
					similarRecipesMap: resultMap
				})
		}).catch(error => {
			console.error(error);
		});
	}

	renderSimilarRecipes(size) {
		let result;

		if(this.state.similarRecipesMap.size > 0) {
			let baseURLImage = "https://spoonacular.com/recipeImages/"

			result = Array.from(this.state.similarRecipesMap).map(([dishKey, dishValue]) => {
				return(
					<Box key={`recommendation_${dishKey}`}>
						<Heading level={2}> Because you cooked {dishKey.split("/")[0]}, we recommend you: </Heading>
						<Grid
							as="ul"
							columns={RESPONSIVE["recommendations"][size]}
							background="#E0E3F0"
						>
							{dishValue.map((similarRecipe, i) => (
								<Box as="li" key={similarRecipe.id}	>
									<Link to={"/recipe_details/" + similarRecipe.id}>
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
				)
			})
		}
		else {
			return (
				<Paragraph
					fill="true"
					alignSelf="center"
				>
					For now, we don't have any recommendations for you
					<Emoji symbol="😢" label="sad face"/>
					.Add recipes to your menu and come back to see
					new similar ones.
				</Paragraph>
			)

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
					<Main id="mainContent">
						{this.state.isLoading &&
							<Box margin="auto">
								<LoadingContent />
							</Box>
						}
						{!this.state.isLoading &&
							<ResponsiveContext.Consumer>
								{size => (
									this.renderSimilarRecipes(size)
								)}
							</ResponsiveContext.Consumer>
						}
					</Main>
				</Box>
			</Grid>
		);
	}
}

export default Recommendations;