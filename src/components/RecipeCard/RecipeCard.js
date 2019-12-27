import React from 'react';
import { Heading, Image, Paragraph } from 'grommet';

const RecipeCard = (props) => {
    return(
        <div>
            <Image
                src={`https://spoonacular.com/recipeImages/${props.recipe.id}-90x90.jpg`}
                alt={props.recipe.title}
            />
            <Heading level="2">{props.recipe.title}</Heading>
            <Paragraph>Ready in {props.recipe.readyInMinutes} minutes!</Paragraph>
        </div>
    );
}

export default RecipeCard;