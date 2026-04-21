import { useRef, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption,
} from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

type MeasureType = '' | 'LineString' | 'Polygon' | 'Circle'

const BasicMeasureSample = () => {
  const measurementRef = useRef<any>(null)
  const [measureType, setMeasureType] = useState<MeasureType>('')
  const [isMeasuring, setIsMeasuring] = useState(false)
  const [clearPrevious, setClearPrevious] = useState(false)
  const [showSegment, setShowSegment] = useState(true)

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {},
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  const handleMeasure = (type: MeasureType) => {
    setMeasureType(type)
    measurementRef.current?.setMeasureType?.(type)
  }

  return (
    <div className="sample-page">
      <h2>거리 측정</h2>
      <p className="description">
        interaction.Measurement로 지도 위에 거리, 면적, 반경을 측정합니다.
        setMeasureType으로 측정 모드를 전환하고, 측정 결과는 지도 위에 팝업으로 표시됩니다.
      </p>

      <div className="control-panel">
        <span className="label">측정 모드</span>
        <div className="toggle-group">
          <button
            className={`toggle-item${measureType === 'LineString' ? ' active' : ''}`}
            onClick={() => handleMeasure('LineString')}
          >📏 거리</button>
          <button
            className={`toggle-item${measureType === 'Polygon' ? ' active' : ''}`}
            onClick={() => handleMeasure('Polygon')}
          >📐 면적</button>
          <button
            className={`toggle-item${measureType === 'Circle' ? ' active' : ''}`}
            onClick={() => handleMeasure('Circle')}
          >⭕ 반경</button>
        </div>
        <button className="btn danger" onClick={() => {
          handleMeasure('')
          measurementRef.current?.clearAllMeasurements?.()
        }}>🗑️ 초기화</button>
        <button
          className={`btn${clearPrevious ? ' active' : ''}`}
          onClick={() => setClearPrevious(v => !v)}
        >이전 삭제: {clearPrevious ? 'ON' : 'OFF'}</button>
        <button
          className={`btn${showSegment ? ' active' : ''}`}
          onClick={() => setShowSegment(v => !v)}
        >구간 표시: {showSegment ? 'ON' : 'OFF'}</button>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
            </XcLayers>
            <XcInteractions>
              <interaction.Measurement
                ref={measurementRef}
                xcMap={xcMap}
                isClearPreviousMeasure={clearPrevious}
                isShowSegmentLength={showSegment}
                isShowPopupUI={true}
                onDrawEnd={() => console.log('측정 완료')}
                onMeasurementActiveChange={setIsMeasuring}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {isMeasuring && <div className="status-bar">📐 측정 중... 더블클릭으로 완료</div>}
      </div>

      <CodeBlock
        title="Measurement 코드"
        code={`const measurementRef = useRef<IMeasurementApis>(null)

<interaction.Measurement
  ref={measurementRef}
  xcMap={xcMap}
  isClearPreviousMeasure={false}     // 이전 측정 자동 삭제
  isShowSegmentLength={true}         // 구간별 거리 표시
  isShowPopupUI={true}               // 측정 결과 팝업
  onDrawEnd={() => console.log('완료')}
  onMeasurementActiveChange={(active) => {}}
/>

// Imperative API
measurementRef.current.setMeasureType('LineString')
measurementRef.current.setMeasureType('Polygon')
measurementRef.current.setMeasureType('Circle')
measurementRef.current.setMeasureType('')  // 비활성화
measurementRef.current.clearAllMeasurements()`}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Measurement Props</h3>
      <table className="props-table">
        <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>isClearPreviousMeasure</td><td>boolean</td><td>새 측정 시 이전 결과 자동 삭제</td></tr>
          <tr><td>isShowSegmentLength</td><td>boolean</td><td>구간별 거리 표시 여부</td></tr>
          <tr><td>isShowPopupUI</td><td>boolean</td><td>측정 결과 팝업 표시</td></tr>
          <tr><td>measurementStyles</td><td>object</td><td>커스텀 측정 스타일</td></tr>
          <tr><td>renderPopup</td><td>function</td><td>커스텀 팝업 렌더링 함수</td></tr>
          <tr><td>popupOrderConfig</td><td>IPopupOrderConfig</td><td>팝업 z-index 순서 설정</td></tr>
          <tr><td>onDrawEnd</td><td>() =&gt; void</td><td>측정 완료 콜백</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default BasicMeasureSample
