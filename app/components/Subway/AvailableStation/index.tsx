interface AvailableStationProps {
	station: string;
}

const AvailableStation = ({ station }: AvailableStationProps) => {
	return (
		<div>
			<div className={`text-xl font-light`}>
				현재 도움을 요청할 수 있는 역은
			</div>
			<div className={`text-xl font-light`}>
				<span className={`mr-2 text-2xl font-normal text-[#3681CB]`}>
					{station}
				</span>
				입니다.
			</div>
		</div>
	);
};

export default AvailableStation;
