import React from 'react';
import Banner from '../components/HomePage/Banner';
import Categories from '../components/HomePage/Categories';
import Featured from '../components/HomePage/Featured';
import NewArrivals from '../components/HomePage/NewArrivals';
import WhyChooseUs from '../components/HomePage/WhyChooseUs';

const Home: React.FC = () => {
	return (
		<div className='bg-white-A700 flex flex-col font-poppins items-center justify-start mx-auto w-full'>
			<div className='flex flex-col items-center justify-start w-full'>
				<Banner />
				<Categories />
				<NewArrivals />
				<Featured />
				{/* <Collections /> */}
				{/* <Popular /> */}
				<WhyChooseUs />
			</div>
		</div>
	);
};

export default Home;
