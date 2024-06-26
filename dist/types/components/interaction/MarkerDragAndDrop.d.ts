import { ICoordinate, IXcMapCommon } from "../types/xc-map";
export interface IMarkerDragAndDropProps extends IXcMapCommon {
    onMove: (coordinates: ICoordinate) => void;
    onDrop: (coordinates: ICoordinate) => void;
}
declare const MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
export default MarkerDragAndDrop;
