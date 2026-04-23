import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption, IFeatureTypeStyle,
} from 'xc-map'
import { Feature } from 'ol'

// 화살표 아이콘 import
import ArrowIcon from '../../assets/icons/map/arrow.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const WFS_BASE = 'http://adxc.xcolo.co.kr:10021/geoserver/wfs'
const makeWfsUrl = (typename: string) =>
  `${WFS_BASE}?service=WFS&` +
  `version=2.0.0&request=GetFeature&typename=adxc:${typename}&` +
  `outputFormat=application/json&exceptions=application/json&srsName=EPSG:4326`

// Arrow Style을 적용할 lbe_id 목록 (LaneBeltElementLink)
const ARROW_TARGET_IDS = new Set([
  '557631586_200_000001', '557631586_200_000002', '557631586_200_000003'
])

const ArrowSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 18, maxZoom: 21 },
    featureStyle: {
      // 배경: LaneBeltElementLink 기본 스타일 (교통 상태별)
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
      <h2>방향 화살표 (Arrow)</h2>
      <p className="description">
        arrow 속성으로 라인(LineString/MultiLineString) 위에 방향 화살표를 표시합니다.
        <code>getFeatureTypeStyle</code> 콜백을 사용하여 특정 Feature에만 동적으로 Arrow Style을 적용하고,
        나머지 Feature는 기본 trafficLink 스타일을 유지합니다.
        <code>imageSrc</code> 옵션으로 SVG 이미지 기반 화살표를 사용합니다.
      </p>

      <div className="map-container" style={{ height: 500 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              {/* LaneBeltElementLink: getFeatureTypeStyle로 특정 ID에만 arrow 적용 */}
              <layer.Wfs
                xcMap={xcMap}
                layerName="LaneBeltElementLink"
                layerTag="LaneBeltElementLink"
                pkField="lbe_id"
                featureName="trafficLink"
                visible={true}
                url={makeWfsUrl('LaneBeltElementLink')}
                zoomUrls={[
                  { zoomLevel: 7,  url: makeWfsUrl('LaneBeltElementLink') },
                  { zoomLevel: 16, url: makeWfsUrl('LaneBeltElementLink') },
                  { zoomLevel: 20, url: makeWfsUrl('LaneBeltElementLink') },
                ]}
                getFeatureTypeStyle={(feature: Feature) => {
                  const featureId = feature.getId() as string;
                  if (ARROW_TARGET_IDS.has(featureId)) {
                    const arrowOpt = {
                      color: '#FFFFFF', size: 6, interval: 0.02,
                      imageSrc: ArrowIcon, imageWidth: 7, imageHeight: 6,
                    };
                    return {
                      type: 'vector',
                      event: [
                        { status: 'default', style: {
                          fill: { color: '#0034FF' }, stroke: { color: '#0034FF', width: 10 },
                          arrow: arrowOpt,
                        }},
                      ],
                    } as IFeatureTypeStyle;
                  }
                  return undefined; // 나머지는 기본 trafficLink 스타일 사용
                }}
                useBbox={true}
                zIndex={11}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="LaneBeltElementLink"
                layerTag="LaneBeltElementLink"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                onClick={(fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`lbe_id: ${d.lbe_id}, link_id: ${d.link_id}, lane: ${d.lane_no}`)
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
        title="getFeatureTypeStyle + imageSrc Arrow 예시"
        code={[
          "import ArrowIcon from './assets/icons/map/arrow.svg'",
          "",
          "// 화살표를 적용할 Feature ID 목록",
          "const ARROW_IDS = new Set(['557631586_200_000001', ...])",
          "",
          "// getFeatureTypeStyle: 특정 ID에만 동적 arrow 스타일 적용",
          "<layer.Wfs",
          "  featureName=\"trafficLink\"",
          "  getFeatureTypeStyle={(feature) => {",
          "    if (ARROW_IDS.has(feature.getId())) {",
          "      return {",
          "        type: 'vector',",
          "        event: [{",
          "          status: 'default',",
          "          style: {",
          "            fill: { color: '#0034FF' },",
          "            stroke: { color: '#0034FF', width: 10 },",
          "            arrow: {",
          "              color: '#FFFFFF',",
          "              size: 6,",
          "              interval: 0.02,",
          "              imageSrc: ArrowIcon,  // SVG 이미지 기반 화살표",
          "              imageWidth: 7,",
          "              imageHeight: 6,",
          "            },",
          "          },",
          "        }],",
          "      } as IFeatureTypeStyle",
          "    }",
          "    return undefined  // 기본 스타일 유지",
          "  }}",
          "/>",
        ].join('\n')}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Arrow Props</h3>
      <table className="props-table">
        <thead><tr><th>속성</th><th>Type</th><th>기본값</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>color</td><td>string</td><td>'#FFFFFF'</td><td>화살표 색상 (RegularShape 모드)</td></tr>
          <tr><td>size</td><td>number</td><td>8</td><td>화살표 크기 (px)</td></tr>
          <tr><td>interval</td><td>number</td><td>0.2</td><td>간격 비율 (0~1)</td></tr>
          <tr><td>imageSrc</td><td>string</td><td>-</td><td>화살표 이미지 경로 (Icon 모드)</td></tr>
          <tr><td>imageWidth</td><td>number</td><td>16</td><td>이미지 너비 (px)</td></tr>
          <tr><td>imageHeight</td><td>number</td><td>20</td><td>이미지 높이 (px)</td></tr>
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

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>렌더링 모드 비교</h3>
      <table className="props-table">
        <thead><tr><th>모드</th><th>설정</th><th>특징</th></tr></thead>
        <tbody>
          <tr>
            <td>RegularShape (기본)</td>
            <td>imageSrc 미지정</td>
            <td>삼각형 정다각형으로 화살표 표현. 설정 간단.</td>
          </tr>
          <tr>
            <td>Icon (이미지)</td>
            <td>imageSrc 지정</td>
            <td>SVG/PNG 이미지 사용. 정교한 디자인 가능.</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ArrowSample
