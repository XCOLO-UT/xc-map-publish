import VectorSource from "ol/source/Vector";
import { Options } from "ol/source/Vector";
import { Feature } from "ol";
export interface IVectorWfs extends Options<Feature> {
}
declare const VectorWfs: ({ url, ...rest }: IVectorWfs) => "" | VectorSource<Feature<import("ol/geom").Geometry>> | undefined;
export default VectorWfs;
