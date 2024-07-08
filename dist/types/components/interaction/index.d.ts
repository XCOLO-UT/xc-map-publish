export declare const interaction: {
    FeatureTooltip: <TData>(props: import("./FeatureTooltip").IFeatureTooltip<TData>) => null;
    MarkerSelect: <TData>(props: import("./MarkerSelect").IMarkerSelectProps<TData> & {
        ref?: Ref<import("./MarkerSelect").IMarkerSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: import("./MarkerDragAndDrop").IMarkerDragAndDropProps) => null;
    VectorSelect: any;
    Measurement: any;
};
