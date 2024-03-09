import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItemsResponse, MessageResponse, NewCartItemRequest, RemoveCartItemRequest } from '../../types/apiTypes';

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/cart`,
	}),
	tagTypes: ['cart'],
	endpoints: (builder) => ({
		addToCart: builder.mutation<MessageResponse, NewCartItemRequest>({
			query: ({ productId, userId, quantity }) => ({
				url: `add?userId=${userId}`,
				method: 'POST',
				body: { productId, quantity },
			}),
			invalidatesTags: ['cart'],
		}),
		getCartItems: builder.query<CartItemsResponse, string>({
			query: (userId) => `all?userId=${userId}`,
			providesTags: ['cart'],
		}),
		removeFromCart: builder.mutation<MessageResponse, RemoveCartItemRequest>({
			query: ({ productId, userId }) => ({
				url: `${productId}?userId=${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['cart'],
		}),
		emptyCart: builder.mutation<MessageResponse, string>({
			query: (userId) => ({
				url: `/empty/?userId=${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['cart'],
		}),
		increaseQuantity: builder.mutation<MessageResponse, RemoveCartItemRequest>({
			query: ({ productId, userId }) => ({
				url: `/increase/${productId}?userId=${userId}`,
				method: 'PUT',
			}),
			invalidatesTags: ['cart'],
		}),
		decreaseQuantity: builder.mutation<MessageResponse, RemoveCartItemRequest>({
			query: ({ productId, userId }) => ({
				url: `/decrease/${productId}?userId=${userId}`,
				method: 'PUT',
			}),
			invalidatesTags: ['cart'],
		}),
	}),
});

export const { useAddToCartMutation, useGetCartItemsQuery, useRemoveFromCartMutation, useIncreaseQuantityMutation, useDecreaseQuantityMutation, useEmptyCartMutation } = cartApi;
