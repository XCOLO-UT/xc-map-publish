import {useEffect, useRef, useState} from "react";
import RandUtil from "../utils/rand-util.ts";
import useXcMapOption from "../hooks/useXcMapOption.ts";
import {source, layer, XcMap, XcLayers, ICoordinate, useVworldUrl} from "xc-map";
import TileLayer from "ol/layer/Tile";

const DragAndDropSample = () => {
    const id = useRef<string>('DragAndDropSample' + RandUtil.randomId())

    const [coordinate, setCoordinate] = useState<ICoordinate>()
    const [status, setStatus] = useState<string>()
    const [heading, setHeading] = useState<number>(90)

    const {xcMapOption} = useXcMapOption()

    const {vworldUrl, setTileType, minimapVworldUrl} = useVworldUrl(
        '4C9A5402-9EFD-3CE7-BC6B-CA4A97C4F341',
        'midnight',
        'Base'
    )

    useEffect(() => {
    }, [status, heading, coordinate])
    const setVworldTypeTest = () => {
        setTileType('Base')
    }
    return (
        <div style={{height: '500px', width: '1000px'}}>
            <XcMap
                mapId={id.current}
                xcMapOption={xcMapOption}
                events={[]}
            >
                <XcLayers>
                    <layer.Xyz
                        url={vworldUrl}
                        mapId={id.current}
                        layerName={'vworldLayer'}
                    />

                    <layer.Minimap
                        mapId={id.current}
                        position={'left-bottom'}
                        getLayers={() => {
                            return [
                                new TileLayer({
                                    source: source.XYZ({url: minimapVworldUrl}),
                                }),
                            ]
                        }}
                    />
                    <layer.PlaceMarker
                        mapId={id.current}
                        featureName={'sig'}
                        status={status}
                        coordinate={coordinate}
                        heading={heading}
                        onMoveMarker={(coordinate: ICoordinate) => {
                            console.log("DK_Trace -- PlaceMarker.onMoveMarker: ", coordinate)
                        }}
                        onPlaceMarker={(coordinate: ICoordinate) => {
                            console.log("DK_Trace -- PlaceMarker.onMarkerPlace: ", coordinate)
                        }}
                    />
                </XcLayers>
                <button onClick={setVworldTypeTest}>Set VworldType Test</button>
            </XcMap>
        </div>
    )

}

export default DragAndDropSample