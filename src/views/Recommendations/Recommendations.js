import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import {Box, Grid, Heading, Main, Paragraph, ResponsiveContext, Text} from 'grommet';
import {Link} from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import burger from "../../images/burger.jpg";

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

		let result
		if(this.state.similarRecipesMap.size > 0) {
			let baseURLImage = "https://spoonacular.com/recipeImages/"

			result = Array.from(this.state.similarRecipesMap).map(([dishKey, dishValue]) => {
				return <Heading
					level="2">
					Because you cooked {dishKey.split("/")[0]}, we recommend you:
					{dishValue.map((similarRecipe, i) => (
						<Text
							size="large">
							<Link to={"/recipe_details/" + similarRecipe.id} key={similarRecipe.id}>
								<RecipeCard as="li"key={i}
											recipeID={similarRecipe.id}
											imageURL={`${baseURLImage}` + similarRecipe.image}
											title={similarRecipe.title}
											cookingTime={similarRecipe.readyInMinutes}
								/>
							</Link>
						</Text>
					))}
				</Heading>
			})
		}
		return(
			<ResponsiveContext.Consumer>
				{ size => (
					<Grid
						as="div"
						areas={[
							{name: "cover", start: [0,0], end: [2,0]},
							{name: "recipes", start: [0,1], end: [2,1]},
							// {name: "sidebar", start: [2,0], end: [2,1]},
						]}
						columns={["flex"]}
						rows={["small", "auto"]}
						// gap='none'
					>
						<Main id="mainContent">
							<Box
								gridArea='cover'
								background={`url(${burger})`}
							>
							</Box>
							{(size === "small") &&
								<Box gridArea="recipes" margin="auto">
									<Paragraph fill={true}>
										With every recipe you add in the menu, we will recommend you similar ones!
									</Paragraph>
									<Grid
										columns={["full"]}
									>
										{result}
									</Grid>
								</Box>
							}
							{(size === "medium") && (this.state.total > 0) &&
								<Box gridArea="recipes" margin="auto">
									<Paragraph fill={true}>
										With every recipe you add in the menu, we will recommend you similar ones!
									</Paragraph>
									<Grid
										columns={["1/3", "1/3", "1/3"]}
									>
										{result}
									</Grid>
								</Box>
							}
							{(size === "large") && (this.state.total > 0) &&
								<Box gridArea="recipes" margin="auto">
									<Paragraph fill={true}>
										With every recipe you add in the menu, we will recommend you similar ones!
									</Paragraph>
									<Grid as="ul"
										columns={["1/4", "1/4", "1/4"]}
									>
										{result}
									</Grid>
								</Box>
							}
							{/*<Box*/}
							{/*	alignSelf="end"*/}
							{/*	margin="auto"*/}
							{/*>*/}
							{/*	{ this.state.recipes.length < this.state.total && <Button*/}
							{/*		icon={<Add />}*/}
							{/*		label= "See more!"*/}
							{/*		onClick={this.getMoreRecipes}*/}
							{/*	/>*/}
							{/*	}*/}
							{/*</Box>*/}
						</Main>
						{/*<Box*/}
						{/*	gridArea='sidebar'*/}
						{/*>*/}
						{/*	<Sidebar model={this.props.model}/>*/}
						{/*</Box>*/}
					</Grid>
					// <Grid as="div" justify="stretch"
					// 	  areas={[
					// 		  { name: "cover", start: [0, 0], end: [2, 0] },
					// 		  { name: "similar_recipes", start: [0, 1], end: [2, 1] }
					// 	  ]}
					// 	  columns={["flex"]}
					// 	  rows={["small", "auto"]}
					// >
					// 	<Box
					// 		gridArea="cover"
					// 		background={`url(${burger})`}
					// 	>
					// 	</Box>
					// 	{/*<Grid fill="true"*/}
					// 	{/*	gridArea="similar_recipes"*/}
					// 	{/*>*/}
					// 		<Main
					// 			id="mainContent"
					// 			margin={
					// 				{"horizontal": "large"}
					// 			}
					// 		>
					// 			<Paragraph fill="true">
					// 				With every recipe you add in the menu, we will recommend you similar ones!
					// 			</Paragraph>
					// 			{/*<Box gridArea="similar_recipes" margin="auto">*/}
					// 				<Grid gridArea="similar_recipes" columns={["full"]}>
					// 					{result}
					// 				</Grid>
					// 			{/*</Box>*/}
					// 		</Main>
					// 	{/*</Grid>*/}
					// </Grid>
				)}
     		</ResponsiveContext.Consumer>
		);
	}
}

export default Recommendations;