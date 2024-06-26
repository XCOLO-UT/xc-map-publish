import { Coordinate } from "ol/coordinate";
import { ICoordinate } from "../types/xc-map";
export declare const transformCoordinateFrom4326To3857: (coordinates: Coordinate) => Coordinate;
export declare const transformCoordinateFrom3857To4326: (coordinates: Coordinate) => Coordinate;
export declare const convertICoordinate: (coordinate: Coordinate) => ICoordinate;
export declare const convertCoordinate: (coordinate: ICoordinate) => Coordinate;
export declare const multiSetTimeout: (checkData: () => boolean, callback: () => void, times: number, interval: number) => (() => void) | undefined;
