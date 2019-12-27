import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import "./Homepage.css";
import {Box, Grid, Heading} from 'grommet';
import banana from "../../images/banana.jpg";
import meal from "../../images/meal.jpg"
import cooking from "../../images/cooking.jpg"

const theme = {
	global: {
		colors: {
			brand: 'black',
		},
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		},
	},
};

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
			<div className="col-md-3" key={i}>
				<div>
					<img className="img-thumbnail" src={recipe.image} alt={recipe.title}/>
					<div className="caption" id="captionOverview">
						<p>{recipe.title}</p>
					</div>
				</div>
			</div>
		));

		return(
			<Grid as="welcome_grid"
				areas={[
					{ name: "main", start: [0, 0], end: [2, 0] },
					{ name: "nav", start: [0, 1], end: [2, 1] }
				]}
				columns={["flex"]}
				rows={["medium", "medium"]}
				gap="medium"
			>
				<Box gridArea="main" background="url(http://bgfons.com/upload/img1384812620.jpg)">
					<Heading level='1' alignSelf='center' margin={{top: 'xlarge'}}>
						Welcome
					</Heading>
					<Heading level='3' alignSelf='center' margin={{top: 'medium'}}>
						{this.state.joke}
					</Heading>
				</Box>
				<Box gridArea="nav" background="light-3">
					{recipes}
				</Box>
			</Grid>
	);
	}
}

export default Homepage;