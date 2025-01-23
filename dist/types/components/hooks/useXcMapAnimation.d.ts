import { IAnimationParams, IAnimationProperty } from "../types/xc-map";
declare const useXcMapAnimation: () => {
    getRepeatCircleAnimationProperty: (data?: Partial<IAnimationParams>) => IAnimationProperty;
    getCircleAnimationProperty: (data?: Partial<IAnimationParams>) => IAnimationProperty;
};
export default useXcMapAnimation;
