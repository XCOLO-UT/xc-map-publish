import { Options } from "ol/layer/BaseTile";
import { IXcMapCommonProps } from "../types/xc-map";
export interface ITileProps extends Options<any>, IXcMapCommonProps {
    minimap?: string;
}
declare const Tile: ({ mapId, layerName, layerTag, minimap, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
export default Tile;
