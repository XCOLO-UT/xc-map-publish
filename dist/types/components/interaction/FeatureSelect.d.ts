import { Ref } from "react";
import { IFeatureSelectProps } from "../types/xc-map";
export interface IFeatureSelectApis {
    select: (id: string, featureName?: string, isMoveCenter?: boolean) => void;
    deSelect: (id?: string) => void;
}
declare const _default: <TData>(props: IFeatureSelectProps<TData> & {
    ref?: Ref<IFeatureSelectApis>;
}) => null;
export default _default;
