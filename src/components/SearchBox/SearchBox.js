import React from 'react';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import './SearchBox.css';

const SearchBox = (props) => (
    <Box>
        <Box
            direction="row-responsive"
            margin="auto"
            className="search-input"
        >
            <Form onSubmit={props.search}>
                <FormField name="query" label="Search a recipe:">
                    <TextInput
                        name="query"
                        placeholder="type here"
                    />
                </FormField>
                <Button
                    icon={<Search />}
                    type="submit"
                    label="Search"
                />
            </Form>
        </Box>
        <Box>
            <Text size="small" margin="auto">Advanced search</Text>
        </Box>
    </Box>
)

export default SearchBox;