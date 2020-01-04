import React, { Component } from "react";

import {
    Box, Grid, Heading, Paragraph, ResponsiveContext
} from 'grommet';

import burger from "../../images/burger.jpg"

import "./AddRecipe.css";

class AddRecipe extends Component {
    state = {}

	render() {
		return(
			<ResponsiveContext.Consumer>
				{ size => (
					<Grid as="div" justify="stretch"
						areas={[
							{ name: "cover", start: [0, 0], end: [2, 0] },
							{ name: "recipe_form", start: [0, 1], end: [2, 1] }
						]}
						columns={["flex"]}
						rows={["small", "auto"]}
					>
						<Box
							gridArea="cover"
							background={`url(${burger})`}
						>
							<Heading level='1' alignSelf='center' color="blue">
								Welcome
							</Heading>
						</Box>
						{(size === 'large') &&
							<Grid
								gridArea="recipe_form"
								background="red"
							>
                                <Paragraph>random text</Paragraph>
							</Grid>
						}
					</Grid>
				)}
			</ResponsiveContext.Consumer>
	);
	}
}

export default AddRecipe;