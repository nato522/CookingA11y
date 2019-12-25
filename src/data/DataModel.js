import API_KEY from "./ApiKey";

// const BASE_URL= "https://api.pexels.com/v1";
const httpOptions = {
	headers: { "Authorization": API_KEY}
};


class DataModel {

	constructor() {
	}
}


export const modelInstance = new DataModel();
export default modelInstance;