import React, { Component } from "react";
import { Link } from "react-router-dom";

import modelInstance from "../../data/DataModel"

import { Box, Grid, Heading, ResponsiveContext } from 'grommet';

import banana from "../../images/banana.jpg";
import cooking from "../../images/cooking.jpg"
import burger from "../../images/burger.jpg"
import healthy from "../../images/healthy_food.jpg"
import carrots from "../../images/carrots.jpg"
import vegetables from "../../images/vegetables.jpg"

import "./Homepage.css";

import RecipeCard from "../../components/RecipeCard/RecipeCard";

class Homepage extends Component {

	constructor(props) {
		super(props);

		this.state = {
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

		modelInstance.getRandomRecipes(4)
			.then(welcome_recipes => {
				this.setState({
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
							<Heading level='1' alignSelf='center' color="#E0E3F0">
								Welcome
							</Heading>
							<Heading level='4' alignSelf='center' color="#E0E3F0">
								{this.state.joke}
							</Heading>
						</Box>
						{(size === 'small' ) &&
							<Grid
								gridArea="random_recipes"
								columns={["full"]}
								margin="auto"
								gap="medium"
								background="#E0E3F0"
							>
								{recipes}
							</Grid>
							/*
								<Box
									gridArea="nav"
									background="#E0E3F0"
									direction="row"
									elevation="medium"
									alignSelf='center'
									justify='evenly'
									pad={{ left: 'medium', right: 'small', vertical: 'small', top: 'medium', bottom: 'medium'}}
									>
										{recipes}
								</Box>
							*/
						}
						{(size === 'medium') &&
							<Grid
								gridArea="random_recipes"
								columns={["1/2", "1/2"]}
								margin="auto"
								gap="medium"
								background="#E0E3F0"
							>
								{recipes}
							</Grid>
						}
						{(size === 'large') &&
							<Grid
								columns={["1/4", "1/4", "1/4", "1/4"]}
								margin="auto"
								gap="medium"
								gridArea="random_recipes"
								background="#E0E3F0"
							>
								{recipes}
							</Grid>
						}
					</Grid>
				)}
			</ResponsiveContext.Consumer>
	);
	}
}

export default Homepage;