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

const theme = {
	global: {
		colors: {
      brand: 'black'
    },
		font: {
			family: 'Roboto',
			size: '18px',
      height: '20px',
		},
	},
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Grommet
          className="App"
          theme={theme}
          full={true}
        >
          <SkipToContent/>
          <NavigationBar/>
          <Route exact path="/" component={Homepage}/>
          <Route path="/recipes" component={Recipes}/>
          <Route
              path="/recipe_details/:id"
              render={(props) => <RecipeDetails {...props} model={modelInstance} />}
          />
          <Footer/>
        </Grommet>
    );
  }
}

export default App;

