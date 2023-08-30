'use client';

import useNearStation from '@/@hooks/useNearStation';

const LineRoute = () => {
	const nearStation = useNearStation();

	return (
		<div
			className={`flex flex-row items-center justify-center overflow-visible`}
		>
			<div
				className={`absolute flex items-center justify-center gap-2 rounded-full bg-white px-6 py-1.5`}
				style={{
					border: `4px solid ${nearStation?.stationInfo.line[0].color}`,
				}}
			>
				<div
					className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-light text-white`}
					style={{
						backgroundColor: nearStation?.stationInfo.line[0].color,
					}}
				>
					{nearStation?.stationInfo.line[0].text}
				</div>
				<div className={`text-sm font-medium`}>
					{nearStation?.stationInfo.station}
				</div>
			</div>
			<div
				className={`flex w-full flex-row items-center justify-between rounded-full px-3 py-1 text-sm font-light text-white`}
				style={{
					backgroundColor: nearStation?.stationInfo.line[0].color,
				}}
			>
				<div>{nearStation?.stationInfo.prevStation}</div>
				<div>{nearStation?.stationInfo.nextStation}</div>
			</div>
		</div>
	);
};

export default LineRoute;
