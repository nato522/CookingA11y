import React, {useState} from 'react';
import {
    Box, Button, CheckBox, Form, FormField, Heading,
    Layer, RadioButtonGroup, TextInput
} from 'grommet';
import { Search, SearchAdvanced } from 'grommet-icons';
import './SearchBox.css';


function AdvancedSearch(props){
    const [show, setShow] = useState();

    return(
        <Box>
            <Button
                className="advancedSearch-button"
                label="Advanced Search"
                onClick={() => setShow(true)}
                plain={true}
            >
            </Button>
            {show && (
                <Layer
                onEsc={() => setShow(false)}
                onClickOutside={() => setShow(false)}
                responsive={true}
                >
                    <Box overflow="auto" margin="auto" pad="40px" width="large">
                        <Heading level="1">Advanced Search</Heading>
                        <Form onSubmit={(e) => {
                                props.advancedSearch(e);
                                setShow(false);
                            }}
                        >
                            <Box>
                                <FormField aria-label="Search by recipe:" name="advancedQuery" placeholder="type here"/>
                            </Box>
                            <Box direction="row-responsive">
                                <Box>
                                    <Heading level="4">Diet:</Heading>
                                    <FormField
                                        component={CheckBox}
                                        name="vegan"
                                        label="Vegan"
                                    >
                                    </FormField>
                                    <FormField
                                        name="vegetarian"
                                        component={CheckBox}
                                        label="Vegetarian"
                                    />
                                    <FormField
                                        name="pescetarian"
                                        component={CheckBox}
                                        label="Pescetarian"
                                    />
                                </Box>
                                <Box>
                                    <Heading level="4">Meal type:</Heading>
                                    <FormField
                                        component={RadioButtonGroup}
                                        name="mealType"
                                        options={["Starter", "Main course", "Side dish", "Dessert"]}
                                    >
                                    </FormField>
                                </Box>
                            </Box>
                            <Box>
                                <Heading level="4">Cooking time:</Heading>
                                <FormField
                                    component={CheckBox}
                                    toggle
                                    name="cookingTime"
                                    label="Under 30 minutes"
                                >
                                </FormField>
                            </Box>
                            <Box>
                                <Heading level="4">Intolerances:</Heading>
                                <FormField component={CheckBox} name="dairy" label="Dairy"></FormField>
                                <FormField component={CheckBox} name="egg" label="Egg"></FormField>
                                <FormField component={CheckBox} name="gluten" label="Gluten"></FormField>
                                <FormField component={CheckBox} name="grain" label="Grain"></FormField>
                                <FormField component={CheckBox} name="peanut" label="Peanut"></FormField>
                                <FormField component={CheckBox} name="seafood" label="Seafood"></FormField>
                                <FormField component={CheckBox} name="sesame" label="Sesame"></FormField>
                                <FormField component={CheckBox} name="shellfish" label="Shellfish"></FormField>
                                <FormField component={CheckBox} name="soy" label="Soy"></FormField>
                                <FormField component={CheckBox} name="sulfite" label="Sulfite"></FormField>
                                <FormField component={CheckBox} name="tree_nut" label="Tree Nut"></FormField>
                                <FormField component={CheckBox} name="wheat" label="Wheat"></FormField>
                            </Box>
                            <Button
                                icon={<SearchAdvanced />}
                                type="submit"
                                label="Search"
                            />
                        </Form>
                    </Box>
                </Layer>
            )}
        </Box>
    );
}

const SearchBox = (props) => (
    <Box
        margin="auto"
        align="center"
    >
        <Box>
            <Form onSubmit={props.search}>
                <Box direction="row-responsive">
                    <FormField name="query" label="Search a recipe:">
                        <TextInput
                            name="query"
                            placeholder="type here"
                            aria-label="Search"
                        />
                    </FormField>
                    <Box justify="center">
                        <Button
                            icon={<Search />}
                            type="submit"
                            label="Search"
                            size="small"
                        />
                    </Box>
                </Box>
            </Form>
        </Box>
        <AdvancedSearch advancedSearch={props.advancedSearch}/>
    </Box>
)

export default SearchBox;