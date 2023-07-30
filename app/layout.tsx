import './globals.css';
import type { Metadata } from 'next';
import Head from '@/app/components/Head';

export const metadata: Metadata = {
	title: '교움',
	description: '교통지원 도움이',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ko'>
			<Head />
			<body>{children}</body>
		</html>
	);
}
