import { useSelector } from 'react-redux';
import { RootState, server } from '../redux/store';
import { useGetMyOrdersQuery } from '../redux/api/orderApi';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SkeletonLoader } from '../components/Loader';

const Orders = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading } = useGetMyOrdersQuery(user?._id || '');

	const orders = data?.orders.flatMap((i) => i.orderItems.map((item) => ({ ...item, status: i.status })));

	return (
		<div className='container mx-auto my-24 px-8'>
			<h2 className='text-4xl font-bold my-8 text-center'>My Orders</h2>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-8'>
					{orders?.length ? (
						orders?.map((order) => (
							<div
								key={order._id}
								className='bg-white rounded-lg  border border-gray-300 overflow-hidden flex items-center'
							>
								<Link to={`/product/${order.product._id}`}>
									<img
										src={`${server}/${order.product.photo}`}
										alt={order.product.name}
										className='h-24 w-24 object-cover'
									/>
								</Link>
								<div className='p-4 sm:p-3'>
									<h3 className='text-lg font-semibold mb-2 sm:mb-1'>{order.product.name}</h3>
									<p className='text-gray-600 mb-2 sm:mb-1'>
										Order Id: <span className='text-sm'>{order._id}</span>
									</p>
									<p className='text-gray-600 mb-2 sm:mb-1'>Quantity: {order.quantity}</p>
									<p className='text-gray-600 mb-2 flex gap-3'>
										Status:{' '}
										<span
											className={`flex items-center gap-2 ${
												order.status === 'Processing'
													? 'text-yellow-600'
													: order.status === 'Shipped'
													? 'text-blue-500'
													: order.status === 'Delivered'
													? 'text-green-600'
													: ''
											}`}
										>
											{order.status}
											{order.status === 'Delivered' || order.status === 'Shipped' ? (
												<FaCircleCheck />
											) : (
												<FaInfoCircle />
											)}
										</span>
									</p>
								</div>
							</div>
						))
					) : (
						<div>No orders</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Orders;
