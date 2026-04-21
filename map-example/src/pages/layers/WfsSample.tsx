import { useRef, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption,
} from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const WFS_BASE = 'http://adxc.xcolo.co.kr:10021/geoserver/wfs'
const makeWfsUrl = (typename: string) =>
  `${WFS_BASE}?service=WFS&` +
  `version=2.0.0&request=GetFeature&typename=adxc:${typename}&` +
  `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`

const WfsSample = () => {
  const wfsRef = useRef<any>(null)
  const [selectedInfo, setSelectedInfo] = useState('')
  const [visible, setVisible] = useState(true)

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'trafficLink': {
        type: 'vector',
        event: [
          { status: 'default', style: { fill: { color: '#999' }, stroke: { color: '#999', width: 5 } } },
          { status: 'selected', style: { fill: { color: '#0034FF' }, stroke: { color: '#FFFFFF', width: 2 } } },
          { status: '1', style: { fill: { color: '#86ED00' }, stroke: { color: '#86ED00', width: 5 } } },
          { status: '2', style: { fill: { color: '#F9E100' }, stroke: { color: '#F9E100', width: 5 } } },
          { status: '3', style: { fill: { color: '#FF992A' }, stroke: { color: '#FF992A', width: 5 } } },
          { status: '4', style: { fill: { color: '#FF1E00' }, stroke: { color: '#FF1E00', width: 5 } } },
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  return (
    <div className="sample-page">
      <h2>WFS 벡터 레이어</h2>
      <p className="description">
        layer.Wfs로 GeoServer WFS 데이터를 실시간 로드합니다.
        zoomUrls로 줌 레벨에 따라 다른 해상도의 데이터(POLY20M/10M/5M)를 자동 전환하고,
        useBbox로 현재 뷰포트 범위의 데이터만 요청할 수 있습니다.
      </p>

      <div className="control-panel">
        <span className="label">컨트롤</span>
        <button className="btn" onClick={() => setVisible(v => !v)}>
          {visible ? '🔴 숨기기' : '🟢 보이기'}
        </button>
        <button className="btn" onClick={() => wfsRef.current?.refresh?.()}>
          🔄 Refresh
        </button>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Wfs
                ref={wfsRef}
                xcMap={xcMap}
                layerName="linkLayer"
                layerTag="feature"
                pkField="LINK_ID"
                featureName="trafficLink"
                visible={visible}
                url=""
                zoomUrls={[
                  { zoomLevel: 15, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY20M') },
                  { zoomLevel: 16, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY10M') },
                  { zoomLevel: 17, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY5M') },
                ]}
                useBbox={false}
                zIndex={11}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="linkLayer"
                layerTag="feature"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                onClick={(fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`LINK_ID: ${d.LINK_ID || d.id}`)
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
        title="WFS 레이어 코드"
        code={`<layer.Wfs
  xcMap={xcMap}
  layerName="linkLayer"
  layerTag="feature"
  pkField="LINK_ID"
  featureName="trafficLink"
  visible={true}
  url=""
  zoomUrls={[
    { zoomLevel: 15, url: '...TESTBED_MOCT_LINK_POLY20M...' },
    { zoomLevel: 16, url: '...TESTBED_MOCT_LINK_POLY10M...' },
    { zoomLevel: 17, url: '...TESTBED_MOCT_LINK_POLY5M...'  },
  ]}
  useBbox={false}
  zIndex={11}
/>`}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>WFS Props</h3>
      <table className="props-table">
        <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>url</td><td>string</td><td>기본 WFS URL (zoomUrls 사용 시 빈 문자열 가능)</td></tr>
          <tr><td>pkField</td><td>string</td><td>Feature PK 필드명</td></tr>
          <tr><td>featureName</td><td>string</td><td>featureStyle에서 매핑할 키</td></tr>
          <tr><td>zoomUrls</td><td>{'{ zoomLevel, url }[]'}</td><td>줌 레벨별 URL 분기 (해상도별 데이터)</td></tr>
          <tr><td>useBbox</td><td>boolean</td><td>뷰포트 BBOX 필터링 활성화</td></tr>
          <tr><td>getStatusInfo</td><td>(id) =&gt; any</td><td>Feature별 상태 정보 반환 콜백</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default WfsSample
