import '../assets/css/map.css';
import 'ol/ol.css';
import { ReactNode } from "react";
import { Map } from "ol";
import { ICoordinate, IMapEvent, IXcMapOption } from "./types/xc-map";
import { ZoomLevelType } from "./hooks/useXcMap.ts";
export interface IXcMapProps {
    mapId: string;
    children: ReactNode;
    xcMapOption: IXcMapOption;
    events?: IMapEvent[];
    getZoomLevel?: (level: number | undefined) => void;
    disablePan?: boolean;
    disableZoom?: boolean;
}
export interface IXcMapApis {
    setZoomLevel: (level: number) => void;
    setZoomLevelType: (type: ZoomLevelType) => void;
    animateMove: (coordinate: ICoordinate, duration?: number) => void;
    getCenter: () => ICoordinate;
    getXcMap: () => Map | undefined;
}
declare const XcMap: any;
export default XcMap;
