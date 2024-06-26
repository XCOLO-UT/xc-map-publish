import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
type ZoomLevelType = "plus" | "minus" | "reset";
declare const useXcMap: (xcMap: Map | undefined) => {
    setZoomLevel: (type: ZoomLevelType) => void;
    animateMove: (coordinate: Coordinate) => void;
};
export default useXcMap;
