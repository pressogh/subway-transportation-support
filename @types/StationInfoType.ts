import { LineInfoType } from '@/@types/LineInfoType';

export interface StationInfoType {
	station: string;
	prevStation: string;
	nextStation: string;
	line: LineInfoType[];
}
