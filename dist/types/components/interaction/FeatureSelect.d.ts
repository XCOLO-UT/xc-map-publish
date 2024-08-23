import { Ref } from "react";
import { IFeatureSelectProps } from "../types/xc-map";
export interface IFeatureSelectApis {
    select: (id: string, featureName?: string) => void;
    deSelect: () => void;
}
declare const _default: <TData>(props: IFeatureSelectProps<TData> & {
    ref?: Ref<IFeatureSelectApis>;
}) => null;
export default _default;
