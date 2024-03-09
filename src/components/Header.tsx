import { Button, Img, Text } from './index';
import { FaRegUserCircle, FaSearch, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetCartItemsQuery } from '../redux/api/cartApi';
import React, { useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { userNotExist } from '../redux/reducer/userReducer';
import { IoLogOutOutline } from 'react-icons/io5';
import logo from '../assets/images/logo.svg';

const Header = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.user);
	const { data } = useGetCartItemsQuery(user?._id || '');
	const [dailogOpen, setDailogOpen] = useState<boolean>(false);

	const cartItemLength = user ? data?.cart[0]?.items?.length : 0;

	const dispatch = useDispatch();

	const logoutHandler = async () => {
		try {
			await signOut(auth);
			toast.success('Sign out successfully');
			dispatch(userNotExist());
		} catch (error) {
			toast.error('Sign out failed');
		}
	};

	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setDailogOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		// Stop the event propagation to prevent immediate closing of the dropdown
		event.stopPropagation();
		setDailogOpen(!dailogOpen);
	};

	return (
		<header className='flex items-center justify-center w-full fixed z-50 top-0'>
			<div className='bg-white-A700 flex flex-row items-center justify-center  sm:p-2 p-[17px] w-full px-6 sm:px-1'>
				<div className='flex w-full justify-between'>
					<Link
						className='flex items-center gap-6 sm:gap-2'
						to={'/'}
					>
						<Img
							className='h-6 w-[35%]'
							src={logo}
							alt='volume'
						/>
						<Text
							className='text-2xl md:text-[22px] text-gray-800 sm:text-xl'
							size='txtPoppinsBold24'
						>
							Shop.
						</Text>
					</Link>
					<div className='flex flex-row items-center gap-6 sm:gap-3'>
						{user?.role === 'admin' && (
							<Link
								className={`text-lg sm:text-base px-2 rounded-md  ${
									window.location.pathname.includes('/admin') && 'bg-blue-100 text-blue-500'
								}`}
								to={'/admin/dashboard'}
							>
								Admin
							</Link>
						)}

						<Link
							className='text-2xl sm:text-base'
							to={'/productList/all'}
						>
							<FaSearch />
						</Link>
						<Link
							className='text-2xl sm:text-base relative'
							to={'/cart'}
						>
							{cartItemLength! > 0 && (
								<span className='absolute -top-2  -right-2 text-xs sm:text-[8px] bg-red-600 rounded-full w-4 sm:w-3 sm:h-3 flex items-center justify-center h-4 text-white-A700'>
									{cartItemLength}
								</span>
							)}
							<FaShoppingCart />
						</Link>
						{user ? (
							<>
								<button onClick={handleIconClick}>
									<Img
										src={user.photo}
										className='w-8 h-8 rounded-full'
									/>
								</button>
								<div
									className={`absolute  bg-gray-800  rounded top-14 md:top-10 right-6 md:right-2 transition duration-300 ${
										dailogOpen ? 'translate-x-0' : 'translate-x-40'
									}`}
									ref={dropdownRef}
								>
									<div className='flex flex-col  justify-center h-full text-white-A700 py-4'>
										<Link
											to={'/profile'}
											className='hover:bg-gray-600 text-center flex items-center gap-2 w-full px-6 py-1'
										>
											Profile <FaRegUserCircle />
										</Link>
										<Link
											to={'/orders'}
											className='hover:bg-gray-600 text-center flex items-center gap-2 w-full px-6 py-1'
										>
											Orders <FaShoppingBag />
										</Link>
										<button
											className='hover:bg-gray-600 text-center flex items-center gap-2 w-full px-6 py-1'
											onClick={logoutHandler}
										>
											Logout <IoLogOutOutline />
										</button>
									</div>
								</div>
							</>
						) : (
							<Button
								className='cursor-pointer font-bold px-2 py-1 text-center'
								onClick={() => navigate('/login')}
								shape='square'
								color='gray_800'
								variant='fill'
							>
								Login
							</Button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
