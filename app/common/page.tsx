import Map from '@/app/components/Map';
import LineTagGrid from '@/app/components/Subway/LineTagGrid';
import NearSubwayStation from '../components/Subway/LineRoute';
import AvailableStation from '@/app/components/Subway/AvailableStation';

const Page = () => {
	return (
		<div className={`flex flex-col`}>
			<div className={`my-6 h-60 w-full overflow-hidden rounded-xl`}>
				<Map />
			</div>

			<AvailableStation station={'인천대입구'} />

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
