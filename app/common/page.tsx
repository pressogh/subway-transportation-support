import Map from '@/app/components/Map';
import LineTagGrid from '@/app/components/Subway/LineTagGrid';
import NearSubwayStation from '@/app/components/Subway/NearSubwayStation';

const Page = () => {
	return (
		<div className={`flex flex-col`}>
			<div className={`my-6 h-60 w-full overflow-hidden rounded-xl`}>
				{/*TODO: 현재 위치 기준으로 내 위치 / 가장 가까운 역을 찾아서 props로 넘겨줘야 함*/}
				<Map />
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

			<div>
				<LineTagGrid
					lineInfos={[
						{ line: '인', color: '#759CCE' },
						{ line: '인', color: '#F5A251' },
					]}
				/>

				<NearSubwayStation
					lineInfo={{ line: '인', color: '#759CCE' }}
					main={'인천대입구'}
					prev={'지식정보단지'}
					next={'센트럴파크'}
				/>
			</div>
		</div>
	);
};

export default Page;
