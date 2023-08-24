import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
	return (
		<div
			className={`flex h-screen w-full flex-col items-center justify-between px-12 pb-12 pt-20`}
		>
			<div className={`relative aspect-square w-[80%]`}>
				<Image
					src={`/app-icons/icon-without-bg.svg`}
					alt={`icon-without-bg.svg`}
					fill={true}
				/>
			</div>

			<div className={`flex w-full flex-col gap-4`}>
				<Link
					href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login/`}
				>
					<div
						className={`flex w-full cursor-pointer items-center justify-center gap-4 rounded-md border border-[#F2F2F2] bg-white px-6 py-3`}
					>
						<div>
							<Image
								src={'/company-icons/google-icon.svg'}
								alt={'google-icon.svg'}
								width={24}
								height={24}
							/>
						</div>
						<div>구글 계정으로 로그인</div>
					</div>
				</Link>

				<Link
					href={`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/login/`}
				>
					<div
						className={`flex w-full cursor-pointer items-center justify-center gap-4 rounded-md bg-[#FEE500] px-6 py-3`}
					>
						<div>
							<Image
								src={'/company-icons/kakao-icon.svg'}
								alt={'kakao-icon.svg'}
								width={24}
								height={24}
							/>
						</div>
						<div>카카오계정으로 로그인</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Page;
