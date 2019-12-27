import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import "./Recipes.css";
import {Box, Button, Grommet} from 'grommet';

let limit = 9;
let offset = 0;

class Recipes extends Component {

	constructor(props) {
		super(props);
		this.state = {
            recipes: [],
        }
	}

	componentDidMount() {
		modelInstance.getRecipes(limit, offset)
			.then(data => {
                console.log(data);
                this.setState({
                    recipes: data.results,
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
                });
			}).catch(error => {
                console.error(error);
            });
    }

	render() {
		return(
			<Grommet>
				<Box flex align='center' justify='center'>
                    {/* TODO: <SearchBox />*/}
                    {/* TODO: <Filters />*/}
                    {/* TODO: <RecipeCards />*/}
                    {/* TODO: <RecipeCards />*/}
                    {/* TODO: <RecipeCards />*/}
                    { this.state.recipes.map((recipe) => {
                        return(
                            <div key={recipe.id}>
                                <img src={`https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg`} alt={recipe.title}/>
                                <h2>{recipe.title}</h2>
                                <p>Ready in {recipe.readyInMinutes} minutes!</p>
                            </div>
                        )
                    })}
                    <Button
                        label= "See more!"
                        onClick={this.getMoreRecipes}
                    />
				</Box>
                <Box>
                    {/* TODO: <Sidebar />*/}
                </Box>
			</Grommet>
		);
	}
}

export default Recipes;