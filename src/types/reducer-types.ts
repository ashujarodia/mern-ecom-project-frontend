import { ShippingInfo, User } from './types';

export interface UserReducerInitialState {
	user: User | null;
	loading: boolean;
}

export interface ShippingReducerInitialState {
	loading: boolean;
	shippingInfo: ShippingInfo;
}
