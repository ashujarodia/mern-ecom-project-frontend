import { useSelector } from 'react-redux';
import { Img } from '../components';
import { RootState } from '../redux/store';

const Profile = () => {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<div className='container mx-auto px-4 py-8 my-16'>
			<div className='max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
				<div className='sm:flex sm:flex-col items-center'>
					<div className='w-full'>
						<Img
							className='h-48 w-48  object-cover rounded-full mx-auto'
							src={user?.photo}
							alt='User Avatar'
						/>
					</div>
					<div className='p-4 md:p-8'>
						<div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>{user?.name}</div>
						<div className='mt-4'>
							<p className='text-gray-600'>
								<strong>Email:</strong> {user?.email}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
