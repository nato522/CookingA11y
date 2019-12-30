import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import './Sidebar.css';
import {STARTER, FIRST_DISH, SECOND_DISH, DESERT} from "../../data/Constants"

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


    render() {
        let selectedDishMap = modelInstance.getSelectedDishes();

        let starters = selectedDishMap.get(STARTER).map(starterTitle => (
            <Box pad="medium" background="light-2">
                <Text>{starterTitle}</Text>
            </Box>
        ));

        let firstDishes = selectedDishMap.get(FIRST_DISH).map(firstDishesTitle => (
            <Box pad="medium" background="light-2">
                <Text>{firstDishesTitle}</Text>
            </Box>
        ));

        let secondDishes = selectedDishMap.get(SECOND_DISH).map(secondDishesTitle => (
            <Box pad="medium" background="light-2">
                <Text>{secondDishesTitle}</Text>
            </Box>
        ));

        let deserts = selectedDishMap.get(DESERT).map(desertTitle => (
            <Box pad="medium" background="light-2">
                <Text>{desertTitle}</Text>
            </Box>
        ));

        return(
            <Box
                background="white"
                round="all"
            >
                <Heading
                    className="border-bottom"
                >
                    My Menu
                </Heading>
                <Accordion>
                    <AccordionPanel label= {STARTER}>
                        {starters}
                    </AccordionPanel>
                    <AccordionPanel label={FIRST_DISH}>
                        {firstDishes}
                    </AccordionPanel>
                    <AccordionPanel label={SECOND_DISH}>
                        {secondDishes}
                    </AccordionPanel>
                    <AccordionPanel label={DESERT}>
                        {deserts}
                    </AccordionPanel>
                </Accordion>
            </Box>
        );
    }
}

export default Sidebar;