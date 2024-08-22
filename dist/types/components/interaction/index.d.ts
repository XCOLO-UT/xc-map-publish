export declare const interaction: {
    FeatureTooltip: <TData>(props: import("./FeatureTooltip").IFeatureTooltip<TData>) => null;
    FeatureSelect: <TData>(props: import("..").IFeatureSelectProps<TData> & {
        ref?: Ref<import("./FeatureSelect").IFeatureSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: import("./MarkerDragAndDrop").IMarkerDragAndDropProps) => null;
    Measurement: any;
};
