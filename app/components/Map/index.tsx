'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import TrackingButton from '@/app/components/Map/TrackingButton';

interface MapProps {
	coor: GeolocationCoordinates | null;
}

const Index = ({ coor }: MapProps) => {
	const mapDivRef = useRef<HTMLDivElement>(null);
	const map = useRef<naver.maps.Map | null>(null);
	const marker = useRef<naver.maps.Marker | null>(null);

	const [track, setTrack] = useState<boolean>(false);
	const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

	// 지도 생성
	useEffect(() => {
		if (scriptLoaded) {
			map.current = new window.naver.maps.Map(mapDivRef.current || '', {
				center: new window.naver.maps.LatLng(
					coor?.latitude || 37.555167,
					coor?.longitude || 126.970833,
				),
				zoom: 16,
				scaleControl: false,
			});
		}
	}, [scriptLoaded, coor]);

	// 지도의 중심을 현재 위치로 변경
	useEffect(() => {
		if (!map.current || !track) {
			return;
		}

		map.current?.setCenter(
			new window.naver.maps.LatLng(
				coor?.latitude || 37.555167,
				coor?.longitude || 126.970833,
			),
		);
	}, [coor, track]);

	// 마커 생성
	useEffect(() => {
		if (!track || !map.current) {
			marker.current?.setMap(null);
			return;
		}

		if (marker.current !== null) {
			map.current?.setZoom(16);
			marker.current?.setPosition(
				new window.naver.maps.LatLng(
					coor?.latitude || 37.555167,
					coor?.longitude || 126.970833,
				),
			);

			map.current?.panTo(
				marker.current?.getPosition() ||
					new window.naver.maps.LatLng(
						coor?.latitude || 37.555167,
						coor?.longitude || 126.970833,
					),
			);

			marker.current?.setMap(map.current);
		} else {
			marker.current = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(
					coor?.latitude || 37.555167,
					coor?.longitude || 126.970833,
				),
				map: map.current,
				icon: {
					url: '/svg/location-pin.svg',
				},
			});
		}
	}, [track, coor]);

	return (
		<div className={`relative h-full w-full`}>
			<div ref={mapDivRef} className={`h-full w-full`} />

			{scriptLoaded && (
				<TrackingButton setTrack={setTrack} track={track} />
			)}

			<Script
				strategy={'afterInteractive'}
				src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
				onLoad={() => setScriptLoaded(true)}
			/>
		</div>
	);
};

export default Index;
