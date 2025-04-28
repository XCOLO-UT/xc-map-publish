import { Color } from "ol/color";
import { ColorLike } from "ol/colorlike";
import { ViewOptions } from "ol/View";
import { MapBrowserEvent } from "ol";
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
    onLoadStart?: () => void;
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
    animationData?: Partial<IAnimationParams>;
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
export interface IAnimationParams {
    radius: number;
    opacity: number;
    speed: number;
    scale: number;
    color: string;
    strokeWidth: number;
    [key: string]: any;
}
export interface IAnimationStyle {
    [key: string]: (data?: Partial<IAnimationParams>) => IAnimationProperty;
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
export interface IAnyObject {
    [key: string]: any;
}
export interface IOverlayChildrenProps<TData> {
    featureName?: string;
    datas?: TData[];
    hidePopup: () => void;
}
