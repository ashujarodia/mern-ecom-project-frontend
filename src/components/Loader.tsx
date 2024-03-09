const Loader = () => {
	return (
		<div className='loader'>
			<div className='loader-div'></div>
		</div>
	);
};

export default Loader;

export const SkeletonLoader = () => {
	return (
		<div className='w-full flex flex-col gap-2 mx-2 animate-pulse'>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
			<div className='w-full h-8 rounded bg-gray-200 dark:bg-gray-300'></div>
		</div>
	);
};
