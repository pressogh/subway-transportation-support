import useGeolocation from '@/@hooks/useGeolocation';
import stationInfo from '@/@etc/stationInfo.json';
import { useEffect, useState } from 'react';
import { Feature } from '@/@types/TMapType';
import { NearStationType } from '@/@types/NearStationType';

const useNearStation = () => {
	const [nowCoor, setNowCoor] = useState<GeolocationCoordinates | null>(null);
	const geolocation = useGeolocation();
	const [res, setRes] = useState<NearStationType | null>(null);

	useEffect(() => {
		if (nowCoor === null && geolocation !== null) setNowCoor(geolocation);
		else if (nowCoor !== null && geolocation !== null) {
			// 현재 위치가 이전 위치와 100m 이상 차이가 날 경우에만 업데이트
			if (
				Math.sqrt(
					Math.pow(nowCoor.latitude - geolocation.latitude, 2) +
						Math.pow(nowCoor.longitude - geolocation.longitude, 2),
				) >= 0.0009
			)
				setNowCoor(geolocation);
		}
	}, [geolocation]);

	useEffect(() => {
		if (nowCoor !== null) {
			let nearStation: NearStationType | null = null;

			const fetchStation = stationInfo.data.map(async (station: any) => {
				const requestBody = {
					startX: nowCoor.longitude.toString(),
					startY: nowCoor.latitude.toString(),
					endX: station.lng.toString(),
					endY: station.lat.toString(),
					reqCoordType: 'WGS84GEO',
					resCoordType: 'WGS84GEO',
					startName: '출발지',
					endName: '도착지',
					searchOption: 30, // 최단거리 + 계단 제외
				};

				const f = await fetch(
					`https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result`,
					{
						method: 'POST',
						headers: {
							appKey:
								process.env.NEXT_PUBLIC_TMAP_CLIENT_ID || '',
						},
						body: JSON.stringify(requestBody),
					},
				).then((res) => res.json());

				if (nearStation === null) {
					nearStation = {
						stationInfo: station,
						totalDistance: f.features[0].properties.totalDistance,
						start: {
							lat: f.features[0].geometry.coordinates[0][0],
							lng: f.features[0].geometry.coordinates[0][1],
						},
						end: {
							lat: f.features[f.features.length - 1].geometry
								.coordinates[0][0],
							lng: f.features[f.features.length - 1].geometry
								.coordinates[0][1],
						},
						route: f.features
							.map((item: Feature) => {
								if (
									typeof item.geometry.coordinates[0] ===
									'object'
								)
									return item.geometry.coordinates;
								return [item.geometry.coordinates];
							})
							.flat(),
					};
				} else {
					if (
						nearStation.totalDistance >
						f.features[0].properties.totalDistance
					) {
						nearStation = {
							stationInfo: station,
							totalDistance:
								f.features[0].properties.totalDistance,
							start: {
								lat: f.features[0].geometry.coordinates[0][0],
								lng: f.features[0].geometry.coordinates[0][1],
							},
							end: {
								lat: f.features[f.features.length - 1].geometry
									.coordinates[0][0],
								lng: f.features[f.features.length - 1].geometry
									.coordinates[0][1],
							},
							route: f.features
								.map((item: Feature) => {
									if (
										typeof item.geometry.coordinates[0] ===
										'object'
									)
										return item.geometry.coordinates;
									return [item.geometry.coordinates];
								})
								.flat(),
						};
					}
				}
			});

			Promise.all(fetchStation).then(() => {
				setRes(nearStation);
				console.log(nearStation);
			});
		}
	}, [nowCoor]);

	return res;
};

export default useNearStation;
