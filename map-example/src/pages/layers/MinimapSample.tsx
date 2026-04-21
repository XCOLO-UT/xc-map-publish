import CodeBlock from '../../components/CodeBlock'
import { useXcMap, useVworldUrl, XcMap, XcLayers, layer, IXcMapOption } from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const MinimapSample = () => {
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {},
  }
  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl, minimapVworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  return (
    <div className="sample-page">
      <h2>미니맵</h2>
      <p className="description">layer.Minimap으로 우측 하단에 미니맵을 표시합니다.</p>
      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Minimap xcMap={xcMap} url={minimapVworldUrl} />
            </XcLayers>
          </XcMap>
        </div>
      </div>
      <CodeBlock title="미니맵 코드" code={[
  'const { minimapVworldUrl } = useVworldUrl(key, \'midnight\', \'Base\')',
  '<layer.Minimap xcMap={xcMap} url={minimapVworldUrl} />',
].join('\n')} />
    </div>
  )
}
export default MinimapSample