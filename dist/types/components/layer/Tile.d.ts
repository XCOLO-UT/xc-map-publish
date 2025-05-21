import { Options } from "ol/layer/BaseTile";
import { IXcMapCommonProps } from "../types/xc-map";
export interface ITileProps extends Options<any>, IXcMapCommonProps {
}
declare const Tile: ({ xcMap, layerName, layerTag, source, minZoom, maxZoom, ...rest }: ITileProps) => null;
export default Tile;
