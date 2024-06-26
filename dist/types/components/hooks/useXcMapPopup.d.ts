import { Map, Overlay } from "ol";
import { Options } from "ol/Overlay";
import { Coordinate } from "ol/coordinate";
declare const useXcMapPopup: (xcMap: Map | undefined) => {
    showMapPopup: (overlayId: string, html: string, coordinate: Coordinate, callback?: () => void) => void;
    showMapListPopup: (overlayId: string, itemsHtml: string[], coordinate: Coordinate, onClick: (index: number) => void, callback?: () => void) => void;
    findOverlay: (overlayId: string) => Overlay | undefined;
    removeOverlay: (overlayId?: string, callback?: () => void) => void;
    createOverlay: (overlayId: string, createElement?: () => HTMLElement, options?: Options) => Overlay | undefined;
};
export default useXcMapPopup;
