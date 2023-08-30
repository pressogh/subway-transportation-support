import { StationInfoType } from '@/@types/StationInfoType';
import Point = naver.maps.Point;

export interface NearStationType {
	stationInfo: StationInfoType;
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
