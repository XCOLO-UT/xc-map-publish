/**
 * HEX 또는 RGB 색상을 받아 opacity를 적용한 RGBA 문자열로 변환합니다.
 * @param color - HEX (#RRGGBB 또는 #RGB) 또는 RGB 문자열 (e.g., 'rgb(67,135,255)')
 * @param opacity - 0부터 1 사이의 투명도 값
 * @returns RGBA 문자열
 */
export declare const applyOpacityToColor: (color: string, opacity: number) => string;
