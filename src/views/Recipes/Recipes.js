import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./Recipes.css";
import {Box, Button, Grid} from 'grommet';
import { Add } from 'grommet-icons';
import SearchBox from '../../components/SearchBox/SearchBox';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Sidebar from '../../components/Sidebar/Sidebar';

let limit = 9;
let offset = 0;

class Recipes extends Component {

	constructor(props) {
		super(props);
        this.state = {
            "recipes": [
                {
                    "id": 592479,
                    "title": "Kale and Quinoa Salad with Black Beans",
                    "readyInMinutes": 50,
                    "servings": 6,
                    "image": "Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg",
                    "imageUrls": [
                        "Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg"
                    ]
                },
                {
                    "id": 547775,
                    "title": "Creamy Avocado Pasta",
                    "readyInMinutes": 15,
                    "servings": 2,
                    "image": "Creamy-Avocado-Pasta-547775.jpg",
                    "imageUrls": [
                        "Creamy-Avocado-Pasta-547775.jpg"
                    ]
                },
                {
                    "id": 818941,
                    "title": "Avocado Toast with Eggs, Spinach, and Tomatoes",
                    "readyInMinutes": 10,
                    "servings": 1,
                    "image": "avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg",
                    "imageUrls": [
                        "avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg"
                    ]
                },
                {
                    "id": 495111,
                    "title": "Citrus Sesame Kale",
                    "readyInMinutes": 15,
                    "servings": 4,
                    "image": "Citrus-Sesame-Kale-495111.jpg",
                    "imageUrls": [
                        "Citrus-Sesame-Kale-495111.jpg"
                    ]
                },
                {
                    "id": 689502,
                    "title": "Melt In Your Mouth Kale Salad",
                    "readyInMinutes": 10,
                    "servings": 2,
                    "image": "Melt-In-Your-Mouth-Kale-Salad-689502.jpg",
                    "imageUrls": [
                        "Melt-In-Your-Mouth-Kale-Salad-689502.jpg"
                    ]
                },
                {
                    "id": 837136,
                    "title": "Kale Pineapple Smoothie",
                    "readyInMinutes": 4,
                    "servings": 1,
                    "image": "kale-pineapple-smoothie-837136.jpg",
                    "imageUrls": [
                        "kale-pineapple-smoothie-837136.jpg"
                    ]
                },
                {
                    "id": 582897,
                    "title": "Mexican Salad with Lime Dressing",
                    "readyInMinutes": 15,
                    "servings": 4,
                    "image": "Mexican-Salad-with-Lime-Dressing-582897.jpg",
                    "imageUrls": [
                        "Mexican-Salad-with-Lime-Dressing-582897.jpg"
                    ]
                },
                {
                    "id": 777037,
                    "title": "Weekly Meal Plan #17",
                    "readyInMinutes": 15,
                    "servings": 6,
                    "image": "weekly-meal-plan-17-777037.jpg",
                    "imageUrls": [
                        "weekly-meal-plan-17-777037.jpg"
                    ]
                },
                {
                    "id": 801710,
                    "title": "Matcha Green Tea and Pineapple Smoothie",
                    "readyInMinutes": 10,
                    "servings": 1,
                    "image": "matcha-green-tea-and-pineapple-smoothie-801710.jpg",
                    "imageUrls": [
                        "matcha-green-tea-and-pineapple-smoothie-801710.jpg"
                    ]
                }
            ],
            "total": 313346,
            "baseURI": "https://spoonacular.com/recipeImages/"
        }
    }
    /*
	componentDidMount() {
		modelInstance.getRecipes(limit, offset)
			.then(data => {
                this.setState({
                    recipes: data.results,
                    total: data.totalResults,
					baseURI: data.baseUri
                });
			}).catch(error => {
                console.error(error);
            });
    }
    */

    getMoreRecipes = () =>{
        offset += limit;

        modelInstance.getRecipes(limit, offset)
			.then(data => {
                console.log(data);
                const old_recipes = this.state.recipes.slice();
                this.setState({
                    recipes: old_recipes.concat(data.results),
                    total: data.totalResults,
                });
			}).catch(error => {
                console.error(error);
            });
    }

    getNewQuery = () => {
        /**
         * TODO: search recipes using the input
         */
    }

	render() {
		return(
            <Box
                background="#ffc458"
            >
                <Grid as="recipes_grid"
                    areas={[
                        {name: "searchbox", start: [0,0], end: [1,0]},
                        {name: "recipes", start: [0,1], end: [1,1]},
                        {name: "sidebar", start: [2,0], end: [2,1]},
                    ]}
                    columns={['1000px', 'small']}
                    rows={['200px', 'large']}
                    gap='none'
                >
                    <Box
                        gridArea='searchbox'
                    >
                        <SearchBox search={this.getNewQuery}/>
                    </Box>
                    <Box
                        gridArea='recipes'
                        overflow="auto"
                    >
                        <Box
                            direction="row"
                            justify="evenly"
                            alignSelf="center"
                        >
                            { this.state.recipes.map((recipe, i) => {
                                return(
                                    <Link to={"/recipe_details/" + recipe.id}>
                                        <Box gridArea="RecipeCard">
                                            <RecipeCard key={i}
                                                recipeID={recipe.id}
                                                imageURL={`${this.state.baseURI}${recipe.imageUrls[0]}`}
                                                title={recipe.title}
                                                cookingTime={recipe.readyInMinutes}
                                            />
                                        </Box>
                                    </Link>
                                )
                            })}
                        </Box>
                        <Box
                            align="end"
                            margin="auto"
                        >
                            { this.state.recipes.length < this.state.total && <Button
                                icon={<Add />}
                                label= "See more!"
                                onClick={this.getMoreRecipes}
                            />
                            }
                        </Box>
                    </Box>
                    <Box
                        gridArea='sidebar'
                    >
                        <Sidebar />
                    </Box>
                </Grid>
            </Box>
		);
	}
}

export default Recipes;