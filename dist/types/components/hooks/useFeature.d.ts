import { Style } from "ol/style";
import { Feature, Map } from "ol";
import { IAnimationProperty, IAnyObject, IFeatureTypeStyle, IMarker } from "../types/xc-map";
declare const useFeature: <TData>(xcMap: Map | undefined) => {
    createFeature: (marker: IMarker<TData>, featureName: string, style?: Style, getAnimationProperty?: ((data: IAnyObject | undefined) => IAnimationProperty) | undefined) => Feature;
    getFeaturesInLayer: (layerName: string, layerTag?: string) => Feature[];
    resetMarkerFeaturesStyle: (features: Feature[], getCustomStyle?: (feature: Feature) => IFeatureTypeStyle | undefined) => void;
    resetVectorFeaturesStyle: (features: Feature[], getCustomStyle?: (feature: Feature) => IFeatureTypeStyle | undefined) => void;
};
export default useFeature;
