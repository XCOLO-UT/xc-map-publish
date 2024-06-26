export declare const source: {
    XYZ: ({ url }: import("./Xyz").IXyzProps) => import("ol/source").XYZ;
    VectorFeature: ({ features }: import("./VectorFeature").IVectorFeature) => import("ol/source").Vector<import("ol").Feature<import("ol/geom").Geometry>>;
    VectorWfs: ({ url }: import("./VectorWfs").IVectorWfs) => "" | import("ol/source").Vector<import("ol").Feature<import("ol/geom").Geometry>> | undefined;
    TileWms: ({ url, params, serverType, projection, transition }: import("./TileWms").ITileWmsProps) => import("ol/source").TileWMS;
};
