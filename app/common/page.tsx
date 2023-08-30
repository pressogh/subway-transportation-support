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

			<AvailableStation />

			<div>
				<LineTagGrid />

				<NearSubwayStation />
			</div>
		</div>
	);
};

export default Page;
