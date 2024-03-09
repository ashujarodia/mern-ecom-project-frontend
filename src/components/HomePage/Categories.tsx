import { Img, Text } from '..';

import { Link } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../redux/api/categoryApi';
import { server } from '../../redux/store';
import { SkeletonLoader } from '../Loader';

const Categories = () => {
	const { data, isLoading } = useGetAllCategoriesQuery('');
	const categoriesData = data?.categories;
	return (
		<div className='flex flex-col gap-8 items-center justify-start max-w-[1633px] mt-[100px] mx-auto pt-[11px] md:px-5 w-full px-6'>
			<div>
				<Text
					className='text-4xl sm:text-[32px] md:text-[34px] text-gray-800'
					size='txtPoppinsBold36'
				>
					Categories
				</Text>
			</div>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='grid grid-cols-6 md:grid-cols-3 gap-8 sm:flex sm:overflow-x-auto sm:gap-3 w-full sm:pb-4'>
					{categoriesData?.map((i) => (
						<Link
							className='bg-gray-50  border-2 hover:border-gray-800 flex md:flex-1 flex-col items-center justify-start p-[50px]   cursor-pointer'
							to={`/productList/${i.name.toLowerCase()}`}
							key={i._id}
						>
							<div className='flex flex-col gap-[26px] items-center justify-start w-[47%] md:w-full'>
								<Img
									className='h-[68px] w-[68px]'
									src={`${server}/${i.photo}`}
									alt={i.name}
								/>
								<Text
									className='text-gray-500 text-lg'
									size='txtPoppinsRegular18Gray500'
								>
									{i.name}
								</Text>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default Categories;
