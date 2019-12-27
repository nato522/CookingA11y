import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import "./Recipes.css";
import {Box, Button, Grid} from 'grommet';
import { Add } from 'grommet-icons';
import SearchBox from '../../components/SearchBox/SearchBox';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

let limit = 9;
let offset = 0;

class Recipes extends Component {

	constructor(props) {
		super(props);
		this.state = {
            recipes: [],
            total: 0,
        }
	}
/*
	componentDidMount() {
		modelInstance.getRecipes(limit, offset)
			.then(data => {
                console.log(data);
                this.setState({
                    recipes: data.results,
                    total: data.totalResults,
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

	render() {
		return(
            <div>
                <Box flex >
                    <SearchBox />
                    { this.state.recipes.map((recipe) => {
                        return(
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        )
                    })}
                    { this.state.recipes.length < this.state.total && <Button
                        icon={<Add />}
                        label= "See more!"
                        onClick={this.getMoreRecipes}
                    />
                    }
                </Box>
                <Box>
                    {/* TODO: <Sidebar />*/}
                </Box>
            </div>
		);
	}
}

export default Recipes;