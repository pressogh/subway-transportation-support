export interface TMapType {
	type: string;
	features: Feature[];
}

export interface Feature {
	type: FeatureType;
	geometry: Geometry;
	properties: Properties;
}

export interface Geometry {
	type: GeometryType;
	coordinates: Array<number[] | number>;
}

export enum GeometryType {
	LineString = 'LineString',
	Point = 'Point',
}

export interface Properties {
	totalDistance?: number;
	totalTime?: number;
	index: number;
	pointIndex?: number;
	name: string;
	description: string;
	direction?: string;
	nearPoiName?: string;
	nearPoiX?: string;
	nearPoiY?: string;
	intersectionName?: string;
	facilityType: string;
	facilityName: string;
	turnType?: number;
	pointType?: PointType;
	lineIndex?: number;
	distance?: number;
	time?: number;
	roadType?: number;
	categoryRoadType?: number;
}

export enum PointType {
	Ep = 'EP',
	Gp = 'GP',
	SP = 'SP',
}

export enum FeatureType {
	Feature = 'Feature',
}
