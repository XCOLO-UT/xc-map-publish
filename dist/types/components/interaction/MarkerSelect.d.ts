import { IFeatureSelect, IMarker } from "../types/xc-map";
export interface IMarkerSelectProps<TData> extends IFeatureSelect<TData> {
    defaultValue?: IMarker<TData>;
}
declare const _default: <TData>(props: IMarkerSelectProps<TData>) => null;
export default _default;
