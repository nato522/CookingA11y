const UNITS = [
    { unitShort: "ml", unitLong: "Mililiter(s)" },
    { unitShort: "L", unitLong: "Liter(s)" },
    { unitShort: "g", unitLong: "Gram(s)" },
    { unitShort: "Kg", unitLong: "Kilogram(s)" },
    { unitShort: "tsp", unitLong: "Teaspoon(s)" },
    { unitShort: "tbsp", unitLong: "Tablespoon(s)" },
    { unitShort: "c", unitLong: "Cup(s)" },
];

export const RESPONSIVE = {
    "recommendations": {
        "small": "full",
        "medium": ["1/3", "1/3", "1/3"],
        "large": ["1/4", "1/4", "1/4", "1/4"],
    },
    "homepage": {
        "small": "full",
        "medium": ["1/2", "1/2"],
        "large": ["1/4", "1/4", "1/4", "1/4"],
    },
    "small": "full",
    "medium": ["1/3", "1/3", "1/3"],
    "large": ["1/4", "1/4", "1/4", "1/4"]
};


export const RESPONSIVE_AREAS = {
    "recipeDetails":{
        "small":[
            { name: 'recipe_title', start: [0, 0], end: [2, 0] },
            { name: 'recipe_instructions', start: [0, 1], end: [2, 1] },
            { name: 'sidebar', start: [0, 2], end: [2, 2] },
        ],
        "medium":[
            { name: 'recipe_title', start: [0, 0], end: [1, 0] },
            { name: 'recipe_instructions', start: [0, 1], end: [1, 1] },
            { name: 'sidebar', start: [2, 0], end: [2, 1] },
        ],
        "large":[
            { name: 'recipe_title', start: [0, 0], end: [1, 0] },
            { name: 'recipe_instructions', start: [0, 1], end: [1, 1] },
            { name: 'sidebar', start: [2, 0], end: [2, 1] },
        ],
    },
    "recipes":{
        "small":[
            { name: 'searchBox', start: [0, 0], end: [2, 0] },
            { name: 'recipes', start: [0, 1], end: [2, 1] },
            { name: 'sidebar', start: [0, 2], end: [2, 2] },
        ],
        "medium":[
            { name: 'searchBox', start: [0, 0], end: [1, 0] },
            { name: 'recipes', start: [0, 1], end: [1, 1] },
            { name: 'sidebar', start: [2, 0], end: [2, 1] },
        ],
        "large":[
            { name: 'searchBox', start: [0, 0], end: [1, 0] },
            { name: 'recipes', start: [0, 1], end: [1, 1] },
            { name: 'sidebar', start: [2, 0], end: [2, 1] },
        ],
    },
    "rows":{
        "small": ['auto', 'auto', 'auto'],
        "medium": ['auto', 'auto'],
        "large": ['auto', 'auto'],
    }
};


export const STARTER = "Starter";
export const FIRST_DISH = "First Dish";
export const SECOND_DISH = "Second Dish";
export const DESSERT = "Dessert";
export default UNITS;

