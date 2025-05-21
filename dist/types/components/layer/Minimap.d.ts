import { Options } from "ol/control/OverviewMap";
import BaseLayer from "ol/layer/Base";
import { IXcMapCommonProps } from "../types/xc-map";
export type MinimapPositionType = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone';
export interface IMinimapProps extends Options, Pick<IXcMapCommonProps, 'xcMap'> {
    position: MinimapPositionType;
    getLayers: () => BaseLayer[];
}
declare const Minimap: ({ xcMap, position, getLayers, ...rest }: IMinimapProps) => null;
export default Minimap;
