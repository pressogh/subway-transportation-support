import Image from 'next/image';
import { cookies } from 'next/headers';
import UserProfile from '@/app/components/Header/UserProfile';

const getAccessToken = async () => {
	return cookies().get('accessToken');
};

const Index = async () => {
	const accessToken = await getAccessToken();

	return (
		<div className={`relative flex items-center justify-between`}>
			<div className={`relative h-14 w-14`}>
				<Image
					src={`/app-icons/icon-without-bg.svg`}
					alt={`icon-without-bg.svg`}
					fill={true}
				/>
			</div>

			<UserProfile accessToken={accessToken?.value} />
		</div>
	);
};

export default Index;
