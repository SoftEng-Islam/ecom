// Shared TypeScript interfaces for data models

export interface IUser {
	_id: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGroup {
	_id: string;
	name: string;
	description?: string;
	userId: string;
	cardCount?: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICard {
	_id: string;
	groupId?: string;
	word: string;
	meaning: string;
	status?: 'new' | 'learning' | 'mastered';
	difficulty?: 'easy' | 'medium' | 'hard';
	nextReview?: Date;
	createdAt: Date;
	updatedAt: Date;
}

// Auth-related types
export interface IUserResponse {
	_id: string;
	username: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAuthResponse {
	token: string;
	user: IUserResponse;
}
