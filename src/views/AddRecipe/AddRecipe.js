import React, { Component } from "react";

import {
    Box, Button, Form, Grid, Heading, Main,
    Paragraph, Select, Text, TextArea, Layer,
} from 'grommet';
import { Add } from 'grommet-icons';

import FormFieldLabel from "../../components/FormFieldLabel/FormFieldLabel";
import UNITS from "../../data/Constants";
import modelInstance from "../../data/DataModel";

import burger from "../../images/burger.jpg"

import "./AddRecipe.css";

let localRecipes = JSON.parse(localStorage.getItem('my_recipes')) || [];

function _getUnitShort(unitLong){
    const obj = UNITS.find(unit => unit.unitLong === unitLong);
    return obj.unitShort;
}

class AddRecipe extends Component {
    constructor(props) {
		super(props);
        this.state = {
            ingredientCount: 1,
            stepCount: 1,
            openLayer: false,
        }
    }

    addIngredient = () => {
        this.setState({
            ingredientCount: this.state.ingredientCount + 1
        });
    }
    addStep = () => {
        this.setState({
            stepCount: this.state.stepCount + 1
        });
    }

    addCustomRecipeToMenu = (recipe) => {
        modelInstance.addCustomRecipeToMenu(recipe);
    };

    addRecipe = (e) => {
        let new_recipe_steps = [];
        let new_recipe_ingredients = [];

        const data = e.value;

        for (let index = 0; index < this.state.ingredientCount; index++) {
            const ingredient_name = `e.target.elements.ingredient_${index+1}_name.value`;
            const ingredient_amount = `e.target.elements.ingredient_${index+1}_amount.value`;
            const ingredient_unit_long = `e.target.elements.ingredient_${index+1}_unit.value`;
            const ingredient_unit_short = _getUnitShort(eval(ingredient_unit_long));

            const ingredient = {
                name: eval(ingredient_name),
                measures:{
                    metric:{
                        amount: eval(ingredient_amount),
                        unitShort: ingredient_unit_short,
                        unitLong: eval(ingredient_unit_long),
                    }
                }
            }
            new_recipe_ingredients = new_recipe_ingredients.concat(ingredient);
        }

        for (let index = 0; index < this.state.stepCount; index++) {
            let step = `e.target.elements.step_${index+1}_description.value`;
            step = {
                number: index+1,
                step: eval(step),
            }
            new_recipe_steps = new_recipe_steps.concat(step);
        }

        const new_recipe = {
            recipe:{
                title: data.title,
                instructions: data.instructions,
            },
            ingredients: new_recipe_ingredients,
            instructions: new_recipe_steps,
        }

        this.addCustomRecipeToMenu(new_recipe);
        localRecipes.push(new_recipe);
        localStorage.setItem('my_recipes', JSON.stringify(localRecipes));
    }

    reset = (e) => {
        this.setState({
            ingredientCount: 1,
            stepCount: 1,
            openLayer: true,
        });
        e.currentTarget.reset();
    }

    onClose = () => {
        this.setState({
            openLayer: false
        });
    }

	render() {
        let ingredients = [];
        let steps = [];

        for (let i = 0; i < this.state.ingredientCount; i++){
            ingredients.push(
                <Box key={i}
                    role="group"
                    aria-labelledby={`ingredient_${i+1}`}
                >
                    <Heading margin="none" id={`ingredient_${i+1}`} level={4}>Ingredient {i+1}</Heading>
                    <Box
                        direction="row-responsive"
                    >
                    <FormFieldLabel
                        label="Name:"
                        aria-label="Name"
                        placeholder="e.g. Chocolate"
                        name={`ingredient_${i + 1}_name`}
                        required={true}
                    />
                    <FormFieldLabel
                        type="number"
                        label="Amount:"
                        aria-label="Amount"
                        name={`ingredient_${i + 1}_amount`}
                        min="0"
                        placeholder="e.g. 500"
                        required={true}
                    />
                    <FormFieldLabel
                        label="Unit:"
                        aria-label="Unit"
                        name={`ingredient_${i + 1}_unit`}
                        component={ Select }
                        placeholder="Select from the list"
                        options={[
                            "Mililiter(s)",
                            "Liter(s)",
                            "Gram(s)",
                            "Kilogram(s)",
                            "Teaspoon(s)",
                            "Tablespoon(s)",
                            "Cup(s)",
                        ]}
                        required={true}
                    />
                    </Box>
                </Box>
            );
        }

        for (var i = 0; i < this.state.stepCount; i++) {
            steps.push(
                <Box key={i}>
                    <FormFieldLabel
                        component={ TextArea }
                        label={`Step ${i + 1}:`}
                        aria-label={`Step ${i + 1}:`}
                        name={`step_${i + 1}_description`}
                        placeholder="e.g. Carefully cut the tomatoes into square pieces"
                        required={true}
                    />
                </Box>
            );
        };

		return(
            <Grid as="div" justify="stretch"
                areas={[
                    { name: "cover", start: [0, 0], end: [2, 0] },
                    { name: "recipe_form", start: [0, 1], end: [2, 1] }
                ]}
                columns={["flex"]}
                rows={["small", "auto"]}
            >
                <Box
                    gridArea="cover"
                    background={`url(${burger})`}
                >
                    <Heading level='2' alignSelf='center' color="#F8F8F8">
                        Add your own recipe!
                    </Heading>
                </Box>
                <Grid
                    gridArea="recipe_form"
                >
                    <Main
                        id="mainContent"
                        margin={
                            {"horizontal": "large"}
                        }
                    >
                        <Form
                            id="form-recipe"
                            onSubmit={(e) =>{
                                this.addRecipe(e);
                                this.reset(e);
                            }}
                        >
                            <Paragraph fill>
                                All required fields are marked with an asterisk (*) at the end. Example: "Recipe name *"
                            </Paragraph>
                            <Heading level="3">Recipe information:</Heading>
                            <Box>
                                <FormFieldLabel
                                    label="Recipe name:"
                                    aria-label="Recipe name"
                                    name="title"
                                    placeholder="e.g. Tomato Twister"
                                    required={true}
                                />
                                <FormFieldLabel
                                    component={ TextArea }
                                    label="Recipe description:"
                                    aria-label="Recipe description"
                                    name="instructions"
                                    placeholder="e.g. A vegan dish that is based on tomato with a layer of chocolate on top."
                                    required={true}
                                />
                            </Box>
                            <Heading level="3">Ingredients:</Heading>
                            { ingredients }
                            <Button
                                icon={ <Add /> }
                                label="Add more ingredients"
                                onClick={()=>{this.addIngredient()}}
                            />
                            <Heading level="3">Instructions:</Heading>
                            { steps }
                            <Button
                                icon={ <Add /> }
                                label="Add more steps"
                                onClick={()=>{this.addStep()}}
                            />
                            <Box>
                                <Button
                                    type="submit"
                                    label="Submit"
                                    margin="auto"
                                />
                            </Box>
                        </Form>
                    </Main>
                </Grid>
                {this.state.openLayer && (
                    <Layer
                        position="center"
                        modal
                        onClickOutside={this.onClose}
                        onEsc={this.onClose}
                    >
                        <Box pad="medium" gap="small" width="medium">
                            <Heading level="3" margin="none">
                                Congratulations!
                            </Heading>
                            <Text>You have added a new recipe!</Text>
                            <Box
                                as="footer"
                                gap="small"
                                direction="row"
                                align="center"
                                pad={{ top: "medium", bottom: "small" }}
                            >
                                <Button label="Close" onClick={this.onClose} color="status-ok" />
                            </Box>
                        </Box>
                    </Layer>
                )}
            </Grid>
        );
	}
}

export default AddRecipe;