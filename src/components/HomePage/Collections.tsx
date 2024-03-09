import { Button } from 'components/Button';
import { Img } from 'components/Img';
import { List } from 'components/List';
import { Text } from 'components/Text';
import React from 'react';

const Collections = () => {
	return (
		<div className='sm:h-[1338px] h-[544px] md:h-[906px] mt-[74px] sm:px-5 relative w-full'>
			<div className='absolute bg-gray-800 flex flex-col inset-x-[0] items-start justify-start mx-auto p-[52px] md:px-10 sm:px-5 top-[0] w-full'>
				<div className='flex flex-col items-center justify-start mb-[284px] md:ml-[0] ml-[91px]'>
					<Text
						className='text-4xl sm:text-[32px] md:text-[34px] text-white-A700'
						size='txtPoppinsBold36WhiteA700'
					>
						Summer Collections
					</Text>
				</div>
			</div>
			<div className='absolute bottom-[0] sm:h-[1264px] h-[400px] md:h-[832px] inset-x-[0] mx-auto w-[87%] md:w-full'>
				<List
					className='absolute sm:flex-col flex-row gap-8 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 inset-[0] justify-center m-auto w-[99%]'
					orientation='horizontal'
				>
					<div className='bg-bluegray-100 flex flex-col items-center justify-start w-full'>
						<div
							className='bg-cover bg-no-repeat flex flex-col h-[400px] items-start justify-center p-[59px] md:px-10 sm:px-5 w-full'
							style={{
								backgroundImage: "url('images/img_group2280.png')",
							}}
						>
							<Text
								className='my-[87px] text-4xl sm:text-[32px] md:text-[34px] text-gray-800'
								size='txtPoppinsRegular36'
							>
								<span className='text-gray-800 font-poppins text-left font-normal'>
									<>
										Summer <br />
									</>
								</span>
								<span className='text-gray-800 font-poppins text-left font-bold'>Collection</span>
							</Text>
						</div>
					</div>
					<div className='bg-bluegray-100 flex flex-col items-center justify-start w-full'>
						<div
							className='bg-cover bg-no-repeat flex flex-col h-[400px] items-start justify-center p-[53px] md:px-10 sm:px-5 w-full'
							style={{
								backgroundImage: "url('images/img_group2278.png')",
							}}
						>
							<Text
								className='my-[93px] text-4xl sm:text-[32px] md:text-[34px] text-white-A700'
								size='txtPoppinsRegular36WhiteA700'
							>
								<span className='text-white-A700 font-poppins text-left font-normal'>
									<>
										Casual <br />
									</>
								</span>
								<span className='text-white-A700 font-poppins text-left font-bold'>Collection</span>
							</Text>
						</div>
					</div>
					<div className='bg-bluegray-100 flex flex-col items-center justify-start w-full'>
						<div
							className='bg-cover bg-no-repeat flex flex-col h-[400px] items-start justify-center p-[52px] md:px-10 sm:px-5 w-full'
							style={{
								backgroundImage: "url('images/img_placeholder.png')",
							}}
						>
							<Text
								className='my-[94px] text-4xl sm:text-[32px] md:text-[34px] text-white-A700'
								size='txtPoppinsRegular36WhiteA700'
							>
								<span className='text-white-A700 font-poppins text-left font-normal'>
									<>
										Big Vibe <br />
									</>
								</span>
								<span className='text-white-A700 font-poppins text-left font-bold'>Collection</span>
							</Text>
						</div>
					</div>
				</List>
				<Button
					className='absolute flex h-[60px] inset-y-[0] items-center justify-center my-auto right-[0] w-[60px]'
					shape='square'
					color='white_A700'
					size='sm'
					variant='fill'
				>
					<Img
						src='images/img_menu.svg'
						alt='menu'
					/>
				</Button>
			</div>
		</div>
	);
};

export default Collections;
