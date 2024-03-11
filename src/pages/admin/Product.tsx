import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SkeletonLoader } from '../../components/Loader';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from '../../redux/api/productApi';
import { RootState } from '../../redux/store';
import { responseToast } from '../../utils/features';
import { useGetAllCategoriesQuery } from '../../redux/api/categoryApi';
import { useEffect, useState } from 'react';
import { Product } from '../../types/types';

const Product = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading } = useGetAllProductsQuery('');
	const { data: categories } = useGetAllCategoriesQuery('');
	const products = data?.products;

	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products!);
	const [showOutOfStock, setShowOutOfStock] = useState<boolean>(false);

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

	useEffect(() => {
		if (selectedCategory) {
			const productsFiltered = products?.filter((product) => product.category === selectedCategory.toLowerCase());
			setFilteredProducts(productsFiltered!);
		} else {
			// If no category is selected, display all products
			setFilteredProducts(products!);
		}
	}, [selectedCategory, products]);

	// Filter out of stock products if showOutOfStock is true
	useEffect(() => {
		if (showOutOfStock) {
			const outOfStockProducts = products?.filter((product) => product.stock === 0);
			setFilteredProducts(outOfStockProducts!);
		} else {
			// If showOutOfStock is false, display all products
			setFilteredProducts(products!);
		}
	}, [showOutOfStock, products]);

	return (
		<div className='flex my-24'>
			<AdminSideBar />
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='flex-grow p-8 max-w-[1200px] mx-auto'>
					<div className='flex justify-between items-center mb-8'>
						<h1 className='text-3xl font-bold'>Product List</h1>
						<Link
							to={'/admin/product/new'}
							className='flex items-center gap-2 bg-green-500 text-white-A700 px-2 py-1 rounded  hover:bg-green-400 duration-300'
						>
							New <FaPlus />
						</Link>
					</div>
					<div className='p-6'>
						<div className='flex justify-between my-4 items-center'>
							<button
								onClick={() => setShowOutOfStock(!showOutOfStock)}
								className={`px-2 py-0.5 rounded  duration-300 ${showOutOfStock ? 'bg-red-100 ' : 'bg-white-A700 '}`}
							>
								<span className='font-semibold text-red-600'>Out of Stock : {outOfStockCount}</span>
							</button>
							<h2 className='text-2xl ml-4 font-semibold'>{selectedCategory ? selectedCategory.toUpperCase() : 'ALL PRODUCTS'}</h2>
							<div>
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className='border border-gray-300 p-2'
								>
									<option value=''>Select Category</option>
									{categories?.categories.map((i) => (
										<option
											value={i.name}
											key={i._id}
										>
											{i.name}
										</option>
									))}
								</select>
							</div>
						</div>
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
									{filteredProducts?.map((product) => (
										<tr key={product._id}>
											<td className='border px-4 py-2 text-center'>{product.name}</td>
											<td className='border px-4 py-2 text-center'>{product.price}</td>
											<td className='border px-4 py-2 text-center'>
												{product.category.charAt(0).toUpperCase() + product.category.slice(1)}
											</td>
											<td className='border px-4 py-3 mx-auto'>
												<img
													src={product.photo?.url}
													alt={product.name}
													className='w-20 h-20'
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
											<td className='border'>
												<div className='flex justify-around'>
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
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Product;
