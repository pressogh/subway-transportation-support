/** @type {import('next').NextConfig} */
const nextConfig = {};

const prod = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	disable: !prod,
	skipWaiting: true,
});

module.exports = withPWA(nextConfig);
