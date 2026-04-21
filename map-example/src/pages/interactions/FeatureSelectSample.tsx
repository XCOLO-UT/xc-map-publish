import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption, IMarker,
} from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigSelected from '../../assets/icons/map/sig_selected.svg'
import CctvDefault from '../../assets/icons/map/cctv_default.svg'
import CctvSelected from '../../assets/icons/map/cctv_selected.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const FeatureSelectSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')
  const [eventLog, setEventLog] = useState<string[]>([])

  const addLog = (msg: string) => setEventLog(prev => [`${new Date().toLocaleTimeString()} ${msg}`, ...prev].slice(0, 8))

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'sig': {
        type: 'marker',
        event: [
          { status: 'default', style: { image: { height: 30, width: 30, src: SigDefault } } },
          { status: 'selected', style: { image: { height: 35, width: 35, src: SigSelected } } },
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

  const markers: IMarker<any>[] = [
    { id: 'SIG001', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시교차로 #01' }, coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'SIG002', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시교차로 #02' }, coordinate: { longitude: 126.735, latitude: 37.365 } },
    { id: 'SIG003', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '목감교차로' }, coordinate: { longitude: 126.728, latitude: 37.361 } },
    { id: 'CCTV001', type: 'marker', featureName: 'cctv', status: 'default',
      value: { name: 'CCTV 정왕동' }, coordinate: { longitude: 126.725, latitude: 37.360 } },
    { id: 'CCTV002', type: 'marker', featureName: 'cctv', status: 'default',
      value: { name: 'CCTV 배곧' }, coordinate: { longitude: 126.733, latitude: 37.367 } },
  ]

  return (
    <div className="sample-page">
      <h2>Feature 선택</h2>
      <p className="description">
        interaction.FeatureSelect로 지도 위의 Feature를 클릭하여 선택합니다.
        선택 시 useSelectStyle이 true이면 featureStyle의 selected 상태로 자동 전환됩니다.
        onClick, onClickAway, onDeSelect 콜백으로 이벤트를 처리합니다.
      </p>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker
                xcMap={xcMap}
                markers={markers}
                layerName="selectMarker"
                layerTag="selectGroup"
                zIndex={15}
                visible={true}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="selectMarker"
                layerTag="selectGroup"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                isMoveCenterOnClick={false}
                onClick={(featureName, datas, coordinate) => {
                  addLog(`onClick: ${featureName} (${datas.length}건)`)
                  if (datas.length > 0) {
                    setSelectedInfo((datas[0] as any).name)
                  }
                }}
                onClickAway={() => {
                  addLog('onClickAway')
                  setSelectedInfo('')
                }}
                onDeSelect={(id) => {
                  addLog(`onDeSelect: ${id}`)
                }}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">📌 {selectedInfo}</div>}
      </div>

      {/* 이벤트 로그 */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 24,
        maxHeight: 200, overflow: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12,
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>📋 이벤트 로그</div>
        {eventLog.length === 0
          ? <div style={{ color: 'var(--text-muted)' }}>마커를 클릭하면 이벤트가 기록됩니다</div>
          : eventLog.map((log, i) => (
            <div key={i} style={{ color: i === 0 ? 'var(--accent-green)' : 'var(--text-secondary)', padding: '2px 0' }}>
              {log}
            </div>
          ))
        }
      </div>

      <CodeBlock
        title="FeatureSelect 코드"
        code={`<interaction.FeatureSelect<IMyData>
  xcMap={xcMap}
  layerName="selectMarker"
  layerTag="selectGroup"
  useSelectStyle={true}            // selected 스타일 자동 적용
  isDeselectOnClickAway={true}     // 빈 공간 클릭 시 선택 해제
  isMoveCenterOnClick={false}      // 클릭 시 중심 이동
  onClick={(featureName, datas, coordinate) => {
    console.log('선택:', featureName, datas)
  }}
  onClickAway={() => {
    console.log('선택 해제')
  }}
  onDeSelect={(id) => {
    console.log('해제된 ID:', id)
  }}
  onSelectionChange={(layerName, datas, featureName) => {
    console.log('선택 변경:', datas)
  }}
/>`}
      />
    </div>
  )
}

export default FeatureSelectSample
