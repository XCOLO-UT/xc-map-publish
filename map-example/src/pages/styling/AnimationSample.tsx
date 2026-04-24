import { useState, useMemo } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, useXcMapAnimation,
  XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption,
} from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigAbnormal from '../../assets/icons/map/sig_abnormal.svg'
import CctvDefault from '../../assets/icons/map/cctv_default.svg'
import RsuDefault from '../../assets/icons/map/rsu_default.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

// 테스트 데이터 타입
interface IDevice {
  id: string
  name: string
  deviceType: 'signal' | 'cctv' | 'rsu'
  status: 'normal' | 'abnormal'
  lng: number
  lat: number
}

// 3종 장비 혼합 데이터 (signal×3, cctv×2, rsu×1)
const DEVICES: IDevice[] = [
  { id: 'S1', name: '정왕동 교차로',   deviceType: 'signal', status: 'normal',   lng: 126.731, lat: 37.363 },
  { id: 'S2', name: '배곧 교차로',     deviceType: 'signal', status: 'abnormal', lng: 126.735, lat: 37.365 },
  { id: 'S3', name: '목감 교차로',     deviceType: 'signal', status: 'normal',   lng: 126.728, lat: 37.361 },
  { id: 'C1', name: 'CCTV 정왕동',     deviceType: 'cctv',   status: 'normal',   lng: 126.725, lat: 37.360 },
  { id: 'C2', name: 'CCTV 배곧',       deviceType: 'cctv',   status: 'abnormal', lng: 126.733, lat: 37.367 },
  { id: 'R1', name: 'RSU 시흥',        deviceType: 'rsu',    status: 'normal',   lng: 126.729, lat: 37.366 },
]

const AnimationSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')

  // 빌트인 애니메이션 함수 가져오기
  const { getRepeatCircleAnimationProperty, getCircleAnimationProperty } =
    useXcMapAnimation()

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'signal': { type: 'marker', event: [
        { status: 'default',  style: { image: { src: SigDefault,  width: 30, height: 30 } } },
        { status: 'abnormal', style: { image: { src: SigAbnormal, width: 30, height: 30 } } },
      ]},
      'cctv': { type: 'marker', event: [
        { status: 'default', style: { image: { src: CctvDefault, width: 28, height: 28 } } },
      ]},
      'rsu': { type: 'marker', event: [
        { status: 'default', style: { image: { src: RsuDefault, width: 26, height: 26 } } },
      ]},
    },
    // animationStyle 등록 (getAnimationName이 여기서 키를 조회)
    animationStyle: {
      'blueRepeatCircleWave': getRepeatCircleAnimationProperty,
      'redCircleWave': getCircleAnimationProperty,
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  // 장비 데이터를 GeoJSON FeatureCollection으로 변환
  const geoJsonData = useMemo(() => {
    const features = DEVICES.map(d => ({
      type: 'Feature' as const,
      id: d.id,
      geometry: { type: 'Point' as const, coordinates: [d.lng, d.lat] },
      properties: { ...d },
    }))
    return { type: 'FeatureCollection' as const, features }
  }, [])

  return (
    <div className="sample-page">
      <h2>마커 애니메이션 (GeoJson)</h2>
      <p className="description">
        GeoJson 레이어에서 <code>getAnimationName</code> 콜백으로
        Point Feature별 다른 애니메이션을 적용합니다.
        신호제어기(abnormal) → 빨간색 확산 소멸, CCTV(abnormal) → 파란색 반복 맥동, 정상 장비 → 애니메이션 없음.
        <code>animationStyle</code>에 등록된 함수를 <code>getAnimationName</code>의 반환값으로 매칭합니다.
      </p>

      <div className="map-container" style={{ height: 500 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.GeoJson<IDevice>
                xcMap={xcMap}
                layerName="devices"
                layerTag="deviceTag"
                data={geoJsonData}
                pkField="id"
                getFeatureName={(props) => props.deviceType}
                getStatusInfo={(id) => {
                  const d = DEVICES.find(d => d.id === id)
                  return d?.status === 'abnormal'
                    ? { getStatusInfo: () => 'abnormal' } as any
                    : undefined
                }}
                getAnimationName={(props) => {
                  if (props.status !== 'abnormal') return undefined
                  if (props.deviceType === 'signal') return 'redCircleWave'
                  if (props.deviceType === 'cctv') return 'blueRepeatCircleWave'
                  return undefined
                }}
                visible={true}
                zIndex={15}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="devices"
                layerTag="deviceTag"
                useSelectStyle={false}
                isDeselectOnClickAway={true}
                onClick={(fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`${d.name} (${d.deviceType}) - ${d.status}`)
                  }
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">📍 {selectedInfo}</div>}
      </div>

      <CodeBlock
        title="GeoJson + getAnimationName 사용법"
        code={[
          "import { useXcMapAnimation } from 'xc-map'",
          "",
          "// 1. 빌트인 애니메이션 함수 가져오기",
          "const { getRepeatCircleAnimationProperty, getCircleAnimationProperty }",
          "  = useXcMapAnimation()",
          "",
          "// 2. xcMapOption에 animationStyle 등록",
          "const xcMapOption: IXcMapOption = {",
          "  featureStyle: { ... },",
          "  animationStyle: {",
          "    'blueRepeatCircleWave': getRepeatCircleAnimationProperty,",
          "    'redCircleWave': getCircleAnimationProperty,",
          "  },",
          "}",
          "",
          "// 3. GeoJson에서 getAnimationName으로 Feature별 애니메이션 지정",
          "<layer.GeoJson<IDevice>",
          "  getFeatureName={(props) => props.deviceType}",
          "  getAnimationName={(props) => {",
          "    if (props.status !== 'abnormal') return undefined",
          "    if (props.deviceType === 'signal') return 'redCircleWave'",
          "    if (props.deviceType === 'cctv') return 'blueRepeatCircleWave'",
          "    return undefined",
          "  }}",
          "  getAnimationData={(props) => {",
          "    // 개별 Feature 파라미터 오버라이드 (선택)",
          "    if (props.priority === 'high') return { speed: 0.5 }",
          "    return undefined",
          "  }}",
          "/>",
        ].join('\n')}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Animation Props (GeoJson)</h3>
      <table className="props-table">
        <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr>
            <td>getAnimationName</td>
            <td>{'(props: TData) => string | undefined'}</td>
            <td>Feature properties 기반 animationName 반환. animationStyle 키와 매칭.</td>
          </tr>
          <tr>
            <td>getAnimationData</td>
            <td>{'(props: TData) => Partial<IAnimationParams>'}</td>
            <td>Feature별 파라미터 오버라이드 (색상/속도/크기 등).</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Marker vs GeoJson 애니메이션 비교</h3>
      <table className="props-table">
        <thead><tr><th>항목</th><th>Marker 컴포넌트</th><th>GeoJson 컴포넌트</th></tr></thead>
        <tbody>
          <tr>
            <td>애니메이션 지정</td>
            <td>IMarker.animationName</td>
            <td>getAnimationName 콜백</td>
          </tr>
          <tr>
            <td>파라미터 오버라이드</td>
            <td>IMarker.animationData</td>
            <td>getAnimationData 콜백</td>
          </tr>
          <tr>
            <td>대상</td>
            <td>모든 마커</td>
            <td>Point geometry + type=marker만</td>
          </tr>
          <tr>
            <td>혼합 geometry</td>
            <td>❌</td>
            <td>✅ (LineString 등과 혼합 가능)</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AnimationSample
