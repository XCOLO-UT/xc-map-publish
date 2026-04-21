import { useMemo, useRef, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, toFeatureCollection, IXcMapOption,
  IFeatureTypeStyle,
} from 'xc-map'
import type { Feature } from 'ol'

// 노면표시 아이콘 매핑 (signtype별 SVG)
import icon510 from '../../assets/icons/map/safe_default.svg'
import icon511 from '../../assets/icons/map/safe_caution.svg'
import icon512 from '../../assets/icons/map/safe_regulation.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

// signtype → 아이콘 매핑
const signTypeIconMap: Record<string, string> = {
  '510': icon510, '511': icon511, '512': icon512,
}

// 아이콘 없는 signtype용 Point(원) 스타일
const pointDotStyle: IFeatureTypeStyle = {
  type: 'point',
  event: [
    { status: 'default', style: { radius: 5, fill: { color: '#FF6B6B' }, stroke: { color: '#FFFFFF', width: 1.5 }, zIndex: 15 } },
    { status: 'selected', style: { radius: 8, fill: { color: '#FF4500' }, stroke: { color: '#FFFFFF', width: 2 }, zIndex: 25 } },
  ],
}

// LineString/MultiLineString 스타일
const lineTypeStyle: IFeatureTypeStyle = {
  type: 'polyline',
  event: [
    { status: 'default', style: { stroke: { color: '#FFD700', width: 3 }, zIndex: 10 } },
    { status: 'selected', style: { stroke: { color: '#FF4500', width: 5 }, zIndex: 15 } },
  ],
}

// Feature의 지오메트리/signtype에 따라 동적 스타일 결정
// ★ getFeatureTypeStyle은 (feature: Feature) => IFeatureTypeStyle 시그니처
const resolveFeatureTypeStyle = (feature: Feature): IFeatureTypeStyle | undefined => {
  const props = feature.getProperties()
  const geomType = feature.getGeometry()?.getType()
  const isPointGeom = geomType === 'Point' || geomType === 'MultiPoint'

  if (isPointGeom) {
    const signtype = props.signtype || props.value?.signtype
    const icon = signtype ? signTypeIconMap[signtype] : null
    if (icon) {
      return {
        type: 'marker',
        event: [
          { status: 'default', style: { image: { src: icon, width: 24, height: 24 }, zIndex: 20 } },
          { status: 'selected', style: { image: { src: icon, width: 36, height: 36 }, zIndex: 30 } },
        ],
      }
    }
    return pointDotStyle
  }

  return lineTypeStyle
}

const GeoJsonSample = () => {
  const geoJsonRef = useRef<any>(null)
  const [visible, setVisible] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState('')
  const [featureCount, setFeatureCount] = useState<number | null>(null)

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 17, maxZoom: 21 },
    featureStyle: {
      'surfacemark': {
        type: 'polyline',
        event: [
          { status: 'default', style: { stroke: { color: '#FFD700', width: 3 } } },
          { status: 'selected', style: { stroke: { color: '#FF4500', width: 5 } } },
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  const [rawData, setRawData] = useState<any[]>([])
  useMemo(() => {
    fetch('/data/temp.json')
      .then(r => r.json())
      .then(data => setRawData(data))
      .catch(() => setRawData([]))
  }, [])

  const geoJsonData = useMemo(() => {
    if (!rawData.length) return null
    return toFeatureCollection(rawData, { geomField: 'geom', idField: 'id' })
  }, [rawData])

  const handleGetFeatures = () => {
    const features = geoJsonRef.current?.getFeatures?.()
    setFeatureCount(features?.length ?? 0)
  }

  return (
    <div className="sample-page">
      <h2>GeoJSON 레이어</h2>
      <p className="description">
        layer.GeoJson으로 표준 GeoJSON 데이터를 렌더링합니다.
        toFeatureCollection 유틸로 프로젝트 데이터를 변환하고,
        getFeatureTypeStyle로 지오메트리 타입별 동적 스타일을 적용합니다.
        현재 {rawData.length}건의 노면표시 데이터(Point + MultiLineString 혼합)를 표시합니다.
      </p>

      <div className="control-panel">
        <span className="label">컨트롤</span>
        <button className="btn" onClick={() => setVisible(v => !v)}>
          {visible ? '🔴 숨기기' : '🟢 보이기'}
        </button>
        <button className="btn" onClick={handleGetFeatures}>
          📊 Feature 수 확인
        </button>
        <button className="btn" onClick={() => geoJsonRef.current?.refresh?.()}>
          🔄 Refresh
        </button>
        {featureCount !== null && (
          <span style={{ color: 'var(--accent-green)', fontSize: 13 }}>
            총 {featureCount}개
          </span>
        )}
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              {geoJsonData && (
                <layer.GeoJson
                  ref={geoJsonRef}
                  xcMap={xcMap}
                  layerName="surfacemark"
                  layerTag="surfacemarkGroup"
                  data={geoJsonData}
                  pkField="id"
                  featureName="surfacemark"
                  getFeatureTypeStyle={resolveFeatureTypeStyle}
                  getRotation={(props: any) => props.angle ? Number(props.angle) : 0}
                  visible={visible}
                  zIndex={10}
                />
              )}
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="surfacemark"
                layerTag="surfacemarkGroup"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                getFeatureTypeStyle={resolveFeatureTypeStyle}
                onClick={(featureName, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`[${d.signtype || 'N/A'}] ${d.signtypenm || d.id}`)
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
        title="GeoJSON 레이어 핵심 코드"
        code={`import { toFeatureCollection } from 'xc-map'

// 1. 데이터 변환
const geoJsonData = toFeatureCollection(rawData, {
  geomField: 'geom',    // WKT 또는 GeoJSON geometry 필드명
  idField: 'id',        // PK 필드명
})

// 2. 동적 스타일 함수 ★ (feature: Feature) 시그니처
const resolveStyle = (feature: Feature) => {
  const geomType = feature.getGeometry()?.getType()
  if (geomType === 'Point') {
    return { type: 'marker', event: [...] }
  }
  return { type: 'polyline', event: [...] }
}

// 3. 렌더링
<layer.GeoJson
  ref={geoJsonRef}
  xcMap={xcMap}
  layerName="surfacemark"
  data={geoJsonData}
  pkField="id"
  featureName="surfacemark"
  getFeatureTypeStyle={resolveStyle}
  getRotation={(props) => Number(props.angle) || 0}
  visible={true}
  zIndex={10}
/>

// 4. Imperative API
geoJsonRef.current.getFeatures()  // Feature 목록
geoJsonRef.current.refresh()      // 데이터 새로고침
geoJsonRef.current.clearLabels()  // 라벨 제거`}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>GeoJson Props</h3>
      <table className="props-table">
        <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>data</td><td>FeatureCollection</td><td>GeoJSON FeatureCollection 객체</td></tr>
          <tr><td>pkField</td><td>string</td><td>Feature ID로 사용할 properties 필드명</td></tr>
          <tr><td>featureName</td><td>string</td><td>featureStyle 매핑 키 (폴백 스타일)</td></tr>
          <tr><td>getFeatureTypeStyle</td><td>(feature: Feature) =&gt; IFeatureTypeStyle</td><td>Feature별 동적 스타일 반환 함수</td></tr>
          <tr><td>getRotation</td><td>(props) =&gt; number</td><td>Feature 회전각(degree) 반환</td></tr>
          <tr><td>renderLabel</td><td>(feature) =&gt; ReactNode</td><td>Feature 위에 React 라벨 렌더링</td></tr>
          <tr><td>labelOffset</td><td>[number, number]</td><td>라벨 오프셋 [x, y] 픽셀</td></tr>
          <tr><td>dataProjection</td><td>string</td><td>데이터 좌표계 (기본: EPSG:4326)</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default GeoJsonSample
