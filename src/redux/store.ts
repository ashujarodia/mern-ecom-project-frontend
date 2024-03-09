import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/productApi';
import { userApi } from './api/userApi';
import { userReducer } from './reducer/userReducer';
import { categoryApi } from './api/categoryApi';
import { cartApi } from './api/cartApi';
import { orderApi } from './api/orderApi';
import { shippingReducer } from './reducer/shippingReducer';

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[userReducer.name]: userReducer.reducer,
		[shippingReducer.name]: shippingReducer.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userApi.middleware, productApi.middleware, categoryApi.middleware, cartApi.middleware, orderApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
