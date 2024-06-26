import { IXcMapCommon } from "../types/xc-map";
export interface IFeatureTooltip<TData> extends IXcMapCommon {
    getTooltip: (values: TData[]) => string;
}
declare const _default: <TData>(props: IFeatureTooltip<TData>) => null;
export default _default;
