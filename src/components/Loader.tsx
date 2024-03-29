import React from 'react';

type LoaderProps = {
	initial?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ initial }) => {
	return (
		<div className='loader'>
			<div className='loader-div'></div>
			{initial ? (
				<div>
					<p>Hold on! We are using free hosting so it takes time to load.</p>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Loader;

export const SkeletonLoader = () => {
	return (
		<div className='w-full flex flex-col gap-2 mx-4 animate-pulse'>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
		</div>
	);
};
