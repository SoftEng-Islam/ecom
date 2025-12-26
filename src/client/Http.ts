import axios from "axios";

// Wrap axios
export default class Http {
	async get(url: string, config?: any) {
		const response = await axios.get(url, config);
		return response.data;
	}

	async post(url: string, data: any, config?: any) {
		const response = await axios.post(url, data, config);
		return response.data;
	}

	async put(url: string, data: any, config?: any) {
		const response = await axios.put(url, data, config);
		return response.data;
	}

	async patch(url: string, data: any, config?: any) {
		const response = await axios.patch(url, data, config);
		return response.data;
	}

	async delete(url: string, config?: any) {
		const response = await axios.delete(url, config);
		return response.data;
	}
}
