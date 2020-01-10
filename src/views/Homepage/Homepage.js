import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../../data/DataModel";
import { RESPONSIVE } from "../../data/Constants";
import { Box, Grid, Heading, Main, ResponsiveContext } from 'grommet';
import burger from "../../images/burger.jpg"
import "./Homepage.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadingContent from "../../components/LoadingContent/LoadingContent";

class Homepage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			joke: "",
			welcome_recipes: []
		}
	}

	componentDidMount() {

		modelInstance.getRandomFoodJoke()
			.then(joke => {
				this.setState({
					joke: joke.text
				})
			}).catch(error => {
			console.error(error);
		});
		// this.setState({
		// 	joke: modelInstance.getRandomFoodJoke()
		// })

		modelInstance.getRandomRecipes(4)
			.then(welcome_recipes => {
				this.setState({
					isLoading: false,
					welcome_recipes: welcome_recipes.recipes
				})
			}).catch(error => {
			console.error(error);
		});
	}


	render() {
		let welcome_recipes = this.state.welcome_recipes;

		let recipes = welcome_recipes.map((recipe, i) => (
			<Link to={"/recipe_details/" + recipe.id} key={recipe.id}>
				<RecipeCard
					recipeID={recipe.id}
					imageURL={recipe.image}
					title={recipe.title}
					cookingTime={recipe.readyInMinutes}
				/>
			</Link>
		));

		return(
			<ResponsiveContext.Consumer>
				{ size => (
					<Grid as="div" justify="stretch"
						areas={[
							{ name: "cover", start: [0, 0], end: [2, 0] },
							{ name: "random_recipes", start: [0, 1], end: [2, 1] }
						]}
						columns={["flex"]}
						rows={["medium", "auto"]}
						gap="medium"
					>
						<Box
							gridArea="cover"
							background={`url(${burger})`}
						>
							<Heading level='2' alignSelf='center' color="#E0E3F0">
								Welcome!
							</Heading>
							<Heading level='3' alignSelf='center' color="#E0E3F0">
								Food joke of the day: <br/> {this.state.joke}
							</Heading>
						</Box>
						<Main id="mainContent" background="#F7F1F8">
							<Heading level={2}>Random "Go Bananas"</Heading>
							{(this.state.isLoading) &&
								<Box gridArea="random_recipes" margin="auto">
									<LoadingContent />
								</Box>
							}
							{(!this.state.isLoading) &&
								<Grid
									gridArea="random_recipes"
									columns={RESPONSIVE["homepage"][size]}
								>
									{recipes}
								</Grid>
							}
						</Main>
					</Grid>
				)}
			</ResponsiveContext.Consumer>
	);
	}
}

export default Homepage;