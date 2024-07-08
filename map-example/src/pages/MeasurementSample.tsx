import {useRef} from "react";
import {source, layer, XcMap, interaction, XcLayers, XcInteractions, useVworldUrl} from "xc-map";
import TileLayer from "ol/layer/Tile";
import {IMeasurementApis, MeasureType} from "xc-map/dist/types/components/interaction/Measurement";
import BaseLayer from "ol/layer/Base";
import RandUtil from "../utils/rand-util.ts";
import useXcMapOption from "../hooks/useXcMapOption.ts";

const MeasurementSample = () => {
    const id = useRef<string>('MeasurementSample' + RandUtil.randomId())
    const measurementRef = useRef<IMeasurementApis>(null)
    const measureTypeRef = useRef<MeasureType>('')

    const {xcMapOption} = useXcMapOption()

    const {vworldUrl, setTileType, minimapVworldUrl} = useVworldUrl(
        '4C9A5402-9EFD-3CE7-BC6B-CA4A97C4F341',
        'midnight',
        'Base'
    )

    const setVworldTypeTest = () => {
        setTileType('Base')
    }
    const setMeasureTypeLineTest = () => {
        measureTypeRef.current = measureTypeRef.current !== 'LineString' ? 'LineString' : ''
        measurementRef.current && measurementRef.current.setMeasureType(measureTypeRef.current)
    }
    const setMeasureTypePolygonTest = () => {
        measureTypeRef.current = measureTypeRef.current !== 'Polygon' ? 'Polygon' : ''
        measurementRef.current && measurementRef.current.setMeasureType(measureTypeRef.current)
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
                                }) as BaseLayer,
                            ]
                        }}
                    />
                </XcLayers>
                <XcInteractions>
                    <interaction.Measurement
                        ref={measurementRef}
                        mapId={id.current}
                        layerName={'measurementLayer'}
                        onDrawEnd={() => {
                            measureTypeRef.current = ''
                            measurementRef.current && measurementRef.current.setMeasureType(measureTypeRef.current )
                        }}
                    />
                </XcInteractions>
                <button onClick={setVworldTypeTest}>Set VworldType Test</button>
                <button onClick={setMeasureTypeLineTest}>setMeasureTypeLineTest Test</button>
                <button onClick={setMeasureTypePolygonTest}>setMeasureTypePolygonTest Test</button>
            </XcMap>
        </div>
    )

}
export default MeasurementSample