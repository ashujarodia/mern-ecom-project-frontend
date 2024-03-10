import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { Button } from '../../../components/index';
import { useGetCategoryDetailsQuery, useUpdateCategoryMutation } from '../../../redux/api/categoryApi';
import { RootState, server } from '../../../redux/store';
import { responseToast } from '../../../utils/features';

const UpdateCategory = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const params = useParams();

	const { data } = useGetCategoryDetailsQuery({ userId: user?._id || '', categoryId: params.id || '' });

	const [UpdateCategory] = useUpdateCategoryMutation();

	const { photo, name } = data?.category || { photo: { url: '' }, name: '' };

	const [nameUpdate, setNameUpdate] = useState<string>(name);
	const [photoUpdate, setPhotoUpdate] = useState<string>(photo.url);

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

		const formData = new FormData();
		if (nameUpdate) {
			formData.set('name', nameUpdate);
		}
		if (photoFile) {
			formData.set('photo', photoFile);
		}
		const res = await UpdateCategory({ formData, userId: user?._id || '', productId: params.id || '' });
		responseToast(res, navigate, '/admin/category');
	};

	useEffect(() => {
		if (data) {
			setNameUpdate(data?.category.name);
		}
	}, [data]);

	return (
		<div className='my-16'>
			<AdminSideBar />

			<main className='flex justify-center mx-auto max-w-[800px]'>
				<article className='bg-white p-8 rounded-lg shadow-lg border w-full'>
					<form
						onSubmit={submitHandler}
						className='space-y-4'
					>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>Update Category</h2>
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
								value={nameUpdate}
								onChange={(e) => setNameUpdate(e.target.value)}
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

export default UpdateCategory;
