import '../assets/css/map.css';
import 'ol/ol.css';
import { ICoordinate } from "./types/xc-map";
import { ZoomLevelType } from "./hooks/useXcMap.ts";
export interface IXcMapApis {
    setZoomLevel: (type: ZoomLevelType) => void;
    animateMove: (coordinate: ICoordinate, duration?: number) => void;
}
declare const XcMap: any;
export default XcMap;
