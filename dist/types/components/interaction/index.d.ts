export declare const interaction: {
    FeatureTooltip: <TData>(props: import("./FeatureTooltip").IFeatureTooltipProps<TData>) => null;
    FeatureSelect: <TData>(props: import("./FeatureSelect").IFeatureSelectProps<TData> & {
        ref?: Ref<import("./FeatureSelect").IFeatureSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ mapId, layerName, onMove, onDrop, }: import("./MarkerDragAndDrop").IMarkerDragAndDropProps) => null;
    Measurement: any;
};
