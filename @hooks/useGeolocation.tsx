'use client';

import { useEffect, useState } from 'react';

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

	useEffect(() => {
		if (!navigator.geolocation) {
			console.log('Geolocation is not supported');
		} else {
			// TODO : 사파리에서는 SSL이 적용되어 있어야 사용 가능
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	}, []);

	return location;
};

export default useGeolocation;
