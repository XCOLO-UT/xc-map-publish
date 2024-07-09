import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
import { ICoordinate, IXcMapOption } from "../types/xc-map.ts";
export type ZoomLevelType = "plus" | "minus" | "reset";
declare const useXcMap: (xcMap: Map | undefined, xcMapOption?: IXcMapOption) => {
    setZoomLevel: (level: number) => void;
    setZoomLevelType: (type: ZoomLevelType) => void;
    animateMove: (coordinate: Coordinate, duration?: number) => void;
    getCenter: () => ICoordinate | undefined;
};
export default useXcMap;
