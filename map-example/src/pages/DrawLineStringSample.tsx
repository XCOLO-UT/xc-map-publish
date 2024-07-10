import {useEffect, useRef, useState} from "react";
import RandUtil from "../utils/rand-util.ts";
import useXcMapOption from "../hooks/useXcMapOption.ts";
import {source, layer, XcMap, XcLayers, ICoordinate, useVworldUrl} from "xc-map";
import TileLayer from "ol/layer/Tile";
import {IPlaceLineStringApis} from "xc-map/dist/types/components/layer/PlaceLineString";

const DragAndDropSample = () => {
    const id = useRef<string>('DragAndDropSample' + RandUtil.randomId())

    const drawRef = useRef<IPlaceLineStringApis>(null)

    const [lineDefaultValue, setLineDefaultValue] = useState<ICoordinate[]>([
        {
            "longitude": 126.71942094301922,
            "latitude": 37.36845339247341
        },
        {
            "longitude": 126.72076875304919,
            "latitude": 37.36571079931268
        },
        {
            "longitude": 126.72904387077433,
            "latitude": 37.366445986658405
        },
        {
            "longitude": 126.72755608296139,
            "latitude": 37.36880165532759
        }
    ])

    const {xcMapOption} = useXcMapOption()

    const {vworldUrl, setTileType, minimapVworldUrl} = useVworldUrl(
        '4C9A5402-9EFD-3CE7-BC6B-CA4A97C4F341',
        'midnight',
        'Base'
    )
    const drawLineTest = () => {
        // mapRef.current && mapRef.current.setZoomLevelType('reset')
        // setPosition(prevState => prevState == 'right-bottom' ? 'gone' : 'left-bottom')
        drawRef.current && drawRef.current.clear()
    }
    const placeLineStringSetDefaultValue = () => {
        setLineDefaultValue([
            {
                "longitude": 126.71942094301922,
                "latitude": 37.36845339247341
            },
            {
                "longitude": 126.72904387077433,
                "latitude": 37.366445986658405
            },
            {
                "longitude": 126.72755608296139,
                "latitude": 37.36880165532759
            }
        ])
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
                    <layer.PlaceLineString
                        ref={drawRef}
                        mapId={id.current}
                        active={false}
                        onDrawEnd={(coordinates: ICoordinate[]) => {
                            console.log("DK_Trace -- App.onDrawEnd : ", coordinates)
                        }}
                        onDrawing={(coordinates: ICoordinate[]) => {
                            console.log("DK_Trace -- App.onDrawing : ", coordinates)
                        }}
                        onCheckPoint={(coordinates: ICoordinate[]) => {
                            console.log("DK_Trace -- App.onCheckPoint : ", coordinates)
                        }}
                        defaultValues={lineDefaultValue}
                    />
                </XcLayers>
                <button onClick={drawLineTest}>setTestTest</button>
                <button onClick={placeLineStringSetDefaultValue}>placeLineStringSetDefaultValue</button>
            </XcMap>
        </div>
    )

}

export default DragAndDropSample