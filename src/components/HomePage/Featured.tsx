import { Text } from '..';
import { useGetFeaturedProductsQuery } from '../../redux/api/productApi';
import { SkeletonLoader } from '../Loader';
import ProductCard from '../Product/ProductCard';

const Featured = () => {
	const { data, isLoading } = useGetFeaturedProductsQuery('');
	const products = data?.products;

	return (
		<div className='px-6 flex flex-col items-center justify-start max-w-[1632px] mt-[100px]  pt-2 md:px-2 w-full'>
			<div>
				<Text
					className='text-4xl sm:text-[32px] md:text-[34px] text-gray-800'
					size='txtPoppinsBold36'
				>
					Featured
				</Text>
			</div>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='grid grid-cols-5 gap-12 sm:grid-cols-1 md:grid-cols-3 mt-16'>
					{products?.map((i) => (
						<ProductCard
							key={i._id}
							id={i._id}
							name={i.name}
							image={i.photo?.url}
							addToCart={() => {}}
							price={i.price}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Featured;
