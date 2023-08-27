import { LineInfoType } from '@/@types/LineInfoType';

interface LineTagProps {
	lineInfo: LineInfoType;
}

const LineTag = ({ lineInfo }: LineTagProps) => {
	return (
		<div
			className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100`}
		>
			<div
				className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-light text-white`}
				style={{ backgroundColor: lineInfo.color }} // tailwind에서 동적 스타일링이 되지 않기 때문에 직접 스타일링
			>
				{lineInfo.line}
			</div>
		</div>
	);
};

export default LineTag;
