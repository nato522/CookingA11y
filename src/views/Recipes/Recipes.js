import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import "./Recipes.css";
import {Box, Button, Grommet} from 'grommet';
import { Add } from 'grommet-icons';
import SearchBox from '../../components/SearchBox/SearchBox';

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
			<Grommet>
				<Box flex align='center' justify='center'>
                    <SearchBox />
                    { this.state.recipes.map((recipe) => {
                        return(
                            /**
                            *   TODO: recipeCard with the basic info
                            *   <RecipeCard key={recipe.id} recipe={recipe} />
                            */
                            <div key={recipe.id}>
                                <img src={`https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg`} alt={recipe.title}/>
                                <h2>{recipe.title}</h2>
                                <p>Ready in {recipe.readyInMinutes} minutes!</p>
                            </div>
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
			</Grommet>
		);
	}
}

export default Recipes;