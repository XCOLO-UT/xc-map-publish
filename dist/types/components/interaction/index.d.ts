export declare const interaction: {
    FeatureTooltip: <TData>(props: import("./FeatureTooltip").IFeatureTooltipProps<TData>) => null;
    FeatureSelect: <TData>(props: import("./FeatureSelect").IFeatureSelectProps<TData> & {
        ref?: import("react").Ref<import("./FeatureSelect").IFeatureSelectApis>;
    }) => null;
    MarkerDragAndDrop: ({ xcMap, layerName, feature, onMove, onDrop, }: import("./MarkerDragAndDrop").IMarkerDragAndDropProps) => null;
    Measurement: (props: import("./Measurement").IMeasurementProps & {
        ref?: import("react").Ref<import("./Measurement").IMeasurementApis> | undefined;
    }) => import("react").ReactNode;
};
