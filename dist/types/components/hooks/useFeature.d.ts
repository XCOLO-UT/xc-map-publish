import { Style } from "ol/style";
import { Feature, Map } from "ol";
import { IAnimationProperty, IAnyObject, IMarker } from "../types/xc-map";
declare const useFeature: <TData>(xcMap: Map | undefined) => {
    createFeature: (marker: IMarker<TData>, featureName: string, style?: Style, getAnimationProperty?: ((data: IAnyObject | undefined) => IAnimationProperty) | undefined) => Feature;
    getFeaturesInLayer: (layerName: string, layerTag?: string) => Feature[];
    resetMarkerFeaturesStyle: (features: Feature[]) => void;
    resetVectorFeaturesStyle: (features: Feature[]) => void;
};
export default useFeature;
