import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Grommet } from 'grommet';

import modelInstance from "./data/DataModel";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/FooterWebpage/FooterWebpage"
import SkipToContent from "./components/SkipToContent/SkipToContent";

import Homepage from "./views/Homepage/Homepage";
import Recipes from "./views/Recipes/Recipes";
import RecipeDetails from "./views/RecipeDetails/RecipeDetails";
import AddRecipe from "./views/AddRecipe/AddRecipe";
import Recommendations from "./views/Recommendations/Recommendations";

import Theme from "./styles/Theme";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grommet
            className="App"
            theme={Theme}
            full={true}
            >
                <SkipToContent/>
                <NavigationBar model={modelInstance}/>
                <Route exact path="/" component={Homepage}/>
                <Route
                    path="/recipes"
                    render={(props) => <Recipes {...props} model={modelInstance} />}
                />
                <Route
                    path="/recipe_details/:id"
                    render={(props) => <RecipeDetails {...props} model={modelInstance} />}
                />
				<Route
					path="/recommendations"
					render={(props) => <Recommendations {...props} model={modelInstance} />}
				/>
                <Route path="/addRecipe" component={AddRecipe}/>
                <Footer/>
            </Grommet>
        );
    }
}

export default App;

