import { useState, useMemo } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, useXcMapAnimation,
  XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption,
} from 'xc-map'

// ── 3종 장비 아이콘 import ──
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigAbnormal from '../../assets/icons/map/sig_abnormal.svg'
import CctvDefault from '../../assets/icons/map/cctv_default.svg'
import CctvAbnormal from '../../assets/icons/map/cctv_abnormal.svg'
import RsuDefault from '../../assets/icons/map/rsu_default.svg'
import RsuAbnormal from '../../assets/icons/map/rsu_abnormal.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

// 테스트 데이터 타입
interface IAnimDevice {
  id: string
  name: string
  deviceType: 'signal' | 'cctv' | 'rsu'
  status: 'normal' | 'abnormal'
}

const AnimationSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')

  // ── 빌트인 애니메이션 함수 가져오기 ──
  const { getRepeatCircleAnimationProperty, getCircleAnimationProperty } =
    useXcMapAnimation()

  // ── 지도 설정 ──
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      // ── 3종 장비 스타일 (default / abnormal 아이콘 분리) ──
      'animSignal': {
        type: 'marker',
        event: [
          { status: 'default',  style: { image: { src: SigDefault,  width: 32, height: 32 } } },
          { status: 'abnormal', style: { image: { src: SigAbnormal, width: 32, height: 32 } } },
        ]
      },
      'animCctv': {
        type: 'marker',
        event: [
          { status: 'default',  style: { image: { src: CctvDefault,  width: 32, height: 32 } } },
          { status: 'abnormal', style: { image: { src: CctvAbnormal, width: 32, height: 32 } } },
        ]
      },
      'animRsu': {
        type: 'marker',
        event: [
          { status: 'default',  style: { image: { src: RsuDefault,  width: 32, height: 32 } } },
          { status: 'abnormal', style: { image: { src: RsuAbnormal, width: 32, height: 32 } } },
        ]
      },
    },
    // ── Animation 스타일 등록 ──
    animationStyle: {
      'blueRepeatCircleWave': getRepeatCircleAnimationProperty,
      'redCircleWave': getCircleAnimationProperty,
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  // ── Animation 테스트용 GeoJSON 데이터 (3종 장비, 각 type별 abnormal 1개씩) ──
  const animGeoJsonData = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: [
      // 신호제어기 (signal)
      { type: 'Feature' as const, id: 'AS1', geometry: { type: 'Point' as const, coordinates: [126.7265, 37.3658] }, properties: { id: 'AS1', name: '정왕동 교차로 신호기', deviceType: 'signal', status: 'normal' } },
      { type: 'Feature' as const, id: 'AS2', geometry: { type: 'Point' as const, coordinates: [126.7340, 37.3670] }, properties: { id: 'AS2', name: '배곧 교차로 신호기', deviceType: 'signal', status: 'abnormal' } },
      { type: 'Feature' as const, id: 'AS3', geometry: { type: 'Point' as const, coordinates: [126.7230, 37.3610] }, properties: { id: 'AS3', name: '목감 교차로 신호기', deviceType: 'signal', status: 'normal' } },
      // CCTV
      { type: 'Feature' as const, id: 'AC1', geometry: { type: 'Point' as const, coordinates: [126.7200, 37.3645] }, properties: { id: 'AC1', name: 'CCTV 정왕동', deviceType: 'cctv', status: 'normal' } },
      { type: 'Feature' as const, id: 'AC2', geometry: { type: 'Point' as const, coordinates: [126.7370, 37.3640] }, properties: { id: 'AC2', name: 'CCTV 배곧', deviceType: 'cctv', status: 'abnormal' } },
      // RSU
      { type: 'Feature' as const, id: 'AR1', geometry: { type: 'Point' as const, coordinates: [126.7315, 37.3590] }, properties: { id: 'AR1', name: 'RSU 시흥대학', deviceType: 'rsu', status: 'normal' } },
      { type: 'Feature' as const, id: 'AR2', geometry: { type: 'Point' as const, coordinates: [126.7280, 37.3680] }, properties: { id: 'AR2', name: 'RSU 배곧생명', deviceType: 'rsu', status: 'abnormal' } },
    ],
  }), [])

  return (
    <div className="sample-page">
      <h2>마커 애니메이션 (GeoJson) — 3종 장비</h2>
      <p className="description">
        GeoJson 레이어에서 <code>getAnimationName</code> + <code>getAnimationData</code> 콜백으로
        3종 장비(신호제어기, CCTV, RSU)에 각각 다른 애니메이션을 적용합니다.<br/>
        <strong>신호제어기(abnormal)</strong> → 빨간색 확산 소멸 (<code>redCircleWave</code>)<br/>
        <strong>CCTV(abnormal)</strong> → 파란색 반복 맥동 (<code>blueRepeatCircleWave</code>)<br/>
        <strong>RSU(abnormal)</strong> → 녹색 반복 맥동 (<code>blueRepeatCircleWave</code> + <code>getAnimationData</code> 오버라이드)<br/>
        정상 장비 → 애니메이션 없음
      </p>

      <div className="map-container" style={{ height: 500 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />

              {/* ━━━ Animation GeoJson 레이어 (3종 장비, type별 다른 애니메이션) ━━━ */}
              <layer.GeoJson<IAnimDevice>
                xcMap={xcMap}
                layerName="animDevices"
                layerTag="animDeviceGroup"
                data={animGeoJsonData}
                pkField="id"
                getFeatureName={(props) => {
                  if (props.deviceType === 'signal') return 'animSignal'
                  if (props.deviceType === 'cctv') return 'animCctv'
                  return 'animRsu'
                }}
                getStatusInfo={(id) => {
                  const features = animGeoJsonData.features;
                  const f = features.find(f => f.properties.id === id);
                  return f?.properties.status === 'abnormal'
                    ? { getStatusInfo: () => 'abnormal' } as any
                    : undefined;
                }}
                getAnimationName={(props) => {
                  if (props.status !== 'abnormal') return undefined;
                  // type별 다른 애니메이션
                  if (props.deviceType === 'signal') return 'redCircleWave'
                  if (props.deviceType === 'cctv') return 'blueRepeatCircleWave'
                  if (props.deviceType === 'rsu') return 'blueRepeatCircleWave'
                  return undefined;
                }}
                getAnimationData={(props) => {
                  // RSU는 파라미터 오버라이드: 녹색 맥동
                  if (props.deviceType === 'rsu') return { color: 'rgb(0,200,120)', speed: 0.3 }
                  return undefined;
                }}
                visible={true}
                zIndex={15}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="animDevices"
                layerTag="animDeviceGroup"
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
        title="GeoJson + getAnimationName + getAnimationData 사용법"
        code={[
          "import { useXcMapAnimation } from 'xc-map'",
          "",
          "// 1. 빌트인 애니메이션 함수 가져오기",
          "const { getRepeatCircleAnimationProperty, getCircleAnimationProperty }",
          "  = useXcMapAnimation()",
          "",
          "// 2. xcMapOption에 featureStyle + animationStyle 등록",
          "const xcMapOption: IXcMapOption = {",
          "  featureStyle: {",
          "    'animSignal': { type: 'marker', event: [",
          "      { status: 'default',  style: { image: { src: SigDefault, ... } } },",
          "      { status: 'abnormal', style: { image: { src: SigAbnormal, ... } } },",
          "    ]},",
          "    'animCctv': { ... },",
          "    'animRsu': { ... },",
          "  },",
          "  animationStyle: {",
          "    'blueRepeatCircleWave': getRepeatCircleAnimationProperty,",
          "    'redCircleWave': getCircleAnimationProperty,",
          "  },",
          "}",
          "",
          "// 3. GeoJson에서 type별 애니메이션 + 파라미터 오버라이드",
          "<layer.GeoJson<IDevice>",
          "  getFeatureName={(props) => {",
          "    if (props.deviceType === 'signal') return 'animSignal'",
          "    if (props.deviceType === 'cctv') return 'animCctv'",
          "    return 'animRsu'",
          "  }}",
          "  getAnimationName={(props) => {",
          "    if (props.status !== 'abnormal') return undefined",
          "    if (props.deviceType === 'signal') return 'redCircleWave'",
          "    if (props.deviceType === 'cctv') return 'blueRepeatCircleWave'",
          "    if (props.deviceType === 'rsu') return 'blueRepeatCircleWave'",
          "    return undefined",
          "  }}",
          "  getAnimationData={(props) => {",
          "    // RSU는 녹색 맥동으로 오버라이드",
          "    if (props.deviceType === 'rsu') return { color: 'rgb(0,200,120)' }",
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
            <td>Feature별 파라미터 오버라이드 (색상/속도/크기 등). RSU 녹색 맥동 등 동일 함수에 다른 색상 적용 가능.</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>장비별 애니메이션 매핑</h3>
      <table className="props-table">
        <thead><tr><th>장비</th><th>상태</th><th>아이콘</th><th>애니메이션</th><th>색상</th></tr></thead>
        <tbody>
          <tr><td>신호제어기</td><td>abnormal</td><td>sig_abnormal.svg</td><td>redCircleWave</td><td>🔴 빨강</td></tr>
          <tr><td>CCTV</td><td>abnormal</td><td>cctv_abnormal.svg</td><td>blueRepeatCircleWave</td><td>🔵 파랑</td></tr>
          <tr><td>RSU</td><td>abnormal</td><td>rsu_abnormal.svg</td><td>blueRepeatCircleWave + override</td><td>🟢 녹색</td></tr>
          <tr><td>정상 장비</td><td>normal</td><td>*_default.svg</td><td>없음</td><td>-</td></tr>
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
