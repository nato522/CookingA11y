import React, { Component } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
} from "grommet";

// notice that this is not named Card.
// it is not generic. it is a card that works well for restaurant reviews
// the implementation is quite simple, so converting this to anything else is really easy

const TestCard = (props) => {
    return (
        <Box round="xxsmall" elevation="small" overflow="hidden" height="100%">
            <Box height="small">
                <Image src={`${props.imageURL}`} fit="cover" />
            </Box>
            <Box pad={{ horizontal: "small" }}>
                <Box
                    margin={{ top: "small" }}
                    direction="row"
                    align="center"
                    justify="between"
                >
                    <Box>
                    <Heading level="3" margin="none">
                        {props.title}
                    </Heading>
                    </Box>
                </Box>
                <Text
                    size="medium"
                    color="dark-5"
                    margin={{ vertical: "small" }}
                    truncate
                >
                    Ready in {props.cookingTime} minutes!
                </Text>
            </Box>
        </Box>
    );
}

export default TestCard;
