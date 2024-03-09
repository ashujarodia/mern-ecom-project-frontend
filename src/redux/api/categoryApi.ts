import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllCategoryResponse, CategoryDetailsRequest, CategoryDetailsResponse, DeleteCategoryRequest, MessageResponse, NewCategoryRequest, UpdateCategoryRequest } from '../../types/apiTypes';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/category`,
	}),
	tagTypes: ['category'],
	endpoints: (builder) => ({
		newCategory: builder.mutation<MessageResponse, NewCategoryRequest>({
			query: ({ formData, id }) => ({
				url: `new?id=${id}`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['category'],
		}),
		updateCategory: builder.mutation<MessageResponse, UpdateCategoryRequest>({
			query: ({ formData, productId, userId }) => ({
				url: `${productId}?id=${userId}`,
				method: 'PUT',
				body: formData,
			}),
			invalidatesTags: ['category'],
		}),
		deleteCategory: builder.mutation<MessageResponse, DeleteCategoryRequest>({
			query: ({ categoryId, userId }) => ({
				url: `${categoryId}?id=${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['category'],
		}),
		getAllCategories: builder.query<AllCategoryResponse, string>({
			query: () => 'all',
			providesTags: ['category'],
		}),
		getCategoryDetails: builder.query<CategoryDetailsResponse, CategoryDetailsRequest>({
			query: ({ userId, categoryId }) => `${categoryId}?id=${userId}`,
			providesTags: ['category'],
		}),
	}),
});

export const { useNewCategoryMutation, useGetAllCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetCategoryDetailsQuery } = categoryApi;
