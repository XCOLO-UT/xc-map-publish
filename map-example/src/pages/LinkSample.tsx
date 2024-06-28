import React, {useEffect, useRef, useState} from "react";

import {
    XcInteractions,
    layer,
    interaction,
    XcLayers,
    XcMap,
    ITrafficInfo,
    ICoordinate,
    source
} from "xc-map";
import {IWfsApis} from "xc-map/dist/types/components/layer/Wfs";
import {IVectorSelectApis} from "xc-map/dist/types/components/interaction/VectorSelect";
import {IMeasurementApis, MeasureType} from "xc-map/dist/types/components/interaction/Measurement";
import TileLayer from "ol/layer/Tile";
import RandUtil from "../utils/rand-util.ts";
import useXcMapOption from "../hooks/useXcMapOption.ts";
import useVworldUrl from "xc-map/dist/types/components/hooks/useVworldUrl";

interface ITraffic15Data extends ITrafficInfo {
    linkId: string
    traffic15Status: string

    getId: () => string
    getTrafficStatus : () => string
}

const traffic15Data: ITraffic15Data = {
    linkId: '2240581000',
    traffic15Status: 'selected0',

    getId: () => traffic15Data.linkId,
    getTrafficStatus: () => traffic15Data.traffic15Status
}
const LinkSample = () => {
    const id = useRef<string>(RandUtil.randomId())
    const linkLayerRef = useRef<IWfsApis<any>>(null)
    const vectorSelectRef = useRef<IVectorSelectApis>(null)
    const measurementRef = useRef<IMeasurementApis>(null)
    const measureTypeRef = useRef<MeasureType>('')

    const [coordinate, setCoordinate] = useState<ICoordinate>()
    const [status, setStatus] = useState<string>()
    const [measureType, setMeasureType] = useState<MeasureType>('')
    const [heading, setHeading] = useState<number>(90)

    const {xcMapOption} = useXcMapOption()

    const {vworldUrl, setTileType, minimapVworldUrl} = useVworldUrl(
        '4C9A5402-9EFD-3CE7-BC6B-CA4A97C4F341',
        'midnight',
        'Base'
    )

    useEffect(() => {
    }, [status, heading, coordinate])
    useEffect(() => {
        console.log('DK_Trace -- Measurement.measureType.useEffect : ', measureType);
    }, [measureType])

    const setStatusTest = () => {
        setStatus(prevState => prevState == 'spatY' ? 'spatN' : 'spatY')
    }
    const setVworldTypeTest = () => {
        setTileType('Base')
    }

    const setHeadingTest = () => {
        setHeading(prevState => {
            if(prevState) {
                prevState += 90
                return prevState
            } else {
                return 0 as number
            }
        })
    }
    const setCoordinateTest = () => {
        setCoordinate({longitude: 126.72228788918001, latitude: 37.366205099680755})
    }

    const trafficInfos: ITrafficInfo[] = [
        {
            getId: () => {
                return '2240581000'
            },
            getTrafficStatus: () => {
                return 'selected'
            }
        }
    ]

    const selectTest = () => {
        vectorSelectRef.current && vectorSelectRef.current.select({
            LINK_ID:'2240581800'
        })
    }
    const selectTest2 = () => {
        vectorSelectRef.current && vectorSelectRef.current.select({
            LINK_ID:'2240581900'
        })
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
        <div style={{height: '500px', width: '100%'}}>
            <XcMap
                mapId={id.current}
                xcMapOption={xcMapOption}
                events={[
                ]}
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
                    {/*<Minimap*/}
                    {/*    mapId={id.current}*/}
                    {/*    position={'right-top'}*/}
                    {/*    getLayers={() => {*/}
                    {/*        // example*/}
                    {/*        return [*/}
                    {/*            new TileLayer({*/}
                    {/*                source: new XYZ({url: minimapVworldUrl}),*/}
                    {/*            }),*/}
                    {/*            new VectorLayer({*/}
                    {/*                source: new VectorSource({*/}
                    {/*                    url: `http://adxc.xcolo.co.kr:10021/geoserver/wfs?service=WFS&` +*/}
                    {/*                        `version=2.0.0&request=GetFeature&typename=adxc:TESTBED_MOCT_LINK_POLY20M&` +*/}
                    {/*                        `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`,*/}
                    {/*                    format: new GeoJSON()*/}
                    {/*                })*/}
                    {/*            })*/}
                    {/*        ]*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<layer.Wms*/}
                    {/*    mapId={id.current}*/}
                    {/*    layerName={'linkLayerWms'}*/}
                    {/*    url={'http://adxc.xcolo.co.kr:10021/geoserver/adxc/wms'}*/}
                    {/*    params={{*/}
                    {/*        zoomLevel: 15,*/}
                    {/*        LAYERS: 'adxc:TESTBED_MOCT_LINK_POLY10M',*/}
                    {/*        TILED: true,*/}
                    {/*    }}*/}
                    {/*    zoomParams={[*/}
                    {/*        {*/}
                    {/*            zoomLevel: 15,*/}
                    {/*            LAYERS: 'adxc:TESTBED_MOCT_LINK_POLY20M',*/}
                    {/*            TILED: true,*/}
                    {/*        },{*/}
                    {/*            zoomLevel: 16,*/}
                    {/*            LAYERS: 'adxc:TESTBED_MOCT_LINK_POLY10M',*/}
                    {/*            TILED: true,*/}
                    {/*        },{*/}
                    {/*            zoomLevel: 17,*/}
                    {/*            LAYERS: 'adxc:TESTBED_MOCT_LINK_POLY5M',*/}
                    {/*            TILED: true,*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    <layer.Wfs
                        ref={linkLayerRef}
                        mapId={id.current}
                        layerName={'linkLayer'}
                        pkField={'LINK_ID'}
                        featureName={'link'}
                        url={''}
                        zoomUrls={[
                            {
                                zoomLevel: 15,
                                url: `http://adxc.xcolo.co.kr:10021/geoserver/wfs?service=WFS&` +
                                    `version=2.0.0&request=GetFeature&typename=adxc:TESTBED_MOCT_LINK_POLY20M&` +
                                    `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`
                            }, {
                                zoomLevel: 16,
                                url: `http://adxc.xcolo.co.kr:10021/geoserver/wfs?service=WFS&` +
                                    `version=2.0.0&request=GetFeature&typename=adxc:TESTBED_MOCT_LINK_POLY10M&` +
                                    `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`
                            }, {
                                zoomLevel: 17,
                                url: `http://adxc.xcolo.co.kr:10021/geoserver/wfs?service=WFS&` +
                                    `version=2.0.0&request=GetFeature&typename=adxc:TESTBED_MOCT_LINK_POLY5M&` +
                                    `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`
                            },
                        ]}
                        // getTrafficInfo={(id) => {
                        //     return trafficInfos.find((info) => info.getId() === id)
                        // }}
                    />
                    {/*<layer.Wfs*/}
                    {/*    ref={linkLayerRef}*/}
                    {/*    mapId={id.current}*/}
                    {/*    layerName={'phmsLinkLayer'}*/}
                    {/*    layerTag={'phms'}*/}
                    {/*    pkField={'LK1_ID'}*/}
                    {/*    featureName={'link'}*/}
                    {/*    url={''}*/}
                    {/*    zoomUrls={[*/}
                    {/*        {*/}
                    {/*            zoomLevel: 15,*/}
                    {/*            url: `http://phms.xcolo.co.kr:2021/geoserver/wfs?service=WFS&` +*/}
                    {/*                `version=2.0.0&request=GetFeature&typename=phms:exl_transparent_001&` +*/}
                    {/*                `outputFormat=application/json&exceptions=application/json&srsName=EPSG:3857&`*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    {/*<layer.Wfs*/}
                    {/*    ref={linkLayerRef}*/}
                    {/*    mapId={id.current}*/}
                    {/*    layerName={'phmsLinkLayer2'}*/}
                    {/*    layerTag={'phms'}*/}
                    {/*    pkField={'LK1_ID'}*/}
                    {/*    featureName={'link'}*/}
                    {/*    url={''}*/}
                    {/*    zoomUrls={[*/}
                    {/*        {*/}
                    {/*            zoomLevel: 15,*/}
                    {/*            url: `http://phms.xcolo.co.kr:2021/geoserver/wfs?service=WFS&` +*/}
                    {/*                `version=2.0.0&request=GetFeature&typename=phms:lk1_transparent_101&` +*/}
                    {/*                `outputFormat=application/json&exceptions=application/json&srsName=EPSG:3857&`*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*/>*/}
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
                <XcInteractions>
                    <interaction.VectorSelect
                        ref={vectorSelectRef}
                        mapId={id.current}
                        layerName={'linkLayer'}
                        multiple={false}
                        disabled={false}
                        useSelectStyle={true}
                        isMoveCenterOnClick={false}
                        isDeselectClosePopup={true}
                        // defaultValues={[
                        //     {
                        //         LINK_ID:'2240581800'
                        //     },
                        //     {
                        //         LINK_ID:'2240581900'
                        //     },
                        //     {
                        //         LINK_ID:'2240684200'
                        //     },
                        //     {
                        //         LINK_ID:'2240782000'
                        //     },
                        //     {
                        //         LINK_ID:'2240782100'
                        //     },
                        // ]}
                        onClick={(layerName, data) => {
                            console.log("DK_Trace -- VectorSelect.onClick.layerName: ", layerName)
                            console.log("DK_Trace -- VectorSelect.onClick.data: ", data)
                        }}
                        onSelectionChange={(layerName, datas) => {
                            console.log('DK_Trace -- VectorSelect.onSelectionChange.layerName :', layerName)
                            console.log('DK_Trace -- VectorSelect.onSelectionChange.datas :', datas)
                        }}
                        getPopup={(datas) => {
                            let html = ``;
                            if(datas.length > 0) {
                                html += `<div>`
                                datas.forEach(data => {
                                    html += `<span class="id">${data.LINK_ID}</span>`
                                })
                                html += `</div>`
                            }
                            return html
                        }}
                    />
                    {/*<interaction.VectorSelect*/}
                    {/*    mapId={id.current}*/}
                    {/*    layerName={'phmsLinkLayer'}*/}
                    {/*    layerTag={'phms'}*/}
                    {/*    multiple={false}*/}
                    {/*    disabled={false}*/}
                    {/*    useSelectStyle={true}*/}
                    {/*    isMoveCenterOnClick={false}*/}
                    {/*    isDeselectClosePopup={true}*/}
                    {/*    onClick={(layerName, data) => {*/}
                    {/*        console.log("DK_Trace -- VectorSelect.onClick.layerName: ", layerName)*/}
                    {/*        console.log("DK_Trace -- VectorSelect.onClick.data: ", data)*/}
                    {/*    }}*/}
                    {/*    onSelectionChange={(layerName, datas) => {*/}
                    {/*        console.log('DK_Trace -- VectorSelect.onSelectionChange.layerName :', layerName)*/}
                    {/*        console.log('DK_Trace -- VectorSelect.onSelectionChange.datas :', datas)*/}
                    {/*    }}*/}

                    {/*    getListPopup={(datas) => {*/}
                    {/*        console.log('DK_Trace -- getListPopup.datas :', datas)*/}
                    {/*        const itemsHtml: string[] = [];*/}
                    {/*        if(datas.length > 0) {*/}
                    {/*            datas.forEach(data => {*/}
                    {/*                let html = ''*/}
                    {/*                html += `<div>`*/}
                    {/*                html += `<span class="id">${data.LK1_ID}</span>`*/}
                    {/*                html += `</div>`*/}
                    {/*                itemsHtml.push(html)*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*        return itemsHtml*/}
                    {/*    }}*/}
                    {/*    getPopup={(datas) => {*/}
                    {/*        let html = ``;*/}
                    {/*        if(datas.length > 0) {*/}
                    {/*            html += `<div>`*/}
                    {/*            datas.forEach(data => {*/}
                    {/*                html += `<span class="id">${data.LK1_ID}</span>`*/}
                    {/*            })*/}
                    {/*            html += `</div>`*/}
                    {/*        }*/}
                    {/*        return html*/}
                    {/*    }}*/}
                    {/*/>*/}
                </XcInteractions>
                {/*<button onClick={setStatusTest}>Set Status Test</button>*/}
                {/*<button onClick={setHeadingTest}>Set Heading Test</button>*/}
                {/*<button onClick={setCoordinateTest}>Set Coordinate Test</button>*/}
                <button onClick={setVworldTypeTest}>Set VworldType Test</button>
                <button onClick={selectTest}>selectTest Test</button>
                <button onClick={selectTest2}>selectTest2 Test</button>
                <button onClick={setMeasureTypeLineTest}>setMeasureTypeLineTest Test</button>
                <button onClick={setMeasureTypePolygonTest}>setMeasureTypePolygonTest Test</button>
            </XcMap>
        </div>
    )
}

export default LinkSample
