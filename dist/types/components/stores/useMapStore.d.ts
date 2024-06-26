import { Map as OlMap } from "ol";
interface IMapSet {
    id: string;
    map: OlMap | null;
}
interface IMapState {
    mapSet: IMapSet[];
    populateMap: (mapGenerated: OlMap, id: string) => void;
    getMap: (id: string) => OlMap | undefined;
    removeMap: (id: string) => void;
}
declare const useMapStore: import("zustand").UseBoundStore<import("zustand").StoreApi<IMapState>>;
export default useMapStore;
