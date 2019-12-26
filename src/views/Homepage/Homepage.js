import modelInstance from "../../data/DataModel"
import React, { Component } from "react";
import "./Homepage.css";
import {Box, Grommet} from 'grommet';


class Homepage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			joke: ""
		}
	}

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

	render() {
		return(
			<Grommet>
				<Box flex align='center' justify='center'>
					{this.state.joke}
				</Box>
			</Grommet>
		);
	}
}

export default Homepage;