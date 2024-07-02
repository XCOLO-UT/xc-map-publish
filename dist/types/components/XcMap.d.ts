import '../assets/css/map.css';
import 'ol/ol.css';
import { ReactNode } from "react";
import { ICoordinate, IMapEvent, IXcMapOption } from "./types/xc-map";
import { ZoomLevelType } from "./hooks/useXcMap.ts";
export interface IXcMapProps {
    mapId: string;
    children: ReactNode;
    xcMapOption: IXcMapOption;
    events?: IMapEvent[];
}
export interface IXcMapApis {
    setZoomLevel: (level: number) => void;
    setZoomLevelType: (type: ZoomLevelType) => void;
    animateMove: (coordinate: ICoordinate, duration?: number) => void;
}
declare const XcMap: any;
export default XcMap;
