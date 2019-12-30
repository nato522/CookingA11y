import React, {Component} from 'react';
import modelInstance from "../../data/DataModel"
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishType: "bla",
        };
    }

    // componentDidMount() {
    //     this.handleUpdateName();
    // }
    //
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.dishType !== this.state.dishType) {
    //         this.handleUpdateName();
    //     }
    // }
    //
    // handleUpdateName = () => {
    //     console.log("===================")
    //     this.setState({ dishType: this.props.dishType})
    // }


    render() {

        console.log("TYPE: " + this.props.dishType)
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
                        <Box pad="medium" background="light-2">
                            <Text>{this.state.dishType}</Text>
                        </Box>
                    </AccordionPanel>
                    <AccordionPanel label="First Dish">
                        <Box pad="medium" background="light-2">
                            <Text>Two</Text>
                        </Box>
                    </AccordionPanel>
                    <AccordionPanel label="Second Dish">
                        <Box pad="medium" background="light-2">
                            <Text>Three</Text>
                        </Box>
                    </AccordionPanel>
                    <AccordionPanel label="Desert">
                        <Box pad="medium" background="light-2">
                            <Text>Four</Text>
                        </Box>
                    </AccordionPanel>
                </Accordion>
            </Box>
        );
    }
}

export default Sidebar;