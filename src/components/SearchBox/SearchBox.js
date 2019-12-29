import React from 'react';
import { Box, Button, CheckBox, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import './SearchBox.css';

const SearchBox = (props) => (
    <Box>
        <Box
            direction="row-responsive"
            margin="auto"
            className="search-input"
        >
            <TextInput
                className="search-input__input"
                label="label"
                placeholder="type here"
                name="query"
            />
            <Button
                className="search-input__button"
                icon={<Search />}
                label="Search"
                onClick={props.getNewQuery}
            />
        </Box>
        <Box
            className="search-filters"
            margin="auto"
            background="white"
            border="all"
            elevation="medium"
        >
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