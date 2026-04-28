import { useMemo, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption,
} from 'xc-map'

// @ts-ignore
import intersectionRawData from '../../data/intersection.json'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const IntersectionLaneSample = () => {
  const [selectedInfo, setSelectedInfo] = useState('')

  // ── 교차로 Raw 데이터 → GeoJSON 변환 ──
  const lcGeoJsonData = useMemo(() => {
    const features: any[] = [];
    (intersectionRawData as any[]).forEach((item: any) => {
      // A 방향: 유효한 좌표 2개 이상이면 LineString 생성
      const aPts: [number, number][] = []
      if (item.lcAStartLat !== 0 && item.lcAStartLng !== 0) aPts.push([item.lcAStartLng, item.lcAStartLat])
      if (item.lcAMiddleLat !== 0 && item.lcAMiddleLng !== 0) aPts.push([item.lcAMiddleLng, item.lcAMiddleLat])
      if (item.lcAEndLat !== 0 && item.lcAEndLng !== 0) aPts.push([item.lcAEndLng, item.lcAEndLat])
      if (aPts.length >= 2) {
        features.push({
          type: 'Feature', id: `${item.lcNo}_A`,
          geometry: { type: 'LineString', coordinates: aPts },
          properties: {
            id: `${item.lcNo}_A`, lcNo: item.lcNo, lcName: item.lcName,
            direction: 'A', flonumber: item.lcAFlonumber, lcStatus: item.lcStatus,
          }
        })
      }
      // B 방향
      const bPts: [number, number][] = []
      if (item.lcBStartLat !== 0 && item.lcBStartLng !== 0) bPts.push([item.lcBStartLng, item.lcBStartLat])
      if (item.lcBMiddleLat !== 0 && item.lcBMiddleLng !== 0) bPts.push([item.lcBMiddleLng, item.lcBMiddleLat])
      if (item.lcBEndLat !== 0 && item.lcBEndLng !== 0) bPts.push([item.lcBEndLng, item.lcBEndLat])
      if (bPts.length >= 2) {
        features.push({
          type: 'Feature', id: `${item.lcNo}_B`,
          geometry: { type: 'LineString', coordinates: bPts },
          properties: {
            id: `${item.lcNo}_B`, lcNo: item.lcNo, lcName: item.lcName,
            direction: 'B', flonumber: item.lcBFlonumber, lcStatus: item.lcStatus,
          }
        })
      }
    })
    return { type: 'FeatureCollection' as const, features }
  }, [])

  // ── 지도 옵션 ──
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.724, 37.367], zoom: 18, maxZoom: 21 },
    featureStyle: {
      'lcLine': {
        type: 'polyline',
        event: [
          // arrow.color 생략 → stroke.color 자동 상속 (v0.3.5)
          { status: 'default',  style: { stroke: { color: '#00E676', width: 5 }, arrow: { size: 6, interval: 0.5, position: 'end' } } },
          { status: 'selected', style: { stroke: { color: '#FF4500', width: 7 }, arrow: { size: 8, interval: 0.5, position: 'end' } } },
        ]
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  return (
    <div className="sample-page">
      <h2>교차로 좌/우회전 차선</h2>
      <p className="description">
        교차로 데이터(Start/Middle/End 좌표)를 <code>LineString</code> GeoJSON으로 변환하여 지도에 표현합니다.<br />
        <code>arrow.position: 'end'</code>로 라인 끝에만 방향 화살표를 배치하고,
        <code>arrow.color</code>를 생략하여 <code>stroke.color</code>를 자동 상속받습니다.
        클릭 시 선택 스타일로 전환됩니다.
      </p>

      <div className="map-container" style={{ height: 500 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.GeoJson
                xcMap={xcMap}
                layerName="lcLineLayer"
                layerTag="lcLine"
                pkField="id"
                featureName="lcLine"
                visible={true}
                data={lcGeoJsonData}
                zIndex={12}
              />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap}
                layerName="lcLineLayer"
                layerTag="lcLine"
                useSelectStyle={true}
                isDeselectOnClickAway={true}
                onClick={(_fn, datas) => {
                  if (datas.length > 0) {
                    const d = datas[0] as any
                    setSelectedInfo(`📍 ${d.lcName} | 방향: ${d.direction} | 차선수: ${d.flonumber}`)
                  }
                }}
                onClickAway={() => setSelectedInfo('')}
              />
            </XcInteractions>
          </XcMap>
        </div>
        {selectedInfo && <div className="status-bar">{selectedInfo}</div>}
      </div>

      <CodeBlock
        title="교차로 차선 LineString + End Arrow 예시"
        code={[
          "// featureStyle 설정 — arrow.color 생략 시 stroke.color 자동 상속",
          "featureStyle: {",
          "  'lcLine': {",
          "    type: 'polyline',",
          "    event: [",
          "      {",
          "        status: 'default',",
          "        style: {",
          "          stroke: { color: '#00E676', width: 5 },",
          "          arrow: { size: 6, position: 'end' }  // color 생략 → '#00E676' 자동",
          "        }",
          "      },",
          "      {",
          "        status: 'selected',",
          "        style: {",
          "          stroke: { color: '#FF4500', width: 7 },",
          "          arrow: { size: 8, position: 'end' }  // color 생략 → '#FF4500' 자동",
          "        }",
          "      },",
          "    ]",
          "  }",
          "}",
        ].join('\n')}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>v0.3.5 Arrow 신규 Props</h3>
      <table className="props-table">
        <thead><tr><th>속성</th><th>Type</th><th>기본값</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>color</td><td>string?</td><td>stroke.color</td><td>생략 시 stroke.color 자동 상속 (RegularShape 모드). Icon 모드에서는 이미지 자체 색상 사용.</td></tr>
          <tr><td>position</td><td>'repeat' | 'end' | 'start' | 'both'</td><td>'repeat'</td><td>화살표 배치 위치. 'both'는 시작+끝 양쪽.</td></tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>v0.3.5 Stroke 신규 Props</h3>
      <table className="props-table">
        <thead><tr><th>속성</th><th>Type</th><th>기본값</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>lineDash</td><td>number[]</td><td>-</td><td>점선 패턴 (px 단위 배열). 예: [10, 5] → 10px 선, 5px 공백</td></tr>
          <tr><td>lineCap</td><td>'butt' | 'round' | 'square'</td><td>'round'</td><td>라인 끝 모양</td></tr>
          <tr><td>lineJoin</td><td>'bevel' | 'round' | 'miter'</td><td>'round'</td><td>라인 꺾임 모양</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default IntersectionLaneSample
