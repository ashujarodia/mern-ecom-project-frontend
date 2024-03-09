import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { Button } from '../../../components/index';
import { useGetAllCategoriesQuery } from '../../../redux/api/categoryApi';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../../redux/api/productApi';
import { RootState, server } from '../../../redux/store';
import { responseToast } from '../../../utils/features';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const params = useParams();

	const { data: products } = useGetProductDetailsQuery(params.id!);
	const { data: categories } = useGetAllCategoriesQuery(user?._id || '');

	const [updateProduct] = useUpdateProductMutation();

	const { photo, price, name, stock, category, description } = products?.product || { photo: '', category: '', name: '', stock: 0, price: 0, description: '' };

	const [nameUpdate, setNameUpdate] = useState<string>(name);
	const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
	const [priceUpdate, setPriceUpdate] = useState<number>(price);
	const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
	const [stockUpdate, setStockUpdate] = useState<number>(stock);
	const [photoUpdate, setPhotoUpdate] = useState<string>(photo);

	const [photoFile, setPhotoFile] = useState<File>();

	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];

		const reader: FileReader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === 'string') {
					setPhotoUpdate(reader.result);
					setPhotoFile(file);
				}
			};
		}
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (stockUpdate < 0 || priceUpdate < 0) {
			console.log(stockUpdate);

			return toast.error('Field should not be negative');
		}
		const formData = new FormData();
		if (nameUpdate) {
			formData.set('name', nameUpdate);
		}
		if (priceUpdate) {
			formData.set('price', priceUpdate.toString());
		}
		if (categoryUpdate) {
			formData.set('category', categoryUpdate);
		}
		if (descriptionUpdate) {
			formData.set('description', descriptionUpdate);
		}
		if (photoFile) {
			formData.set('photo', photoFile);
		}
		if (stockUpdate) {
			formData.set('stock', stockUpdate.toString());
		}
		const res = await updateProduct({ formData, userId: user?._id || '', productId: params.id || '' });
		responseToast(res, navigate, '/admin/product');
	};

	const categoryArr = categories?.categories;

	useEffect(() => {
		if (products) {
			setNameUpdate(products.product.name);
			setPriceUpdate(products.product.price);
			setStockUpdate(products.product.stock);
			setCategoryUpdate(products.product.category);
			setDescriptionUpdate(products.product.description);
		}
	}, [products]);

	return (
		<div className='my-16'>
			<AdminSideBar />

			<main className='flex justify-center mx-auto max-w-[800px]'>
				<article className='bg-white p-8 rounded-lg shadow-lg border w-full'>
					<form
						onSubmit={submitHandler}
						className='space-y-4'
					>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>Update Product</h2>
						<div>
							<label
								htmlFor='name'
								className='block mb-1 text-gray-800'
							>
								Name
							</label>
							<input
								id='name'
								type='text'
								placeholder='Enter product name'
								value={nameUpdate}
								onChange={(e) => setNameUpdate(e.target.value)}
								className='w-full border-gray-300 border p-2 rounded'
							/>
						</div>
						<div>
							<label
								htmlFor='price'
								className='block mb-1 text-gray-800'
							>
								Price
							</label>
							<input
								type='number'
								placeholder='Enter price here'
								value={priceUpdate}
								onChange={(e) => setPriceUpdate(Number(e.target.value))}
								className='w-full border-gray-300 border p-2 rounded'
							/>
						</div>

						<div>
							<label
								htmlFor='category'
								className='block mb-1 text-gray-800'
							>
								Category
							</label>
							<select
								value={categoryUpdate}
								onChange={(e) => setCategoryUpdate(e.target.value)}
								className='w-full border-gray-300 border p-2 rounded'
							>
								{categoryArr?.map((i) => (
									<option
										key={i._id}
										value={i.name}
									>
										{i.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label
								htmlFor='description'
								className='block mb-1 text-gray-800'
							>
								Description
							</label>
							<input
								id='description'
								type='text'
								placeholder='Enter product description'
								value={descriptionUpdate}
								onChange={(e) => setDescriptionUpdate(e.target.value)}
								className='w-full border-gray-300 border p-2 rounded'
							/>
						</div>

						<div>
							<label
								htmlFor='photo'
								className='block mb-1 text-gray-800'
							>
								Photo
							</label>
							<input
								id='photo'
								type='file'
								onChange={changeImageHandler}
								className='w-full border-gray-300 border p-2 rounded'
							/>
						</div>

						{photoUpdate ? (
							<img
								src={photoUpdate}
								alt='New Image'
								className='mt-4 rounded'
								style={{ maxWidth: '200px' }}
							/>
						) : (
							<img
								src={`${server}/${photo}`}
								alt='New Image'
								className='mt-4 rounded'
								style={{ maxWidth: '200px' }}
							/>
						)}

						<div>
							<label
								htmlFor='stock'
								className='block mb-1 text-gray-800'
							>
								Stock
							</label>
							<input
								id='stock'
								type='number'
								placeholder='Enter stock here'
								value={stockUpdate}
								onChange={(e) => setStockUpdate(Number(e.target.value))}
								className='w-full border-gray-300 border p-2 rounded'
							/>
						</div>
						<Button
							type='submit'
							shape='square'
							color='gray_800'
							size='md'
							variant='fill'
							className='w-full'
						>
							Update
						</Button>
					</form>
				</article>
			</main>
		</div>
	);
};

export default UpdateProduct;
