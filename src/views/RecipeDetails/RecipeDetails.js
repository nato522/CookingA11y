import modelInstance from "../../data/DataModel"
import React, { Component } from "react";

import {
	Box, Button, Grid, Heading, Image, Layer, Main,
	RadioButtonGroup, Paragraph, Table, TableBody,
	TableCell, TableHeader, TableRow, Text
} from 'grommet';

import { Add, FormClose, StatusGood } from "grommet-icons";
import Sidebar from '../../components/Sidebar/Sidebar';
import placeholder from "../../images/placeholder.png"
import {STARTER, FIRST_DISH, SECOND_DISH, DESSERT} from "../../data/Constants"

function AddToMyMenu(props) {

	const [show, setShow] = React.useState();
	const [value, setValue] = React.useState(STARTER);
	const [open, setOpen] = React.useState();

	// const onOpen = () => setOpen(true);
	// const onClose = () => setOpen(undefined);

	let addDishToMenu = () => {
		modelInstance.addDishToMenu(value, props.dishTitle, props.dishID);
	};

	return (
		<Box>
			<Button
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
						options={[STARTER, FIRST_DISH, SECOND_DISH, DESSERT]}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						margin="small"
					/>
					<Button
						label="Finish"
						onClick={() => {
							setShow(false);
							addDishToMenu()
							setOpen(true)
						}}
						alignSelf="center"
						margin="small"
					/>
				</Layer>
			)}
			{open && (
				<Layer
					position="bottom"
					modal={false}
					margin={{ vertical: "medium", horizontal: "small" }}
					onEsc={() => setOpen(undefined)}
					responsive={false}
					plain
				>
					<Box
						align="center"
						direction="row"
						gap="small"
						justify="between"
						round="medium"
						elevation="medium"
						pad={{ vertical: "xsmall", horizontal: "small" }}
						background="status-ok"
					>
						<Box align="center" direction="row" gap="xsmall">
							<StatusGood />
							<Text>The recipe has been added to your menu</Text>
						</Box>
						<Button icon={<FormClose />} onClick={() => setOpen(undefined)} plain />
					</Box>
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
		if (!isNaN(this.id)){
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
		} else {
			const customRecipe = modelInstance.getCustomRecipe(this.id);
			this.setState({
				recipe: customRecipe.recipe,
				ingredients: customRecipe.ingredients,
				instructions: customRecipe.instructions
			})
		}
	}

	componentDidUpdate(prevProps) {
		const currentId = prevProps.match.params.id;
		const incomingId = this.props.match.params.id;

		if (incomingId !== currentId) {
			this.id = incomingId;
			if (!isNaN(this.id)){
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
			} else {
				const customRecipe = modelInstance.getCustomRecipe(this.id);
				this.setState({
					recipe: customRecipe.recipe,
					ingredients: customRecipe.ingredients,
					instructions: customRecipe.instructions
				})
			}
		}
	}

	render() {
		let tableRow = this.state.ingredients.map((ingredient, i) => (
			<TableRow key={i}>
				<TableCell scope="row">
					<strong>{ingredient.name}</strong>
				</TableCell>
				<TableCell>{parseFloat(ingredient.measures.metric.amount).toFixed(1) + " " + ingredient.measures.metric.unitShort}</TableCell>
			</TableRow>
		));

		let detailedInstructions = this.state.instructions.map((instruction, i) => (
			<Text as="div" size="large" margin="small" key={i}>
				<Heading level="3" margin="none">
					Step {instruction.number} <br/>
				</Heading>
				<Paragraph fill={true} margin="none">
					{instruction.step}
				</Paragraph>
			</Text>
		));

		return (
			<Grid
				areas={[
					{ name: 'recipe_title', start: [0, 0], end: [1, 0] },
					{ name: 'sidebar', start: [1, 0], end: [2, 0] },
					{ name: 'recipe_instructions', start: [0, 1], end: [2, 1] },
				]}
				columns={['1000px', 'small']}
				rows={['500px', 'large']}
				gap='small'
			>
				<Main id="mainContent">
					<Box
						gridArea='recipe_title'
						background='#E0E3F0'
						margin={{top:'medium', left:'medium'}}
					>
						<Heading level="1" margin="small"> {this.state.recipe.title}</Heading>
						<AddToMyMenu dishTitle={this.state.recipe.title} dishID={this.id}/>
						<Box
							gridArea="nav"
							direction="row"
							pad={{ left: 'medium', right: 'small', vertical: 'small', top: 'medium', bottom: 'medium'}}
						>
							<Box height="250px" width="500px">
								<Image
									fit="cover"
									src={this.state.recipe.image || placeholder}
									alt={ this.state.recipe.image ? this.state.recipe.title : "This is just a placeholder image. We don't support uploading images for your own recipes yet."}
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
				</Main>
				<Box gridArea='sidebar' background='brand'margin={{top:'medium', right:'medium'}}>
					<Sidebar model={this.props.model}/>
				</Box>
				<Box
					gridArea='recipe_instructions'
					background='#236ea0'
					margin={{bottom:'medium', left:'medium', right:'402px'}}
					overflow="auto"
				>
					<Heading level="2" margin="small">
						Recipe Steps
					</Heading>
					<Paragraph margin="small" fill={true}>
						{this.state.recipe.instructions}
					</Paragraph>
					{detailedInstructions}
				</Box>
			</Grid>
		);
	}
}

export default RecipeDetails;