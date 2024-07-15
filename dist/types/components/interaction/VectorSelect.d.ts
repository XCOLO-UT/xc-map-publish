import { IAnyObject, IFeatureSelectProps } from "../types/xc-map";
export interface IVectorSelectProps extends IFeatureSelectProps<IAnyObject> {
    defaultValues?: IAnyObject[];
    multiple?: boolean;
    isLastSelectHighlight?: boolean;
}
export interface IVectorSelectApis {
    select: (id: string) => void;
    deSelect: () => void;
}
declare const VectorSelect: any;
export default VectorSelect;
