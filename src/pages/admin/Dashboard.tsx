import { useSelector } from 'react-redux';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useGetAllUsersQuery } from '../../redux/api/userApi';
import { RootState } from '../../redux/store';
import { useGetAllProductsQuery } from '../../redux/api/productApi';
import { useGetAllCategoriesQuery } from '../../redux/api/categoryApi';
import { SkeletonLoader } from '../../components/Loader';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
	const { user } = useSelector((state: RootState) => state.user);

	const { data: users, isLoading: userLoading, isError: userError } = useGetAllUsersQuery(user?._id || '');

	const { data: products, isLoading: productLoading, isError: productError } = useGetAllProductsQuery(user?._id || '');

	const { data: categories, isLoading: categoryLoading, isError: categoryError } = useGetAllCategoriesQuery(user?._id || '');

	const usersCount = users?.users.length;
	const adminUserCount = users?.users.filter((i) => i.role === 'admin').length;

	if (userError || productError || categoryError) {
		return <Navigate to={'/404'} />;
	}
	return (
		<div className='flex my-24 min-h-screen'>
			<AdminSideBar />
			<div className='flex-grow p-8 max-w-[800px] mx-auto'>
				<h1 className='text-3xl font-bold mb-8'>Dashboard</h1>

				{/* User Information */}
				{userLoading ? (
					<SkeletonLoader />
				) : (
					<div className='bg-white rounded-lg border shadow-md p-6 mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Users</h2>
						{/* Display user counts */}
						<div className='flex justify-between items-center mb-4'>
							<div className='flex flex-col items-center'>
								<p className='text-lg text-gray-600'>All</p>
								<p className='text-4xl text-blue-500 font-bold'>{usersCount}</p>
							</div>
							<div className='flex flex-col items-center'>
								<p className='text-lg text-gray-600'>Admin</p>
								<p className='text-4xl text-green-500 font-bold'>{adminUserCount}</p>
							</div>
						</div>
					</div>
				)}
				{/* Product Information */}
				{productLoading || categoryLoading ? (
					<SkeletonLoader />
				) : (
					<div className='bg-white rounded-lg shadow-md border p-6 mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Products</h2>
						{/* Display product counts per category */}
						{categories &&
							categories?.categories?.map((category) => (
								<div
									key={category._id}
									className='bg-gray-100 rounded-lg p-4 mb-4'
								>
									<p className='text-lg text-gray-800'>{category.name}</p>
									{/* Calculate count of products in this category */}
									<p className='text-2xl text-gray-700 font-bold'>
										{products?.products?.filter((product) => product.category === category.name.toLowerCase()).length}{' '}
										Products
									</p>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
