import { Ref } from "react";
import { Feature } from "ol";
import { Style } from "ol/style";
import { ICoordinate, IFeatureTypeStyle, IStatusInfo, IXcMapCommonProps } from "../types/xc-map";
export interface IFeatureSelectProps<TData> extends IXcMapCommonProps {
    disabled?: boolean;
    isMobile?: boolean;
    isMoveCenterOnClick?: boolean;
    useSelectStyle?: boolean;
    isDeselectOnClickAway?: boolean;
    defaultValue?: TData[];
    multiple?: boolean;
    isLastSelectVectorHighlight?: boolean;
    getStatusInfo?: (id: string, featureName: string) => IStatusInfo | undefined;
    getCustomVectorStyle?: (feature: Feature) => Style | Style[] | undefined;
    getFeatureTypeStyle?: (feature: Feature) => IFeatureTypeStyle | undefined;
    onClick?: (featureName: string, datas: TData[], coordinate: ICoordinate) => void;
    onClickAway?: () => void;
    onDeSelect?: (id?: string) => void;
    onSelectionChange?: (layerName: string, datas: TData[], featureName?: string) => void;
    onDoubleClick?: (layerName: string, datas: TData[], coordinate?: ICoordinate) => void;
}
export interface IFeatureSelectApis {
    select: (id: string, featureName?: string, isMoveCenter?: boolean) => void;
    deSelect: (id?: string) => void;
}
declare const _default: <TData>(props: IFeatureSelectProps<TData> & {
    ref?: Ref<IFeatureSelectApis>;
}) => null;
export default _default;
