import { Img, Text, List } from '..';
import image1 from '../../assets/images/home/img_clock.svg';
import image2 from '../../assets/images/home/img_computer.svg';
import image3 from '../../assets/images/home/img_music.svg';
import image4 from '../../assets/images/home/img_music_65X65.svg';

const WhyChooseUs = () => {
	return (
		<div className='flex flex-col gap-8 justify-start mt-[113px] w-full'>
			<Text
				className=' text-center text-4xl sm:text-[32px] md:text-[34px] text-gray-800'
				size='txtPoppinsBold36'
			>
				Why Choose Us
			</Text>
			<div className='bg-gray-50 flex flex-row items-center justify-start md:px-10 px-36 sm:px-5 w-full'>
				<div className='flex md:flex-col flex-row gap-8 items-center justify-start w-full'>
					<div className='flex sm:flex-1 flex-col gap-8 h-96 md:h-auto items-center justify-center p-8 sm:px-5 w-96 sm:w-full'>
						<div className='border-2 border-gray-500 border-solid h-[120px] md:h-[65px] p-[27px] sm:px-5 relative rounded-[50%] w-[120px]'>
							<Img
								className='absolute h-[65px] inset-[0] justify-center m-auto w-[65px]'
								src={image3}
								alt='music'
							/>
						</div>
						<div className='flex flex-col gap-4 items-center justify-start w-auto'>
							<Text
								className='text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto whitespace-nowrap'
								size='txtPoppinsBold24'
							>
								Free Delivery
							</Text>
							<Text
								className='text-center text-gray-500 text-lg'
								size='txtPoppinsRegular18Gray500'
							>
								<>
									This free shipping
									<br />
									only for selected region
								</>
							</Text>
						</div>
					</div>
					<List
						className='md:flex-1 sm:flex-col flex-row gap-8 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 w-3/4 md:w-full'
						orientation='horizontal'
					>
						<div className='flex flex-col gap-8 h-96 md:h-auto items-center justify-center p-8 sm:px-5 w-full'>
							<div className='border-2 border-gray-500 border-solid md:h-16 h-[120px] p-7 sm:px-5 relative rounded-[50%] w-[120px]'>
								<Img
									className='absolute h-16 inset-[0] justify-center m-auto w-16'
									src={image2}
									alt='computer'
								/>
							</div>
							<div className='flex flex-col gap-4 items-center justify-start w-auto'>
								<Text
									className='text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto whitespace-nowrap'
									size='txtPoppinsBold24'
								>
									Payment Method
								</Text>
								<Text
									className='text-center text-gray-500 text-lg'
									size='txtPoppinsRegular18Gray500'
								>
									<>
										This free shipping
										<br />
										only for selected region
									</>
								</Text>
							</div>
						</div>
						<div className='flex flex-col gap-8 h-96 md:h-auto items-center justify-center p-8 sm:px-5 w-full'>
							<div className='border-2 border-gray-500 border-solid md:h-16 h-[120px] p-[27px] sm:px-5 relative rounded-[50%] w-[120px]'>
								<Img
									className='absolute h-16 inset-[0] justify-center m-auto w-16'
									src={image1}
									alt='clock'
								/>
							</div>
							<div className='flex flex-col gap-4 items-center justify-start w-auto'>
								<Text
									className='text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto'
									size='txtPoppinsBold24'
								>
									Warranty
								</Text>
								<Text
									className='text-center text-gray-500 text-lg'
									size='txtPoppinsRegular18Gray500'
								>
									<>
										This free shipping
										<br />
										only for selected region
									</>
								</Text>
							</div>
						</div>
						<div className='flex flex-col gap-8 h-96 md:h-auto items-center justify-center p-8 sm:px-5 w-full'>
							<div className='border-2 border-gray-500 border-solid h-[120px] md:h-[65px] p-[27px] sm:px-5 relative rounded-[50%] w-[120px]'>
								<Img
									className='absolute h-[65px] inset-[0] justify-center m-auto w-[65px]'
									src={image4}
									alt='music One'
								/>
							</div>
							<div className='flex flex-col gap-4 items-center justify-start w-auto'>
								<Text
									className='text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto whitespace-nowrap'
									size='txtPoppinsBold24'
								>
									Customer Support{' '}
								</Text>
								<Text
									className='text-center text-gray-500 text-lg'
									size='txtPoppinsRegular18Gray500'
								>
									<>
										This free shipping
										<br />
										only for selected region
									</>
								</Text>
							</div>
						</div>
					</List>
				</div>
			</div>
		</div>
	);
};

export default WhyChooseUs;
