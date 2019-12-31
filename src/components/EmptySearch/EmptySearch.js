import React from 'react';
import { Box, Text } from 'grommet';
import Emoji from 'a11y-react-emoji'


const EmptySearch = () => (
    <Box>
        <Text>
            <Emoji symbol="🕵️‍" label="a detective searching for your recipes"/>
            Sorry we can't find any recipes for your search
        </Text>
    </Box>
)

export default EmptySearch;