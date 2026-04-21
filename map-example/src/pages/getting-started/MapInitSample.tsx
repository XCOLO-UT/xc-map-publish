import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap,
  useVworldUrl,
  XcMap,
  XcLayers,
  layer,
  IXcMapOption,
} from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const MapInitSample = () => {
  const xcMapOption: IXcMapOption = {
    viewOption: {
      center: [126.730, 37.363],
      zoom: 15,
      maxZoom: 21,
      minZoom: 7,
      multiWorld: true,
      constrainResolution: false,
    },
    featureStyle: {},
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  return (
    <div className="sample-page">
      <h2>지도 초기화</h2>
      <p className="description">
        useXcMap 훅으로 Map 인스턴스를 생성하고, XcMap 컴포넌트에 전달하여 지도를 렌더링합니다.
        VWorld 배경 지도는 layer.Xyz 컴포넌트로 표시합니다.
      </p>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz
                url={vworldUrl}
                xcMap={xcMap}
                layerName="base"
              />
            </XcLayers>
          </XcMap>
        </div>
      </div>

      <CodeBlock
        title="기본 지도 초기화 코드"
        code={`import { useXcMap, useVworldUrl, XcMap, XcLayers, layer, IXcMapOption } from 'xc-map'

const MyMap = () => {
  // 1. 지도 옵션 정의
  const xcMapOption: IXcMapOption = {
    viewOption: {
      center: [126.730, 37.363],  // [경도, 위도]
      zoom: 15,
      maxZoom: 21,
      minZoom: 7,
    },
    featureStyle: {},  // Feature 스타일 (빈 객체 가능)
  }

  // 2. Map 인스턴스 생성
  const xcMap = useXcMap(xcMapOption)

  // 3. VWorld 타일 URL 생성
  const { vworldUrl } = useVworldUrl('YOUR_API_KEY', 'Base', 'Base')

  return (
    <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
      <XcLayers>
        <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
      </XcLayers>
    </XcMap>
  )
}`}
      />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Props 참조</h3>
      <table className="props-table">
        <thead>
          <tr><th>Prop</th><th>Type</th><th>설명</th></tr>
        </thead>
        <tbody>
          <tr><td>xcMap</td><td>ReturnType&lt;useXcMap&gt;</td><td>useXcMap 훅에서 반환된 Map 인스턴스 객체</td></tr>
          <tr><td>xcMapOption</td><td>IXcMapOption</td><td>viewOption + featureStyle 설정</td></tr>
          <tr><td>events</td><td>IMapEvent[]</td><td>지도 이벤트 핸들러 배열 (선택)</td></tr>
          <tr><td>getZoomLevel</td><td>(level) =&gt; void</td><td>줌 레벨 변경 콜백 (선택)</td></tr>
          <tr><td>disablePan</td><td>boolean</td><td>팬(드래그) 비활성화 (기본: false)</td></tr>
          <tr><td>disableZoom</td><td>boolean</td><td>줌 비활성화 (기본: false)</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default MapInitSample
