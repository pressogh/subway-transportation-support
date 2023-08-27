import { LineInfoType } from '@/@types/LineInfoType';

interface NearSubwayStationProps {
	lineInfo: LineInfoType;
	main: string;
	prev: string | null;
	next: string | null;
}

const NearSubwayStation = ({
	lineInfo,
	main,
	prev,
	next,
}: NearSubwayStationProps) => {
	return (
		<div
			className={`flex flex-row items-center justify-center overflow-visible`}
		>
			<div
				className={`absolute flex items-center justify-center gap-2 rounded-full bg-white px-6 py-1.5`}
				style={{ border: `4px solid ${lineInfo.color}` }}
			>
				<div
					className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-light text-white`}
					style={{ backgroundColor: lineInfo.color }}
				>
					{lineInfo.line}
				</div>
				<div className={`text-sm font-medium`}>{main}</div>
			</div>
			<div
				className={`flex w-full flex-row items-center justify-between rounded-full px-3 py-1 text-sm font-light text-white`}
				style={{ backgroundColor: lineInfo.color }}
			>
				<div>{prev}</div>
				<div>{next}</div>
			</div>
		</div>
	);
};

export default NearSubwayStation;
