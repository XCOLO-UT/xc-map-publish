import { IXcMapCommonProps } from "../types/xc-map";
export type MeasureType = 'LineString' | 'Polygon' | '';
export interface IMeasurementProps extends IXcMapCommonProps {
    onDrawEnd: () => void;
}
export interface IMeasurementApis {
    setMeasureType: (measureType: MeasureType) => void;
}
declare const Measurement: any;
export default Measurement;
