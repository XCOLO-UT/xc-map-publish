import { ICoordinate, IXcMapCommon } from "../types/xc-map";
export interface IPlaceMarkerProps extends Pick<IXcMapCommon, 'mapId'> {
    featureName: string;
    status?: string;
    coordinate?: ICoordinate;
    isMoveCenter?: boolean;
    heading?: number;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    onMoveMarker?: (coordinate: ICoordinate) => void;
    onPlaceMarker?: (coordinate: ICoordinate) => void;
}
declare const PlaceMarker: ({ mapId, featureName, status, coordinate, isMoveCenter, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: IPlaceMarkerProps) => JSX.Element;
export default PlaceMarker;
