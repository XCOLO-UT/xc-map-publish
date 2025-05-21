import React from "react";
import { ICoordinate, IXcMapCommonProps } from "../types/xc-map.ts";
export interface IPlaceLineStringProps extends Pick<IXcMapCommonProps, 'xcMap'> {
    active: boolean;
    onDrawEnd?: (coordinates: ICoordinate[]) => void;
    onDrawing?: (coordinates: ICoordinate[]) => void;
    onCheckPoint?: (coordinates: ICoordinate[]) => void;
    defaultValues?: ICoordinate[] | undefined;
}
export interface IPlaceLineStringApis {
    clear: () => void;
}
declare const PlaceLineString: (props: IPlaceLineStringProps & {
    ref?: React.Ref<IPlaceLineStringApis> | undefined;
}) => React.ReactNode;
export default PlaceLineString;
