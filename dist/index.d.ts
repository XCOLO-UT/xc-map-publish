import { ReactNode } from 'react';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import { ViewOptions } from 'ol/View';
import * as ol from 'ol';
import { MapBrowserEvent, Feature } from 'ol';
import { Style } from 'ol/style';
import { Options } from 'ol/source/TileWMS';
import { Options as Options$1 } from 'ol/source/Vector';
import * as ol_geom from 'ol/geom';
import * as ol_source from 'ol/source';
import { Options as Options$2 } from 'ol/source/XYZ';
import { Options as Options$3 } from 'ol/control/OverviewMap';
import BaseLayer from 'ol/layer/Base';
import { Options as Options$4 } from 'ol/layer/BaseVector';
import { Options as Options$5 } from 'ol/layer/BaseTile';

interface IXcMapCommon {
    mapId: string;
    layerName: string;
    layerTag?: string;
}
interface ILayerCommon {
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
    featureName: string;
    status: string;
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
}
interface IStatusStyle {
    status: string;
    style: Partial<IStyle>;
}
type FeatureType = "marker" | "link" | "vector";
interface IFeatureTypeStyle {
    type: FeatureType;
    event: IStatusStyle[];
}
interface IFeatureStyle {
    [key: string]: IFeatureTypeStyle;
}
type LabelType = Pick<IStyle, "fill" | "stroke" | "backgroundFill" | "offsetX" | "offsetY" | "scale">;
interface IInfoStyle {
    label?: {
        marker?: LabelType;
        vector?: LabelType;
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
interface IFeatureSelect<TData> extends IXcMapCommon {
    disabled: boolean;
    isMoveCenterOnClick: boolean;
    useSelectStyle?: boolean;
    isDeselectClosePopup?: boolean;
    getPopup?: (datas: TData[]) => string;
    getListPopup?: (datas: TData[]) => string[];
    onClick?: (layerName: string, data: TData) => void;
    onSelectionChange?: (layerName: string, datas: TData[]) => void;
    onDoubleClick?: (layerName: string, data: TData) => void;
}
interface IAnyObject {
    [key: string]: any;
}

interface IXcMapProps {
    mapId: string;
    children: ReactNode;
    xcMapOption: IXcMapOption;
    events?: IMapEvent[];
}
declare const XcMap: ({ mapId, children, xcMapOption, events, }: IXcMapProps) => JSX.Element;

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
    VectorWfs: ({ url }: IVectorWfs) => "" | ol_source.Vector<ol.Feature<ol_geom.Geometry>> | undefined;
    TileWms: ({ url, params, serverType, projection, transition }: ITileWmsProps) => ol_source.TileWMS;
};

type MinimapPositionType = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone';
interface IMinimap extends Options$3, Pick<IXcMapCommon, 'mapId'> {
    position: MinimapPositionType;
    getLayers: () => BaseLayer[];
}

interface IXyzProps extends IXcMapCommon, ILayerCommon {
    url: string;
}

interface IWmsProps extends IXcMapCommon, ILayerCommon {
    url: string;
    params: IWmsParam;
    zoomParams: IWmsParam[];
}

interface IWfsProps extends IXcMapCommon, ILayerCommon {
    featureName?: string;
    pkField: string;
    url: string;
    zoomUrls: IZoomUrls[];
    getVectorLabel?: (data: IAnyObject) => string;
    getTrafficInfo?: (id: string) => ITrafficInfo | undefined;
}
interface IWfsApis<TData> {
    setVectorStyle: (vector: IVector<TData>) => void;
}

interface IPlaceMarkerProps extends Pick<IXcMapCommon, 'mapId'> {
    featureName: string;
    status?: string;
    coordinate?: ICoordinate;
    heading?: number;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    onMoveMarker: (coordinate: ICoordinate) => void;
    onPlaceMarker: (coordinate: ICoordinate) => void;
}

interface IMarkerProps<TData> extends IXcMapCommon, ILayerCommon {
    markers: IMarker<TData>[];
    getMarkerLabel?: (data: TData) => string;
}
interface IMarkerApis<TData> {
    setMarkerPosition: (marker: IMarker<TData>) => void;
    setMarkerStyle: (marker: IMarker<TData>) => void;
}

interface IVectorProps extends Options$4<any>, IXcMapCommon {
    featureName?: string;
    pkField?: string;
}

interface ITileProps extends Options$5<any>, IXcMapCommon {
    minimap?: string;
}

interface ICommonProps extends IXcMapCommon, ILayerCommon {
}

declare const layer: {
    Common: ({ mapId, layerName, visible }: ICommonProps) => null;
    Tile: ({ mapId, layerName, layerTag, minimap, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
    Vector: ({ mapId, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: IVectorProps) => null;
    Marker: <TData>(props: IMarkerProps<TData> & {
        ref: Ref<IMarkerApis<TData>>;
    }) => JSX.Element;
    PlaceMarker: ({ mapId, featureName, status, coordinate, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: IPlaceMarkerProps) => JSX.Element;
    Wfs: <TData>(props: IWfsProps & {
        ref: Ref<IWfsApis<TData>>;
    }) => JSX.Element;
    Wms: ({ mapId, layerName, layerTag, visible, url, params, minZoom, maxZoom, zoomParams }: IWmsProps) => JSX.Element;
    Xyz: ({ mapId, url, layerName, minZoom, maxZoom, }: IXyzProps) => JSX.Element;
    Minimap: ({ mapId, position, getLayers, ...rest }: IMinimap) => null;
};

interface IMarkerDragAndDropProps extends IXcMapCommon {
    onMove: (coordinates: ICoordinate) => void;
    onDrop: (coordinates: ICoordinate) => void;
}

interface IMarkerSelectProps<TData> extends IFeatureSelect<TData> {
    defaultValue?: IMarker<TData>;
}

interface IFeatureTooltip<TData> extends IXcMapCommon {
    getTooltip: (values: TData[]) => string;
}

declare const interaction: {
    FeatureTooltip: <TData>(props: IFeatureTooltip<TData>) => null;
    MarkerSelect: <TData>(props: IMarkerSelectProps<TData>) => null;
    MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
    VectorSelect: any;
    Measurement: any;
};

interface IXcLayersProps {
    children?: ReactNode;
}
declare const XcLayers: ({ children }: IXcLayersProps) => JSX.Element;

interface IXcInteractionsProps {
    children?: ReactNode;
}
declare const XcInteractions: ({ children }: IXcInteractionsProps) => JSX.Element;

export { type IAnimationProperty, type IAnimationStyle, type IAnyObject, type ICoordinate, type IFeature, type IFeatureSelect, type IFeatureStyle, type IFeatureTypeStyle, type IInfoStyle, type ILayerCommon, type IMapEvent, type IMarker, type IStatusStyle, type IStyle, type IStyleOption, type ITrafficInfo, type IVector, type IWmsParam, type IXcMapCommon, type IXcMapOption, type IZoomUrls, XcInteractions, XcLayers, XcMap, interaction, layer, source };
