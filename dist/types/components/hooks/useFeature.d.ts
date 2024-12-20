import { Style } from "ol/style";
import { Feature, Map } from "ol";
import { IAnimationProperty, IAnyObject, IFeatureTypeStyle, IMarker } from "../types/xc-map";
declare const useFeature: <TData>(xcMap: Map | undefined) => {
    createFeature: (marker: IMarker<TData>, featureName: string, style?: Style, getAnimationProperty?: ((data: IAnyObject | undefined) => IAnimationProperty) | undefined) => Feature;
    getFeaturesInLayer: (layerName: string, layerTag?: string) => Feature[];
    resetMarkerFeaturesStyle: (features: Feature[], getFeatureTypeStyle?: (feature: Feature) => IFeatureTypeStyle | undefined) => void;
    resetVectorFeaturesStyle: (features: Feature[], getFeatureTypeStyle?: (feature: Feature) => IFeatureTypeStyle | undefined) => void;
    resetFeaturesStyle: (features: Feature[], getFeatureTypeStyle?: (feature: Feature) => IFeatureTypeStyle | undefined, getCustomVectorStyle?: (feature: Feature) => Style | Style[] | undefined) => void;
    getFeatureCenter: (feature: Feature) => import("ol/coordinate").Coordinate;
};
export default useFeature;
