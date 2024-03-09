import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const url = window.location.hash;

	const ListItem = ({ link }: { link: string }) => {
		return (
			<li className={`px-4 py-2 rounded w-full   ${url === `#/admin/${link}` ? 'bg-gray-200 text-blue-500' : 'hover:bg-gray-100'}`}>
				<Link
					to={`/admin/${link}`}
					className='block'
					onClick={() => setIsOpen(false)}
				>
					{link.charAt(0).toUpperCase() + link.slice(1)}
				</Link>
			</li>
		);
	};

	return (
		<div className=''>
			<button
				className='fixed top-0 text-2xl ml-4 z0 mt-16'
				onClick={() => setIsOpen(!isOpen)}
			>
				<IoMdMenu />
			</button>
			<div
				className={`border-2 w-64 flex flex-col fixed left-0 top-0 rounded-r-2xl min-h-screen bg-white-A700  my-4 transition duration-300 ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
			>
				{/* Navigation */}
				<nav className='flex justify-center   overflow-y-auto mt-28'>
					<button
						className='absolute top-0 right-0 mt-14 mr-5 text-2xl'
						onClick={() => setIsOpen(!isOpen)}
					>
						<IoMdMenu />
					</button>
					<ul className='py-8 flex flex-col gap-4 text-center w-full mx-2'>
						<ListItem link='dashboard' />
						<ListItem link='user' />
						<ListItem link='product' />
						<ListItem link='category' />
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default AdminSideBar;
