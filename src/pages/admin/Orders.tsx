import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SkeletonLoader } from '../../components/Loader';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useGetAllOrdersQuery } from '../../redux/api/orderApi';
import { RootState } from '../../redux/store';

const Orders = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading } = useGetAllOrdersQuery(user?._id || '');
	const orders = data?.orders;

	const navigate = useNavigate();

	return (
		<div className='flex my-24'>
			<AdminSideBar />
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='flex-grow px-8 max-w-[1300px] mx-auto'>
					<h1 className='text-2xl font-semibold mb-8 text-center'>Orders</h1>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-800 border border-gray-800'>
							<thead className='bg-gray-800 text-white-A700'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>Customer Name</th>
									<th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>Order Date</th>
									<th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>Total Amount</th>
									<th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>Shipping Address</th>
									<th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>Status</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-800'>
								{orders?.map((order) => (
									<tr
										key={order._id}
										className='bg-green-50 hover:bg-green-200 cursor-pointer'
										onClick={() => navigate(`/admin/order/details/${order._id}`)}
									>
										<td className='px-6 py-4 whitespace-nowrap'>{order.user.name}</td>
										<td className='px-6 py-4 whitespace-nowrap'>{moment(order.createdAt).format('DD, MMM, YYYY')}</td>
										<td className='px-6 py-4 whitespace-nowrap'>₹ {order.total}</td>
										<td className='px-6 py-4 whitespace-nowrap'>{`${order.shippingInfo.address} ${order.shippingInfo.city} ${order.shippingInfo.country} ${order.shippingInfo.pincode} ${order.shippingInfo.state}`}</td>
										<td className='px-6 py-4 whitespace-nowrap'>{order.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default Orders;
