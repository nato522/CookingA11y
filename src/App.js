import React, { Component } from "react";
import {Link, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/FooterWebpage/FooterWebpage"
import SkipToContent from "./components/SkipToContent/SkipToContent";
import Homepage from "./views/Homepage/Homepage";
import Recipes from "./views/Recipes/Recipes";

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
          <Footer/>
        </div>
    );
  }
}

export default App;

