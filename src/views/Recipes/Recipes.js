import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import "./Recipes.css";
import {Box, Grommet} from 'grommet';


class Recipes extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

    /*
	componentDidMount() {
		modelInstance.getRandomFoodJoke()
			.then(joke => {
				this.setState({
					joke: joke.text
				})
			}).catch(error => {
                console.error(error);
            });
    }
    */

	render() {
		return(
			<Grommet>
				<Box flex align='center' justify='center'>
                    Recipes page
				</Box>
			</Grommet>
		);
	}
}

export default Recipes;