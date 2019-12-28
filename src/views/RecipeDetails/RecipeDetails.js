import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import { Add } from 'grommet-icons';
import {Box, Button, Grid, Heading, Image} from 'grommet';
import {Table, TableBody, TableCell, TableFooter, TableHeader, TableRow} from 'grommet';
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {Link} from "react-router-dom";


class RecipeDetails extends Component {

	constructor(props) {
		super(props);
		this.id = props.match.params.id;
		this.state = {
			recipe: "",
			ingredients: []
		}
	}

	componentDidMount() {
		modelInstance.getRecipeByID(this.id)
			.then(recipe => {
				this.setState({
					recipe: recipe,
					ingredients: recipe.extendedIngredients
				})
			}).catch(error => {
			console.error(error);
		});
	}

	render() {
		let tableRow = this.state.ingredients.map((ingredient, i) => (
			<TableRow>
				<TableCell scope="row">
					<strong>{ingredient.name}</strong>
				</TableCell>
				<TableCell>{ingredient.amount + " " + ingredient.unit}</TableCell>
			</TableRow>
		));
		return (
			<Grid as="recipeDetailsGrid"
				areas={[
					{ name: 'recipe_title', start: [0, 0], end: [1, 0] },
					{ name: 'side', start: [1, 0], end: [2, 0] },
					{ name: 'foot', start: [0, 1], end: [2, 1] },
				]}
				columns={['1000px', 'small']}
				rows={['500px', 'large']}
				gap='small'
			>
				<Box
					gridArea='recipe_title'
					background='#E0E3F0'
					margin={{top:'medium', left:'medium'}}
				>
					<Heading level="1" margin="small"> {this.state.recipe.title}</Heading>
					<Button
						gridArea="recipeDetailsGrid"
						alignSelf="start"
						margin="small"
						icon={<Add />}
						label="Add to my menu"
						onClick={() => {}}
					/>
					<Box
						gridArea="nav"
						direction="row"
						pad={{ left: 'medium', right: 'small', vertical: 'small', top: 'medium', bottom: 'medium'}}
					>
						<Box height="250px" width="500px">
							<Image
								fit="cover"
								src={this.state.recipe.image}
							/>
						</Box>
						<Box overflow="auto">
							<Table margin={{ left: 'xlarge'}}>
								<TableHeader>
									<TableRow>
										<TableCell scope="col" border="bottom">
											Ingredient Name
										</TableCell>
										<TableCell scope="col" border="bottom">
											Quantity
										</TableCell>
									</TableRow>
								</TableHeader>
								<TableBody>
									{tableRow}
								</TableBody>
							</Table>
						</Box>
					</Box>
				</Box>
				<Box gridArea='side' background='brand'margin={{top:'medium', right:'medium'}}/>
				<Box gridArea='foot' background='accent-1' margin={{bottom:'medium', left:'medium', right:'402px'}}/>
			</Grid>
		);
	}
}

export default RecipeDetails;