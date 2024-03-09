import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { Button } from '../../../components/index';
import { useNewCategoryMutation } from '../../../redux/api/categoryApi';
import { RootState } from '../../../redux/store';
import { responseToast } from '../../../utils/features';

const NewCategory = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const [newCategory] = useNewCategoryMutation();
	const [name, setName] = useState<string>('');
	const [photo, setPhoto] = useState<File>();

	const [photoPrev, setPhotoPrev] = useState<string>('');

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

		if (!name || !photo) return;
		const formData = new FormData();

		formData.set('name', name);
		formData.set('photo', photo);

		const res = await newCategory({ id: user?._id || '', formData });

		responseToast(res, navigate, '/admin/category');
	};

	return (
		<div className='my-16'>
			<AdminSideBar />

			<main className='flex justify-center mx-auto max-w-[800px]'>
				<article className='bg-white p-8 rounded-lg shadow-lg border w-full'>
					<form
						onSubmit={submitHandler}
						className='space-y-4'
					>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>New Category</h2>
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
								placeholder='Enter category name'
								value={name}
								onChange={(e) => setName(e.target.value)}
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

						<Button
							type='submit'
							shape='square'
							color='gray_800'
							size='md'
							variant='fill'
							className='w-full'
						>
							Create
						</Button>
					</form>
				</article>
			</main>
		</div>
	);
};

export default NewCategory;
