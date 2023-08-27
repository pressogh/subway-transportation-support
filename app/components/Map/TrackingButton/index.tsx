interface TrackingButtonProps {
	track: boolean;
	setTrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrackingButton = ({ track, setTrack }: TrackingButtonProps) => {
	return (
		<div
			onClick={() => setTrack((prev) => !prev)}
			className={`absolute bottom-7 right-2 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white`}
		>
			<svg
				fill='none'
				stroke={track ? '#0072F5' : 'currentColor'}
				strokeWidth={1.5}
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
				className={`h-6 w-6`}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
				/>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
				/>
			</svg>
		</div>
	);
};

export default TrackingButton;
