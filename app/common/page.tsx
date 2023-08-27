'use client';

import useGeolocation from '@/@hooks/useGeolocation';
import useInterval from '@/@hooks/useInterval';
// import Map from '@/app/components/Map';

const Page = () => {
	const location = useGeolocation();
	useInterval(() => {
		console.log(location);
	}, 1000);

	return (
		<div className={`flex flex-col`}>
			<div className={`my-6 h-60 w-full overflow-hidden rounded-xl`}>
				{/*TODO: 현재 위치 기준으로 내 위치 / 가장 가까운 역을 찾아서 props로 넘겨줘야 함*/}
				{/*<Map coor={location} />*/}
			</div>

			<div>
				<div className={`text-xl font-light`}>
					현재 도움을 요청할 수 있는 역은
				</div>
				<div className={`text-xl font-light`}>
					<span
						className={`mr-2 text-2xl font-normal text-[#3681CB]`}
					>
						인천대입구역
					</span>
					입니다.
				</div>
			</div>
		</div>
	);
};

export default Page;
