import { Button, Img, Text } from '..';

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddToCartMutation } from '../../redux/api/cartApi';
import { RootState } from '../../redux/store';
import { responseToast } from '../../utils/features';
import { Product } from '../../types/types';

const ProductCard = ({ product }: { product: Product }) => {
	const { user } = useSelector((state: RootState) => state.user);

	const navigate = useNavigate();
	const [addToCart] = useAddToCartMutation();

	const handleAddToCart = async () => {
		if (product.stock < 1) {
			return toast.error('Out of stock');
		}
		if (user) {
			const res = await addToCart({ userId: user?._id, productId: product?._id, quantity: 1 });
			responseToast(res);
		} else {
			toast.error('Please login to continue');
			navigate('/login');
		}
	};

	return (
		<div className='border-2 hover:border-gray-800 border-solid flex sm:flex-1 flex-col gap-4 h-[400px] md:h-auto items-center justify-center p-3 sm:px-5 w-[250px] sm:w-full'>
			<Img
				className='h-[200px] md:h-auto object-cover w-[200px] cursor-pointer'
				src={product?.photo.url}
				alt={product?.name}
				onClick={() => navigate(`/product/${product?._id}`)}
			/>
			<div className='flex flex-col gap-2 items-center justify-start w-auto'>
				<Text
					className='text-xl md:text-[22px] text-gray-800 sm:text-xl w-auto text-center'
					size='txtPoppinsMedium24'
				>
					{product?.name
						.split(' ')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
						.join(' ')}
				</Text>
				<Text
					className='text-gray-500 text-lg w-auto'
					size='txtPoppinsMedium18Gray500'
				>
					₹ {product?.price}
				</Text>
			</div>
			<Button
				className='cursor-pointer  font-bold h-[50px] leading-[normal] text-center text-lg w-[150px]'
				shape='square'
				color='gray_800'
				size='md'
				variant='fill'
				onClick={handleAddToCart}
			>
				Add to Cart
			</Button>
		</div>
	);
};

export default ProductCard;
