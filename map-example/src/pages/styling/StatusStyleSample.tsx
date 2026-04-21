import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption, IMarker,
} from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigSelected from '../../assets/icons/map/sig_selected.svg'
import SigAbnormal from '../../assets/icons/map/sig_abnormal.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const StatusStyleSample = () => {
  const [markers, setMarkers] = useState<IMarker<any>[]>([
    { id: 'S1', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '교차로 A' }, coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'S2', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '교차로 B' }, coordinate: { longitude: 126.735, latitude: 37.365 } },
    { id: 'S3', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '교차로 C' }, coordinate: { longitude: 126.728, latitude: 37.361 } },
  ])

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'sig': {
        type: 'marker',
        event: [
          { status: 'default', style: { image: { height: 30, width: 30, src: SigDefault } } },
          { status: 'selected', style: { image: { height: 35, width: 35, src: SigSelected } } },
          { status: 'abnormal', style: { image: { height: 30, width: 30, src: SigAbnormal } } },
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  const setAllStatus = (status: string) => {
    setMarkers(prev => prev.map(m => ({ ...m, status })))
  }

  return (
    <div className="sample-page">
      <h2>상태별 스타일</h2>
      <p className="description">
        IMarker의 status 필드를 변경하면 featureStyle에 정의된 해당 상태의 스타일로 자동 전환됩니다.
        default, selected, abnormal 등 자유롭게 상태를 정의하고 전환할 수 있습니다.
      </p>

      <div className="control-panel">
        <span className="label">전체 상태 변경</span>
        <button className="btn" onClick={() => setAllStatus('default')}>🟢 Default</button>
        <button className="btn" onClick={() => setAllStatus('selected')}>🔵 Selected</button>
        <button className="btn" onClick={() => setAllStatus('abnormal')}>🔴 Abnormal</button>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker xcMap={xcMap} markers={markers} layerName="statusMarker"
                layerTag="statusTag" zIndex={15} visible={true} />
            </XcLayers>
          </XcMap>
        </div>
        <div className="status-bar">현재 상태: {markers[0]?.status}</div>
      </div>

      <CodeBlock title="상태 전환 코드" code={`// status를 변경하면 자동으로 스타일 업데이트
const updateStatus = (markerId: string, newStatus: string) => {
  setMarkers(prev =>
    prev.map(m =>
      m.id === markerId ? { ...m, status: newStatus } : m
    )
  )
}

// 'abnormal' 상태로 변경 → sig_abnormal.svg 아이콘 적용
updateStatus('SIG001', 'abnormal')`} />
    </div>
  )
}

export default StatusStyleSample
