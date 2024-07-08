import { Color } from "ol/color";
import { ColorLike } from "ol/colorlike";
import { ViewOptions } from "ol/View";
import { Feature, MapBrowserEvent } from "ol";
import { Style } from "ol/style";
export interface IXcMapCommon {
    mapId: string;
    layerName: string;
    layerTag?: string;
}
export interface ILayerCommon {
    visible?: boolean;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
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
    description?: string;
    featureName: string;
    status: string;
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
    offsetX: number;
    offsetY: number;
    scale: number;
}
export interface IStatusStyle {
    status: string;
    style: Partial<IStyle>;
}
type FeatureType = "marker" | "link" | "vector";
export interface IFeatureTypeStyle {
    type: FeatureType;
    event: IStatusStyle[];
    label?: Partial<IStyle>;
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
export interface ITrafficInfo {
    getId: () => string;
    getTrafficStatus: () => string;
}
export interface IFeatureSelect<TData> extends IXcMapCommon {
    disabled?: boolean;
    isMoveCenterOnClick?: boolean;
    useSelectStyle?: boolean;
    isDeselectClosePopup?: boolean;
    getPopup?: (datas: TData[]) => string;
    getListPopup?: (datas: TData[]) => string[];
    getCustomStyle?: (feature: Feature) => IFeatureTypeStyle | undefined;
    onClick?: (layerName: string, datas: TData[], coordinate?: ICoordinate) => void;
    onSelectionChange?: (layerName: string, datas: TData[]) => void;
    onDoubleClick?: (layerName: string, datas: TData[], coordinate?: ICoordinate) => void;
}
export interface IAnyObject {
    [key: string]: any;
}
export interface IOverlayContent<TData> {
    datas?: TData[];
    hidePopup?: () => void;
}
export {};
