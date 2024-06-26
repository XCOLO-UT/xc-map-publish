import { Options } from "ol/source/TileWMS";
import { TileWMS } from "ol/source";
export interface ITileWmsProps extends Options {
}
declare const TileWms: ({ url, params, serverType, projection, transition }: ITileWmsProps) => TileWMS;
export default TileWms;
