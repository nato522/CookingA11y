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
                                // background="#163D57"
                                background="#FFCA58"
                                pad="small"
                                elevation="medium"
                                align="center"
                            >
                                <Link to="/">
                                    <Heading level="1" margin="none">GoBananas</Heading>
                                </Link>
                                <Box direction="row" gap="medium" align="center">
									<Link to="/recipes">
                                    	Recipes
									</Link>
									<Link to="/recommendations">
                                    	Recommendations
									</Link>
									<Link to="/addRecipe">
                                    	Add your recipe
									</Link>
                                    <CustomMenu model={this.props.model} />
                                </Box>
                            </Header>
                        }
                        {(size === 'small' ) &&
                            <Header background="#163D57">
                                <Link to="/">Go Bananas</Link>
                                <Box direction="row" pad="medium" align="center">
                                    <Menu label="Menu" items={[
										{ label: <Link to="/recipes">Recipes</Link>},
                                        { label: <Link to="/recommendations">Recommendations</Link>},
                                        { label: <Link to="/addRecipe">Add your recipe</Link>},
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