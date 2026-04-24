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
import React, { Ref } from "react";
import { Feature } from "ol";
import { Style } from "ol/style";
import { IAnimationParams, IFeatureTypeStyle, ILayerCommonProps, IStatusInfo, IXcMapCommonProps } from "../types/xc-map";
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
export type GeoJsonData = {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
} | GeoJsonFeature[];
export interface IGeoJsonProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
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
    renderLabel?: (feature: Feature) => React.ReactNode;
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
export interface IGeoJsonApis {
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
declare const _default: <TData>(props: IGeoJsonProps<TData> & {
    ref?: Ref<IGeoJsonApis>;
}) => JSX.Element;
export default _default;
