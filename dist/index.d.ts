import { Options } from 'ol/source/TileWMS';
import { Options as Options$1 } from 'ol/source/Vector';
import * as ol from 'ol';
import { MapBrowserEvent, Feature } from 'ol';
import * as ol_geom from 'ol/geom';
import * as ol_source from 'ol/source';
import { Options as Options$2 } from 'ol/source/XYZ';
import { Options as Options$3 } from 'ol/control/OverviewMap';
import BaseLayer from 'ol/layer/Base';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import { ViewOptions } from 'ol/View';
import { Style } from 'ol/style';
import { FeatureUrlFunction } from 'ol/featureloader';
import { Options as Options$4 } from 'ol/layer/BaseVector';
import { Options as Options$5 } from 'ol/layer/BaseTile';
import React$1, { ReactNode } from 'react';
import { Options as Options$6 } from 'ol/Overlay';

type TileType = "Base" | "white" | "midnight" | "Hybrid" | "Satellite";
declare const useVworldUrl: (apiKey: string, defaultTileType: string, minimapTileType: string) => {
    minimapVworldUrl: string;
    vworldUrl: any;
    setTileType: (tileType: TileType) => void;
};

interface IXcMapCommonProps {
    mapId: string;
    layerName: string;
    layerTag?: string;
}
interface ILayerCommonProps {
    visible?: boolean;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    zIndex?: number | undefined;
    onLoadStart?: () => void;
    onLoadEnd?: () => void;
}
interface IMapEvent {
    name: string;
    callback: (event: MapBrowserEvent<any>) => void;
}
interface ICoordinate {
    longitude: number;
    latitude: number;
}
interface IFeature<TData> {
    id: string;
    type: string;
    description?: string;
    featureName?: string;
    status?: string;
    label?: string;
    value?: TData;
}
interface IMarker<TData> extends IFeature<TData> {
    coordinate?: ICoordinate;
    heading?: number;
    isScaleUp?: boolean;
    animationName?: string;
    animationData?: Partial<IAnimationParams>;
}
interface IVector<TData> extends IFeature<TData> {
}
interface IStyleOption {
    height?: number;
    width?: number;
    src: string;
    color: ColorLike | Color;
}
interface IStyle {
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
interface IStatusStyle {
    status: string;
    style: Partial<IStyle>;
    label?: Partial<IStyle>;
}
type FeatureType = "marker" | "point" | "vector" | "polygon" | "polyline";
interface IFeatureTypeStyle {
    type: FeatureType;
    event: IStatusStyle[];
}
interface IFeatureStyle {
    [key: string]: IFeatureTypeStyle;
}
interface IInfoStyle {
    label?: {
        marker?: Partial<IStyle>;
        vector?: Partial<IStyle>;
    };
}
interface IAnimationProperty {
    style: Style;
    param: IAnyObject;
}
interface IAnimationParams {
    radius: number;
    opacity: number;
    speed: number;
    scale: number;
    color: string;
    strokeWidth: number;
    [key: string]: any;
}
interface IAnimationStyle {
    [key: string]: (data?: Partial<IAnimationParams>) => IAnimationProperty;
}
interface IXcMapOption {
    featureStyle: IFeatureStyle;
    animationStyle?: IAnimationStyle;
    viewOption: ViewOptions;
    infoStyle?: IInfoStyle;
}
interface IWmsParam {
    zoomLevel: number;
    LAYERS: string;
    TILED: boolean;
}
interface IZoomUrls {
    zoomLevel: number;
    url: string;
}
interface IStatusInfo {
    getId: () => string;
    getStatusInfo: () => string;
}
interface IAnyObject {
    [key: string]: any;
}
interface IOverlayChildrenProps<TData> {
    featureName?: string;
    datas?: TData[];
    hidePopup: () => void;
}

declare const XcMap: any;

interface ITileWmsProps extends Options {
}

interface IVectorWfs extends Options$1<Feature> {
}

interface IVectorFeature extends Options$1<Feature> {
}

interface IXyzProps$1 extends Options$2 {
}

declare const source: {
    XYZ: ({ url }: IXyzProps$1) => ol_source.XYZ;
    VectorFeature: ({ features }: IVectorFeature) => ol_source.Vector<ol.Feature<ol_geom.Geometry>>;
    VectorWfs: ({ url, ...rest }: IVectorWfs) => "" | ol_source.Vector<ol.Feature<ol_geom.Geometry>> | undefined;
    TileWms: ({ url, params, serverType, projection, transition }: ITileWmsProps) => ol_source.TileWMS;
};

type MinimapPositionType = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone';
interface IMinimapProps extends Options$3, Pick<IXcMapCommonProps, 'mapId'> {
    position: MinimapPositionType;
    getLayers: () => BaseLayer[];
}

interface IXyzProps extends IXcMapCommonProps, ILayerCommonProps {
    url: string;
}

interface IWmsProps extends IXcMapCommonProps, ILayerCommonProps {
    url: string;
    params: IWmsParam;
    zoomParams: IWmsParam[];
}

interface IWfsProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
    featureName: string;
    pkField: string;
    url: string | FeatureUrlFunction;
    zoomUrls?: IZoomUrls[];
    getVectorLabel?: (data: IAnyObject) => string;
    getStatusInfo?: (id: string) => IStatusInfo | undefined;
    getVectorValue?: (id: string) => TData | undefined;
    getCustomVectorStyle?: (feature: Feature) => Style | Style[] | undefined;
    getFeatureTypeStyle?: (feature: Feature) => IFeatureTypeStyle | undefined;
    filter?: (feature: Feature) => boolean;
    useBbox?: boolean;
}
interface IWfsApis {
    getWfsFeatures: () => Feature[];
    setVisible: (id: string, visible: boolean) => void;
    refresh: () => void;
    setWfsStyle: (id: string, featureName: string, status: string) => void;
}

interface IPlaceMarkerProps extends Pick<IXcMapCommonProps, 'mapId'> {
    featureName: string;
    status?: string;
    coordinate?: ICoordinate;
    isMoveCenter?: boolean;
    heading?: number;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    onMoveMarker?: (coordinate: ICoordinate) => void;
    onPlaceMarker?: (coordinate: ICoordinate) => void;
}

interface IMarkerProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
    markers?: IMarker<TData>[];
    getMarkerLabel?: (data: TData) => string;
    getStatusInfo?: (id: string) => IStatusInfo | undefined;
}
interface IMarkerApis<TData> {
    setMarkerPosition: (marker: IMarker<TData>) => void;
    setMarkerStyle: (marker: IMarker<TData>) => void;
}

interface IVectorProps extends Options$4<any>, IXcMapCommonProps {
    featureName?: string;
    pkField?: string;
}

interface ITileProps extends Options$5<any>, IXcMapCommonProps {
}

interface ICommonProps extends IXcMapCommonProps, ILayerCommonProps {
}

declare const layer: {
    Common: ({ mapId, layerName, visible }: ICommonProps) => null;
    Tile: ({ mapId, layerName, layerTag, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
    Vector: ({ mapId, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: IVectorProps) => null;
    Marker: <TData>(props: IMarkerProps<TData> & {
        ref?: Ref<IMarkerApis<TData>>;
    }) => JSX.Element;
    PlaceMarker: ({ mapId, featureName, status, coordinate, isMoveCenter, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: IPlaceMarkerProps) => JSX.Element;
    Wfs: <TData>(props: IWfsProps<TData> & {
        ref?: Ref<IWfsApis>;
    }) => React.JSX;
    Wms: ({ mapId, layerName, layerTag, visible, url, params, zoomParams, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: IWmsProps) => JSX.Element;
    Xyz: ({ mapId, url, layerName, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: IXyzProps) => JSX.Element;
    Minimap: ({ mapId, position, getLayers, ...rest }: IMinimapProps) => null;
    PlaceLineString: any;
};

interface IMarkerDragAndDropProps extends IXcMapCommonProps {
    onMove: (coordinates: ICoordinate) => void;
    onDrop: (coordinates: ICoordinate) => void;
}

interface IFeatureSelectProps<TData> extends IXcMapCommonProps {
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
interface IFeatureSelectApis {
    select: (id: string, featureName?: string, isMoveCenter?: boolean) => void;
    deSelect: (id?: string) => void;
}

interface IFeatureTooltipProps<TData> extends IXcMapCommonProps {
    getTooltip: (values: TData[]) => string;
}

declare const interaction: {
    FeatureTooltip: <TData>(props: IFeatureTooltipProps<TData>) => null;
    FeatureSelect: <TData>(props: IFeatureSelectProps<TData> & {
        ref?: Ref<IFeatureSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
    Measurement: any;
};

interface IOverlayComponentProps<TData> extends Pick<IXcMapCommonProps, 'mapId'>, Options$6 {
    overlayId: string;
    children?: (props: IOverlayChildrenProps<TData>) => React$1.ReactNode;
    onHideCallback?: () => void;
}
interface IOverlayComponentApis<TData> {
    showPopup: (coordinate: ICoordinate, datas: TData[], featureName: string) => void;
    hidePopup: () => void;
    setOverlayPosition: (coordinate: ICoordinate) => void;
}

declare const overlay: {
    OverlayComponent: <TData>(props: IOverlayComponentProps<TData> & {
        ref?: Ref<IOverlayComponentApis<TData>>;
    }) => React.JSX;
};

interface IXcLayersProps {
    children?: ReactNode;
}
declare const XcLayers: ({ children }: IXcLayersProps) => JSX.Element;

interface IXcInteractionsProps {
    children?: ReactNode;
}
declare const XcInteractions: ({ children }: IXcInteractionsProps) => JSX.Element;

interface IXcOverlaysProps {
    children?: ReactNode;
}
declare const XcOverlays: ({ children }: IXcOverlaysProps) => JSX.Element;

/**
 * HEX 또는 RGB 색상을 받아 opacity를 적용한 RGBA 문자열로 변환합니다.
 * @param color - HEX (#RRGGBB 또는 #RGB) 또는 RGB 문자열 (e.g., 'rgb(67,135,255)')
 * @param opacity - 0부터 1 사이의 투명도 값
 * @returns RGBA 문자열
 */
declare const applyOpacityToColor: (color: string, opacity: number) => string;

export { XcInteractions, XcLayers, XcMap, XcOverlays, applyOpacityToColor, interaction, layer, overlay, source, useVworldUrl };
export type { FeatureType, IAnimationParams, IAnimationProperty, IAnimationStyle, IAnyObject, ICoordinate, IFeature, IFeatureStyle, IFeatureTypeStyle, IInfoStyle, ILayerCommonProps, IMapEvent, IMarker, IOverlayChildrenProps, IStatusInfo, IStatusStyle, IStyle, IStyleOption, IVector, IWmsParam, IXcMapCommonProps, IXcMapOption, IZoomUrls };
