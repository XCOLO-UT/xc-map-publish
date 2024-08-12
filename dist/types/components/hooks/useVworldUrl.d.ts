declare const useVworldUrl: (apiKey: string, defaultTileType: string, minimapTileType: string) => {
    minimapVworldUrl: string;
    vworldUrl: any;
    setTileType: (tileType: "Satellite" | "Base" | "white" | "midnight" | "Hybrid") => void;
};
export default useVworldUrl;
