import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption, IMarker,
} from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigSelected from '../../assets/icons/map/sig_selected.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const LayerCommonSample = () => {
  const [visible, setVisible] = useState(true)
  const [zIndex, setZIndex] = useState(15)
  const [minZoom, setMinZoom] = useState(13)

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
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  const markers: IMarker<any>[] = [
    { id: 'S1', type: 'marker', featureName: 'sig', status: 'default',
      value: {}, coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'S2', type: 'marker', featureName: 'sig', status: 'default',
      value: {}, coordinate: { longitude: 126.735, latitude: 37.365 } },
    { id: 'S3', type: 'marker', featureName: 'sig', status: 'default',
      value: {}, coordinate: { longitude: 126.728, latitude: 37.361 } },
  ]

  return (
    <div className="sample-page">
      <h2>레이어 공통 기능</h2>
      <p className="description">
        모든 레이어에서 공통으로 사용되는 visible, minZoom, maxZoom, zIndex 속성을 제어합니다.
        줌 레벨을 변경하여 minZoom/maxZoom 동작을 확인해보세요.
      </p>

      <div className="control-panel">
        <button className="btn" onClick={() => setVisible(v => !v)}>
          {visible ? '🔴 숨기기' : '🟢 보이기'}
        </button>
        <span className="label">zIndex</span>
        <div className="toggle-group">
          {[5, 10, 15, 20].map(z => (
            <button key={z} className={`toggle-item${zIndex === z ? ' active' : ''}`}
              onClick={() => setZIndex(z)}>{z}</button>
          ))}
        </div>
        <span className="label">minZoom</span>
        <div className="toggle-group">
          {[7, 10, 13, 16].map(z => (
            <button key={z} className={`toggle-item${minZoom === z ? ' active' : ''}`}
              onClick={() => setMinZoom(z)}>{z}</button>
          ))}
        </div>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}
            getZoomLevel={(level) => {}}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker
                xcMap={xcMap} markers={markers} layerName="commonTest" layerTag="commonTag"
                zIndex={zIndex} visible={visible} minZoom={minZoom} maxZoom={20}
              />
            </XcLayers>
          </XcMap>
        </div>
      </div>

      <CodeBlock title="공통 속성" code={`<layer.Marker
  visible={true}     // 레이어 표시/숨김
  minZoom={13}       // 최소 줌 레벨 (이하면 숨김)
  maxZoom={20}       // 최대 줌 레벨
  zIndex={15}        // 레이어 렌더링 순서
/>`} />
    </div>
  )
}

export default LayerCommonSample
