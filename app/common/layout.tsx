import Header from '@/app/components/Header';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default CommonLayout;
