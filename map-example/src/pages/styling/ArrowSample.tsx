import { useState } from 'react'
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

// 화살표를 표시할 lbel_id 목록 (LaneBeltElementLink - MultiLineString)
const ARROW_LBEL_IDS = [
  '557631541_201_000001', '557631541_201_000002', '557631541_201_000003',
  '557631541_201_000012', '557631541_201_000013', '557631541_201_000014',
  '557631541_201_000015', '557631541_201_000016', '557631541_201_000017',
  '557631541_201_000018', '557631541_201_000019', '557631541_201_000020',
  '557631541_201_000021', '557631541_201_000022', '557631541_201_000023',
  '557631541_201_000024', '557631541_201_000025', '557631541_201_000026',
]
const CQL = `lbel_id IN (${ARROW_LBEL_IDS.map(id => `'${id}'`).join(',')})`
const ARROW_URL = makeWfsUrl('LaneBeltElementLink') + `&CQL_FILTER=${encodeURIComponent(CQL)}`

const ArrowSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 17, maxZoom: 21 },
    featureStyle: {
      // 배경: TESTBED_MOCT_LINK (도로면 Polygon, 회색)
      'trafficLink': {
        type: 'vector',
        event: [
          { status: 'default', style: { fill: { color: '#555' }, stroke: { color: '#555', width: 1 } } },
        ],
      },
      // 화살표 대상 링크 (polyline + arrow)
      'arrowLink': {
        type: 'polyline',
        event: [
          { status: 'default', style: {
            stroke: { color: '#2196F3', width: 6 },
            arrow: { color: '#FFFFFF', size: 8, interval: 0.2 },
          }},
          { status: 'selected', style: {
            stroke: { color: '#FF4500', width: 8 },
            arrow: { color: '#FFFFFF', size: 12, interval: 0.15 },
          }},
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  return (
    <div className="sample-page">
      <h2>방향 화살표 (Arrow)</h2>
      <p className="description">
        arrow 속성으로 라인(LineString/MultiLineString) 위에 방향 화살표를 표시합니다.
        교통 흐름이나 경로 방향을 시각적으로 표현할 때 사용합니다.
        LaneBeltElementLink에서 {ARROW_LBEL_IDS.length}개 lbel_id에 파란색 화살표를 적용합니다.
      </p>

      <div className="map-container" style={{ height: 500 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              {/* 배경: 도로면 (회색 Polygon) */}
              <layer.Wfs
                xcMap={xcMap}
                layerName="bgLink"
                layerTag="bgLinkTag"
                pkField="LINK_ID"
                featureName="trafficLink"
                visible={true}
                url=""
                zoomUrls={[
                  { zoomLevel: 15, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY20M') },
                  { zoomLevel: 16, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY10M') },
                  { zoomLevel: 17, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY5M') },
                ]}
                useBbox={false}
                zIndex={10}
              />
              {/* 화살표: LaneBeltElementLink (MultiLineString) */}
              <layer.Wfs
                xcMap={xcMap}
                layerName="arrowLink"
                layerTag="arrowLinkTag"
                pkField="lbel_id"
                featureName="arrowLink"
                visible={true}
                url={ARROW_URL}
                useBbox={false}
                zIndex={12}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="arrowLink"
                layerTag="arrowLinkTag"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                onClick={(fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`lbel_id: ${d.lbel_id}, link_id: ${d.link_id}, lane: ${d.lane_no}`)
                  }
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">🔗 {selectedInfo}</div>}
      </div>

      <CodeBlock
        title="Arrow 스타일 정의"
        code={[
          "// TESTBED_MOCT_LINK에서 특정 LINK_ID만 필터링하여 arrow 적용",
          "featureStyle: {",
          "  'arrowLink': {",
          "    type: 'polyline',",
          "    event: [{",
          "      status: 'default',",
          "      style: {",
          "        stroke: { color: '#2196F3', width: 6 },",
          "        arrow: {",
          "          color: '#FFFFFF',   // 화살표 색상",
          "          size: 8,            // 화살표 크기 (px)",
          "          interval: 0.2,      // 간격 (0~1)",
          "        },",
          "      },",
          "    }],",
          "  },",
          "}",
          "",
          "// CQL_FILTER로 특정 LINK_ID만 WFS 요청",
          "const ids = ['2240006100', '2240006001', '2240007100']",
          "const cql = `LINK_ID IN (${ids.map(id => `'${id}'`).join(',')})`",
          "const url = wfsUrl + '&CQL_FILTER=' + encodeURIComponent(cql)",
        ].join('\n')}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Arrow Props</h3>
      <table className="props-table">
        <thead><tr><th>속성</th><th>Type</th><th>기본값</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>color</td><td>string</td><td>'#FFFFFF'</td><td>화살표 색상</td></tr>
          <tr><td>size</td><td>number</td><td>8</td><td>화살표 크기 (px)</td></tr>
          <tr><td>interval</td><td>number</td><td>0.2</td><td>간격 비율 (0~1)</td></tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>지원 Geometry</h3>
      <table className="props-table">
        <thead><tr><th>Geometry Type</th><th>화살표 배치 방식</th></tr></thead>
        <tbody>
          <tr><td>LineString</td><td>라인을 따라 interval 간격으로 배치</td></tr>
          <tr><td>MultiLineString</td><td>각 라인별 화살표 배치</td></tr>
          <tr><td>Polygon</td><td>exterior ring(외곽선)을 따라 배치</td></tr>
          <tr><td>MultiPolygon</td><td>각 polygon의 exterior ring별 배치</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default ArrowSample
