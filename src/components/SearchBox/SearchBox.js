import React from 'react';
import { Box, Button, CheckBox, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

const SearchBox = () => (
    <Box>
        <Box
            direction="row-responsive"
            margin="auto"
        >
            <TextInput
                label="label"
                placeholder="type here"
                name="query"
            />
            <Button
                icon={<Search />}
                label="Search"
            />
        </Box>
        <Box margin="auto">
            <Box
                direction="row-responsive"
                justify="center"
            >
                <CheckBox toggle label="Filter type 1"/>
                <CheckBox toggle label="Filter type 2"/>
                <CheckBox toggle label="Filter type 3"/>
            </Box>
            <Box
                direction="row-responsive"
                justify="center"
            >
                <CheckBox toggle label="Filter type 4"/>
                <CheckBox toggle label="Filter type 5"/>
                <CheckBox toggle label="Filter type 6"/>
            </Box>
        </Box>
    </Box>
)

export default SearchBox;