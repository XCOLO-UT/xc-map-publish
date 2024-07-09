import { Options } from "ol/control/OverviewMap";
import BaseLayer from "ol/layer/Base";
import { IXcMapCommonProps } from "../types/xc-map";
export type MinimapPositionType = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone';
export interface IMinimap extends Options, Pick<IXcMapCommonProps, 'mapId'> {
    position: MinimapPositionType;
    getLayers: () => BaseLayer[];
}
declare const Minimap: ({ mapId, position, getLayers, ...rest }: IMinimap) => null;
export default Minimap;
