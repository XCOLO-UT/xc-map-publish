export declare const layer: {
    Common: ({ mapId, layerName, visible }: import("./Common").ICommonProps) => null;
    Tile: ({ mapId, layerName, layerTag, source, minZoom, maxZoom, ...rest }: import("./Tile").ITileProps) => null;
    Vector: ({ mapId, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: import("./Vector").IVectorProps) => null;
    Marker: <TData>(props: import("./Marker").IMarkerProps<TData> & {
        ref?: Ref<import("./Marker").IMarkerApis<TData>>;
    }) => JSX.Element;
    PlaceMarker: ({ mapId, featureName, status, coordinate, isMoveCenter, heading, minZoom, maxZoom, onMoveMarker, onPlaceMarker, }: import("./PlaceMarker").IPlaceMarkerProps) => JSX.Element;
    Wfs: <TData>(props: import("./Wfs").IWfsProps<TData> & {
        ref?: Ref<import("./Wfs").IWfsApis>;
    }) => React.JSX;
    Wms: ({ mapId, layerName, layerTag, visible, url, params, zoomParams, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: import("./Wms").IWmsProps) => JSX.Element;
    Xyz: ({ mapId, url, layerName, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: import("./Xyz").IXyzProps) => JSX.Element;
    Minimap: ({ mapId, position, getLayers, ...rest }: import("./Minimap").IMinimapProps) => null;
    PlaceLineString: any;
};
