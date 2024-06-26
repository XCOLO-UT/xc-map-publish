import VectorSource from "ol/source/Vector";
import { Options } from "ol/source/Vector";
import { Feature } from "ol";
export interface IVectorFeature extends Options<Feature> {
}
declare const VectorFeature: ({ features }: IVectorFeature) => VectorSource<Feature<import("ol/geom").Geometry>>;
export default VectorFeature;
