import { IXcMapCommon } from "../types/xc-map";
export type MeasureType = 'LineString' | 'Polygon' | '';
export interface IMeasurementProps extends IXcMapCommon {
    onDrawEnd: () => void;
}
export interface IMeasurementApis {
    setMeasureType: (measureType: MeasureType) => void;
}
declare const Measurement: any;
export default Measurement;
