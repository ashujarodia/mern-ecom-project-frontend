import { useSelector } from 'react-redux';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useGetAllUsersQuery } from '../../redux/api/userApi';
import { RootState } from '../../redux/store';
import { SkeletonLoader } from '../../components/Loader';
import { Navigate } from 'react-router-dom';

const Users = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading, isError } = useGetAllUsersQuery(user?._id || '');
	const users = data?.users;

	if (isError) {
		return <Navigate to={'/404'} />;
	}

	return (
		<div className='flex my-24 min-h-screen'>
			<AdminSideBar />
			<div className='flex-grow p-8 max-w-[800px] mx-auto'>
				<h1 className='text-3xl font-bold mb-8 text-gray-800'>All Users</h1>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className='bg-white rounded-lg shadow-md p-6 mb-8 border'>
						<h2 className='text-xl font-semibold mb-4 text-gray-800'>Users List</h2>
						{/* Render user list */}
						<ul className='divide-y divide-gray-200'>
							{users?.map((user) => (
								<li
									key={user._id}
									className='py-4 flex justify-between items-center transition-all duration-300 hover:bg-gray-100 px-4 rounded'
								>
									<div>
										<p className='text-lg font-semibold text-gray-800'>{user.name}</p>
										<p className='text-gray-600'>{user.email}</p>
									</div>
									<div className='flex items-center'>
										{user.role === 'admin' && <p className='text-green-500 font-semibold'>Admin</p>}
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Users;
