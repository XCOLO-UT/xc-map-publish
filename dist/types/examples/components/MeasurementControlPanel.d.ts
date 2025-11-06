/**
 * 📐 측정 도구 컨트롤 패널
 *
 * Measurement 컴포넌트를 제어하기 위한 UI 패널입니다.
 */
import React from 'react';
import { IMeasurementApis, MeasureType } from '../../components/interaction/Measurement';
interface MeasurementControlPanelProps {
    measureType: MeasureType;
    measurementRef: React.RefObject<IMeasurementApis>;
    isClearPreviousMeasure: boolean;
    isShowSegmentLength: boolean;
    isShowPopupUI: boolean;
    useCustomPopup: boolean;
    popupOrderType: 'newest-top' | 'oldest-top';
    startZIndex: number;
    setMeasureType: (type: MeasureType) => void;
    setIsClearPreviousMeasure: (value: boolean) => void;
    setIsShowSegmentLength: (value: boolean) => void;
    setIsShowPopupUI: (value: boolean) => void;
    setUseCustomPopup: (value: boolean) => void;
    setPopupOrderType: (type: 'newest-top' | 'oldest-top') => void;
    setStartZIndex: (value: number) => void;
}
export declare const MeasurementControlPanel: React.FC<MeasurementControlPanelProps>;
export {};
