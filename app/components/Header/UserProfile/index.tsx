'use client';

import { useRouter } from 'next/navigation';

interface UserProfileProps {
	accessToken: string | undefined;
}

const UserProfile = ({ accessToken }: UserProfileProps) => {
	const router = useRouter();

	return (
		<div
			className={`h-12 w-12 rounded-full border border-[#DEDEDE]`}
			onClick={async () => {
				await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`, {
					method: 'POST',
					credentials: 'include',
					headers: {
						Authorization: `Bearer ${
							accessToken ? accessToken : ''
						}`,
					},
				});

				router.push('/login');
			}}
		/>
	);
};

export default UserProfile;
