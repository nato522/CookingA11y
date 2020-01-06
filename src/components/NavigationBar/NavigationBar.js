import React, { Component } from "react";
import {Link} from "react-router-dom";

import "./NavigationBar.css";

import {
    Anchor, Box, Grommet, Header, Heading, Menu,
    ResponsiveContext
} from 'grommet';

import CustomMenu from '../MyRecipesMenu/MyRecipesMenu';

/* theme & AppBar need to be moved in NavigationBar.css or another file for the components folder*/
const theme = {
    global: {
        colors: {
            brand: '#341A04',
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
        background= '#163D57'
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
						<Box as="nav">
                        {(size !== 'small' ) &&
                            <Header
                                background="#163D57"
                                pad="small"
                                elevation="medium"
                                align="center"
                            >
                                <Anchor href="/">
                                    <Heading level="1">GoBananas</Heading>
                                </Anchor>
                                <Box direction="row" pad="medium" gap="medium" align="center">
                                    <Anchor label="Recipes" href="/recipes"/>
                                    <Anchor label="Recommendations" href="/recommendations"/>
                                    <Anchor label="Add your recipe" href="/addRecipe"/>
                                    <CustomMenu model={this.props.model} />
                                </Box>
                            </Header>
                        }
                        {(size === 'small' ) &&
                            <Header background="#163D57">
                                <Anchor label="GoBananas" href="/"/>
                                <Box direction="row" pad="medium" align="center">
                                    <Menu label="Menu" items={[
                                        { label: <Anchor label="Recipes" href="/recipes"/> },
                                        { label: <Anchor label="Recommendations" href="/recommendations"/> },
                                        { label: <Anchor label="Add your recipe" href="/addRecipe"/> },
                                        ]} />
                                    <CustomMenu model={this.props.model} />
                                </Box>
                            </Header>
                        }
                        </Box>
					)}
				</ResponsiveContext.Consumer>
			</Grommet>
		);
	}
}

export default NavigationBar;