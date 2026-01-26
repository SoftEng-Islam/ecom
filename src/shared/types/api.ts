// Shared API response types

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export interface ApiError {
	success: false;
	message: string;
	errors?: Record<string, string[]>;
	statusCode?: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;
