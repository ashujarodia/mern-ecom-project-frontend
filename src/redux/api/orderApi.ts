import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MessageResponse, MyOrdersResponse, NewOrderItemRequest } from '../../types/apiTypes';

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order`,
	}),
	tagTypes: ['order'],
	endpoints: (builder) => ({
		newOrder: builder.mutation<MessageResponse, NewOrderItemRequest>({
			query: ({ shippingInfo, orderItems, shippingCharges, tax, subtotal, total, userId }) => ({
				url: `new/?userId=${userId}`,
				method: 'POST',
				body: { shippingInfo, orderItems, shippingCharges, tax, subtotal, total },
			}),
			invalidatesTags: ['order'],
		}),
		getMyOrders: builder.query<MyOrdersResponse, string>({
			query: (userId) => `my/?userId=${userId}`,
			providesTags: ['order'],
		}),
	}),
});

export const { useNewOrderMutation, useGetMyOrdersQuery } = orderApi;
