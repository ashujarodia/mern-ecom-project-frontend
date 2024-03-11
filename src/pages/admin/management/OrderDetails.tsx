import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useDeleteOrderMutation, useGetOrderDetailsQuery, useProcessOrderMutation } from '../../../redux/api/orderApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import moment from 'moment';
import { responseToast } from '../../../utils/features';
import { SkeletonLoader } from '../../../components/Loader';

const OrderDetails = () => {
	const { user } = useSelector((state: RootState) => state.user);

	const { orderId } = useParams();

	const { data, isLoading } = useGetOrderDetailsQuery({ userId: user?._id || '', orderId: orderId || '' });

	const order = data?.order;
	const navigate = useNavigate();

	const [processOrder] = useProcessOrderMutation();
	const [deleteOrder] = useDeleteOrderMutation();

	const handleProcessOrder = async () => {
		const res = await processOrder({ userId: user?._id || '', orderId: orderId || '' });
		responseToast(res);
	};

	const handleDeleteOrder = async () => {
		const res = await deleteOrder({ userId: user?._id || '', orderId: orderId || '' });
		responseToast(res, navigate, '/admin/orders');
	};

	return (
		<div className='mt-24'>
			<AdminSideBar />
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='max-w-[1000px] mx-auto'>
					<h1 className='text-3xl font-semibold mb-6 text-center text-blue-600'>Order Details</h1>
					<div className='bg-green-50 rounded-lg mb-8 p-6 md:mx-4'>
						<h2 className='text-lg font-semibold mb-4'>Order Information</h2>
						<div className='grid grid-cols-2 sm:grid-cols-1 gap-y-3 gap-x-4 text-gray-800'>
							<div>
								<p>
									<strong>Order ID:</strong> {order?._id}
								</p>
								<p>
									<strong>Order Date:</strong> {moment(order?.createdAt).format('DD, MMM, YYYY')}
								</p>
								<p>
									<strong>Status:</strong> {order?.status}
								</p>
							</div>
							<div>
								<p>
									<strong>Total:</strong> ₹{order?.total}
								</p>
								<p>
									<strong>Shipping Address:</strong>{' '}
									{`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.country}, ${order?.shippingInfo.pincode}`}
								</p>
							</div>
						</div>
					</div>

					<div className=' rounded-lg mb-8 p-6 bg-red-50 md:mx-4'>
						<h2 className='text-lg font-semibold mb-4'>Order Items</h2>
						<div className='grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-8'>
							{order?.orderItems.map((item) => (
								<div
									key={item._id}
									className='bg-white rounded-lg  overflow-hidden flex items-center bg-white-A700'
								>
									<Link
										to={`/product/${item._id}`}
										className='p-3'
									>
										<img
											src={item.product.photo.url}
											alt={item.product.name}
											className='h-24 w-24 object-cover'
										/>
									</Link>
									<div className='p-4 sm:p-3'>
										<h3 className='font-semibold mb-2 sm:mb-1'>{item.product.name}</h3>
										<p className='text-gray-600 mb-2 sm:mb-1 text-sm'>Price: ₹{item.product.price}</p>
										<p className='text-gray-600 mb-2 sm:mb-1'>Quantity: {item.quantity}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='rounded-lg bg-blue-50 md:mx-4 mb-8 p-6'>
						<h2 className='text-lg font-semibold mb-4'>User Details</h2>
						<p>
							<strong>User ID:</strong> {order?.user._id}
						</p>
						<p>
							<strong>User Name:</strong> {order?.user.name}
						</p>
						<p>
							<strong>Email:</strong> {order?.user.email}
						</p>
					</div>

					<div className='flex justify-end md:mx-4'>
						<button
							onClick={handleProcessOrder}
							className='px-6 py-2 bg-blue-600 text-white-A700 rounded-md mr-4 hover:bg-blue-700'
						>
							Process
						</button>
						<button
							onClick={handleDeleteOrder}
							className='px-6 py-2 bg-red-600 text-white-A700 rounded-md hover:bg-red-700'
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderDetails;
