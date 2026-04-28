/**
 * 라인/폴리곤 Feature 위 방향 화살표 Style 유틸리티
 *
 * useXcMapStyle에서 `arrow` 옵션이 설정된 경우,
 * 기본 Style에 `__arrowConfig` 메타데이터가 첨부됩니다.
 * 이 유틸리티는 해당 메타데이터를 감지하여 Feature의 geometry를 따라
 * 화살표 Style을 동적으로 생성합니다.
 *
 * 렌더링 모드:
 * - RegularShape 모드 (기본): 삼각형 정다각형으로 화살표 표현
 * - Icon 모드: imageSrc 설정 시 SVG/PNG 이미지로 화살표 표현 (더 정교한 디자인 가능)
 *
 * 지원 geometry: LineString, MultiLineString, Polygon, MultiPolygon
 * - Polygon/MultiPolygon의 경우 exterior ring을 LineString으로 변환하여 화살표를 배치합니다.
 */
import { Feature } from "ol";
import { Style } from "ol/style";
export interface IArrowConfig {
    color: string;
    size: number;
    interval: number;
    zIndex: number;
    /**
     * 화살표 배치 위치
     * - 'repeat': 라인 전체에 interval 간격으로 반복 배치 (기본값)
     * - 'end': 라인의 끝 지점에만 1개 배치
     * - 'start': 라인의 시작 지점에만 1개 배치
     * - 'both': 시작과 끝 양쪽에 각 1개씩 배치
     * @default 'repeat'
     */
    position?: 'repeat' | 'end' | 'start' | 'both';
    /** 화살표 이미지 경로 (설정 시 Icon 모드) */
    imageSrc?: string;
    /** Icon 모드 이미지 너비 (px) @default 16 */
    imageWidth?: number;
    /** Icon 모드 이미지 높이 (px) @default 20 */
    imageHeight?: number;
}
/**
 * Style에서 __arrowConfig를 감지하고, 있으면 Feature 기반 화살표 Style을 추가하여 반환합니다.
 * __arrowConfig가 없으면 원본 Style을 그대로 반환합니다.
 */
export declare function resolveArrowStyles(style: Style | Style[] | undefined, feature: Feature): Style | Style[] | undefined;
/**
 * Feature의 geometry를 따라 화살표 Style을 생성합니다.
 * config.imageSrc가 있으면 Icon 모드, 없으면 RegularShape 모드로 동작합니다.
 *
 * 지원 geometry 타입:
 * - LineString: 라인을 따라 화살표 배치
 * - MultiLineString: 각 라인별 화살표 배치
 * - Polygon: exterior ring을 따라 화살표 배치
 * - MultiPolygon: 각 polygon의 exterior ring별 화살표 배치
 */
export declare function generateArrowStylesForFeature(feature: Feature, config: IArrowConfig): Style[];
