import React, { Component } from "react";

import {
    Box, Button, Form, FormField, Grid, Heading,
    Select, TextArea,
} from 'grommet';
import { Add } from 'grommet-icons';

//import UNITS from "../../data/Constants";

import burger from "../../images/burger.jpg"

import "./AddRecipe.css";

let localRecipes = JSON.parse(localStorage.getItem('my_recipes')) || [];

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
        console.log(e.value);
        const data = e.value;

        /**
         * TODO: handle array of ingredients and array of instructions
         */

        const new_recipe = {
            recipe:{
                title: data.title,
                instructions: data.instructions,
            },
            ingredients: [],
            instructions: [],
        }
        localRecipes.push(new_recipe);
        localStorage.setItem('my_recipes', JSON.stringify(localRecipes));
    }

	render() {
        let ingredients = [];
        let steps = [];

        for (let i = 0; i < this.state.ingredientCount; i++){
            const name_name = `ingredient_${i + 1}_name`;
            const name_amount = `ingredient_${i + 1}_amount`;
            const name_unit = `ingredient_${i + 1}_unit`;

            ingredients.push(
                <Box key={i}
                    direction="row-responsive"
                >
                    <FormField
                        label="Name:"
                        name={name_name}
                    />
                    <FormField
                        type="number"
                        label="Amount:"
                        name={name_amount}
                    />
                    <FormField
                        label="Unit:"
                        name={name_unit}
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
                    />
                </Box>
            );
        }

        for (var i = 0; i < this.state.stepCount; i++) {
            const label = `Step ${i + 1}:`
            const name = `step_${i + 1}_name`

            steps.push(
                <Box key={i}>
                    <FormField
                        component={ TextArea }
                        label={label}
                        name={name}
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