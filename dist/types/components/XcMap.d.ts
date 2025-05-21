import '../assets/css/map.css';
import 'ol/ol.css';
import { ReactNode } from "react";
import { IMapEvent, IXcMapOption } from "./types/xc-map";
import useXcMap from "./hooks/useXcMap";
export interface IXcMapProps {
    xcMap: ReturnType<typeof useXcMap>;
    children: ReactNode;
    xcMapOption: IXcMapOption;
    events?: IMapEvent[];
    getZoomLevel?: (level: number | undefined) => void;
    disablePan?: boolean;
    disableZoom?: boolean;
}
declare const XcMap: ({ xcMap, children, xcMapOption, events, getZoomLevel, disablePan, disableZoom, }: IXcMapProps) => JSX.Element;
export default XcMap;
