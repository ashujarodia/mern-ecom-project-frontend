import { FaEdit, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from '../../redux/api/categoryApi';
import { RootState, server } from '../../redux/store';
import { MdDelete } from 'react-icons/md';
import { responseToast } from '../../utils/features';

const Category = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data } = useGetAllCategoriesQuery(user?._id || '');
	const categories = data?.categories;
	const [deleteCategory] = useDeleteCategoryMutation();

	const handleDelete = async (id: string) => {
		const res = await deleteCategory({ userId: user?._id || '', categoryId: id });
		responseToast(res);
	};

	return (
		<div className='flex my-24'>
			<AdminSideBar />
			<div className='flex-grow p-8 max-w-[800px] mx-auto'>
				<div className='flex justify-between items-center mb-8'>
					<h1 className='text-3xl font-bold'>Category List</h1>
					<Link
						to={'/admin/category/new'}
						className='flex items-center gap-2 bg-green-500 text-white-A700 px-2 py-1 rounded  hover:bg-green-400 duration-300'
					>
						New <FaPlus />
					</Link>
				</div>
				<div className='bg-white rounded-lg shadow-md p-6 border'>
					<h2 className='text-xl font-semibold mb-4'>Categories</h2>
					{/* Display category list */}
					<div className='overflow-x-auto'>
						<table className='table-auto w-full'>
							<thead>
								<tr>
									<th className='px-4 py-2'>Name</th>
									<th className='px-4 py-2'>Image</th>
									<th className='px-4 py-2'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{categories?.map((category) => (
									<tr key={category._id}>
										<td className='border text-center px-4'>{category.name}</td>
										<td className='border  py-2 w-16 px-4 h-14'>
											<img
												src={`${server}/${category.photo}`}
												alt={category.name}
												className='object-cover mx-auto'
											/>
										</td>
										<td className='border px-4 py-7 h-full flex  justify-center items-center gap-4'>
											<button
												className='text-2xl  rounded-full  text-red-500 duration-300 active:scale-90'
												onClick={() => handleDelete(category._id)}
											>
												<MdDelete />
											</button>
											<Link
												to={`/admin/category/update/${category._id}`}
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
			</div>
		</div>
	);
};

export default Category;
