import useGeolocation from '@/@hooks/useGeolocation';
import stationInfo from '@/@etc/stationInfo.json';
import { useEffect, useState } from 'react';
import Point = naver.maps.Point;
import { Feature } from '@/@types/TMapType';

interface NearStationType {
	totalDistance: number;
	start: {
		lat: number;
		lng: number;
	};
	end: {
		lat: number;
		lng: number;
	};
	route: Point[];
}

const useNearStation = () => {
	const nowCoor = useGeolocation();
	const [res, setRes] = useState<NearStationType>();

	useEffect(() => {
		if (nowCoor) {
			let nearStation: NearStationType;

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

				console.log(JSON.stringify(f));
				if (nearStation === undefined) {
					nearStation = {
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
