import { useNavigate } from 'react-router-dom';
import { Button, Img, PagerIndicator, Text } from '..';
import image1 from '../../assets/images/banner/images.jpeg';
import image2 from '../../assets/images/banner/fashion.jpeg';
import image3 from '../../assets/images/banner/image2.jpeg';
import image4 from '../../assets/images/banner/denim.jpeg';
import image5 from '../../assets/images/banner/women.jpeg';
import { FaLongArrowAltRight } from 'react-icons/fa';

const Banner = () => {
	const navigate = useNavigate();
	return (
		<div className='bg-gray-50 sm:h-[850px] md:h-[1124px] h-[700px] relative w-full'>
			<div className='absolute sm:h-[900px] md:h-[1124px] h-[700px] inset-y-[0] my-auto right-[0] w-[98%] mx-auto left-0  md:w-full'>
				<div className='absolute flex flex-col sm:h-fit h-full inset-y-[0] items-center justify-start my-auto right-[0] w-[69%]'>
					<div className='flex flex-col items-center justify-start w-full'>
						<div className='flex sm:flex-col flex-row sm:gap-5 items-center justify-evenly w-full'>
							<Img
								className='sm:flex-1 h-[364px] md:h-auto object-cover w-[32%] sm:w-full'
								src={image1}
								alt='placeholder'
							/>
							<Img
								className='sm:flex-1 h-[364px] md:h-auto object-cover w-[69%] sm:hidden'
								src={image2}
								alt='placeholder One'
							/>
						</div>
						<div className='flex md:flex-col flex-row md:gap-5 items-center justify-evenly w-full'>
							<div
								className='bg-cover bg-no-repeat flex md:flex-1 flex-col h-[336px] items-end justify-end p-9 sm:px-5 w-[32%] md:w-full'
								style={{
									backgroundImage: `url(${image3})`,
								}}
							>
								<PagerIndicator
									className='flex gap-2 h-3 items-start justify-start mr-[31px] mt-[252px] w-28'
									count={6}
									activeCss='inline-block cursor-pointer rounded-[50%] h-3 bg-gray-800 w-3'
									activeIndex={1}
									inactiveCss='inline-block cursor-pointer rounded-[50%] h-3 bg-white-A700 w-3'
									selectedWrapperCss='inline-block'
									unselectedWrapperCss='inline-block'
								/>
							</div>
							<Img
								className='md:flex-1 h-[336px] sm:h-auto object-cover w-[32%] md:w-full'
								src={image4}
								alt='placeholder Two'
							/>
							<div
								className='bg-cover bg-no-repeat md:h-12 h-[336px] pt-36 md:px-10 px-36 sm:px-5 relative w-[38%] md:w-full sm:hidden'
								style={{
									backgroundImage: `url(${image5})`,
								}}
							></div>
						</div>
					</div>
				</div>
				<div className='absolute flex flex-col h-max inset-y-[0] items-start justify-start left-[0] my-auto w-[32%] pl-2'>
					<Text
						className='md:text-5xl text-8xl text-gray-900'
						size='txtPlayfairDisplayRegular96'
					>
						Summer Sale
					</Text>
					<Text
						className='mt-[21px] md:text-5xl text-[64px] text-gray-800'
						size='txtPoppinsBold64'
					>
						50% Off
					</Text>
					<Text
						className='leading-[32.00px] mt-[50px] text-gray-800 text-lg sm:text-base w-[93%] sm:w-full'
						size='txtPoppinsRegular18'
					>
						Elevate your style, shop effortlessly: Your one-stop destination for chic fashion finds online
					</Text>
					<Button
						className='cursor-pointer flex h-[60px] items-center justify-center mt-14 w-[245px] gap-3 text-4xl'
						rightIcon={<FaLongArrowAltRight />}
						shape='square'
						color='gray_800'
						size='lg'
						variant='fill'
						onClick={() => navigate('/productList/all')}
					>
						<div className='font-medium font-poppins leading-[normal] md:text-[22px] sm:text-xl text-2xl text-left'>Shop Now</div>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Banner;
