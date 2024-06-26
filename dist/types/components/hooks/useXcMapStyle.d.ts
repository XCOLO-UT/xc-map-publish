import { Style } from "ol/style";
import { IAnimationProperty, IAnyObject } from "../types/xc-map";
declare const useXcMapStyle: () => {
    getStyle: (featureName: string, status: string, label?: string) => Style | undefined;
    getAnimationStyle: (animationName?: string) => ((data: IAnyObject | undefined) => IAnimationProperty) | undefined;
};
export default useXcMapStyle;
