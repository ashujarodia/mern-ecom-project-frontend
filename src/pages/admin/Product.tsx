import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from '../../redux/api/productApi';
import { RootState, server } from '../../redux/store';
import { responseToast } from '../../utils/features';
import { SkeletonLoader } from '../../components/Loader';

const Product = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading } = useGetAllProductsQuery('');
	const products = data?.products;

	const [deleteProduct] = useDeleteProductMutation();
	const [updateProduct] = useUpdateProductMutation();

	const handleDelete = async (id: string) => {
		const res = await deleteProduct({ userId: user?._id || '', productId: id });
		responseToast(res);
	};

	// Count number of products out of stock
	const outOfStockCount = products?.filter((product) => product.stock === 0).length;

	const handleToggle = async (id: string, featured: boolean) => {
		const formData = new FormData();
		formData.set('featured', String(!featured));
		const res = await updateProduct({ userId: user?._id || '', productId: id, formData });
		responseToast(res);
	};

	return (
		<div className='flex my-24'>
			<AdminSideBar />
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='flex-grow p-8 max-w-[800px] mx-auto'>
					<div className='flex justify-between items-center mb-8'>
						<h1 className='text-3xl font-bold'>Product List</h1>
						<Link
							to={'/admin/product/new'}
							className='flex items-center gap-2 bg-green-500 text-white-A700 px-2 py-1 rounded  hover:bg-green-400 duration-300'
						>
							New <FaPlus />
						</Link>
					</div>
					<div className='bg-white rounded-lg shadow-md border p-6'>
						<h2 className='text-xl font-semibold mb-4'>Products</h2>
						{/* Display product list */}
						<div className='overflow-x-auto'>
							<table className='table-auto w-full'>
								<thead>
									<tr>
										<th className='px-4 py-2'>Name</th>
										<th className='px-4 py-2'>Price</th>
										<th className='px-4 py-2'>Category</th>
										<th className='px-4 py-2'>Image</th>
										<th className='px-4 py-2'>Stock</th>
										<th className='px-4 py-2'>Featured</th>
										<th className='px-4 py-2'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{products?.map((product) => (
										<tr key={product._id}>
											<td className='border px-4 py-2 text-center'>{product.name}</td>
											<td className='border px-4 py-2 text-center'>{product.price}</td>
											<td className='border px-4 py-2 text-center'>{product.category}</td>
											<td className='border px-4 py-1 text-center'>
												<img
													src={`${server}/${product.photo}`}
													alt={product.name}
													className='w-14 h-14'
												/>
											</td>
											<td className='border px-4 py-2 text-center'>{product.stock}</td>
											<td className='border px-4 py-2 text-center'>
												<label className='inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														value=''
														className='sr-only peer'
														checked={product.featured}
														onChange={() => handleToggle(product._id, product.featured)}
													/>
													<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:bg-white-A700 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
												</label>
											</td>
											<td className='border px-4 py-5 h-full flex  justify-center items-center gap-4'>
												<button
													className='text-2xl  rounded-full  text-red-500 duration-300 active:scale-90'
													onClick={() => handleDelete(product._id)}
												>
													<MdDelete />
												</button>
												<Link
													to={`/admin/product/update/${product._id}`}
													className='text-xl rounded-full  text-blue-500  duration-300 active:scale-90'
												>
													<FaEdit />
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Section to display number of products out of stock */}
					<div className='mt-8'>
						<div className='bg-red-100 rounded-lg p-4'>
							<h2 className='text-xl font-semibold mb-2 text-red-600'>Out of Stock : {outOfStockCount}</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Product;
