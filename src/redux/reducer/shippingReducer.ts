import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ShippingReducerInitialState } from '../../types/reducer-types';
import { ShippingInfo } from '../../types/types';

const initialState: ShippingReducerInitialState = {
	loading: false,
	shippingInfo: {
		address: '',
		state: '',
		country: '',
		city: '',
		pincode: '',
	},
};

export const shippingReducer = createSlice({
	name: 'shipping',
	initialState,
	reducers: {
		saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
			state.shippingInfo = action.payload;
		},
	},
});

export const { saveShippingInfo } = shippingReducer.actions;
