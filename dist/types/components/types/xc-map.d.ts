import { Color } from "ol/color";
import { ColorLike } from "ol/colorlike";
import { ViewOptions } from "ol/View";
import { Feature, MapBrowserEvent } from "ol";
import { Style } from "ol/style";
export interface IXcMapCommonProps {
    mapId: string;
    layerName: string;
    layerTag?: string;
}
export interface ILayerCommonProps {
    visible?: boolean;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    zIndex?: number | undefined;
    onLoadEnd?: () => void;
}
export interface IMapEvent {
    name: string;
    callback: (event: MapBrowserEvent<any>) => void;
}
export interface ICoordinate {
    longitude: number;
    latitude: number;
}
export interface IFeature<TData> {
    id: string;
    type: string;
    description?: string;
    featureName?: string;
    status?: string;
    label?: string;
    value?: TData;
}
export interface IMarker<TData> extends IFeature<TData> {
    coordinate?: ICoordinate;
    heading?: number;
    isScaleUp?: boolean;
    animationName?: string;
}
export interface IVector<TData> extends IFeature<TData> {
}
export interface IStyleOption {
    height?: number;
    width?: number;
    src: string;
    color: ColorLike | Color;
}
export interface IStyle {
    image: Pick<IStyleOption, "src" | "width" | "height">;
    fill: Pick<IStyleOption, "color">;
    stroke: Pick<IStyleOption, "color" | "width">;
    backgroundFill: Pick<IStyleOption, "color">;
    radius: number;
    offsetX: number;
    offsetY: number;
    scale: number;
    zIndex: number;
}
export interface IStatusStyle {
    status: string;
    style: Partial<IStyle>;
    label?: Partial<IStyle>;
}
export type FeatureType = "marker" | "point" | "vector" | "polygon" | "polyline";
export interface IFeatureTypeStyle {
    type: FeatureType;
    event: IStatusStyle[];
}
export interface IFeatureStyle {
    [key: string]: IFeatureTypeStyle;
}
export interface IInfoStyle {
    label?: {
        marker?: Partial<IStyle>;
        vector?: Partial<IStyle>;
    };
}
export interface IAnimationProperty {
    style: Style;
    param: IAnyObject;
}
export interface IAnimationStyle {
    [key: string]: (data?: IAnyObject) => IAnimationProperty;
}
export interface IXcMapOption {
    featureStyle: IFeatureStyle;
    animationStyle?: IAnimationStyle;
    viewOption: ViewOptions;
    infoStyle?: IInfoStyle;
}
export interface IWmsParam {
    zoomLevel: number;
    LAYERS: string;
    TILED: boolean;
}
export interface IZoomUrls {
    zoomLevel: number;
    url: string;
}
export interface IStatusInfo {
    getId: () => string;
    getStatusInfo: () => string;
}
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
export interface IAnyObject {
    [key: string]: any;
}
export interface IOverlayChildrenProps<TData> {
    featureName?: string;
    datas?: TData[];
    hidePopup: () => void;
}
