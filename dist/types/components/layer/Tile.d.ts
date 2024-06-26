import { Options } from "ol/layer/BaseTile";
import { IXcMapCommon } from "../types/xc-map";
export interface ITileProps extends Options<any>, IXcMapCommon {
    minimap?: string;
}
declare const Tile: ({ mapId, layerName, layerTag, minimap, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
export default Tile;
