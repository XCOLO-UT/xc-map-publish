import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, layer, IXcMapOption,
} from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const XyzSample = () => {
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {},
  }
  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  return (
    <div className="sample-page">
      <h2>XYZ 타일 레이어</h2>
      <p className="description">
        layer.Xyz로 XYZ 타일 서비스를 배경 지도로 사용합니다.
        VWorld, OpenStreetMap 등 표준 XYZ 타일 URL을 지원합니다.
        onLoadStart/onLoadEnd 콜백으로 로딩 상태를 추적할 수 있습니다.
      </p>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz
                url={vworldUrl}
                xcMap={xcMap}
                layerName="base"
                onLoadStart={() => console.log('타일 로딩 시작')}
                onLoadEnd={() => console.log('타일 로딩 완료')}
              />
            </XcLayers>
          </XcMap>
        </div>
      </div>

      <CodeBlock title="XYZ 타일 코드" code={`<layer.Xyz
  url={vworldUrl}
  xcMap={xcMap}
  layerName="base"
  onLoadStart={() => console.log('로딩 시작')}
  onLoadEnd={() => console.log('로딩 완료')}
/>`} />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Props 참조</h3>
      <table className="props-table">
        <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>url</td><td>string</td><td>XYZ 타일 URL 템플릿</td></tr>
          <tr><td>xcMap</td><td>ReturnType&lt;useXcMap&gt;</td><td>Map 인스턴스</td></tr>
          <tr><td>layerName</td><td>string</td><td>레이어 식별 이름</td></tr>
          <tr><td>onLoadStart</td><td>() =&gt; void</td><td>타일 로딩 시작 콜백</td></tr>
          <tr><td>onLoadEnd</td><td>() =&gt; void</td><td>타일 로딩 완료 콜백</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default XyzSample
