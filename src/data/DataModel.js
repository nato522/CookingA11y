import API_KEY from "./ApiKey";

const BASE_URL= "http://sunset.nada.kth.se:8080/iprog/group/45";
const httpOptions = {
	headers: { "X-Mashape-Key": API_KEY }
};


class DataModel {

	constructor() {
	}

	getRandomFoodJoke() {
		const url = `${BASE_URL}/food/jokes/random`;
		return fetch(url, httpOptions).then(this.processResponse);
	}

	processResponse(response) {
		if (response.ok) {
			return response.json();
		}
		throw response;
	}
}


export const modelInstance = new DataModel();
export default modelInstance;