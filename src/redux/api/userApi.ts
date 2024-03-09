import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllUsersResponse, LoginResponse } from '../../types/apiTypes';
import { User } from '../../types/types';
import { UserResponse } from '../../types/apiTypes';
import axios from 'axios';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user` }),
	tagTypes: ['users'],
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, User>({
			query: (user) => ({
				url: 'new',
				method: 'POST',
				body: user,
			}),
			invalidatesTags: ['users'],
		}),
		getAllUsers: builder.query<AllUsersResponse, string>({
			query: (id) => `all?id=${id}`,
			providesTags: ['users'],
		}),
	}),
});

export const getUser = async (id: string) => {
	try {
		const { data }: { data: UserResponse } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};

export const { useLoginMutation, useGetAllUsersQuery } = userApi;
