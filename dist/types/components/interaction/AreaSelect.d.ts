import { Ref } from "react";
import useXcMap from "../hooks/useXcMap";
import { ICoordinate } from "../types/xc-map";
export interface IAreaSelectStyle {
    /** 테두리 (기본: '#3b82f6', 2px) */
    stroke?: {
        color?: string;
        width?: number;
    };
    /** 내부 채움 (기본: 'rgba(59, 130, 246, 0.2)') */
    fill?: {
        color?: string;
    };
    /** 그리기 진행 중 스타일 (생략 시 기본 stroke/fill에서 투명도만 낮춰 자동 적용) */
    drawing?: {
        stroke?: {
            color?: string;
            width?: number;
        };
        fill?: {
            color?: string;
        };
    };
}
export interface IAreaSelectProps {
    /** xcMap 인스턴스 (필수) */
    xcMap: ReturnType<typeof useXcMap>;
    /** 꼭짓점 수 제한 (3=삼각형, 4=사각형, 생략=자유 다각형) */
    maxPoints?: number;
    /** 연속 그리기 모드 (기본: false → 1개 완성 후 자동 stop) */
    isContinuous?: boolean;
    /** 그리기 완료 후 영역을 지도에 유지할지 여부 (기본: true) */
    isKeepArea?: boolean;
    /** 새 그리기 시작 시 이전 영역 자동 삭제 여부 (기본: true, isKeepArea=true일 때만 유효) */
    isClearPrevious?: boolean;
    /** 스타일 커스터마이징 */
    areaSelectStyle?: IAreaSelectStyle;
    /** 그리기 완료 시 콜백 — 꼭짓점 좌표 배열 반환 (필수) */
    onDrawEnd: (coordinates: ICoordinate[]) => void;
    /** 그리기 중 실시간 좌표 콜백 (선택) */
    onDrawing?: (coordinates: ICoordinate[]) => void;
}
export interface IAreaSelectApis {
    /** 그리기 시작 */
    start: () => void;
    /** 그리기 중지 */
    stop: () => void;
    /** 그려진 영역 모두 삭제 */
    clear: () => void;
}
/**
 * 영역 선택 Interaction 컴포넌트
 * - 지도 위에 다각형을 그려 영역을 선택하고, 꼭짓점 좌표(ICoordinate[])를 반환
 * - maxPoints로 꼭짓점 수 제한 가능 (3=삼각형, 4=사각형)
 * - forwardRef로 start/stop/clear API 제공
 */
declare const AreaSelect: (props: IAreaSelectProps & {
    ref?: Ref<IAreaSelectApis> | undefined;
}) => import("react").ReactNode;
export default AreaSelect;
