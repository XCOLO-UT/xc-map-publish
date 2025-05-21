export declare const layer: {
    Common: ({ xcMap, layerName, visible }: import("./Common").ICommonProps) => null;
    Tile: ({ xcMap, layerName, layerTag, source, minZoom, maxZoom, ...rest }: import("./Tile").ITileProps) => null;
    Vector: ({ xcMap, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: import("./Vector").IVectorProps) => null;
    Marker: <TData>(props: import("./Marker").IMarkerProps<TData> & {
        ref?: import("react").Ref<import("./Marker").IMarkerApis<TData>>;
    }) => JSX.Element;
    PlaceMarker: ({ xcMap, featureName, status, coordinate, isMoveCenter, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: import("./PlaceMarker").IPlaceMarkerProps) => JSX.Element;
    Wfs: <TData>(props: import("./Wfs").IWfsProps<TData> & {
        ref?: import("react").Ref<import("./Wfs").IWfsApis>;
    }) => import("react").ReactNode;
    Wms: ({ xcMap, layerName, layerTag, visible, url, params, zoomParams, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: import("./Wms").IWmsProps) => JSX.Element;
    Xyz: ({ xcMap, url, layerName, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: import("./Xyz").IXyzProps) => JSX.Element;
    Minimap: ({ xcMap, position, getLayers, ...rest }: import("./Minimap").IMinimapProps) => null;
    PlaceLineString: (props: import("./PlaceLineString").IPlaceLineStringProps & {
        ref?: import("react").Ref<import("./PlaceLineString").IPlaceLineStringApis> | undefined;
    }) => import("react").ReactNode;
};
