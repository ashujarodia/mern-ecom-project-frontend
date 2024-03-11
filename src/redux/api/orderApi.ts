import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MessageResponse, NewOrderItemRequest, OrderDetailsRequest, OrderDetailsResponse, OrdersResponse } from '../../types/apiTypes';

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
		processOrder: builder.mutation<MessageResponse, OrderDetailsRequest>({
			query: ({ userId, orderId }) => ({
				url: `${orderId}?id=${userId}`,
				method: 'PUT',
			}),
			invalidatesTags: ['order'],
		}),
		deleteOrder: builder.mutation<MessageResponse, OrderDetailsRequest>({
			query: ({ userId, orderId }) => ({
				url: `${orderId}?id=${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['order'],
		}),
		getMyOrders: builder.query<OrdersResponse, string>({
			query: (userId) => `my?userId=${userId}`,
			providesTags: ['order'],
		}),
		getAllOrders: builder.query<OrdersResponse, string>({
			query: (adminId) => `all?id=${adminId}`,
			providesTags: ['order'],
		}),
		getOrderDetails: builder.query<OrderDetailsResponse, OrderDetailsRequest>({
			query: ({ userId, orderId }) => `${orderId}?id=${userId}`,
			providesTags: ['order'],
		}),
	}),
});

export const { useNewOrderMutation, useGetMyOrdersQuery, useGetAllOrdersQuery, useGetOrderDetailsQuery, useDeleteOrderMutation, useProcessOrderMutation } = orderApi;
