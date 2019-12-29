import React, { Component } from "react";
import {Route} from "react-router-dom";
import modelInstance from "./data/DataModel";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/FooterWebpage/FooterWebpage"
import SkipToContent from "./components/SkipToContent/SkipToContent";
import Homepage from "./views/Homepage/Homepage";
import Recipes from "./views/Recipes/Recipes";
import RecipeDetails from "./views/RecipeDetails/RecipeDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="App">
          <SkipToContent/>
          <NavigationBar/>
          <Route exact path="/" component={Homepage}/>
          <Route path="/recipes" component={Recipes}/>
          <Route
              path="/recipe_details/:id"
              render={(props) => <RecipeDetails {...props} model={modelInstance} />}
          />
          <Footer/>
        </div>
    );
  }
}

export default App;

