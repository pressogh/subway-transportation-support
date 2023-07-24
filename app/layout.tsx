import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from '@/app/components/Head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: '교움',
	description: '교통지원 도움이'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ko">
			<Head />
			<body className={inter.className}>{children}</body>
		</html>
	)
}
