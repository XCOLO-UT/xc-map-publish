import { Feature } from "ol";
import { ICoordinate, IXcMapCommonProps } from "../types/xc-map";
export interface IMarkerDragAndDropProps extends IXcMapCommonProps {
    feature?: Feature | null;
    onMove: (coordinates: ICoordinate) => void;
    onDrop: (coordinates: ICoordinate) => void;
}
declare const MarkerDragAndDrop: ({ xcMap, layerName, feature, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
export default MarkerDragAndDrop;
