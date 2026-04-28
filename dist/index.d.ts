import * as ol from 'ol';
import { MapBrowserEvent, Map, Feature } from 'ol';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import { ViewOptions } from 'ol/View';
import { Style } from 'ol/style';
import * as react from 'react';
import react__default, { ReactNode } from 'react';
import { Coordinate } from 'ol/coordinate';
import { Options } from 'ol/source/TileWMS';
import VectorSource, { Options as Options$1 } from 'ol/source/Vector';
import * as ol_geom from 'ol/geom';
import * as ol_source from 'ol/source';
import { Options as Options$2 } from 'ol/source/XYZ';
import { Options as Options$3 } from 'ol/control/OverviewMap';
import BaseLayer from 'ol/layer/Base';
import { FeatureUrlFunction } from 'ol/featureloader';
import { Options as Options$4 } from 'ol/layer/BaseVector';
import { Options as Options$5 } from 'ol/layer/BaseTile';
import { Options as Options$6 } from 'ol/Overlay';

type TileType = "Base" | "white" | "midnight" | "Hybrid" | "Satellite";
declare const useVworldUrl: (apiKey: string, defaultTileType: string, minimapTileType: string) => {
    minimapVworldUrl: string;
    vworldUrl: string;
    setTileType: (tileType: TileType) => void;
};

interface IXcMapCommonProps {
    xcMap: ReturnType<typeof useXcMap>;
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
    stroke: Pick<IStyleOption, "color" | "width"> & {
        /** 점선 패턴 (px 단위 배열). 예: [10, 5] → 10px 선, 5px 공백 반복 */
        lineDash?: number[];
        /** 라인 끝 모양 @default 'round' */
        lineCap?: 'butt' | 'round' | 'square';
        /** 라인 꺾임 모양 @default 'round' */
        lineJoin?: 'bevel' | 'round' | 'miter';
    };
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
        /**
         * 화살표 색상.
         * - RegularShape 모드: 생략 시 stroke.color를 자동 상속
         * - Icon 모드(imageSrc 사용 시): 이미지 자체 색상 사용, 이 값은 무시됨
         */
        color?: string;
        /** 화살표 크기(px, RegularShape 모드) 또는 이미지 스케일 기준 @default 8 */
        size: number;
        /** 라인 위 배치 간격 (0~1, 라인 길이 대비 비율) @default 0.2 */
        interval: number;
        /**
         * 화살표 배치 위치
         * - 'repeat': 라인 전체에 interval 간격으로 반복 배치 (기본값)
         * - 'end': 라인의 끝 지점에만 1개 배치
         * - 'start': 라인의 시작 지점에만 1개 배치
         * - 'both': 시작과 끝 양쪽에 각 1개씩 배치
         * @default 'repeat'
         */
        position?: 'repeat' | 'end' | 'start' | 'both';
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
interface IStatusStyle {
    status: string;
    style: Partial<IStyle>;
    label?: Partial<IStyle>;
}
type FeatureType = "marker" | "point" | "vector" | "polygon" | "polyline" | "stripe";
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

interface ISelectedFeatures {
    [layerName: string]: {
        features: Feature[];
        lastSelected?: Feature;
        featureIds: string[];
    };
}
interface IXcMapState {
    selectedFeatures: react.RefObject<ISelectedFeatures>;
    [key: string]: any;
}
interface IXcMapMeta {
    [key: string]: any;
}
declare const useXcMap: (xcMapOption?: IXcMapOption, existingMap?: Map) => {
    olMap: Map;
    state: IXcMapState;
    meta: IXcMapMeta | null;
    selectFeature: (layerName: string, layerTag: string | undefined, feature: Feature) => void;
    deselectFeature: (layerName: string, layerTag: string | undefined, featureId?: string) => void;
    setMetaState: (key: string, value: any) => void;
    getMetaState: (key: string) => any;
    getState: () => IXcMapState;
    setMapState: (key: string, value: any) => void;
};

/**
 * xcMap 객체에 대한 유틸리티 함수들을 제공하는 훅
 * 기존 Map 객체가 있을 때 해당 객체의 함수들만 사용하고 싶을 경우에 사용
 */
type ZoomLevelType = "plus" | "minus" | "reset";
declare const useXcMapFunctions: (xcMap: ReturnType<typeof useXcMap>) => {
    animateMove: (coordinate: ICoordinate | Coordinate, duration?: number) => void;
    getCenter: () => ICoordinate | undefined;
    setZoomLevel: (level: number) => void;
    setZoomLevelType: (type: ZoomLevelType) => void;
    onMove: (callbacks?: {
        onMoveStart?: () => void;
        onMoveEnd?: () => void;
    }) => (() => void) | undefined;
    onDrag: (callbacks?: {
        onDragStart?: () => void;
        onDragging?: () => void;
        onDragEnd?: () => void;
    }) => (() => void) | undefined;
};

interface IXcMapProps {
    xcMap: ReturnType<typeof useXcMap>;
    children: ReactNode;
    xcMapOption: IXcMapOption;
    events?: IMapEvent[];
    getZoomLevel?: (level: number | undefined) => void;
    disablePan?: boolean;
    disableZoom?: boolean;
}
declare const XcMap: ({ xcMap, children, xcMapOption, events, getZoomLevel, disablePan, disableZoom, }: IXcMapProps) => JSX.Element;

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
    VectorFeature: ({ features }: IVectorFeature) => ol_source.Vector<ol.Feature<ol_geom.Geometry, {
        [x: string]: any;
    }>>;
    VectorWfs: ({ url, ...rest }: IVectorWfs) => "" | ol_source.Vector<ol.Feature<ol_geom.Geometry, {
        [x: string]: any;
    }>> | undefined;
    TileWms: ({ url, params, serverType, projection, transition }: ITileWmsProps) => ol_source.TileWMS;
};

/**
 * GeoJson 레이어 컴포넌트
 *
 * 표준 GeoJSON FeatureCollection 데이터를 지도에 렌더링하는 범용 레이어 컴포넌트입니다.
 * Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon 지오메트리를 지원하며,
 * 혼합 지오메트리(Mixed Geometry)도 한 컴포넌트 내에서 처리 가능합니다.
 *
 * @example
 * <layer.GeoJson<ISurfaceMarkData>
 *     xcMap={xcMap}
 *     layerName="surfacemark"
 *     data={geojsonFeatureCollection}
 *     pkField="id"
 *     featureName="surfacemark"
 *     getFeatureTypeStyle={(feature) => { ... }}
 *     getRotation={(props) => Number(props.angle) || 0}
 *     visible={true}
 * />
 */

interface GeoJsonFeature {
    type: 'Feature';
    id?: string | number;
    geometry: GeoJsonGeometry;
    properties?: Record<string, any>;
}
interface GeoJsonGeometry {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon';
    coordinates: any;
}
type GeoJsonData = {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
} | GeoJsonFeature[];
interface IGeoJsonProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
    /**
     * 표준 GeoJSON 데이터.
     * FeatureCollection 객체 또는 Feature 배열을 받습니다.
     */
    data: GeoJsonData | null;
    /**
     * Feature 식별자(PK)가 들어있는 properties 필드명.
     * Feature.id가 없을 경우 properties[pkField] 값을 Feature ID로 사용합니다.
     * @default 'id'
     */
    pkField?: string;
    /**
     * 기본 featureName. 모든 Feature에 동일하게 적용됩니다.
     * getFeatureName이 제공되면 해당 콜백이 우선합니다.
     */
    featureName?: string;
    /**
     * Feature의 properties를 기반으로 featureName을 동적으로 결정하는 콜백.
     * 혼합 지오메트리 레이어에서 Feature마다 다른 스타일 키를 지정할 때 사용합니다.
     */
    getFeatureName?: (properties: TData) => string;
    /**
     * Feature의 properties를 기반으로 label 텍스트를 반환하는 콜백.
     */
    getLabel?: (properties: TData) => string;
    /**
     * Feature ID를 기반으로 상태 정보를 반환하는 콜백.
     */
    getStatusInfo?: (id: string) => IStatusInfo | undefined;
    /**
     * Feature별 커스텀 Style을 직접 반환하는 콜백.
     * featureStyle 시스템을 우회하여 완전한 OL Style을 직접 지정할 때 사용합니다.
     */
    getCustomStyle?: (feature: Feature) => Style | Style[] | undefined;
    /**
     * Feature별 featureTypeStyle을 동적으로 반환하는 콜백.
     * 같은 featureName 내에서 속성(signtype 등)에 따라 다른 스타일을 적용할 때 사용합니다.
     */
    getFeatureTypeStyle?: (feature: Feature) => IFeatureTypeStyle | undefined;
    /**
     * Point 타입 Feature의 회전 각도를 반환하는 콜백 (degree 단위).
     * type: 'marker' 스타일의 아이콘 회전에 사용됩니다.
     */
    getRotation?: (properties: TData) => number;
    /**
     * Feature 필터링 콜백. false를 반환하면 해당 Feature는 숨김 처리됩니다.
     */
    filter?: (feature: Feature) => boolean;
    /**
     * Feature 위치에 커스텀 React 컴포넌트를 렌더링하는 콜백.
     * OL Overlay를 사용하여 HTML/React 콘텐츠를 지도 위에 표시합니다.
     * 팝업 닫기 등에 영향 받지 않는 persistent overlay로 생성됩니다.
     *
     * @example
     * renderLabel={(feature) => (
     *     <div style={{ color: 'red', fontWeight: 'bold' }}>
     *         {feature.getProperties().value.countdown}
     *     </div>
     * )}
     */
    renderLabel?: (feature: Feature) => react__default.ReactNode;
    /**
     * renderLabel의 위치 오프셋 [x, y] (px 단위).
     * Feature의 geometry center 기준으로 이동합니다.
     * @default [0, 20]
     */
    labelOffset?: [number, number];
    /**
     * Point Feature의 properties를 기반으로 animationName을 반환하는 콜백.
     * animationName은 IXcMapOption.animationStyle에 등록된 키와 매칭됩니다.
     * undefined 또는 '' 반환 시 해당 Feature에 애니메이션 미적용.
     */
    getAnimationName?: (properties: TData) => string | undefined;
    /**
     * Point Feature의 properties를 기반으로 animationData(파라미터 오버라이드)를 반환.
     * 개별 Feature마다 색상, 속도, 크기 등을 다르게 설정할 수 있습니다.
     */
    getAnimationData?: (properties: TData) => Partial<IAnimationParams> | undefined;
    /**
     * 입력 데이터의 좌표계.
     * @default 'EPSG:4326'
     */
    dataProjection?: string;
}
interface IGeoJsonApis {
    /** 현재 레이어의 모든 Feature를 반환합니다. */
    getFeatures: () => Feature[];
    /** 특정 Feature의 가시성을 제어합니다. */
    setVisible: (id: string, visible: boolean) => void;
    /** 특정 Feature의 스타일을 변경합니다. */
    setFeatureStyle: (id: string, featureName: string, status: string) => void;
    /** 현재 data를 기반으로 Feature를 재생성합니다. */
    refresh: () => void;
    /** renderLabel로 생성된 모든 라벨 Overlay를 제거합니다. */
    clearLabels: () => void;
}

interface IPlaceLineStringProps extends Pick<IXcMapCommonProps, 'xcMap'> {
    active: boolean;
    onDrawEnd?: (coordinates: ICoordinate[]) => void;
    onDrawing?: (coordinates: ICoordinate[]) => void;
    onCheckPoint?: (coordinates: ICoordinate[]) => void;
    defaultValues?: ICoordinate[] | undefined;
}
interface IPlaceLineStringApis {
    clear: () => void;
}

type MinimapPositionType = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone';
interface IMinimapProps extends Options$3, Pick<IXcMapCommonProps, 'xcMap'> {
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

interface IPlaceMarkerProps extends Pick<IXcMapCommonProps, 'xcMap'> {
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

interface IVectorProps extends Options$4<any, VectorSource>, IXcMapCommonProps {
    featureName?: string;
    pkField?: string;
}

interface ITileProps extends Options$5<any>, IXcMapCommonProps {
}

interface ICommonProps extends IXcMapCommonProps, ILayerCommonProps {
}

declare const layer: {
    Common: ({ xcMap, layerName, visible }: ICommonProps) => null;
    Tile: ({ xcMap, layerName, layerTag, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
    Vector: ({ xcMap, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: IVectorProps) => null;
    Marker: <TData>(props: IMarkerProps<TData> & {
        ref?: react.Ref<IMarkerApis<TData>>;
    }) => JSX.Element;
    PlaceMarker: ({ xcMap, featureName, status, coordinate, isMoveCenter, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: IPlaceMarkerProps) => JSX.Element;
    Wfs: <TData>(props: IWfsProps<TData> & {
        ref?: react.Ref<IWfsApis>;
    }) => react.ReactNode;
    Wms: ({ xcMap, layerName, layerTag, visible, url, params, zoomParams, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: IWmsProps) => JSX.Element;
    Xyz: ({ xcMap, url, layerName, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: IXyzProps) => JSX.Element;
    Minimap: ({ xcMap, position, getLayers, ...rest }: IMinimapProps) => null;
    PlaceLineString: (props: IPlaceLineStringProps & {
        ref?: react.Ref<IPlaceLineStringApis> | undefined;
    }) => react.ReactNode;
    GeoJson: <TData>(props: IGeoJsonProps<TData> & {
        ref?: react.Ref<IGeoJsonApis>;
    }) => JSX.Element;
};

/**
 * TODO: 수정 기능 관련 이슈
 * - 수정 기능이 구현되어 있지만 완전하지 않음
 * - 주요 문제: "드래그하여 수정" 팝업과 "측정을 시작하려면 클릭하세요" 팝업 겹침
 * - 현재 상태: 수정 기능 비활성화 (line 840: if (false))
 * - 향후 개선 필요: 팝업 겹침 문제 해결 후 수정 기능 재활성화
 *
 * TODO: 다크/라이트 모드 지원
 * - 현재 측정 팝업은 라이트 모드 디자인만 지원 (generatePopupHTML, showBasicMeasurement)
 * - 시스템 다크모드 감지 및 테마별 스타일 적용 필요
 * - 제안 구현 방식: theme prop 추가 ('light' | 'dark' | 'auto'), CSS 변수 활용
 * - 적용 대상: 기본 팝업 HTML, 기본 측정 라벨, 커스텀 팝업에 테마 정보 제공
 * - 고려사항: 기존 사용자 호환성 유지, 성능 최적화, 접근성 대비율 보장
 */
type MeasureType = 'LineString' | 'Polygon' | 'Circle' | '';
type OrderType = 'newest-top' | 'oldest-top';
interface IMeasurementGeometryStyle {
    stroke?: {
        color?: string;
        width?: number;
    };
    fill?: {
        color?: string;
    };
    drawing?: Partial<IMeasurementGeometryStyle>;
    completed?: Partial<IMeasurementGeometryStyle>;
}
interface IMeasurementLabelStyle {
    font?: string;
    textColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number[];
    offset?: number[];
}
interface IMeasurementSegmentLabelStyle {
    font?: string;
    textColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number[];
    borderColor?: string;
    borderWidth?: number;
}
interface IMeasurementPopupData {
    value: string;
    measureType: MeasureType;
    color: string;
    rawValue: number;
    coordinates: ICoordinate;
}
interface IMeasurementPopupChildrenProps {
    measurementData: IMeasurementPopupData;
    onDelete: () => void;
}
interface IPopupOrderConfig {
    type: OrderType;
    startZIndex?: number;
    tempPopupZIndex?: number;
}
interface IMeasurementStyles {
    LineString?: IMeasurementGeometryStyle;
    Polygon?: IMeasurementGeometryStyle;
    Circle?: IMeasurementGeometryStyle;
    common?: {
        label?: IMeasurementLabelStyle;
        segmentLabel?: IMeasurementSegmentLabelStyle;
    };
}
interface IMeasurementProps {
    xcMap: ReturnType<typeof useXcMap>;
    isClearPreviousMeasure?: boolean;
    isShowSegmentLength?: boolean;
    isShowPopupUI?: boolean;
    measurementStyles?: IMeasurementStyles;
    renderPopup?: (props: IMeasurementPopupChildrenProps) => React.ReactNode;
    popupOrderConfig?: IPopupOrderConfig;
    onDrawEnd: () => void;
    onMeasurementActiveChange?: (isActive: boolean) => void;
}
interface IMeasurementApis {
    setMeasureType: (measureType: MeasureType) => void;
    clearAllMeasurements: () => void;
}

interface IMarkerDragAndDropProps extends IXcMapCommonProps {
    feature?: Feature | null;
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
        ref?: react.Ref<IFeatureSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ xcMap, layerName, feature, onMove, onDrop, }: IMarkerDragAndDropProps) => null;
    Measurement: (props: IMeasurementProps & {
        ref?: react.Ref<IMeasurementApis> | undefined;
    }) => react.ReactNode;
};

interface IOverlayComponentProps<TData> extends Pick<IXcMapCommonProps, 'xcMap'>, Options$6 {
    overlayId: string;
    children?: (props: IOverlayChildrenProps<TData>) => react__default.ReactNode;
    onHideCallback?: () => void;
}
interface IOverlayComponentApis<TData> {
    showPopup: (coordinate: ICoordinate, datas: TData[], featureName: string) => void;
    hidePopup: () => void;
    setOverlayPosition: (coordinate: ICoordinate) => void;
}

declare const overlay: {
    OverlayComponent: <TData>(props: IOverlayComponentProps<TData> & {
        ref?: react.Ref<IOverlayComponentApis<TData>>;
    }) => react.ReactNode;
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

/**
 * GeoJSON 변환 유틸리티
 *
 * 프로젝트별 데이터 형식을 표준 GeoJSON FeatureCollection으로 변환하기 위한 유틸리티 함수입니다.
 */
interface IToFeatureCollectionOptions {
    /** geometry 데이터가 들어있는 필드명 @default 'geom' */
    geomField?: string;
    /** PK 필드명 @default 'id' */
    idField?: string;
}
/**
 * 배열 형태의 데이터를 표준 GeoJSON FeatureCollection으로 변환합니다.
 * geomField에 지정된 필드의 GeoJSON Geometry 문자열(또는 객체)을 파싱합니다.
 *
 * @param data - 변환할 데이터 배열
 * @param options - 변환 옵션 (geomField, idField)
 * @returns 표준 GeoJSON FeatureCollection
 *
 * @example
 * const apiData = [
 *   { id: "CW_001", geom: '{"type":"Polygon","coordinates":[...]}', signtype: "5321" },
 *   { id: "PM_001", geom: '{"type":"Point","coordinates":[126.978,37.566]}', angle: "90" }
 * ];
 *
 * const geojson = toFeatureCollection(apiData, { geomField: 'geom', idField: 'id' });
 * // → 표준 GeoJSON FeatureCollection
 */
declare function toFeatureCollection<T extends Record<string, any>>(data: T[], options?: IToFeatureCollectionOptions): {
    type: string;
    features: any[];
};

declare const useXcMapAnimation: () => {
    getRepeatCircleAnimationProperty: (data?: Partial<IAnimationParams>) => IAnimationProperty;
    getCircleAnimationProperty: (data?: Partial<IAnimationParams>) => IAnimationProperty;
};

export { XcInteractions, XcLayers, XcMap, XcOverlays, applyOpacityToColor, interaction, layer, overlay, source, toFeatureCollection, useVworldUrl, useXcMap, useXcMapAnimation, useXcMapFunctions };
export type { FeatureType, IAnimationParams, IAnimationProperty, IAnimationStyle, IAnyObject, ICoordinate, IFeature, IFeatureStyle, IFeatureTypeStyle, IInfoStyle, ILayerCommonProps, IMapEvent, IMarker, IOverlayChildrenProps, IStatusInfo, IStatusStyle, IStyle, IStyleOption, IVector, IWmsParam, IXcMapCommonProps, IXcMapOption, IZoomUrls };
