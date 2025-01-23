import { Style } from "ol/style";
import { IAnimationParams, IAnimationProperty, IFeatureTypeStyle } from "../types/xc-map";
declare const useXcMapStyle: () => {
    getStyle: (featureName: string, status?: string, label?: string, customStyle?: IFeatureTypeStyle) => Style | undefined;
    getAnimationStyle: (animationName?: string) => ((data: Partial<IAnimationParams> | undefined) => IAnimationProperty) | undefined;
};
export default useXcMapStyle;
