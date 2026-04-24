/**
 * GeoJSON 변환 유틸리티
 *
 * 프로젝트별 데이터 형식을 표준 GeoJSON FeatureCollection으로 변환하기 위한 유틸리티 함수입니다.
 */
export interface IToFeatureCollectionOptions {
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
export declare function toFeatureCollection<T extends Record<string, any>>(data: T[], options?: IToFeatureCollectionOptions): {
    type: string;
    features: any[];
};
