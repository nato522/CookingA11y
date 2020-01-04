import React from 'react';
import { Box, Image, Text } from 'grommet';

const RecipeCard = (props) => {
    return(
        <Box
            round="small"
            border="all"
            overflow="hidden"
            responsive={true}
            background="#F7F7F8"
            wrap={true}
            margin="15px"
        >
            <Box
                height="small"
            >
                <Image
                    fit="cover"
                    fill={true}
                    src={`${props.imageURL}`}
                    alt={props.title}
                />
            </Box>
            <Box
                height="auto"
                margin="small"
            >
                <Text size="20px" textAlign="center" weight="bold">{props.title}</Text>
                <Text textAlign="center">Ready in {props.cookingTime} minutes!</Text>
            </Box>
        </Box>
    );
}

export default RecipeCard;