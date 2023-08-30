'use client';

import { useState } from 'react';
import useInterval from '@/@hooks/useInterval';

const useGeolocation = () => {
	const [location, setLocation] = useState<GeolocationCoordinates | null>(
		null,
	);

	const onSuccess = (position: GeolocationPosition) => {
		setLocation(position.coords);
	};

	const onError = (error: GeolocationPositionError) => {
		console.log(error);
	};

	useInterval(() => {
		if (!navigator.geolocation) {
			console.log('Geolocation is not supported');
		} else {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	}, 5000);

	return location;
};

export default useGeolocation;
