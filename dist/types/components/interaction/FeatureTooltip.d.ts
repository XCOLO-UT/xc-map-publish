import { IXcMapCommonProps } from "../types/xc-map";
export interface IFeatureTooltipProps<TData> extends IXcMapCommonProps {
    getTooltip: (values: TData[]) => string;
}
declare const _default: <TData>(props: IFeatureTooltipProps<TData>) => null;
export default _default;
