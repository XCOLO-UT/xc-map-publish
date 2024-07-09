import { ICoordinate, IXcMapCommonProps } from "../types/xc-map";
export interface IMarkerDragAndDropProps extends IXcMapCommonProps {
    onMove: (coordinates: ICoordinate) => void;
    onDrop: (coordinates: ICoordinate) => void;
}
declare const MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
export default MarkerDragAndDrop;
