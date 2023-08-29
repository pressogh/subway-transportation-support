'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import TrackingButton from '@/app/components/Map/TrackingButton';
import useGeolocation from '@/@hooks/useGeolocation';
import useNearStation from '@/@hooks/useNearStation';

const Index = () => {
	const coor = useGeolocation();
	const nearStation = useNearStation();

	const mapDivRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<naver.maps.Map | null>(null);
	const markerRef = useRef<naver.maps.Marker | null>(null);
	const routeRef = useRef<naver.maps.Polyline | null>(null);

	const [track, setTrack] = useState<boolean>(true);
	const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

	// 지도 생성
	useEffect(() => {
		if (scriptLoaded && mapDivRef.current) {
			mapRef.current = new window.naver.maps.Map(mapDivRef.current, {
				scaleControl: false,
			});
			const dragStartListener = mapRef.current?.addListener(
				'dragstart',
				() => {
					setTrack(false);
				},
			);

			// 컴포넌트 언마운트 시 이벤트 리스너 제거
			return () => {
				mapRef.current?.removeListener(dragStartListener);
			};
		}
	}, [scriptLoaded]);

	// 지도의 중심을 현재 위치로 변경
	useEffect(() => {
		if (!mapRef.current || !track) {
			return;
		}

		mapRef.current?.panTo(
			markerRef.current?.getPosition() ||
				new window.naver.maps.LatLng(
					coor?.latitude || 37.555167,
					coor?.longitude || 126.970833,
				),
		);
	}, [coor, track]);

	// 마커 생성
	useEffect(() => {
		if (!mapRef.current || !track) {
			return;
		}

		if (markerRef.current !== null) {
			markerRef.current?.setPosition(
				new window.naver.maps.LatLng(
					coor?.latitude || 37.555167,
					coor?.longitude || 126.970833,
				),
			);

			mapRef.current?.panTo(
				markerRef.current?.getPosition() ||
					new window.naver.maps.LatLng(
						coor?.latitude || 37.555167,
						coor?.longitude || 126.970833,
					),
			);

			markerRef.current?.setMap(mapRef.current);
		} else {
			markerRef.current = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(
					coor?.latitude || 37.555167,
					coor?.longitude || 126.970833,
				),
				map: mapRef.current,
				icon: {
					url: '/svg/location-pin.svg',
				},
			});
		}
	}, [coor, track]);

	useEffect(() => {
		if (nearStation && mapRef.current) {
			// add coordinates to map
			// polyline 말고 그냥 점으로

			routeRef.current?.setMap(null);

			routeRef.current = new window.naver.maps.Polyline({
				map: mapRef.current,
				path: nearStation,
				strokeWeight: 8,
				strokeColor: '#0072F5',
				strokeOpacity: 1,
				strokeStyle: 'shortdot',
				strokeLineCap: 'round',
				strokeLineJoin: 'round',
			});
		}
	}, [nearStation]);

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
