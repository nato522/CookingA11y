import modelInstance from "../../data/DataModel"
import Store from '../../data/Store';

import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Box, Button, Grid, ResponsiveContext } from 'grommet';
import { Add } from 'grommet-icons';

import SearchBox from '../../components/SearchBox/SearchBox';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Sidebar from '../../components/Sidebar/Sidebar';

import "./Recipes.css";

let limit = 9;
let offset = 0;

class Recipes extends Component {

	constructor(props) {
		super(props);
        this.state = {
            "recipes": Store.searchedRecipes || [],
            "total": null,
            "baseURI": null
        }
    }

	componentDidMount() {
		modelInstance.getRecipes(limit, offset)
			.then(data => {
                this.setState({
                    recipes: (this.state.recipes.length === 0 ? data.results : this.state.recipes),
                    total: (this.state.total === null ? data.totalResults : this.state.total),
                    baseURI: (this.state.baseURI === null ? data.baseUri : this.state.baseURI),
                });
                if (Store.searchedRecipes === null)
                    Store.searchedRecipes = this.state.recipes;
			}).catch(error => {
                console.error(error);
            });
    }

    getMoreRecipes = () =>{
        offset += (this.state.recipes.length + 1);

        modelInstance.getRecipes(limit, offset)
			.then(data => {
                const old_recipes = this.state.recipes.slice();
                this.setState({
                    recipes: old_recipes.concat(data.results),
                });
                offset = 0;
                Store.searchedRecipes = this.state.recipes;
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
        let result_recipes = this.state.recipes.map((recipe, i) => {
            return(
                <Link to={"/recipe_details/" + recipe.id} key={recipe.id}>
                    <RecipeCard key={i}
                        recipeID={recipe.id}
                        imageURL={`${this.state.baseURI}${recipe.imageUrls[0]}`}
                        title={recipe.title}
                        cookingTime={recipe.readyInMinutes}
                    />
                </Link>
            )
        })

		return(
            <ResponsiveContext.Consumer>
                { size => (
                    <Grid
                        as="div"
                        areas={[
                            {name: "searchbox", start: [0,0], end: [1,0]},
                            {name: "recipes", start: [0,1], end: [1,1]},
                            {name: "sidebar", start: [2,0], end: [2,1]},
                        ]}
                        columns={["flex"]}
                        rows={["auto", "auto"]}
                        gap='none'
                    >
                        <Box
                            gridArea='searchbox'
                        >
                            <SearchBox search={this.getNewQuery}/>
                        </Box>
                        {(size === "small") &&
                            <Grid
                                gridArea="recipes"
                                columns={["full"]}
                                margin="auto"
                                gap="medium"
                            >
                                { result_recipes }
                            </Grid>
                        }
                        {(size === "medium") &&
                            <Grid
                                gridArea="recipes"
                                columns={["1/2", "1/2"]}
                                margin="auto"
                                gap="medium"
                            >
                                { result_recipes }
                            </Grid>
                        }
                        {(size === "large") &&
                            <Grid
                                gridArea="recipes"
                                columns={["1/3", "1/3", "1/3"]}
                                margin="auto"
                                gap="medium"
                            >
                                { result_recipes }
                            </Grid>
                        }
                        <Box
                            alignSelf="end"
                            margin="auto"
                        >
                            { this.state.recipes.length < this.state.total && <Button
                                icon={<Add />}
                                label= "See more!"
                                onClick={this.getMoreRecipes}
                            />
                            }
                        </Box>
                        <Box
                            gridArea='sidebar'
                        >
                            <Sidebar model={this.props.model}/>
                        </Box>

                    </Grid>
                )}
            </ResponsiveContext.Consumer>
		);
	}
}

export default Recipes;