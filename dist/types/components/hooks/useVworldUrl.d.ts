export type TileType = "Base" | "white" | "midnight" | "Hybrid" | "Satellite";
declare const useVworldUrl: (apiKey: string, defaultTileType: string, minimapTileType: string) => {
    minimapVworldUrl: string;
    vworldUrl: string;
    setTileType: (tileType: TileType) => void;
};
export default useVworldUrl;
