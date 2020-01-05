import React, { Component } from 'react';
import { Menu } from 'grommet';

import modelInstance from "../../data/DataModel";

class CustomMenu extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    // when the components are loaded, we add the observer
    componentDidMount() {
        this.props.model.addObserver(this);
    }

    // this is called when component is removed from the DOM
    // good place to remove observer
    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update() {
        this.setState({
            customRecipes: modelInstance.getCustomRecipes()
        });
    }

    render(){
        let customRecipes = modelInstance.getCustomRecipes();
        let menu_items = [];
        for (let index = 0; index < customRecipes.length; index++) {
            const item = {
                label: customRecipes[index].recipe.title
            }
            menu_items = menu_items.concat(item);
        }
        return(
            <Menu
                label="My recipes"
                items={menu_items}
            />
        );
    }
}

export default CustomMenu;