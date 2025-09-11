import { Ref } from "react";
import useXcMap from "../hooks/useXcMap";
import { ICoordinate } from "../types/xc-map";
/**
 * TODO: 수정 기능 관련 이슈
 * - 수정 기능이 구현되어 있지만 완전하지 않음
 * - 주요 문제: "드래그하여 수정" 팝업과 "측정을 시작하려면 클릭하세요" 팝업 겹침
 * - 현재 상태: 수정 기능 비활성화 (line 840: if (false))
 * - 향후 개선 필요: 팝업 겹침 문제 해결 후 수정 기능 재활성화
 */
export type MeasureType = 'LineString' | 'Polygon' | 'Circle' | '';
export interface IMeasurementGeometryStyle {
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
export interface IMeasurementLabelStyle {
    font?: string;
    textColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number[];
    offset?: number[];
}
export interface IMeasurementSegmentLabelStyle {
    font?: string;
    textColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number[];
    borderColor?: string;
    borderWidth?: number;
}
export interface IMeasurementPopupData {
    value: string;
    measureType: MeasureType;
    color: string;
    rawValue: number;
    coordinates: ICoordinate;
}
export interface IMeasurementPopupChildrenProps {
    measurementData: IMeasurementPopupData;
    onDelete: () => void;
}
export interface IPopupOrderConfig {
    type: 'newest-top' | 'oldest-top';
    startZIndex?: number;
    tempPopupZIndex?: number;
}
export interface IMeasurementStyles {
    LineString?: IMeasurementGeometryStyle;
    Polygon?: IMeasurementGeometryStyle;
    Circle?: IMeasurementGeometryStyle;
    common?: {
        label?: IMeasurementLabelStyle;
        segmentLabel?: IMeasurementSegmentLabelStyle;
    };
}
export interface IMeasurementProps {
    xcMap: ReturnType<typeof useXcMap>;
    isClearPreviousMeasure?: boolean;
    isShowSegmentLength?: boolean;
    isShowPopupUI?: boolean;
    measurementStyles?: IMeasurementStyles;
    renderPopup?: (props: IMeasurementPopupChildrenProps) => React.ReactNode;
    popupOrderConfig?: IPopupOrderConfig;
    onDrawEnd: () => void;
}
export interface IMeasurementApis {
    setMeasureType: (measureType: MeasureType) => void;
    clearAllMeasurements: () => void;
}
declare const Measurement: (props: IMeasurementProps & {
    ref?: Ref<IMeasurementApis> | undefined;
}) => import("react").ReactNode;
export default Measurement;
