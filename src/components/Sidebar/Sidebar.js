import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);
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
            selectedDishes: modelInstance.getSelectedDish()
        });
    }

    renderDishInMenu(dishType) {
        let selectedDish = modelInstance.getSelectedDish();

        if(selectedDish.dishType === dishType) {
            return(
                <Box pad="medium" background="light-2">
                   <Text>{selectedDish.dishTitle}</Text>
                </Box>
            )
        }
    }

    render() {
        let selectedDish = modelInstance.getSelectedDish();
        let dishType = selectedDish.dishType
        let dishTitle = selectedDish.dishTitle

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
                    <AccordionPanel label="Starter">
                        {this.renderDishInMenu("Starter")}
                    </AccordionPanel>
                    <AccordionPanel label="First Dish">
                        {this.renderDishInMenu("First Dish")}
                    </AccordionPanel>
                    <AccordionPanel label="Second Dish">
                        {this.renderDishInMenu("Second Dish")}
                    </AccordionPanel>
                    <AccordionPanel label="Desert">
                        {this.renderDishInMenu("Desert")}
                    </AccordionPanel>
                </Accordion>
            </Box>
        );
    }
}

export default Sidebar;