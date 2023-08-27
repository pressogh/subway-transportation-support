import { LineInfoType } from '@/@types/LineInfoType';
import LineTag from '@/app/components/Subway/LineTag';

interface TagGridProps {
	lineInfos: LineInfoType[];
}

const LineTagGrid = ({ lineInfos }: TagGridProps) => {
	return (
		<div className={`flex flex-row gap-2`}>
			{lineInfos.map((lineInfo, index) => {
				return (
					<LineTag lineInfo={lineInfo} key={lineInfo.line + index} />
				);
			})}
		</div>
	);
};

export default LineTagGrid;
