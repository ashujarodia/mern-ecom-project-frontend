export type User = {
	name: string;
	email: string;
	photo: string;
	role: string;
	_id: string;
};

export type Product = {
	name: string;
	price: number;
	stock: number;
	category: string;
	photo: string;
	_id: string;
	description: string;
	featured: boolean;
	rating: number;
};

export type Category = {
	name: string;
	photo: string;
	_id: string;
};

export type ShippingInfo = {
	address: string;
	city: string;
	state: string;
	country: string;
	pincode: string;
};

export type CartItem = {
	product: Product;
	quantity: number;
	_id: string;
};

export type OrderType = {
	_id: string;
	orderItems: CartItem[];
	shippingInfo: ShippingInfo;
	shippingCharges: number;
	status: 'Processing' | 'Shipped' | 'Delivered';
	subtotal: number;
	tax: number;
	total: number;
};
