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
        "medium": ["1/4", "1/4", "1/4", "1/4"],
        "large": ["1/5", "1/5", "1/5", "1/5", "1/5"],
    },
    "small": "full",
    "medium": ["1/3", "1/3", "1/3"],
    "large": ["1/4", "1/4", "1/4", "1/4"]
};


export const STARTER = "Starter";
export const FIRST_DISH = "First Dish";
export const SECOND_DISH = "Second Dish";
export const DESSERT = "Dessert";
export default UNITS;

