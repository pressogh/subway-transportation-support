import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const isOk = [
	`/manifest.json`,
	`/_next/*`,
	`/favicon.ico`,
	`/company-icons/*`,
	`/app-icons/*`,
];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (isOk.some((path) => pathname.match(path))) {
		return NextResponse.next();
	}

	const accessToken = cookies().get('accessToken');
	const refreshToken = cookies().get('refreshToken');

	if (pathname === '/login') {
		if (accessToken || refreshToken) {
			return NextResponse.redirect(new URL('/', request.nextUrl));
		}

		return NextResponse.next();
	} else {
		if (!accessToken && !refreshToken) {
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}
	}

	// accessToken 체크 후 만료되었으면 refreshToken으로 accessToken 재발급
	const authorized = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${
					cookies().has('accessToken') && accessToken !== undefined
						? accessToken.value
						: ''
				}`,
			},
		},
	);

	if (authorized.status === 401) {
		const refreshCheck = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
			{
				method: 'POST',
				headers: {
					Cookie: cookies().toString(),
				},
			},
		);

		// refreshToken이 만료되었으면 로그인 페이지로 이동
		if (refreshCheck.status === 401) {
			const res = NextResponse.redirect(
				new URL('/login', request.nextUrl),
			);
			res.cookies.delete('accessToken');
			res.cookies.delete('refreshToken');

			return res;
		}

		const { accessToken } = await refreshCheck.json();

		const res = NextResponse.next();
		res.cookies.set('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 7200 * 1000,
		});

		return res;
	}

	return NextResponse.next();
}
