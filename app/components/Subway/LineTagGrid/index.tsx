'use client';

import useNearStation from '@/@hooks/useNearStation';
import LineTag from '@/app/components/Subway/LineTag';

const LineTagGrid = () => {
	const nearStation = useNearStation();

	return (
		<div className={`flex flex-row gap-3`}>
			{nearStation?.stationInfo.line.map((lineInfo, index) => {
				return (
					<LineTag lineInfo={lineInfo} key={lineInfo.text + index} />
				);
			})}
		</div>
	);
};

export default LineTagGrid;
