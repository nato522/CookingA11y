import modelInstance from "../../data/DataModel"
import Store from '../../data/Store';
import { RESPONSIVE, RESPONSIVE_AREAS } from '../../data/Constants';

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
import LoadingContent from '../../components/LoadingContent/LoadingContent';

import "./Recipes.css";

const limit = 9;
let offset = 0;

const message = "Loading recipes...";

class Recipes extends Component {
	constructor(props) {
		super(props);
        this.state = {
            isLoading: true,
            isLoadingMore: false,
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
                        isLoading: false,
                        recipes: (this.state.recipes.length === 0 ? data.results : this.state.recipes),
                        total: (this.state.total === null ? data.totalResults : this.state.total),
                        baseURI: (this.state.baseURI === null ? data.baseUri : this.state.baseURI),
                    });
                    Store.searchedInfo = this.state;
                }).catch(error => {
                    console.error(error);
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    loadingMessage = () =>{
        this.setState({
            isLoading: true,
        });
    }

    /**
     *  Triggered by the "see more" button
     */
    getMoreRecipes = () =>{
        offset += (this.state.recipes.length + 1);
        const query = this.state.query;
        this.setState({
            isLoadingMore: true,
        });

        if (this.state.filters.complexSearch){
            const filters = this.state.filters;

            modelInstance.getComplexRecipes(limit, offset, query, filters)
                .then(data => {
                    const old_recipes = this.state.recipes.slice();
                    this.setState({
                        isLoadingMore: false,
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
                        isLoadingMore: false,
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
        this.loadingMessage();

        modelInstance.getRecipes(limit, offset, query)
			.then(data => {
                this.setState({
                    isLoading: false,
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
        this.loadingMessage();

        modelInstance.getComplexRecipes(limit, offset, query, filters)
			.then(data => {
                this.setState({
                    isLoading: false,
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
                    <Link aria-label={`Read the details of "${recipe.title}"`} to={"/recipe_details/" + recipe.id}>
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
                        areas={RESPONSIVE_AREAS["recipes"][size]}
                        columns={["flex"]}
                        rows={RESPONSIVE_AREAS["rows"][size]}
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
                            {this.state.isLoading &&
                                <Box gridArea="recipes" margin="auto">
                                    <LoadingContent message={message}/>
                                </Box>
                            }
                            {(this.state.total === 0 && !this.state.isLoading) &&
                                <Box gridArea="recipes" margin="auto">
                                    <EmptySearch />
                                </Box>
                            }
                            {(this.state.total > 0 && !this.state.isLoading) &&
                                <Box gridArea="recipes" margin="auto">
                                    { this.state.total && <Paragraph role="status">Showing {this.state.recipes.length} recipes out of {this.state.total}!</Paragraph>}
                                    <Grid
                                        as="ul"
                                        columns={RESPONSIVE[size]}
                                    >
                                        { result_recipes }
                                    </Grid>
                                </Box>
                            }
                            <Box
                                alignSelf="end"
                                margin="auto"
                            >
                                {this.state.isLoadingMore &&
                                            <LoadingContent />
                                        }
                                { ((this.state.recipes.length < this.state.total) && !this.state.isLoading && !this.state.isLoadingMore) && <Button
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