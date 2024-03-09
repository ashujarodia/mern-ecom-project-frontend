import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllProductResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductDetailsResponse, UpdateProductRequest } from '../../types/apiTypes';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
	}),
	tagTypes: ['product'],
	endpoints: (builder) => ({
		newProduct: builder.mutation<MessageResponse, NewProductRequest>({
			query: ({ formData, id }) => ({
				url: `new?id=${id}`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['product'],
		}),
		updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
			query: ({ formData, userId, productId }) => ({
				url: `${productId}?id=${userId}`,
				method: 'PUT',
				body: formData,
			}),
			invalidatesTags: ['product'],
		}),
		deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
			query: ({ userId, productId }) => ({
				url: `${productId}?id=${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['product'],
		}),
		getAllProducts: builder.query<AllProductResponse, string>({
			query: () => ({
				url: 'all',
				method: 'GET',
			}),
			providesTags: ['product'],
		}),
		getLatestProducts: builder.query<AllProductResponse, string>({
			query: () => ({
				url: 'latest',
				method: 'GET',
			}),
			providesTags: ['product'],
		}),
		getFeaturedProducts: builder.query<AllProductResponse, string>({
			query: () => ({
				url: 'featured',
				method: 'GET',
			}),
			providesTags: ['product'],
		}),
		getPopularProducts: builder.query<AllProductResponse, string>({
			query: () => ({
				url: 'popular',
				method: 'GET',
			}),
			providesTags: ['product'],
		}),
		getSimilarProducts: builder.query<AllProductResponse, string>({
			query: (id) => ({
				url: `similar/${id}`,
				method: 'GET',
			}),
			providesTags: ['product'],
		}),
		getProductDetails: builder.query<ProductDetailsResponse, string>({
			query: (id) => id,
			providesTags: ['product'],
		}),
	}),
});

export const {
	useNewProductMutation,
	useGetAllProductsQuery,
	useGetProductDetailsQuery,
	useDeleteProductMutation,
	useUpdateProductMutation,
	useGetLatestProductsQuery,
	useGetFeaturedProductsQuery,
	useGetPopularProductsQuery,
	useGetSimilarProductsQuery,
} = productApi;
