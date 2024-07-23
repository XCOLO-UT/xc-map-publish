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
import { Options as Options$4 } from 'ol/layer/BaseVector';
import { Options as Options$5 } from 'ol/layer/BaseTile';
import React$1, { ReactNode } from 'react';
import { Options as Options$6 } from 'ol/Overlay';

declare const useVworldUrl: (apiKey: string, defaultTileType: string, minimapTileType: string) => {
    minimapVworldUrl: string;
    vworldUrl: any;
    setTileType: (tileType: string) => void;
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
    offsetX: number;
    offsetY: number;
    scale: number;
    zIndex: number;
}
interface IStatusStyle {
    status: string;
    style: Partial<IStyle>;
}
type FeatureType = "marker" | "link" | "vector";
interface IFeatureTypeStyle {
    type: FeatureType;
    event: IStatusStyle[];
    label?: Partial<IStyle>;
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
interface IAnimationStyle {
    [key: string]: (data?: IAnyObject) => IAnimationProperty;
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
interface ITrafficInfo {
    getId: () => string;
    getTrafficStatus: () => string;
}
interface IFeatureSelectProps<TData> extends IXcMapCommonProps {
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
interface IAnyObject {
    [key: string]: any;
}
interface IOverlayChildrenProps<TData> {
    datas?: TData[];
    hidePopup?: () => void;
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
interface IMinimap extends Options$3, Pick<IXcMapCommonProps, 'mapId'> {
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
    minimap?: string;
}

interface ICommonProps extends IXcMapCommonProps, ILayerCommonProps {
}

declare const layer: {
    Common: ({ mapId, layerName, visible }: ICommonProps) => null;
    Tile: ({ mapId, layerName, layerTag, minimap, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
    Vector: ({ mapId, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: IVectorProps) => null;
    Marker: <TData>(props: IMarkerProps<TData> & {
        ref?: Ref<IMarkerApis<TData>>;
    }) => JSX.Element;
    PlaceMarker: ({ mapId, featureName, status, coordinate, isMoveCenter, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: IPlaceMarkerProps) => JSX.Element;
    Wfs: any;
    Wms: ({ mapId, layerName, layerTag, visible, url, params, minZoom, maxZoom, zoomParams }: IWmsProps) => JSX.Element;
    Xyz: ({ mapId, url, layerName, minZoom, maxZoom, }: IXyzProps) => JSX.Element;
    Minimap: ({ mapId, position, getLayers, ...rest }: IMinimap) => null;
    PlaceLineString: any;
};

interface IMarkerDragAndDropProps extends IXcMapCommonProps {
    onMove: (coordinates: ICoordinate) => void;
    onDrop: (coordinates: ICoordinate) => void;
}

interface IMarkerSelectProps<TData> extends IFeatureSelectProps<TData> {
    defaultValue?: IMarker<TData>;
}
interface IMarkerSelectApis {
    select: (id: string) => void;
    deSelect: () => void;
}

interface IFeatureTooltip<TData> extends IXcMapCommonProps {
    getTooltip: (values: TData[]) => string;
}

declare const interaction: {
    FeatureTooltip: <TData>(props: IFeatureTooltip<TData>) => null;
    MarkerSelect: <TData>(props: IMarkerSelectProps<TData> & {
        ref?: Ref<IMarkerSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
    VectorSelect: any;
    Measurement: any;
};

interface IOverlayComponentProps<TData> extends IXcMapCommonProps, Options$6 {
    children?: (props: IOverlayChildrenProps<TData>) => React$1.ReactNode;
    onHideCallback?: () => void;
}
interface IOverlayComponentApis<TData> {
    showPopup: (coordinate: ICoordinate, datas: TData[]) => void;
    hidePopup: () => void;
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

export { type IAnimationProperty, type IAnimationStyle, type IAnyObject, type ICoordinate, type IFeature, type IFeatureSelectProps, type IFeatureStyle, type IFeatureTypeStyle, type IInfoStyle, type ILayerCommonProps, type IMapEvent, type IMarker, type IOverlayChildrenProps, type IStatusStyle, type IStyle, type IStyleOption, type ITrafficInfo, type IVector, type IWmsParam, type IXcMapCommonProps, type IXcMapOption, type IZoomUrls, XcInteractions, XcLayers, XcMap, XcOverlays, interaction, layer, overlay, source, useVworldUrl };
