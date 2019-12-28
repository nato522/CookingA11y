import React, { Component } from "react";
import "./NavigationBar.css";
import {Anchor, Box, Heading, Grommet, ResponsiveContext} from 'grommet';
import {Link} from "react-router-dom";

/* theme & AppBar need to be moved in NavigationBar.css or another file for the components folder*/
const theme = {
  global: {
    colors: {
      brand: 'black',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='evenly'
        background= 'grey'
        pad={{ left: 'medium', right: 'small', vertical: 'small', top: 'medium', bottom: 'medium'}}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
);


class NavigationBar extends Component {

	render() {
		return (
			<Grommet theme={theme}>
				<ResponsiveContext.Consumer>
					{size => (
						<Box fill>
							<AppBar>
								<Heading level='3' margin='none'>Go Bananas Logo</Heading>
								{/*<Link to="/recipes">*/}
									<Anchor label="Recipes" href="#" />
								{/*</Link>*/}
								<Anchor label="Recommendations" href="#" />
								<Anchor label="Add your recipe" href="#" />
							</AppBar>
						</Box>
					)}
				</ResponsiveContext.Consumer>
			</Grommet>
		);
	}
}

export default NavigationBar;