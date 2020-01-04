import React, { Component } from "react";
import {Link} from "react-router-dom";

import "./NavigationBar.css";

import {Anchor, Box, Heading, Grommet, Menu, ResponsiveContext} from 'grommet';

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

const CustomMenu = () => {
    const my_recipes = JSON.parse(localStorage.getItem('my_recipes'));
    let menu_items = [];
    for (let index = 0; index < my_recipes.length; index++) {
        const item = {
            label: my_recipes[index].recipe.title
        }
        menu_items = menu_items.concat(item);
    }
    return (<Menu
        label="Menu"
        items={menu_items}
    />)

}

class NavigationBar extends Component {
	render() {
		return (
			<Grommet theme={theme}>
				<ResponsiveContext.Consumer>
					{size => (
						<Box fill>
							<AppBar>
                                <Link to="/">
                                <Heading level='1' margin='none'>Go Bananas Logo</Heading>
                                </Link>
                                <Link to="/recipes">
                                    Recipes
                                </Link>
                                <Anchor label="Recommendations" href="#" />
                                <Link to="/addRecipe">
                                    Add your recipe
                                </Link>
                                <CustomMenu />
							</AppBar>
						</Box>
					)}
				</ResponsiveContext.Consumer>
			</Grommet>
		);
	}
}

export default NavigationBar;