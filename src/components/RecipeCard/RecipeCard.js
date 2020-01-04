import React from 'react';
import { Box, Image, Text } from 'grommet';

const RecipeCard = (props) => {
    return(
        <Box
            width='300px'
            height="360px"
            round="small"
            border="all"
            overflow="hidden"
            responsive={true}
            background="#F7F7F8"
        >
            <Box height="250px" width="301px">
                <Image
                    fit="cover"
                    src={`${props.imageURL}`}
                    alt={props.title}
                />
            </Box>
            <Box>
                <Text size="20px" textAlign="center" weight="bold">{props.title}</Text>
                <Text textAlign="center">Ready in {props.cookingTime} minutes!</Text>
            </Box>
        </Box>
    );
}

export default RecipeCard;