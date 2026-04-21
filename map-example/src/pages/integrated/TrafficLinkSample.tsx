import { useMemo, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, toFeatureCollection, IXcMapOption } from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'
const WFS_BASE = 'http://adxc.xcolo.co.kr:10021/geoserver/wfs'
const makeWfsUrl = (typename: string) =>
  `${WFS_BASE}?service=WFS&` +
  `version=2.0.0&request=GetFeature&typename=adxc:${typename}&` +
  `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`

const TrafficLinkSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 16, maxZoom: 21 },
    featureStyle: {
      'crosswalk': { type: 'stripe', event: [
        { status: 'default', style: { stripe: { color: '#FFF', width: 14, gap: 12 }, stroke: { color: '#FFF', width: 3 } } },
        { status: 'selected', style: { stripe: { color: '#FFD700', width: 14, gap: 12 }, stroke: { color: '#FFD700', width: 3 } } },
      ]},
      'trafficLink': { type: 'vector', event: [
        { status: 'default', style: { stroke: { color: '#4CAF50', width: 6 }, arrow: { color: '#FFF', size: 8, interval: 0.2 } } },
        { status: 'selected', style: { stroke: { color: '#FF4500', width: 8 }, arrow: { color: '#FFF', size: 10, interval: 0.15 } } },
      ]},
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  const [cwData, setCwData] = useState<any[]>([])
  useMemo(() => {
    fetch('/data/crosswalk.json').then(r => r.json()).then(setCwData).catch(() => setCwData([]))
  }, [])
  const cwGeoJson = useMemo(() => cwData.length ? toFeatureCollection(cwData, { geomField: 'geom', idField: 'id' }) : null, [cwData])

  const codeStr = [
    '// GeoJSON(횡단보도) + WFS(TESTBED_MOCT_LINK) 통합 예시',
    '// 같은 layerTag로 묶어 FeatureSelect를 공유',
    '',
    '<layer.GeoJson',
    '  featureName="crosswalk"',
    '  layerTag="trafficGroup"',
    '/>',
    '<layer.Wfs',
    '  layerName="linkLayer"',
    '  pkField="LINK_ID"',
    '  featureName="trafficLink"',
    '  layerTag="trafficGroup"',
    '  zoomUrls={[',
    "    { zoomLevel: 15, url: '...POLY20M' },",
    "    { zoomLevel: 16, url: '...POLY10M' },",
    "    { zoomLevel: 17, url: '...POLY5M'  },",
    '  ]}',
    '/>',
    '',
    '<interaction.FeatureSelect',
    '  layerTag="trafficGroup"',
    '  onClick={(featureName, datas) => {',
    '    // featureName으로 레이어 구분',
    '  }}',
    '/>',
  ].join('\n')

  return (
    <div className="sample-page">
      <h2>교통 링크 (통합 예시)</h2>
      <p className="description">
        GeoJSON(횡단보도/Stripe) + WFS(TESTBED_MOCT_LINK/Arrow) + FeatureSelect를 조합한 교통 인프라 시각화 예시입니다.
        zoomUrls로 줌 레벨에 따라 POLY20M/10M/5M 해상도를 자동 전환합니다.
      </p>
      <div className="map-container" style={{ height: 600 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              {cwGeoJson && (
                <layer.GeoJson xcMap={xcMap} layerName="crosswalk" layerTag="trafficGroup"
                  data={cwGeoJson} pkField="id" featureName="crosswalk"
                  getRotation={(p: any) => p.angle ? Number(p.angle) : 0}
                  visible={true} zIndex={9} />
              )}
              <layer.Wfs xcMap={xcMap} layerName="linkLayer" layerTag="trafficGroup"
                pkField="LINK_ID" featureName="trafficLink" visible={true}
                url=""
                zoomUrls={[
                  { zoomLevel: 15, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY20M') },
                  { zoomLevel: 16, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY10M') },
                  { zoomLevel: 17, url: makeWfsUrl('TESTBED_MOCT_LINK_POLY5M') },
                ]}
                useBbox={false} zIndex={8} />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap} layerName="not-used" layerTag="trafficGroup"
                useSelectStyle={true} isDeselectOnClickAway={true}
                onClick={(fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(d.LINK_ID ? 'LINK: ' + d.LINK_ID : 'CrossWalk: ' + d.id)
                  }
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">{selectedInfo}</div>}
      </div>
      <CodeBlock title="통합 패턴" code={codeStr} />
    </div>
  )
}
export default TrafficLinkSample