import { IXcMapCommonProps } from "../types/xc-map";
export interface IFeatureTooltip<TData> extends IXcMapCommonProps {
    getTooltip: (values: TData[]) => string;
}
declare const _default: <TData>(props: IFeatureTooltip<TData>) => null;
export default _default;
