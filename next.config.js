/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/common',
			},
			{
				source: '/:path*',
				destination: '/common/:path*',
			},
		];
	},
};

const prod = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	disable: !prod,
	skipWaiting: true,
});

module.exports = withPWA(nextConfig);
