declare const useVworldUrl: (apiKey: string, defaultTileType: string, minimapTileType: string) => {
    minimapVworldUrl: string;
    vworldUrl: any;
    setTileType: (tileType: string) => void;
};
export default useVworldUrl;
