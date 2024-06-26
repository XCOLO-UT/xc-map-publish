import { Map } from "ol";
import BaseLayer from "ol/layer/Base";
declare const useLayerOpen: (xcMap: Map | undefined, name?: string) => {
    layerName: string;
    removeLayer: (layerName: string) => void;
    findLayer: (layerName: string, layerTag?: string) => BaseLayer | BaseLayer[] | undefined;
};
export default useLayerOpen;
