import React, { Component } from "react";

import {
    Box, Button, Form, FormField, Grid, Heading,
    Select, TextArea,
} from 'grommet';
import { Add } from 'grommet-icons';

import UNITS from "../../data/Constants";

import burger from "../../images/burger.jpg"

import "./AddRecipe.css";

let localRecipes = JSON.parse(localStorage.getItem('my_recipes')) || [];

function _getUnitShort(unitLong){
    const obj = UNITS.find(obj => obj.unitLong === unitLong);
    return obj.unitShort;
}

class AddRecipe extends Component {
    constructor(props) {
		super(props);
        this.state = {
            ingredientCount: 1,
            stepCount: 1,
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
        localRecipes.push(new_recipe);
        localStorage.setItem('my_recipes', JSON.stringify(localRecipes));
    }

	render() {
        let ingredients = [];
        let steps = [];

        for (let i = 0; i < this.state.ingredientCount; i++){
            ingredients.push(
                <Box key={i}
                    direction="row-responsive"
                >
                    <FormField
                        label="Name:"
                        name={`ingredient_${i + 1}_name`}
                        required={true}
                    />
                    <FormField
                        type="number"
                        label="Amount:"
                        name={`ingredient_${i + 1}_amount`}
                        required={true}
                    />
                    <FormField
                        label="Unit:"
                        name={`ingredient_${i + 1}_unit`}
                        component={ Select }
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
            );
        }

        for (var i = 0; i < this.state.stepCount; i++) {
            steps.push(
                <Box key={i}>
                    <FormField
                        component={ TextArea }
                        label={`Step ${i + 1}:`}
                        name={`step_${i + 1}_description`}
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
                    <Heading level='1' alignSelf='center' color="#F8F8F8">
                        Add your own recipe!
                    </Heading>
                </Box>
                <Grid
                    gridArea="recipe_form"
                >
                    <Form onSubmit={this.addRecipe}>
                        <Box>
                            <FormField
                                label="Recipe name:"
                                name="title"
                                required={true}
                            />
                            <FormField
                                component={ TextArea }
                                label="Recipe description:"
                                name="instructions"
                                required={true}
                            />
                        </Box>
                        { ingredients }
                        <Button
                            icon={ <Add /> }
                            label="Add ingredient"
                            onClick={()=>{this.addIngredient()}}
                        />
                        { steps }
                        <Button
                            icon={ <Add /> }
                            label="Add step"
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
                </Grid>
            </Grid>
	    );
	}
}

export default AddRecipe;