class DataStore {
    /** Recipes.js store */
    searchedInfo = {
        recipes: null,
        total: null,
        baseURI: null,
        query: null,
        filters: null,
    };
}

export const Store = new DataStore();
export default Store;