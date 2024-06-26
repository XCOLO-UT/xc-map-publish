import '../assets/css/map.css';
import 'ol/ol.css';
import { ReactNode } from "react";
import { IMapEvent, IXcMapOption } from "./types/xc-map";
interface IXcMapProps {
    mapId: string;
    children: ReactNode;
    xcMapOption: IXcMapOption;
    events?: IMapEvent[];
}
declare const XcMap: ({ mapId, children, xcMapOption, events, }: IXcMapProps) => JSX.Element;
export default XcMap;
