import React, { Component } from 'react';
import { Menu } from 'grommet';

class CustomMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            state: false,
        }
    }
    render(){
        const my_recipes = JSON.parse(localStorage.getItem('my_recipes')) || [];
        let menu_items = [];
        for (let index = 0; index < my_recipes.length; index++) {
            const item = {
                label: my_recipes[index].recipe.title
            }
            menu_items = menu_items.concat(item);
        }
        return(
            <Menu
                label="Menu"
                items={menu_items}
            />
        );
    }
}

export default CustomMenu;