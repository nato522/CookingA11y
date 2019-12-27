import React from 'react';
import { Box, Heading, Image, Paragraph } from 'grommet';

const RecipeCard = (props) => {
    return(
        <Box
            width="medium"
            height="medium"
            round="small"
            border="all"
            flex="grow"
            overflow="auto"
            responsive="true"
        >
            <Box
            >
                <Image
                    fit="cover"
                    src={`https://spoonacular.com/recipeImages/${props.recipe.imageUrls[0]}`}
                    alt={props.recipe.title}
                />
            </Box>
            <Box>
                <Heading level="2">{props.recipe.title}</Heading>
                <Paragraph>Ready in {props.recipe.readyInMinutes} minutes!</Paragraph>
            </Box>
        </Box>
    );
}

export default RecipeCard;