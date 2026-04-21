import { useMemo, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, toFeatureCollection, IXcMapOption,
} from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const resolveCrosswalkStyle = () => ({
  type: 'stripe' as const,
  event: [
    { status: 'default', style: { stripe: { color: '#FFFFFF', width: 14, gap: 12 }, stroke: { color: '#FFFFFF', width: 3 }, zIndex: 5 } },
    { status: 'selected', style: { stripe: { color: '#FFD700', width: 14, gap: 12 }, stroke: { color: '#FFD700', width: 3 }, zIndex: 8 } },
  ],
})

const StripeSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')
  const [stripeColor, setStripeColor] = useState('#FFFFFF')

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 18, maxZoom: 21 },
    featureStyle: {
      'crosswalk': {
        type: 'stripe',
        event: [
          { status: 'default', style: { stripe: { color: stripeColor, width: 14, gap: 12 }, stroke: { color: stripeColor, width: 3 } } },
          { status: 'selected', style: { stripe: { color: '#FFD700', width: 14, gap: 12 }, stroke: { color: '#FFD700', width: 3 } } },
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  const [rawData, setRawData] = useState<any[]>([])
  useMemo(() => {
    fetch('/data/crosswalk.json')
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
      <h2>줄무늬 패턴 (Stripe)</h2>
      <p className="description">
        type: 'stripe'로 줄무늬 채움 패턴을 적용합니다.
        횡단보도와 같은 Polygon/MultiPolygon 지오메트리에 줄무늬 효과를 줄 수 있습니다.
        stripe의 color, width, gap 속성으로 줄무늬 간격과 두께를 조절합니다.
        현재 {rawData.length}건의 횡단보도 데이터를 표시합니다.
      </p>

      <div className="control-panel">
        <span className="label">줄무늬 색상</span>
        <div className="toggle-group">
          {[
            { color: '#FFFFFF', label: '흰색' },
            { color: '#00FF00', label: '초록' },
            { color: '#FF6B6B', label: '빨강' },
            { color: '#4FC3F7', label: '파랑' },
          ].map(c => (
            <button
              key={c.color}
              className={`toggle-item${stripeColor === c.color ? ' active' : ''}`}
              onClick={() => setStripeColor(c.color)}
            >
              <span style={{ color: c.color }}>●</span> {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              {geoJsonData && (
                <layer.GeoJson
                  xcMap={xcMap}
                  layerName="crosswalk"
                  layerTag="crosswalkGroup"
                  data={geoJsonData}
                  pkField="id"
                  featureName="crosswalk"
                  getFeatureTypeStyle={resolveCrosswalkStyle}
                  getRotation={(props: any) => props.angle ? Number(props.angle) : 0}
                  visible={true}
                  zIndex={9}
                />
              )}
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="crosswalk"
                layerTag="crosswalkGroup"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                getFeatureTypeStyle={resolveCrosswalkStyle}
                onClick={(fn, datas) => {
                  if (datas.length > 0) setSelectedInfo(`횡단보도 ID: ${(datas[0] as any).id}`)
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">📌 {selectedInfo}</div>}
      </div>

      <CodeBlock
        title="Stripe 스타일 정의"
        code={`// featureStyle에 stripe 타입 정의
featureStyle: {
  'crosswalk': {
    type: 'stripe',  // ← 줄무늬 패턴 타입
    event: [
      {
        status: 'default',
        style: {
          stripe: {
            color: '#FFFFFF',  // 줄무늬 색상
            width: 14,         // 줄무늬 두께 (px)
            gap: 12,           // 줄 사이 간격 (px)
          },
          stroke: {
            color: '#FFFFFF',  // 외곽선 색상
            width: 3,
          },
        },
      },
      {
        status: 'selected',
        style: {
          stripe: { color: '#FFD700', width: 14, gap: 12 },
          stroke: { color: '#FFD700', width: 3 },
        },
      },
    ],
  },
}

// getFeatureTypeStyle로 동적 반환도 가능
const resolveStyle = () => ({
  type: 'stripe',
  event: [...]
})`}
      />
    </div>
  )
}

export default StripeSample
