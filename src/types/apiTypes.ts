import { Product, User, Category, ShippingInfo, CartItem, OrderType } from './types';

//Request types
export type NewProductRequest = {
	id: string;
	formData: FormData;
};
export type UpdateProductRequest = {
	userId: string;
	productId: string;
	formData: FormData;
};
export type UpdateCategoryRequest = {
	productId: string;
	userId: string;
	formData: FormData;
};
export type NewCategoryRequest = {
	id: string;
	formData: FormData;
};
export type DeleteProductRequest = {
	userId: string;
	productId: string;
};

export type DeleteCategoryRequest = {
	userId: string;
	categoryId: string;
};
export type RemoveCartItemRequest = {
	userId: string;
	productId: string;
};

export type CategoryDetailsRequest = {
	userId: string;
	categoryId: string;
};
export type OrderDetailsRequest = {
	userId: string;
	orderId: string;
};

export type NewCartItemRequest = {
	userId: string;
	productId: string;
	quantity: number;
};
export type NewOrderItemRequest = {
	shippingInfo: ShippingInfo;
	orderItems: CartItem[];
	subtotal: number;
	tax: number;
	shippingCharges: number;
	total: number;
	userId: string;
};

//Response types
export type LoginResponse = {
	success: boolean;
	message: string;
	token: string;
	role: string;
};

export type UserResponse = {
	success: boolean;
	user: User;
};

export type MessageResponse = {
	success: boolean;
	message: string;
};

export type AllProductResponse = {
	success: boolean;
	products: Product[];
};

export type ProductDetailsResponse = {
	success: boolean;
	product: Product;
};

export type AllCategoryResponse = {
	success: boolean;
	categories: Category[];
};
export type CategoryDetailsResponse = {
	success: boolean;
	category: Category;
};

export type AllUsersResponse = {
	success: boolean;
	users: User[];
};
export type OrdersResponse = {
	success: boolean;
	orders: OrderType[];
};
export type OrderDetailsResponse = {
	success: boolean;
	order: OrderType;
};

export type CartItemsResponse = {
	success: boolean;
	cart: {
		items: CartItem[];
		userId: string;
		_id: string;
		subtotal: number;
		tax: number;
		shippingCharges: number;
		total: number;
	}[];
};
