import React from 'react';
import { Box, Button, CheckBox, Grid, Responsive,
    TextInput } from 'grommet';
import { SearchAdvanced } from 'grommet-icons';

const columns = {
    small: ["auto", "auto"],
    medium: ["auto", "auto", "auto"],
    large: ["auto", "auto", "auto"],
    xlarge: ["auto", "auto", "auto"]
};

const rows = {
    small: ["xsmall", "xsmall", "xsmall"],
    medium: ["xsmall", "xsmall"],
    large: ["xsmall", "xsmall"],
    xlarge: ["xsmall", "xsmall"]
};

const fixedGridAreas = {
    small: [
        {name: "item1", start: [0,0], end: [0,0]},
        {name: "item2", start: [0,1], end: [0,1]},
        {name: "item3", start: [1,0], end: [1,0]},
        {name: "item3", start: [1,1], end: [1,1]},
        {name: "item3", start: [2,0], end: [2,0]},
        {name: "item3", start: [2,1], end: [2,1]}
    ],
    medium: [
        {name: "item1", start: [0,0], end: [0,0]},
        {name: "item2", start: [0,1], end: [0,1]},
        {name: "item3", start: [0,2], end: [0,2]},
        {name: "item3", start: [1,0], end: [1,0]},
        {name: "item3", start: [1,1], end: [1,1]},
        {name: "item3", start: [1,2], end: [1,2]}
    ],
    large: [
        {name: "item1", start: [0,0], end: [0,0]},
        {name: "item2", start: [0,1], end: [0,1]},
        {name: "item3", start: [0,2], end: [0,2]},
        {name: "item3", start: [1,0], end: [1,0]},
        {name: "item3", start: [1,1], end: [1,1]},
        {name: "item3", start: [1,2], end: [1,2]}
    ],
    xlarge: [
        {name: "item1", start: [0,0], end: [0,0]},
        {name: "item2", start: [0,1], end: [0,1]},
        {name: "item3", start: [0,2], end: [0,2]},
        {name: "item3", start: [1,0], end: [1,0]},
        {name: "item3", start: [1,1], end: [1,1]},
        {name: "item3", start: [1,2], end: [1,2]}
    ],
}

const SearchBox = () => (
    <Box>
        <TextInput
            label="label"
            placeholder="type here"
            name="query"
        />
        <Button
            icon={<SearchAdvanced />}
            label="Search"
        />
        <Grid>
            {/*<Responsive
                rows={rows}
                columns={columns}
                gap="small"
                areas={fixedGridAreas}
                margin="medium"
            >
                <CheckBox toggle label="Filter type 1"/>
                <CheckBox toggle label="Filter type 2"/>
                <CheckBox toggle label="Filter type 3"/>
                <CheckBox toggle label="Filter type 4"/>
                <CheckBox toggle label="Filter type 5"/>
                <CheckBox toggle label="Filter type 6"/>
            </Responsive>*/}
            <CheckBox toggle label="Filter type 1"/>
            <CheckBox toggle label="Filter type 2"/>
            <CheckBox toggle label="Filter type 3"/>
            <CheckBox toggle label="Filter type 4"/>
            <CheckBox toggle label="Filter type 5"/>
            <CheckBox toggle label="Filter type 6"/>
        </Grid>
    </Box>
)

export default SearchBox;