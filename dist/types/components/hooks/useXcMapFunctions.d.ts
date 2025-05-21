import { Coordinate } from "ol/coordinate";
import { ICoordinate } from "../types/xc-map.ts";
import useXcMap from "./useXcMap.ts";
/**
 * xcMap 객체에 대한 유틸리티 함수들을 제공하는 훅
 * 기존 Map 객체가 있을 때 해당 객체의 함수들만 사용하고 싶을 경우에 사용
 */
export type ZoomLevelType = "plus" | "minus" | "reset";
declare const useXcMapFunctions: (xcMap: ReturnType<typeof useXcMap>) => {
    animateMove: (coordinate: ICoordinate | Coordinate, duration?: number) => void;
    getCenter: () => ICoordinate | undefined;
    setZoomLevel: (level: number) => void;
    setZoomLevelType: (type: ZoomLevelType) => void;
};
export default useXcMapFunctions;
