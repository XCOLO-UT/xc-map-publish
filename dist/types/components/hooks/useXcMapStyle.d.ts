import { Style } from "ol/style";
import { IAnimationProperty, IAnyObject, IFeatureTypeStyle } from "../types/xc-map";
declare const useXcMapStyle: () => {
    getStyle: (featureName: string, status?: string, label?: string, customStyle?: IFeatureTypeStyle) => Style | undefined;
    getAnimationStyle: (animationName?: string) => ((data: IAnyObject | undefined) => IAnimationProperty) | undefined;
};
export default useXcMapStyle;
