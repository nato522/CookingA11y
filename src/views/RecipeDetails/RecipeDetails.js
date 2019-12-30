import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import { Add } from 'grommet-icons';
import {Box, Button, CheckBox, Grid, Heading, Image, Layer, RadioButtonGroup, Text} from 'grommet';
import {Table, TableBody, TableCell, TableHeader, TableRow} from 'grommet';
import Sidebar from '../../components/Sidebar/Sidebar';
import {STARTER, FIRST_DISH, SECOND_DISH, DESERT} from "../../data/Constants"

function AddToMyMenu(props) {

	const [show, setShow] = React.useState();
	const [value, setValue] = React.useState(STARTER);

	let addDishToMenu = () => {
		modelInstance.addDishToMenu(value, props.dishTitle);
	};

	return (
		<Box>
			<Button label="show"
					gridArea="recipeDetailsGrid"
					alignSelf="start"
					margin="small"
					icon={<Add />}
					label="Add to my menu"
					onClick={() => setShow(true)}
			/>
			{show && (
				<Layer
					   position='center'
					   onEsc={() => setShow(false)}
					   onClickOutside={() => setShow(false)}
				>
					<Text margin="small" >Please choose the dish type:</Text>
					<RadioButtonGroup
						name="dishType"
						options={[STARTER, FIRST_DISH, SECOND_DISH, DESERT]}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						margin="small"
					/>
					<Button
						label="Finish"
						onClick={() => {
							setShow(false);
							addDishToMenu()
						}}
						alignSelf="center"
						margin="small"
					/>
				</Layer>
			)}
		</Box>
	);
}

class RecipeDetails extends Component {

	constructor(props) {
		super(props);
		this.id = props.match.params.id;
		this.state = {
			recipe: "",
			ingredients: [],
			instructions: [],
		}
	}

	componentDidMount() {
		modelInstance.getRecipeByID(this.id)
			.then(recipe => {
				this.setState({
					recipe: recipe,
					ingredients: recipe.extendedIngredients,
					instructions: recipe.analyzedInstructions[0].steps
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
				<TableCell>{parseFloat(ingredient.amount).toFixed(1) + " " + ingredient.unit}</TableCell>
			</TableRow>
		));

		let detailedInstructions = this.state.instructions.map((instruction, i) => (
			<Text size="large" margin="small">
				Step {instruction.number} <br/>
				<Text>
					{instruction.step}
				</Text>
			</Text>
		));

		return (
			<Grid as="recipeDetailsGrid"
				areas={[
					{ name: 'recipe_title', start: [0, 0], end: [1, 0] },
					{ name: 'sidebar', start: [1, 0], end: [2, 0] },
					{ name: 'recipe_instructions', start: [0, 1], end: [2, 1] },
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
					<AddToMyMenu dishTitle={this.state.recipe.title}/>
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
				<Box gridArea='sidebar' background='brand'margin={{top:'medium', right:'medium'}}>
					<Sidebar model={this.props.model}/>
				</Box>
				<Box
					gridArea='recipe_instructions'
					background='#236ea0'
					margin={{bottom:'medium', left:'medium', right:'402px'}}
					overflow="auto"
				>
					<Heading level="1" margin="small">
						Recipe Steps
					</Heading>
					<Text margin="small">
						{this.state.recipe.instructions}
					</Text>
					{detailedInstructions}
				</Box>
			</Grid>
		);
	}
}

export default RecipeDetails;