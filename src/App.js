import React, { Component } from "react";
import {Link, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/FooterWebpage/FooterWebpage"
import SkipToContent from "./components/SkipToContent/SkipToContent";

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
          <Footer/>
          {/*<Route exact path="/" component={NavigationBar}/>*/}
        </div>
    );
  }
}

export default App;

