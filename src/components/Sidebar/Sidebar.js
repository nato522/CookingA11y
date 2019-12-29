import React from 'react';
import { Accordion, AccordionPanel, Box,
    Heading, Text } from 'grommet';
import './Sidebar.css';

const Sidebar = () => (
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
                <Text>One</Text>
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
)

export default Sidebar;