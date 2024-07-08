import React, {useEffect, useRef, useState} from 'react';
import {IMarkerApis} from "xc-map/dist/types/components/layer/Marker";
import {
    IMarker,
    XcInteractions,
    layer,
    interaction,
    XcLayers,
    XcMap,
    useVworldUrl,
    ICoordinate,
    source,
    XcOverlays,
    overlay
} from "xc-map";
import RandUtil from "../utils/rand-util.ts";
import useXcMapOption from "../hooks/useXcMapOption.ts";
import {IXcMapApis} from "xc-map/dist/types/components/XcMap";
import TileLayer from "ol/layer/Tile";
import {IOverlayComponentApis} from "xc-map/dist/types/components/overlays/OverlayComponent";
import {IMarkerSelectApis} from "xc-map/dist/types/components/interaction/MarkerSelect";
import PopupContent, {IPopupContent} from "../popups/PopupContent.tsx";

interface ISigData {
    sigId: string
    intersectionId: string
    intersectionNm: string
    commIp: string
    commPort: number
    modelNm: string
    instlYy: string
    longitude: number
    latitude: number
    heading: number
    spatYn: string
    regDt: string
    regUserId: string
}
interface ICctvData {
    cctvId: string
    maker: string
    makerNm?: string
    model: string
    instlLc: string
    instlDt: string
    longitude: number
    latitude: number
    ctrlIpAdres: string
    ctrlPort: number
    ctrlId: string
    ctrlPswd: string
    rtspUrl: string
    hlsUrl: string
    ptzSpd: number
    presetYn: string
    regUserId?: string
    areaId: number
    areaNm: string
    commSttus?: string
    colctDt?: number
}
interface IProbeData {
    probeId: string
    probeNo: string
    probeNm: string
    probeTypeCd: string
    modelNm: string
    makingYy: string
    regDt: string
    regUserId: string
    clctDt: string
    syncKey: number
    longitude: number
    latitude: number
    elevation: number
    heading: number
    transmissionStateCd: string
    speed: number
    linkSpeed: number
    tcc: string
    brakeBar:string
    linkId:string
    awsId:string
}

const MarkerSample = () => {
    const id = useRef<string>('MarkerSample' + RandUtil.randomId())
    const id2 = useRef<string>('DragAndDropSample' + RandUtil.randomId())
    const mapRef = useRef<IXcMapApis>(null)
    const sigMarkerRef = useRef<IMarkerApis<ISigData>>(null)
    const cctvMarkerRef = useRef<IMarkerApis<ICctvData>>(null)
    const probeMarkerRef = useRef<IMarkerApis<IProbeData>>(null)
    const cctvOverlayRef = useRef<IOverlayComponentApis>(null)
    const cctvMarkerSelectRef = useRef<IMarkerSelectApis>(null)

    const [test, setTest] = useState(false)
    const [coordinate, setCoordinate] = useState<ICoordinate>()
    const [heading, setHeading] = useState<number>(90)
    const [status, setStatus] = useState<string>()

    const [cctvSelectDisabled, setCctvSelectDisabled] = useState(false)
    const [sigMarkerVisible, setSigMarkerVisible] = useState(true)
    const [cctvMarkerVisible, setCctvMarkerVisible] = useState(true)
    const [cctvMarkers, setCctvMarkers] = useState<IMarker<ICctvData>[]>(null)
    const [sigMarkers, setSigMarkers] = useState<IMarker<ISigData>[]>(null)
    const [probeMarkers, setProbeMarkers] = useState<IMarker<IProbeData>[]>(null)
    const [value, setValue] = useState<IMarker<ICctvData>>({
        "id": "CCTV0002",
        "status": "default",
        "featureName": "cctv",
        "value": {
            "cctvId": "1234abcd",
            "maker": "",
            "model": "",
            "instlLc": "",
            "instlDt": "2024-05-07",
            "longitude": 126.734227,
            "latitude": 37.365489,
            "ctrlIpAdres": "",
            "ctrlPort": 80,
            "ctrlId": "asdasd",
            "ctrlPswd": "",
            "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp\u0003",
            "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
            "ptzSpd": 0,
            "presetYn": "N",
            "regUserId": "adcp",
            "areaId": 16,
            "areaNm": "테스트베드"
        },
        "coordinate": {
            "longitude": 126.734227,
            "latitude": 37.365489
        }
    })

    const {xcMapOption} = useXcMapOption()

    const {vworldUrl, setTileType, minimapVworldUrl} = useVworldUrl(
        '4C9A5402-9EFD-3CE7-BC6B-CA4A97C4F341',
        'midnight',
        'Satellite'
    )

    useEffect(() => {
        console.log("DK_Trace -- app.useEffect")
        getCctvDummyMarkers()
        getSigDummyMarkers()
        getProbeDummyData()

    }, [])

    useEffect(() => {
    }, [status, heading, coordinate])
    const changeSigMarkerLayerVisibleTest = () => {
        setSigMarkerVisible(prevState => !prevState)
    }
    const changeCctvMarkerLayerVisibleTest = () => {
        setCctvMarkerVisible(prevState => !prevState)
    }
    const setDefaultValueTest = () => {
        setValue({
            "id": "CCTV0005",
            "status": "default",
            "featureName": "cctv",
            "value": {
                "cctvId": "CCTV0005",
                "maker": "HanWha",
                "makerNm": "한화테크윈",
                "model": "SI-2037P",
                "instlLc": "플랫폼테스트",
                "instlDt": "2023-08-28",
                "longitude": 126.721037,
                "latitude": 37.367949,
                "ctrlIpAdres": "121.137.106.145",
                "ctrlPort": 38080,
                "ctrlId": "admin",
                "ctrlPswd": "admin123$%^",
                "rtspUrl": "rtsp://admin:admin123$%^@192.168.10.160:554/profile1/media.smp",
                "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
                "ptzSpd": 44,
                "presetYn": "Y",
                "colctDt": 1710401131000,
                "areaId": 16,
                "areaNm": "테스트베드"
            },
            "coordinate": {
                "longitude": 126.719921,
                "latitude": 37.372986,
            }
        })
    }

    const setMarkerPositionTest = () => {
        sigMarkerRef?.current?.setMarkerPosition(
            {
                id: 'SIGLD00100',
                coordinate: {
                    longitude: 14108403.122684095,
                    latitude: 4490614.025564562
                },
                heading: 100,
            } as IMarker<ISigData>
        )
    }
    const setMarkerStyleTest1 = () => {
        sigMarkerRef?.current?.setMarkerStyle(
            {
                id: 'SIGLD00100',
                featureName: 'sig',
                status: "spatN",
                heading: 30.4,
            } as IMarker<ISigData>
        )
    }
    const setMarkerStyleTest2 = () => {
        sigMarkerRef?.current?.setMarkerStyle(
            {
                id: '213',
                featureName: 'sig',
                status: "spatY",
                heading: 0.0,
            } as IMarker<ISigData>
        )
    }

    const getSigDummyMarkers = () => {
        setSigMarkers(sigDummyData.map((data) => (
            {
                id: data.sigId,
                featureName: 'sig',
                animationName: data.sigId === 'SIGRB00100' ? 'redCircleWave' : '',
                status: data.spatYn == "Y"? 'spatY' : 'spatN',
                label: '신호제어기 ' + data.intersectionNm,
                value: data,
                coordinate: {
                    longitude: data.longitude,
                    latitude: data.latitude,
                },
                heading: data.heading ?? undefined,
            }
        )))
    }
    const getCctvDummyMarkers = () => {
        setCctvMarkers(cctvDummyData.map((data) => (
            {
                id: data.cctvId,
                featureName: 'cctv',
                animationName: data.cctvId === 'CCTV0009' ? 'redCircleWave' : '',
                status: 'default',
                value: data,
                coordinate: {
                    longitude: data.longitude,
                    latitude: data.latitude,
                },
            }
        )))
    }
    const getProbeDummyData = () => {
        setProbeMarkers(probeDummyData.map((data) => (
            {
                id: data.probeId,
                featureName: 'probe',
                animationName: 'redCircleWave',
                status: 'default',
                value: data,
                coordinate: {
                    longitude: data.longitude,
                    latitude: data.latitude,
                },
                heading: data.heading ?? undefined,
            }
        )))
    }

    const setVworldTypeTest = () => {
        setTileType('Satellite')
    }
    const setZoomLevelTest = () => {
        mapRef.current && mapRef.current.setZoomLevel(17)
    }
    const setZoomLevelTypeTest = () => {
        mapRef.current && mapRef.current.setZoomLevelType('plus')
    }
    const animateMoveTest = () => {
        mapRef.current && mapRef.current.animateMove({
            latitude: 37.363206,
            longitude: 126.73103
        })
    }
    const setDisabledTest = () => {
        setCctvSelectDisabled(prevState => !prevState)
    }
    const setTestTest = () => {
        setTest(prevState => !prevState)
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

    return (
        <div style={{height: '500px', width: '1000px'}}>
            <XcMap
                ref={mapRef}
                mapId={id.current}
                xcMapOption={xcMapOption}
                events={[
                    {
                        name: "singleclick",
                        callback: (event) => {
                            // console.log('Trace.DK_LOG - event.click : ', event)
                            console.log('Trace.DK_LOG - event.click : ', event.coordinate)
                        }
                    },
                    {
                        name: "contextmenu",
                        callback: (event) => {
                            console.log('Trace.DK_LOG - event.contextmenu : ', event)
                            // console.log('Trace.DK_LOG - event.contextmenu : ', event.coordinate)
                            // console.log('Trace.DK_LOG - event.contextmenu : '
                            //     , transformFrom3857To4326ByCoordinates(event.coordinate))
                        }
                    }
                ]}
            >
                <XcLayers>
                    <layer.Xyz
                        url={vworldUrl}
                        mapId={id.current}
                        layerName={'vworldLayer'}
                    />
                    {/*<layer.Minimap*/}
                    {/*    mapId={id.current}*/}
                    {/*    position={'left-bottom'}*/}
                    {/*    getLayers={() => {*/}
                    {/*        return [*/}
                    {/*            new TileLayer({*/}
                    {/*                source: source.XYZ({url: minimapVworldUrl}),*/}
                    {/*            }),*/}
                    {/*        ]*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<layer.Marker<ISigData>*/}
                    {/*    ref={sigMarkerRef}*/}
                    {/*    mapId={id.current}*/}
                    {/*    markers={sigMarkers}*/}
                    {/*    visible={sigMarkerVisible}*/}
                    {/*    layerName={'sigMarker'}*/}
                    {/*/>*/}
                    <layer.Marker<ICctvData>
                        ref={cctvMarkerRef}
                        mapId={id.current}
                        markers={cctvMarkers}
                        visible={cctvMarkerVisible}
                        layerName={'cctvMarker'}
                        layerTag={'marker'}
                    />
                    {/*<layer.Marker<IProbeData>*/}
                    {/*    ref={probeMarkerRef}*/}
                    {/*    mapId={id.current}*/}
                    {/*    markers={probeMarkers}*/}
                    {/*    visible={true}*/}
                    {/*    layerName={'probeMarker'}*/}
                    {/*    layerTag={'marker'}*/}
                    {/*    getMarkerLabel={(data) => {*/}
                    {/*        return data.probeId*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <layer.PlaceMarker
                        mapId={id.current}
                        featureName={'sig'}
                        status={status}
                        coordinate={coordinate}
                        isMoveCenter={true}
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
                    <interaction.MarkerSelect<ICctvData>
                        ref={cctvMarkerSelectRef}
                        mapId={id.current}
                        layerName={'cctvMarker'}
                        disabled={cctvSelectDisabled}
                        isMoveCenterOnClick={false}
                        useSelectStyle={true}
                        isDeselectClosePopup={true}
                        defaultValue={value}
                        onClick={(layerName, datas, coordinate) => {
                            console.log('DK_Trace -- onClick.layerName : ', layerName)
                            console.log('DK_Trace -- onClick.datas :', datas)
                            if (cctvOverlayRef.current) {
                                cctvOverlayRef.current.showPopup(coordinate, datas)
                            }

                        }}
                        onSelectionChange={(layerName, datas) => {
                            console.log('DK_Trace -- onSelectionChange.layerName :', layerName)
                            console.log('DK_Trace -- onSelectionChange.datas :', datas)
                        }}
                        // getPopup={(datas: ICctvData[]) => {
                        //     console.log('DK_Trace -- getPopup.datas :', datas)
                        //     let html = ``;
                        //     if(datas.length > 0) {
                        //         html += `<div>`
                        //         datas.forEach(data => {
                        //             html += `<span class="id" style="color:#000">${data.cctvId}</span>`
                        //         })
                        //         html += `</div>`
                        //     }
                        //     return html
                        // }}
                        // getListPopup={(datas: ICctvData[]) => {
                        //     console.log('DK_Trace -- getListPopup.datas :', datas)
                        //     const itemsHtml: string[] = [];
                        //     if(datas.length > 0) {
                        //         datas.forEach(data => {
                        //             let html = ''
                        //             html += `<div>`
                        //             html += `<span class="id" style="color:#000">${data.cctvId}</span>`
                        //             html += `</div>`
                        //             itemsHtml.push(html)
                        //         })
                        //     }
                        //     return itemsHtml
                        // }}
                    />
                    <interaction.MarkerSelect<IProbeData>
                        mapId={id.current}
                        layerName={'probeMarker'}
                        disabled={false}
                        isMoveCenterOnClick={true}
                        useSelectStyle={true}
                        isDeselectClosePopup={false}
                        onClick={(layerName, data) => {
                            console.log('DK_Trace -- onClick.layerName : ', layerName)
                            console.log('DK_Trace -- onClick.data :', data)
                        }}
                        onDoubleClick={(layerName, data) => {
                            console.log('DK_Trace -- onDoubleClick.layerName : ', layerName)
                            console.log('DK_Trace -- onDoubleClick.data :', data)
                        }}
                    />
                    <interaction.FeatureTooltip<ISigData>
                        mapId={id.current}
                        layerName={'sigMarker'}
                        getTooltip={(datas:ISigData[]) => {
                            // console.log("DK_Trace -- getTooltip.ISigData.values: ", datas)
                            let tooltip = ''
                            if(datas.length > 0) {
                                datas.forEach(data => {
                                    tooltip += '신호제어기 ' + data.intersectionNm
                                })
                            }
                            return tooltip
                        }}
                    />
                </XcInteractions>
                <XcOverlays>
                    <overlay.OverlayComponent<ICctvData>
                        ref={cctvOverlayRef}
                        mapId={id.current}
                        layerName={'cctvMarker'}
                        PopupContent={PopupContent}
                        additionalProps={
                            {
                                callback: () => {
                                    console.log('additionalProps')
                                }
                            } as IPopupContent<ICctvData>
                        }
                        onHideCallback={() => {
                            cctvMarkerSelectRef.current && cctvMarkerSelectRef.current.deSelect()
                        }}
                    />
                </XcOverlays>

                <button onClick={changeSigMarkerLayerVisibleTest}>신호제어기 visible 테스트</button>
                <button onClick={changeCctvMarkerLayerVisibleTest}>CCTV visible 테스트</button>
                <button onClick={setMarkerPositionTest}>마커이동 테스트</button>
                <button onClick={setMarkerStyleTest1}>Set Marker Style Test</button>
                <button onClick={setMarkerStyleTest2}>Set Marker Style Test</button>
                <button onClick={setDefaultValueTest}>Set DefaultValue Test</button>
                <button onClick={setVworldTypeTest}>Set VworldType Test</button>
                <button onClick={setZoomLevelTest}>setZoomLevelTest Test</button>
                <button onClick={setZoomLevelTypeTest}>setZoomLevelTypeTest Test</button>
                <button onClick={setDisabledTest}>setDisabledTest Test</button>
                <button onClick={animateMoveTest}>animateMoveTest Test</button>
                <button onClick={setTestTest}>setTestTest</button>
                <button onClick={setHeadingTest}>Set Heading Test</button>
                <button onClick={setCoordinateTest}>Set Coordinate Test</button>
            </XcMap>
            {test && (
                <div style={{height: '500px', width: '1000px'}}>
                    <XcMap
                        mapId={id2.current}
                        xcMapOption={xcMapOption}
                        events={[]}
                    >
                        <XcLayers>
                            <layer.Xyz
                                url={vworldUrl}
                                mapId={id2.current}
                                layerName={'vworldLayer'}
                            />

                            <layer.Minimap
                                mapId={id2.current}
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
                                mapId={id2.current}
                                featureName={'sig'}
                                status={status}
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
            )}
        </div>
    )

}


export default MarkerSample;

const sigDummyData:ISigData[] = [
    {
        "sigId": "213",
        "intersectionId": "INTERS00003000",
        "intersectionNm": "시흥시교차로#03",
        "commIp": "",
        "commPort": 80,
        "modelNm": "",
        "instlYy": "",
        "longitude": 126.720791,
        "latitude": 37.356544,
        "heading": 0.0,
        "spatYn": "N",
        "regDt": "2024-05-10 14:26:05",
        "regUserId": "adcp"
    },
    {
        "sigId": "SIGLA00200",
        "intersectionId": "INTERS00024000",
        "intersectionNm": "시흥시교차로#24",
        "commIp": "151.121.900.524",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.720791,
        "latitude": 37.356544,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLB00200",
        "intersectionId": "INTERS00025000",
        "intersectionNm": "시흥시교차로#25",
        "commIp": "151.121.900.525",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.720145,
        "latitude": 37.361915,
        "heading": 30.5,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLB00300",
        "intersectionId": "INTERS00026000",
        "intersectionNm": "시흥시교차로#26",
        "commIp": "151.121.900.526",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.72385,
        "latitude": 37.359664,
        "heading": 30.5,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLC00100",
        "intersectionId": "INTERS00027000",
        "intersectionNm": "시흥시교차로#27",
        "commIp": "151.121.900.527",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.725068,
        "latitude": 37.366836,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLC00200",
        "intersectionId": "INTERS00028000",
        "intersectionNm": "시흥시교차로#28",
        "commIp": "151.121.900.528",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.727227,
        "latitude": 37.365549,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLC00300",
        "intersectionId": "INTERS00029000",
        "intersectionNm": "시흥시교차로#29",
        "commIp": "151.121.900.529",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.72847,
        "latitude": 37.36478,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLC00400",
        "intersectionId": "INTERS00030000",
        "intersectionNm": "시흥시교차로#30",
        "commIp": "151.121.900.530",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.72963,
        "latitude": 37.364075,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLC00500",
        "intersectionId": "INTERS00031000",
        "intersectionNm": "시흥시교차로#31",
        "commIp": "151.121.900.531",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.734237,
        "latitude": 37.361239,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGLD00100",
        "intersectionId": "INTERS00032000",
        "intersectionNm": "시흥시교차로#32",
        "commIp": "151.121.900.532",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.724554,
        "latitude": 37.373781,
        "heading": 30.4,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRA00100",
        "intersectionId": "INTERS00001000",
        "intersectionNm": "시흥시교차로#01",
        "commIp": "151.121.900.501",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.7045,
        "latitude": 37.351823,
        "heading": 15.0,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRA00300",
        "intersectionId": "INTERS00002000",
        "intersectionNm": "시흥시교차로#02",
        "commIp": "151.121.900.502",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.709858,
        "latitude": 37.36308,
        "heading": 60.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRA00500",
        "intersectionId": "INTERS00003000",
        "intersectionNm": "시흥시교차로#03",
        "commIp": "151.121.900.503",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.727057,
        "latitude": 37.381643,
        "heading": 60.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRA00800",
        "intersectionId": "INTERS00004000",
        "intersectionNm": "시흥시교차로#04",
        "commIp": "151.121.900.504",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.737501,
        "latitude": 37.383947,
        "heading": 30.3,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRB00100",
        "intersectionId": "INTERS00009000",
        "intersectionNm": "시흥시교차로#09",
        "commIp": "151.121.900.509",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.714313,
        "latitude": 37.360399,
        "heading": 60.5,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRB00300",
        "intersectionId": "INTERS00010000",
        "intersectionNm": "시흥시교차로#10",
        "commIp": "151.121.900.510",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.718425,
        "latitude": 37.362928,
        "heading": 60.4,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRB00500",
        "intersectionId": "INTERS00011000",
        "intersectionNm": "시흥시교차로#11",
        "commIp": "151.121.900.511",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.723182,
        "latitude": 37.367951,
        "heading": 60.4,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRB00700",
        "intersectionId": "INTERS00012000",
        "intersectionNm": "시흥시교차로#12",
        "commIp": "151.121.900.512",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.727171,
        "latitude": 37.37221,
        "heading": 30.4,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRB00800",
        "intersectionId": "INTERS00013000",
        "intersectionNm": "시흥시교차로#13",
        "commIp": "151.121.900.513",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.728992,
        "latitude": 37.374126,
        "heading": 60.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRB00900",
        "intersectionId": "INTERS00014000",
        "intersectionNm": "시흥시교차로#14",
        "commIp": "151.121.900.514",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.730601,
        "latitude": 37.375888,
        "heading": 60.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRC00100",
        "intersectionId": "INTERS00005000",
        "intersectionNm": "시흥시교차로#05",
        "commIp": "151.121.900.505",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.711462,
        "latitude": 37.352561,
        "heading": 60.6,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRC00200",
        "intersectionId": "INTERS00006000",
        "intersectionNm": "시흥시교차로#06",
        "commIp": "151.121.900.506",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.715365,
        "latitude": 37.354977,
        "heading": 44.7,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRC00300",
        "intersectionId": "INTERS00007000",
        "intersectionNm": "시흥시교차로#07",
        "commIp": "151.121.900.507",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.718317,
        "latitude": 37.358015,
        "heading": 30.4,
        "spatYn": "Y",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRC00400",
        "intersectionId": "INTERS00008000",
        "intersectionNm": "시흥시교차로#08",
        "commIp": "151.121.900.508",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.721767,
        "latitude": 37.36095,
        "heading": 30.5,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRD00100",
        "intersectionId": "INTERS00015000",
        "intersectionNm": "시흥시교차로#15",
        "commIp": "151.121.900.515",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.723153,
        "latitude": 37.355077,
        "heading": 60.3,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRD00200",
        "intersectionId": "INTERS00016000",
        "intersectionNm": "시흥시교차로#16",
        "commIp": "151.121.900.516",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.724783,
        "latitude": 37.356753,
        "heading": 60.3,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRD00300",
        "intersectionId": "INTERS00017000",
        "intersectionNm": "시흥시교차로#17",
        "commIp": "151.121.900.517",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.726195,
        "latitude": 37.358214,
        "heading": 60.3,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRD00400",
        "intersectionId": "INTERS00018000",
        "intersectionNm": "시흥시교차로#18",
        "commIp": "151.121.900.518",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.726768,
        "latitude": 37.358798,
        "heading": 60.3,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRD00500",
        "intersectionId": "INTERS00019000",
        "intersectionNm": "시흥시교차로#19",
        "commIp": "151.121.900.519",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.729018,
        "latitude": 37.361124,
        "heading": 60.3,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRD00600",
        "intersectionId": "INTERS00020000",
        "intersectionNm": "시흥시교차로#20",
        "commIp": "151.121.900.520",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.73103,
        "latitude": 37.363206,
        "heading": 30.4,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRE00100",
        "intersectionId": "INTERS00021000",
        "intersectionNm": "시흥시교차로#21",
        "commIp": "151.121.900.521",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.735525,
        "latitude": 37.360377,
        "heading": 60.2,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRE00300",
        "intersectionId": "INTERS00022000",
        "intersectionNm": "시흥시교차로#22",
        "commIp": "151.121.900.522",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.737015,
        "latitude": 37.362571,
        "heading": 60.2,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    },
    {
        "sigId": "SIGRE00400",
        "intersectionId": "INTERS00023000",
        "intersectionNm": "시흥시교차로#23",
        "commIp": "151.121.900.523",
        "commPort": 999,
        "modelNm": "MODELV01",
        "instlYy": "2023",
        "longitude": 126.737843,
        "latitude": 37.363844,
        "heading": 60.2,
        "spatYn": "N",
        "regDt": "2023-09-25 00:00:00",
        "regUserId": "UTINFO"
    }
]
const cctvDummyData:ICctvData[] = [
    {
        "cctvId": "1234abcd",
        "maker": "",
        "model": "",
        "instlLc": "",
        "instlDt": "2024-05-07",
        "longitude": 126.734227,
        "latitude": 37.365489,
        "ctrlIpAdres": "",
        "ctrlPort": 80,
        "ctrlId": "asdasd",
        "ctrlPswd": "",
        "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp\u0003",
        "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
        "ptzSpd": 0,
        "presetYn": "N",
        "regUserId": "adcp",
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV0002",
        "maker": "HanWha",
        "makerNm": "한화테크윈",
        "model": "XNP-6321H",
        "instlLc": "플랫폼테스트",
        "instlDt": "2023-08-26",
        "longitude": 126.725849,
        "latitude": 37.367386,
        "ctrlIpAdres": "121.137.95.45",
        "ctrlPort": 80,
        "ctrlId": "admin",
        "ctrlPswd": "admin123!",
        "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp",
        "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
        "ptzSpd": 0,
        "presetYn": "N",
        "commSttus": "01",
        "colctDt": 1710401115000,
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV0003",
        "maker": "HanWha",
        "makerNm": "한화테크윈",
        "model": "XNP-6321H",
        "instlLc": "플랫폼테스트",
        "instlDt": "2023-08-27",
        "longitude": 126.718707,
        "latitude": 37.363997,
        "ctrlIpAdres": "121.137.95.45",
        "ctrlPort": 80,
        "ctrlId": "admin",
        "ctrlPswd": "admin123!",
        "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp",
        "hlsUrl": "http://59.27.229.203:1935/live/DCCTV_029.stream/playlist.m3u8",
        "ptzSpd": 1,
        "presetYn": "N",
        "colctDt": 1710401116000,
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV0004",
        "maker": "HanWha",
        "makerNm": "한화테크윈",
        "model": "XNP-6321H",
        "instlLc": "플랫폼테스트",
        "instlDt": "2023-08-28",
        "longitude": 126.725836,
        "latitude": 37.371198,
        "ctrlIpAdres": "121.137.95.45",
        "ctrlPort": 80,
        "ctrlId": "admin",
        "ctrlPswd": "admin123!",
        "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp",
        "hlsUrl": "http://58.232.33.232:1935/live/CTN2902_l.stream/playlist.m3u8",
        "ptzSpd": 1,
        "presetYn": "Y",
        "commSttus": "01",
        "colctDt": 1710401116000,
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV0005",
        "maker": "HanWha",
        "makerNm": "한화테크윈",
        "model": "SI-2037P",
        "instlLc": "플랫폼테스트",
        "instlDt": "2023-08-28",
        "longitude": 126.721037,
        "latitude": 37.367949,
        "ctrlIpAdres": "121.137.106.145",
        "ctrlPort": 38080,
        "ctrlId": "admin",
        "ctrlPswd": "admin123$%^",
        "rtspUrl": "rtsp://admin:admin123$%^@192.168.10.160:554/profile1/media.smp",
        "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
        "ptzSpd": 44,
        "presetYn": "Y",
        "colctDt": 1710401131000,
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV0009",
        "maker": "HanWha",
        "makerNm": "한화테크윈",
        "model": "SI-2037P",
        "instlLc": "플랫폼테스트",
        "instlDt": "2023-08-28",
        "longitude": 126.719921,
        "latitude": 37.372986,
        "ctrlIpAdres": "121.137.106.145",
        "ctrlPort": 38080,
        "ctrlId": "admin",
        "ctrlPswd": "admin123$%^",
        "rtspUrl": "rtsp://admin:admin123$%^@121.137.106.145:38554/profile1/media.smp",
        "hlsUrl": "http://58.232.33.232:1935/live/CTN0101_l.stream/playlist.m3u8",
        "ptzSpd": 0,
        "presetYn": "N",
        "colctDt": 1710401115000,
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV0010",
        "maker": "",
        "model": "",
        "instlLc": "테스트 등록01",
        "instlDt": "2024-05-07",
        "longitude": 126.728549,
        "latitude": 37.365086,
        "ctrlIpAdres": "",
        "ctrlPort": 80,
        "ctrlId": "",
        "ctrlPswd": "",
        "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp",
        "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
        "ptzSpd": 0,
        "presetYn": "N",
        "regUserId": "adcp",
        "areaId": 16,
        "areaNm": "테스트베드"
    },
    {
        "cctvId": "CCTV1000",
        "maker": "",
        "model": "",
        "instlLc": "마음대로 입력",
        "instlDt": "2024-05-07",
        "longitude": 126.734227,
        "latitude": 37.365489,
        "ctrlIpAdres": "",
        "ctrlPort": 80,
        "ctrlId": "",
        "ctrlPswd": "",
        "rtspUrl": "rtsp://admin:admin123!@121.137.95.45:1024/h.264/media.smp\u0003",
        "hlsUrl": "http://58.232.33.232:1935/live/CTS5002_l.stream/playlist.m3u8",
        "ptzSpd": 0,
        "presetYn": "N",
        "regUserId": "adcp",
        "areaId": 16,
        "areaNm": "테스트베드"
    }
]
const probeDummyData: IProbeData[] = [
    {
        "probeId": "P209W000627",
        "probeNo": "00무0000",
        "probeNm": "테스트",
        "probeTypeCd": "1",
        "modelNm": "테스트",
        "makingYy": "2023",
        "regDt": "2022-09-21 14:06:00",
        "regUserId": "utinfo",
        "clctDt": "2024-03-21 15:59:36",
        "syncKey": 1711004376026,
        "longitude": 126.724083,
        "latitude": 37.374095,
        "elevation": 30.3,
        "heading": 309.4,
        "transmissionStateCd": "002",
        "speed": 29.9,
        "linkSpeed": 60.0,
        "tcc": "16",
        "brakeBar": "7",
        "linkId": "2240362502",
        "awsId": "565"
    }
]