import modelInstance from "../../data/DataModel"
import Store from '../../data/Store';

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Box, Button, Grid, Main, Paragraph,
    ResponsiveContext
} from 'grommet';
import { Add } from 'grommet-icons';

import SearchBox from '../../components/SearchBox/SearchBox';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import EmptySearch from '../../components/EmptySearch/EmptySearch';

import "./Recipes.css";

const limit = 9;
let offset = 0;

class Recipes extends Component {
	constructor(props) {
		super(props);
        this.state = {
            recipes: Store.searchedInfo.recipes || [],
            total: Store.searchedInfo.total || null,
            baseURI: Store.searchedInfo.baseURI || null,
            query: Store.searchedInfo.query || null,
            filters: Store.searchedInfo.filters || {
                complexSearch: false,
                diets: [],
                intolerances: [],
                mealType: null,
                maxReadyTime: null,
            }
        }
    }

    /**
     *  Get recipes when initialized
     */
	componentDidMount() {
        if(this.state.recipes.length === 0){
            modelInstance.getRecipes(limit, offset)
                .then(data => {
                    this.setState({
                        recipes: (this.state.recipes.length === 0 ? data.results : this.state.recipes),
                        total: (this.state.total === null ? data.totalResults : this.state.total),
                        baseURI: (this.state.baseURI === null ? data.baseUri : this.state.baseURI),
                    });
                    Store.searchedInfo = this.state;
                }).catch(error => {
                    console.error(error);
                });
        }
    }

    /**
     *  Triggered by the "see more" button
     */
    getMoreRecipes = () =>{
        offset += (this.state.recipes.length + 1);
        const query = this.state.query;

        if (this.state.filters.complexSearch){
            const filters = this.state.filters;

            modelInstance.getComplexRecipes(limit, offset, query, filters)
                .then(data => {
                    const old_recipes = this.state.recipes.slice();
                    this.setState({
                        recipes: old_recipes.concat(data.results),
                    });
                    offset = 0;
                    Store.searchedInfo.recipes = this.state.recipes;
                }).catch(error => {
                    console.error(error);
                });
        } else {
            modelInstance.getRecipes(limit, offset, query)
                .then(data => {
                    const old_recipes = this.state.recipes.slice();
                    this.setState({
                        recipes: old_recipes.concat(data.results),
                    });
                    offset = 0;
                    Store.searchedInfo.recipes = this.state.recipes;
                }).catch(error => {
                    console.error(error);
                });
        }
    }

    /**
     * Trigerred when user uses the input at the top of the page
     */
    searchRecipe = (e) => {
        const query = e.target.elements.query.value;

        modelInstance.getRecipes(limit, offset, query)
			.then(data => {
                this.setState({
                    recipes: data.results,
                    total: data.totalResults,
                    baseURI: data.baseUri,
                    query: query,
                    filters:{
                        complexSearch: false,
                    },
                });
                Store.searchedInfo = this.state;
			}).catch(error => {
                console.error(error);
            });
    }

    handleFilters = (e) =>{
        let allFilters;
        let filterDiets = [];
        let filterIntolerances = [];
        let filterMaxReadyTime = null;
        let filterMealType = null;

        const query = e.target.elements.advancedQuery.value;

        if (e.target.elements.vegan.checked){ filterDiets = filterDiets.concat(e.target.elements.vegan.name); }
        if (e.target.elements.vegetarian.checked){ filterDiets = filterDiets.concat(e.target.elements.vegetarian.name); }
        if (e.target.elements.pescetarian.checked){ filterDiets = filterDiets.concat(e.target.elements.pescetarian.name); }

        if (e.target.elements.dairy.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.dairy.name); }
        if (e.target.elements.egg.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.egg.name); }
        if (e.target.elements.gluten.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.gluten.name); }
        if (e.target.elements.grain.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.grain.name); }
        if (e.target.elements.peanut.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.peanut.name); }
        if (e.target.elements.seafood.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.seafood.name); }
        if (e.target.elements.sesame.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.sesame.name); }
        if (e.target.elements.shellfish.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.shellfish.name); }
        if (e.target.elements.soy.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.soy.name); }
        if (e.target.elements.sulfite.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.sulfite.name); }
        if (e.target.elements.tree_nut.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.tree_nut.name); }
        if (e.target.elements.wheat.checked){ filterIntolerances = filterIntolerances.concat(e.target.elements.wheat.name); }

        if (e.value.cookingTime){filterMaxReadyTime="30";}
        if (e.value.mealType){filterMealType=e.value.mealType;}

        allFilters = {
            complexSearch: true,
            diets: filterDiets,
            intolerances: filterIntolerances,
            mealType: filterMealType,
            maxReadyTime: filterMaxReadyTime,
        }

        return [query, allFilters];
    }

    /**
     * Trigerred when user uses the input at the "advanced search" modal
     */
    searchComplexRecipe = (e) => {
        const query = this.handleFilters(e)[0];
        const filters = this.handleFilters(e)[1];

        modelInstance.getComplexRecipes(limit, offset, query, filters)
			.then(data => {
                this.setState({
                    recipes: data.results,
                    total: data.totalResults,
                    baseURI: null,
                    query: query,
                    filters: filters
                });
                Store.searchedInfo = this.state;
			}).catch(error => {
                console.error(error);
            });
    }

	render() {
        let result_recipes = this.state.recipes.map((recipe, i) => {
            return(
                <Box as="li" key={recipe.id}>
                    <Link to={"/recipe_details/" + recipe.id}>
                        <RecipeCard key={i}
                            recipeID={recipe.id}
                            imageURL={(this.state.baseURI ? (`${this.state.baseURI}${recipe.imageUrls[0]}`) : recipe.image)}
                            title={recipe.title}
                            cookingTime={recipe.readyInMinutes}
                        />
                    </Link>
                </Box>
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
                        <Main id="mainContent">
                            <Box
                                gridArea='searchbox'
                            >
                                <SearchBox
                                    search={this.searchRecipe}
                                    advancedSearch={this.searchComplexRecipe}
                                />
                            </Box>
                            {(this.state.total === 0) && <EmptySearch />}
                            {(size === "small") && (this.state.total > 0) &&
                                <Box gridArea="recipes" margin="auto">
                                    { this.state.total && <Paragraph>Showing {this.state.recipes.length} recipes out of {this.state.total}!</Paragraph>}
                                    <Grid
                                        as="ul"
                                        columns={["full"]}
                                    >
                                        { result_recipes }
                                    </Grid>
                                </Box>
                            }
                            {(size === "medium") && (this.state.total > 0) &&
                                <Box gridArea="recipes" margin="auto">
                                    { this.state.total && <Paragraph>Showing {this.state.recipes.length} recipes out of {this.state.total}!</Paragraph>}
                                    <Grid
                                        as="ul"
                                        columns={["1/3", "1/3", "1/3"]}
                                    >
                                        { result_recipes }
                                    </Grid>
                                </Box>
                            }
                            {(size === "large") && (this.state.total > 0) &&
                                <Box gridArea="recipes" margin="auto">
                                    { this.state.total && <Paragraph>Showing {this.state.recipes.length} out of {this.state.total} recipes!</Paragraph>}
                                    <Grid
                                        as="ul"
                                        columns={["1/4", "1/4", "1/4", "1/4"]}
                                    >
                                        { result_recipes }
                                    </Grid>
                                </Box>
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
                        </Main>
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