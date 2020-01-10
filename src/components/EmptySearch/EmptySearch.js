import React from 'react';
import { Box, Paragraph } from 'grommet';
import Emoji from 'a11y-react-emoji'


const EmptySearch = () => (
    <Box margin={{"top": "medium"}}>
        <Paragraph>
            <Emoji symbol="🕵️‍" label="a detective searching for your recipes"/>
            Sorry we can't find any recipes for your search
        </Paragraph>
    </Box>
)

export default EmptySearch;