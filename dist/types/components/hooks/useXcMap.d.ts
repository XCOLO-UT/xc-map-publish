import { Feature, Map } from "ol";
import { IXcMapOption } from "../types/xc-map.ts";
import * as React from "react";
export interface ISelectedFeatures {
    [layerName: string]: {
        features: Feature[];
        lastSelected?: Feature;
        featureIds: string[];
    };
}
export interface IXcMapState {
    selectedFeatures: React.RefObject<ISelectedFeatures>;
    [key: string]: any;
}
export interface IXcMapMeta {
    [key: string]: any;
}
declare const useXcMap: (xcMapOption?: IXcMapOption, existingMap?: Map) => {
    olMap: Map;
    state: IXcMapState;
    meta: IXcMapMeta | null;
    selectFeature: (layerName: string, layerTag: string | undefined, feature: Feature) => void;
    deselectFeature: (layerName: string, layerTag: string | undefined, featureId?: string) => void;
    setMetaState: (key: string, value: any) => void;
    getMetaState: (key: string) => any;
    getState: () => IXcMapState;
    setMapState: (key: string, value: any) => void;
};
export default useXcMap;
