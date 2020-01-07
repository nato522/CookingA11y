import React, { Component } from "react";
import {Link} from "react-router-dom";

import "./NavigationBar.css";

import {
    Anchor, Box, Grommet, Header, Heading, Menu,
    ResponsiveContext
} from 'grommet';

import CustomMenu from '../MyRecipesMenu/MyRecipesMenu';

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

class NavigationBar extends Component {
	render() {
		return (
			<Grommet theme={theme}>
				<ResponsiveContext.Consumer>
					{size => (
						<Box as="nav">
                        {(size !== 'small' ) &&
                            <Header
                                background="#FFCA58"
                                elevation="medium"
                                align="center"
                                pad={
                                    {"horizontal": "small"}
                                    }
                            >
                                <Link to="/">
                                    <Heading level="1" margin="none">GoBananas</Heading>
                                </Link>
                                <Box as="ul" direction="row" gap="medium" align="center">
                                    <Box as="li">
                                        <Link to="/recipes">
                                            Recipes
                                        </Link>
                                    </Box>
                                    <Box as="li">
                                        <Link to="/recommendations">
                                            Recommendations
                                        </Link>
                                    </Box>
                                    <Box as="li">
                                        <Link to="/addRecipe">
                                            Add your recipe
                                        </Link>
                                    </Box>
                                    <Box as="li">
                                        <CustomMenu model={this.props.model} />
                                    </Box>
                                </Box>
                            </Header>
                        }
                        {(size === 'small' ) &&
                            <Header
                                background="#FFCA58"
                                elevation="medium"
                                align="center"
                                pad={
                                    {"horizontal": "small"}
                                    }
                            >
                                <Link to="/">
                                    <Heading level="1" margin="none">GoBananas</Heading>
                                </Link>
                                <Box as="ul" direction="row" align="center">
                                    <Box as="li">
                                        <Menu label="Menu" items={[
                                            { label: <Link to="/recipes">Recipes</Link>},
                                            { label: <Link to="/recommendations">Recommendations</Link>},
                                            { label: <Link to="/addRecipe">Add your recipe</Link>},
                                            ]} />
                                    </Box>
                                    <Box as="li">
                                        <CustomMenu model={this.props.model} />
                                    </Box>
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