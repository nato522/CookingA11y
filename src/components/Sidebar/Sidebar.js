import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import {Accordion, AccordionPanel, Box, Button, Heading, Text} from 'grommet';
import './Sidebar.css';
import {STARTER, FIRST_DISH, SECOND_DISH, DESSERT} from "../../data/Constants"
import {FormTrash} from "grommet-icons";
import {Link} from "react-router-dom";

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startersList: []
        }
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
            selectedDishes: modelInstance.getSelectedDishes()
        });
    }

    deleteRecipeFromMenu(dishType, dishTitle) {
        modelInstance.deleteDishFromMenu(dishType, dishTitle);
    }

    render() {
        let selectedDishMap = modelInstance.getSelectedDishes();

        let starters = selectedDishMap.get(STARTER).map(starter => (
            <Box pad="medium" background="light-2" key={starter}>
                <Text>
                    <Link to={"/recipe_details/" + starter.split("/")[1]}>
                        {starter.split("/")[0]}
                    </Link>
                    <Button onClick={() => this.deleteRecipeFromMenu(STARTER, starter)}>
                        <FormTrash color='brand'/>
                    </Button>
                </Text>

            </Box>
        ));

        let firstDishes = selectedDishMap.get(FIRST_DISH).map(firstDishesTitle => (
            <Box pad="medium" background="light-2" key={firstDishesTitle}>
                <Text>
                    {firstDishesTitle.split("/")[0]}
                    <Button onClick={() => this.deleteRecipeFromMenu(FIRST_DISH, firstDishesTitle)}>
                        <FormTrash color='brand'/>
                    </Button>
                </Text>
            </Box>
        ));

        let secondDishes = selectedDishMap.get(SECOND_DISH).map(secondDishesTitle => (
            <Box pad="medium" background="light-2" key={secondDishesTitle}>
                <Text>
                    {secondDishesTitle.split("/")[0]}
                    <Button onClick={() => this.deleteRecipeFromMenu(SECOND_DISH, secondDishesTitle)}>
                        <FormTrash color='brand'/>
                    </Button>
                </Text>
            </Box>
        ));

        let desserts = selectedDishMap.get(DESSERT).map(dessertTitle => (
            <Box pad="medium" background="light-2" key={dessertTitle.split("/")[1]}>
                <Text>
                    {dessertTitle.split("/")[0]}
                    <Button onClick={() => this.deleteRecipeFromMenu(DESSERT, dessertTitle)}>
                        <FormTrash color='brand'/>
                    </Button>
                </Text>
            </Box>
        ));

        return(
            <Box
                as="aside"
                background="white"
                round="all"
            >
                <Heading
                    className="border-bottom"
                >
                    My Menu
                </Heading>
                <Accordion >
                    <AccordionPanel label= {STARTER}>
                        {starters}
                    </AccordionPanel>
                    <AccordionPanel label={FIRST_DISH}>
                        {firstDishes}
                    </AccordionPanel>
                    <AccordionPanel label={SECOND_DISH}>
                        {secondDishes}
                    </AccordionPanel>
                    <AccordionPanel label={DESSERT}>
                        {desserts}
                    </AccordionPanel>
                </Accordion>
            </Box>
        );
    }
}

export default Sidebar;