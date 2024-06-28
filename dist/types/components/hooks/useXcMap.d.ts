import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
export type ZoomLevelType = "plus" | "minus" | "reset";
declare const useXcMap: (xcMap: Map | undefined) => {
    setZoomLevel: (type: ZoomLevelType) => void;
    animateMove: (coordinate: Coordinate, duration?: number) => void;
};
export default useXcMap;
