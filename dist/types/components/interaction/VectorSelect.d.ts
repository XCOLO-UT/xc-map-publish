import { IAnyObject, IFeatureSelect } from "../types/xc-map";
export interface IVectorSelectProps extends IFeatureSelect<IAnyObject> {
    defaultValues?: IAnyObject[];
    multiple: boolean;
}
export interface IVectorSelectApis {
    select: (data: IAnyObject) => void;
    deSelect: () => void;
}
declare const VectorSelect: any;
export default VectorSelect;
