export interface IUser {
	id: string;
	name: string;
	email: string;
	age: number;
	password: string;
	phone?: string;
	role: string;
	address?: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
	cartItems: string[];
}
