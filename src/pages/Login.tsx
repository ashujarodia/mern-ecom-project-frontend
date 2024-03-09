import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userApi';
import { MessageResponse } from '../types/apiTypes';
import { userExist } from '../redux/reducer/userReducer';
import { useDispatch } from 'react-redux';

const Login = () => {
	const dispatch = useDispatch();
	const [login] = useLoginMutation();

	const loginHandler = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const { user } = await signInWithPopup(auth, provider);
			const res = await login({
				name: user.displayName!,
				email: user.email!,
				photo: user.photoURL!,
				role: 'user',
				_id: user.uid,
			});

			if ('data' in res) {
				toast.success(res.data.message);
				dispatch(
					userExist({
						name: user.displayName!,
						email: user.email!,
						photo: user.photoURL!,
						role: res.data.role,
						_id: user.uid,
					})
				);
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = (error.data as MessageResponse).message;
				toast.error(message);
			}
		} catch (error) {
			toast.error('Sign in failed');
		}
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-[365px] mx-auto'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm mt-8'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Sign in</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				{/* <form
					className='space-y-6'
					action='#'
					method='POST'
				>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
							<div className='text-sm'>
								<a
									href='#'
									className='font-semibold text-indigo-600 hover:text-indigo-500'
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white-A700'
						>
							Sign in
						</button>
					</div>
				</form> */}
				{/* <p className='text-center w-full mt-4'>Or</p> */}
				<div className='mt-4 w-full'>
					<button
						className='bg-red-500 p-2 rounded-md text-white-A700 flex gap-3 items-center w-full text-center justify-center hover:bg-red-600'
						onClick={loginHandler}
					>
						{' '}
						Sign in with <FaGoogle />
					</button>
				</div>

				{/* <p className='mt-10 text-center text-sm text-gray-600'>
					Dont have account?{' '}
					<Link
						to={'/register'}
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Register
					</Link>
				</p> */}
			</div>
		</div>
	);
};

export default Login;
