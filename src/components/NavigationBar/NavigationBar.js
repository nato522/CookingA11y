import React, { Component } from "react";
import "./NavigationBar.css";
import {Anchor, Box, Heading, Grommet, ResponsiveContext} from 'grommet';

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
			<Grommet theme={theme} full>
				<ResponsiveContext.Consumer>
					{size => (
						<Box fill>
							<AppBar>
								<Heading level='3' margin='none'>Go Bananas Logo</Heading>
								<Anchor label="Recipes" href="#" />
								<Anchor label="Recommendations" href="#" />
								<Anchor label="Add your recipe" href="#" />
							</AppBar>
							<Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
								<Box flex align='center' justify='center'>
									app body
								</Box>
							</Box>
						</Box>
					)}
				</ResponsiveContext.Consumer>
			</Grommet>
		);
	}
}

export default NavigationBar;