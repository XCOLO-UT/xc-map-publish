import { Color } from "ol/color";
import { ColorLike } from "ol/colorlike";
import { ViewOptions } from "ol/View";
import { MapBrowserEvent } from "ol";
import { Style } from "ol/style";
import useXcMap from "../hooks/useXcMap";
export interface IXcMapCommonProps {
    xcMap: ReturnType<typeof useXcMap>;
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
    /** 줄무늬(stripe) 패턴 채움 설정 */
    stripe: {
        /** 줄무늬 색상 @default '#FFFFFF' */
        color: string;
        /** 줄무늬 너비(px) @default 5 */
        width: number;
        /** 줄무늬 간격(px) @default 5 */
        gap: number;
    };
    /** 라인(polyline/vector) 위 방향 화살표 표시 설정 */
    arrow: {
        /** 화살표 색상 (RegularShape 모드에서만 사용) @default '#FFFFFF' */
        color: string;
        /** 화살표 크기(px, RegularShape 모드) 또는 이미지 스케일 기준 @default 8 */
        size: number;
        /** 라인 위 배치 간격 (0~1, 라인 길이 대비 비율) @default 0.2 */
        interval: number;
        /** 화살표 이미지 경로 (설정 시 RegularShape 대신 Icon 사용) */
        imageSrc?: string;
        /** 화살표 이미지 너비 (px) @default 16 */
        imageWidth?: number;
        /** 화살표 이미지 높이 (px) @default 20 */
        imageHeight?: number;
    };
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
export type FeatureType = "marker" | "point" | "vector" | "polygon" | "polyline" | "stripe";
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
