import { useEffect, useRef, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption, IMarker,
} from 'xc-map'

import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigSelected from '../../assets/icons/map/sig_selected.svg'
import SigAbnormal from '../../assets/icons/map/sig_abnormal.svg'
import CctvDefault from '../../assets/icons/map/cctv_default.svg'
import CctvSelected from '../../assets/icons/map/cctv_selected.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

interface ISigData {
  sigId: string; intersectionNm: string; longitude: number; latitude: number;
}

const MarkerSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')
  const [visible, setVisible] = useState(true)

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'sig': {
        type: 'marker',
        event: [
          { status: 'default', style: { image: { height: 30, width: 30, src: SigDefault } } },
          { status: 'selected', style: { image: { height: 30, width: 30, src: SigSelected } } },
          { status: 'abnormal', style: { image: { height: 30, width: 30, src: SigAbnormal } } },
        ],
      },
      'cctv': {
        type: 'marker',
        event: [
          { status: 'default', style: { image: { height: 30, width: 30, src: CctvDefault } } },
          { status: 'selected', style: { image: { height: 45, width: 45, src: CctvSelected } } },
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  const sigMarkers: IMarker<ISigData>[] = [
    { id: 'SIG001', type: 'marker', featureName: 'sig', status: 'default', label: '시흥시교차로#01',
      value: { sigId: 'SIG001', intersectionNm: '시흥시교차로#01', longitude: 126.731, latitude: 37.363 },
      coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'SIG002', type: 'marker', featureName: 'sig', status: 'default', label: '시흥시교차로#02',
      value: { sigId: 'SIG002', intersectionNm: '시흥시교차로#02', longitude: 126.735, latitude: 37.365 },
      coordinate: { longitude: 126.735, latitude: 37.365 } },
    { id: 'SIG003', type: 'marker', featureName: 'sig', status: 'abnormal', label: '시흥시교차로#03 (이상)',
      value: { sigId: 'SIG003', intersectionNm: '시흥시교차로#03', longitude: 126.728, latitude: 37.361 },
      coordinate: { longitude: 126.728, latitude: 37.361 } },
    { id: 'CCTV001', type: 'marker', featureName: 'cctv', status: 'default',
      value: { sigId: 'CCTV001', intersectionNm: 'CCTV #1', longitude: 126.725, latitude: 37.360 },
      coordinate: { longitude: 126.725, latitude: 37.360 } },
    { id: 'CCTV002', type: 'marker', featureName: 'cctv', status: 'default',
      value: { sigId: 'CCTV002', intersectionNm: 'CCTV #2', longitude: 126.733, latitude: 37.367 },
      coordinate: { longitude: 126.733, latitude: 37.367 } },
  ]

  return (
    <div className="sample-page">
      <h2>마커 레이어</h2>
      <p className="description">
        layer.Marker로 아이콘 마커를 표시합니다. IMarker 배열을 전달하면 featureName에 매핑된 스타일로 자동 렌더링됩니다.
        신호제어기(sig)와 CCTV(cctv) 두 종류의 마커를 표시합니다.
      </p>

      <div className="control-panel">
        <span className="label">컨트롤</span>
        <button className="btn" onClick={() => setVisible(v => !v)}>
          {visible ? '🔴 마커 숨기기' : '🟢 마커 보이기'}
        </button>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker<ISigData>
                xcMap={xcMap}
                markers={sigMarkers}
                layerName="sigMarker"
                layerTag="sigGroup"
                zIndex={15}
                visible={visible}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect<ISigData>
                xcMap={xcMap}
                layerName="sigMarker"
                layerTag="sigGroup"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                onClick={(featureName, datas, coordinate) => {
                  if (datas.length > 0) {
                    setSelectedInfo(`${(datas[0] as any).intersectionNm} (${featureName})`)
                  }
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">📌 {selectedInfo}</div>}
      </div>

      <CodeBlock
        title="마커 레이어 코드"
        code={`// 마커 데이터 생성
const markers: IMarker<ISigData>[] = [
  {
    id: 'SIG001',
    type: 'marker',
    featureName: 'sig',       // featureStyle에 정의된 이름
    status: 'default',        // 초기 상태
    label: '시흥시교차로#01', // 라벨 (선택)
    value: { ... },           // 사용자 데이터
    coordinate: {
      longitude: 126.731,
      latitude: 37.363,
    },
  },
]

// 렌더링
<layer.Marker<ISigData>
  xcMap={xcMap}
  markers={markers}
  layerName="sigMarker"
  layerTag="sigGroup"
  zIndex={15}
  visible={true}
/>`}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>IMarker Props</h3>
      <table className="props-table">
        <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>id</td><td>string</td><td>마커 고유 ID</td></tr>
          <tr><td>featureName</td><td>string</td><td>featureStyle 매핑 키</td></tr>
          <tr><td>status</td><td>string</td><td>현재 스타일 상태 (default, selected 등)</td></tr>
          <tr><td>coordinate</td><td>{'{longitude, latitude}'}</td><td>마커 좌표</td></tr>
          <tr><td>label</td><td>string</td><td>마커 라벨 텍스트 (선택)</td></tr>
          <tr><td>value</td><td>T</td><td>사용자 데이터 객체</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default MarkerSample
