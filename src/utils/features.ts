import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../types/apiTypes';
import { SerializedError } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';

type ResponseType =
	| {
			data: MessageResponse;
	  }
	| { error: FetchBaseQueryError | SerializedError };

export const responseToast = (res: ResponseType, navigate?: NavigateFunction | null, url?: string) => {
	if ('data' in res) {
		toast.success(res.data.message);
		if (navigate) {
			navigate(url || '');
		}
	} else {
		const error = res.error as FetchBaseQueryError;
		const messageResponse = error.data as MessageResponse;
		toast.error(messageResponse.message);
	}
};
