import { UserReducerInitialState } from '../../types/reducer-types';
import { User } from '../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: UserReducerInitialState = {
	user: null,
	loading: false,
};

export const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userExist: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.user = action.payload;
		},
		userNotExist: (state) => {
			state.loading = false;
			state.user = null;
		},
	},
});

export const { userExist, userNotExist } = userReducer.actions;
