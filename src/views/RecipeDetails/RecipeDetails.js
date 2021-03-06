import modelInstance from "../../data/DataModel"
import { STARTER, FIRST_DISH, SECOND_DISH, DESSERT, RESPONSIVE_AREAS } from "../../data/Constants"

import React, { Component } from "react";
import {
	Box, Button, Grid, Heading, Image, Layer, Main,
	RadioButtonGroup, Paragraph, ResponsiveContext,
	Table, TableBody, TableCell, TableHeader, TableRow,
	Text
} from 'grommet';
import { Add, Close, FormClose, StatusGood } from "grommet-icons";

import Sidebar from '../../components/Sidebar/Sidebar';
import placeholder from "../../images/placeholder.png"

function AddToMyMenu(props) {

	const [show, setShow] = React.useState();
	const [value, setValue] = React.useState(STARTER);
	const [open, setOpen] = React.useState();

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
					<Button
						icon={ <Close /> }
						onClick={()=>{setShow(false)}}
					/>
					<Paragraph alignSelf={"center"} margin="small" >Please choose the dish type!</Paragraph>
					<Paragraph alignSelf={"center"} margin="small" >The recipe will be added to the menu on the right.</Paragraph>
					<RadioButtonGroup
						alignSelf={"center"}
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
						background="#2C365E"
					>
						<Box align="center" direction="row" gap="xsmall">
							<StatusGood color="#6fffb0"/>
							<Text color="#6fffb0">The recipe has been added to your menu</Text>
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
			<ResponsiveContext.Consumer>
				{size => (
					<Grid
						as="div"
						areas={RESPONSIVE_AREAS["recipeDetails"][size]}
						columns={['flex']}
						rows={RESPONSIVE_AREAS["rows"][size]}
						gap='none'
					>
						<Main id="mainContent">
							<Box
								gridArea='recipe_title'
								background='#F7F1F8'
								margin={{top:'medium'}}
							>
								<Heading level="1" margin="small"> {this.state.recipe.title}</Heading>
								<AddToMyMenu dishTitle={this.state.recipe.title} dishID={this.id}/>
								<Box
									direction="row-responsive"
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
										<Table>
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
							<Box
								gridArea='recipe_instructions'
								background='#F7F1F8'
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
						</Main>
						<Box gridArea='sidebar' margin={{top:'medium', right:'medium'}}>
							<Sidebar model={this.props.model}/>
						</Box>
					</Grid>
				)}
			</ResponsiveContext.Consumer>
		);
	}
}

export default RecipeDetails;