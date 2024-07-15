import { Ref } from "react";
import { IFeatureSelectProps, IMarker } from "../types/xc-map";
export interface IMarkerSelectProps<TData> extends IFeatureSelectProps<TData> {
    defaultValue?: IMarker<TData>;
}
export interface IMarkerSelectApis {
    select: (id: string) => void;
    deSelect: () => void;
}
declare const _default: <TData>(props: IMarkerSelectProps<TData> & {
    ref?: Ref<IMarkerSelectApis>;
}) => null;
export default _default;
