import axios, { AxiosRequestConfig } from "axios";

// Wrap axios
export default class Http {
	async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await axios.get<T>(url, config);
		return response.data;
	}

	async post<T = unknown>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await axios.post<T>(url, data, config);
		return response.data;
	}

	async put<T = unknown>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await axios.put<T>(url, data, config);
		return response.data;
	}

	async patch<T = unknown>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await axios.patch<T>(url, data, config);
		return response.data;
	}

	async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await axios.delete<T>(url, config);
		return response.data;
	}
}
