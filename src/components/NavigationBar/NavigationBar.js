import React, { Component } from "react";
import "./NavigationBar.css";
import {Anchor, Box, Button, Heading, Header, Grommet, Menu, ResponsiveContext} from 'grommet';

/* theme & AppBar need to be moved in NavigationBar.css*/
const theme = {
  global: {
    colors: {
      brand: '#228BE6',
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
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
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
							{/*<AppBar>*/}
							{/*	<Heading level='3' margin='none'>Go Bananas Logo</Heading>*/}
							{/*	<Heading level='2' margin='none'>Go Bananas Logo</Heading>*/}
							{/*</AppBar>*/}
							{/*<AppBar>*/}
							{/*	<Heading level='3' margin='none'>Go Bananas Logo</Heading>*/}
							{/*	<Box direction="row" gap="medium">*/}
							{/*		<Anchor label="Home" href="#" />*/}
							{/*		<Anchor label="Profile" href="#" />*/}
							{/*	</Box>*/}
							{/*</AppBar>*/}
							<Header background="light-4" pad="small">
								<Heading level='3' margin='none'>Go Bananas Logo</Heading>
								<Box direction="row" gap="medium">
									<Anchor label="Home" href="#" />
									<Anchor label="Profile" href="#" />
								</Box>
							</Header>
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