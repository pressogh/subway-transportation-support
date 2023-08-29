import useGeolocation from '@/@hooks/useGeolocation';
import stationInfo from '@/@etc/stationInfo.json';
import { useEffect, useState } from 'react';

const useNearStation = () => {
	const nowCoor = useGeolocation();
	const [res, setRes] = useState<any>();

	useEffect(() => {
		if (nowCoor) {
			let nearStation: any[] = [];

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

				if (nearStation.length === 0) {
					nearStation = f.features;
				} else {
					if (
						nearStation[0].properties.totalDistance >
						f.features[0].properties.totalDistance
					) {
						nearStation = f.features;
					}
				}
			});

			Promise.all(fetchStation).then(() => {
				// find all coordinates in nearStation
				const coordinates: any[] = [];
				nearStation.forEach((item) => {
					if (typeof item.geometry.coordinates[0] === 'object') {
						item.geometry.coordinates.forEach((c: any) => {
							coordinates.push(c);
						});
					} else {
						coordinates.push(item.geometry.coordinates);
					}
				});

				setRes(coordinates);
				console.log(coordinates);
			});
		}
	}, [nowCoor]);

	return res;
};

export default useNearStation;
