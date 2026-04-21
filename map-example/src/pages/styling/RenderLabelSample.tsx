import { useMemo, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, toFeatureCollection, IXcMapOption,
  IFeatureTypeStyle,
} from 'xc-map'
import type { Feature } from 'ol'

import icon510 from '../../assets/icons/map/safe_default.svg'
import icon511 from '../../assets/icons/map/safe_caution.svg'
import icon512 from '../../assets/icons/map/safe_regulation.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const signTypeIconMap: Record<string, string> = {
  '510': icon510, '511': icon511, '512': icon512,
}

const pointDotStyle: IFeatureTypeStyle = {
  type: 'point',
  event: [
    { status: 'default', style: { radius: 5, fill: { color: '#FF6B6B' }, stroke: { color: '#FFFFFF', width: 1.5 }, zIndex: 15 } },
    { status: 'selected', style: { radius: 8, fill: { color: '#FF4500' }, stroke: { color: '#FFFFFF', width: 2 }, zIndex: 25 } },
  ],
}

const lineTypeStyle: IFeatureTypeStyle = {
  type: 'polyline',
  event: [
    { status: 'default', style: { stroke: { color: '#FFD700', width: 3 }, zIndex: 10 } },
    { status: 'selected', style: { stroke: { color: '#FF4500', width: 5 }, zIndex: 15 } },
  ],
}

// ★ getFeatureTypeStyle: (feature: Feature) => IFeatureTypeStyle
const resolveStyle = (feature: Feature): IFeatureTypeStyle | undefined => {
  const props = feature.getProperties()
  const geomType = feature.getGeometry()?.getType()

  if (geomType === 'Point' || geomType === 'MultiPoint') {
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

const RenderLabelSample = () => {
  const [showLabel, setShowLabel] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState('')

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 18, maxZoom: 21 },
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

  return (
    <div className="sample-page">
      <h2>커스텀 라벨 (renderLabel)</h2>
      <p className="description">
        renderLabel prop으로 Feature 위에 React 컴포넌트를 오버레이합니다.
        선택된 Feature에만 라벨을 표시하는 조건부 렌더링이 가능합니다.
        labelOffset으로 오버레이 위치를 조정할 수 있습니다.
      </p>

      <div className="control-panel">
        <span className="label">컨트롤</span>
        <button className={`btn${showLabel ? ' active' : ''}`} onClick={() => setShowLabel(v => !v)}>
          🏷️ renderLabel: {showLabel ? 'ON' : 'OFF'}
        </button>
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          Feature를 클릭하면 라벨이 표시됩니다
        </span>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              {geoJsonData && (
                <layer.GeoJson
                  xcMap={xcMap}
                  layerName="renderLabelLayer"
                  layerTag="renderLabelGroup"
                  data={geoJsonData}
                  pkField="id"
                  featureName="surfacemark"
                  getFeatureTypeStyle={resolveStyle}
                  getRotation={(props: any) => props.angle ? Number(props.angle) : 0}
                  renderLabel={showLabel ? (feature: Feature) => {
                    const geomType = feature.getGeometry()?.getType()
                    if (geomType !== 'Point' && geomType !== 'MultiPoint') return null
                    // 선택된 상태의 Feature만 라벨 표시
                    if (feature.getProperties().status !== 'selected') return null
                    const props = feature.getProperties().value ?? feature.getProperties()
                    if (!props.signtypenm) return null
                    return (
                      <div style={{
                        background: 'rgba(0,0,0,0.85)',
                        color: '#FFD700',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      }}>
                        {props.signtypenm}
                      </div>
                    )
                  } : undefined}
                  labelOffset={[0, 18]}
                  visible={true}
                  zIndex={10}
                />
              )}
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="renderLabelLayer"
                layerTag="renderLabelGroup"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                getFeatureTypeStyle={resolveStyle}
                onClick={(fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`${d.signtypenm || d.id}`)
                  }
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">🏷️ {selectedInfo}</div>}
      </div>

      <CodeBlock
        title="renderLabel 코드"
        code={`<layer.GeoJson
  // ...기본 props
  getFeatureTypeStyle={(feature) => {
    // ★ (feature: Feature) 시그니처
    const geomType = feature.getGeometry()?.getType()
    if (geomType === 'Point')
      return { type: 'marker', event: [...] }
    return { type: 'polyline', event: [...] }
  }}
  renderLabel={(feature) => {
    // 조건부: Point 타입 + selected 상태만
    const geomType = feature.getGeometry()?.getType()
    if (geomType !== 'Point') return null
    if (feature.getProperties().status !== 'selected')
      return null

    const props = feature.getProperties().value
    return (
      <div style={{
        background: 'rgba(0,0,0,0.85)',
        color: '#FFD700',
        fontSize: '11px',
        fontWeight: 'bold',
        padding: '3px 8px',
        borderRadius: '4px',
      }}>
        {props.signtypenm}
      </div>
    )
  }}
  labelOffset={[0, 18]}
/>`}
      />
    </div>
  )
}

export default RenderLabelSample
