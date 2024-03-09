import { Img, Input, Text } from './index';
import image from '../assets/images/img_sosmedia.svg';

const Footer = () => {
	return (
		<footer className='bg-gray-800 flex items-center justify-center mt-[100px] sm:px-10 w-full'>
			<div className='flex flex-col gap-[85px] sm:gap-0 items-center justify-center mb-8 ml-36 mr-[236px] mt-16 w-[81%]'>
				<div className='flex md:flex-col flex-row md:gap-5 items-center justify-start w-full'>
					<div className='flex md:flex-1 flex-col items-start justify-start w-[28%] md:w-full'>
						<Text
							className='text-2xl md:text-[22px] text-white-A700 sm:text-xl'
							size='txtPoppinsBold24WhiteA700'
						>
							Join our Newsletter
						</Text>
						<Text
							className='mt-[31px] text-lg text-white-A700'
							size='txtPoppinsRegular18WhiteA700'
						>
							<>
								Drop your email below to get update about us, <br />
								lastest news, tips, and more!
							</>
						</Text>
						<Input
							name='input'
							placeholder='Enter your email'
							className='leading-[normal] p-0  text-left text-lg tracking-[0.36px] w-full text-gray-800 bg-transparent'
							wrapClassName='flex mt-[35px] w-[91%]'
							type='email'
							shape='square'
							color='white_A700'
							size='xs'
							variant='fill'
						></Input>
					</div>
					<div className='flex flex-col gap-6 items-start justify-start md:ml-[0] ml-[131px] w-auto'>
						<Text
							className='text-2xl md:text-[22px] text-white-A700 sm:text-xl w-auto'
							size='txtPoppinsBold24WhiteA700'
						>
							Product Links
						</Text>
						<div className='flex flex-col gap-4 items-start justify-start w-auto'>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Categories
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								New Arrival
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Features
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Collections
							</Text>
						</div>
					</div>
					<div className='flex md:flex-1 flex-col gap-7 items-start justify-start ml-28 md:ml-[0] md:mt-0 mt-2 pb-1 w-[8%] md:w-full'>
						<Text
							className='text-2xl md:text-[22px] text-white-A700 sm:text-xl'
							size='txtPoppinsBold24WhiteA700'
						>
							Company
						</Text>
						<div className='flex flex-col gap-2.5 items-start justify-start w-auto'>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								About
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Blog
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Careers
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Contact{' '}
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Services
							</Text>
						</div>
					</div>
					<div className='flex md:flex-1 flex-col gap-[31px] items-start justify-start md:ml-[0] ml-[154px] pb-1 w-[10%] md:w-full'>
						<Text
							className='text-2xl md:text-[22px] text-white-A700 sm:text-xl'
							size='txtPoppinsBold24WhiteA700'
						>
							Support
						</Text>
						<div className='flex flex-col gap-2.5 items-start justify-start w-auto'>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Support Center
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								FAQ
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Privacy Policy
							</Text>
							<Text
								className='text-lg text-white-A700 w-auto'
								size='txtPoppinsRegular18WhiteA700'
							>
								Terms of service
							</Text>
						</div>
					</div>
					<div className='flex md:flex-1 flex-col gap-[30px] items-start justify-start md:ml-[0] ml-[130px] w-[10%] md:w-full'>
						<Text
							className='text-2xl md:text-[22px] text-white-A700 sm:text-xl'
							size='txtPoppinsBold24WhiteA700'
						>
							Get In Touch
						</Text>
						<Img
							className='h-6 w-[120px]'
							src={image}
							alt='sosmedia'
						/>
					</div>
				</div>
				<Text
					className='md:ml-[0] ml-[676px] mr-[583px] text-sm text-white-A700'
					size='txtPoppinsRegular14'
				>
					Copyright © 2024 Shop . All Right Reseved
				</Text>
			</div>
		</footer>
	);
};

Footer.defaultProps = {};

export default Footer;
