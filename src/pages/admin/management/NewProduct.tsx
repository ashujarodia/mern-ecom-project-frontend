import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { Button } from '../../../components/index';
import { useGetAllCategoriesQuery } from '../../../redux/api/categoryApi';
import { useNewProductMutation } from '../../../redux/api/productApi';
import { RootState } from '../../../redux/store';
import { responseToast } from '../../../utils/features';

const NewProduct = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [newProduct] = useNewProductMutation();
	const navigate = useNavigate();
	const { data: categories } = useGetAllCategoriesQuery(user?._id || '');

	const [name, setName] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [description, setDescription] = useState<string>('');
	const [stock, setStock] = useState<number>(0);
	const [photoPrev, setPhotoPrev] = useState<string>('');
	const [photo, setPhoto] = useState<File>();

	const [isCreating, setIsCreating] = useState<boolean>(false);

	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];

		const reader: FileReader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === 'string') {
					setPhotoPrev(reader.result);
					setPhoto(file);
				}
			};
		}
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsCreating(true);
		if (!name || !price || stock < 0 || !category || !photo) return;
		const formData = new FormData();

		formData.set('name', name);
		formData.set('price', price.toString());
		formData.set('stock', stock.toString());
		formData.set('category', category);
		formData.set('photo', photo);
		formData.set('description', description);

		const res = await newProduct({ id: user?._id || '', formData });

		responseToast(res, navigate, '/admin/product');
		setIsCreating(false);
	};

	const categoryArr = categories?.categories;

	return (
		<div className='my-16'>
			<AdminSideBar />

			<main className='flex justify-center mx-auto max-w-[800px]'>
				<article className='bg-white p-8 rounded-lg shadow-lg border w-full'>
					<form
						onSubmit={submitHandler}
						className='space-y-4'
					>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>New Product</h2>
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
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='w-full border-gray-300 border p-2 rounded'
								required
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
								id='price'
								type='number'
								placeholder='Enter price here'
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
								className='w-full border-gray-300 border p-2 rounded'
								required
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
								id='category'
								name='category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								required
								className='w-full border-gray-300 border p-2 rounded'
							>
								<option value=''>Select category</option>
								{categoryArr?.map((i) => (
									<option
										key={i._id}
										value={i.name.toLowerCase()}
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
							<textarea
								id='description'
								placeholder='Enter product description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className='w-full border-gray-300 border p-2 rounded'
								required
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
								required
							/>
						</div>

						{photoPrev && (
							<img
								src={photoPrev}
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
								value={stock}
								onChange={(e) => setStock(Number(e.target.value))}
								className='w-full border-gray-300 border p-2 rounded'
								required
							/>
						</div>
						<Button
							type='submit'
							shape='square'
							color='gray_800'
							size='md'
							variant='fill'
							className='w-full'
							disabled={isCreating}
						>
							{isCreating ? 'Creating ...' : 'Create'}
						</Button>
					</form>
				</article>
			</main>
		</div>
	);
};

export default NewProduct;
