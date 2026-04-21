import CodeBlock from '../../components/CodeBlock'
import { useXcMap, useVworldUrl, XcMap, XcLayers, layer, IXcMapOption } from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const PlaceMarkerSample = () => {
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {},
  }
  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  return (
    <div className="sample-page">
      <h2>마커 배치 (PlaceMarker)</h2>
      <p className="description">layer.PlaceMarker로 지도 클릭 시 사용자가 직접 마커를 배치합니다.</p>
      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.PlaceMarker
                xcMap={xcMap}
                layerName="placeMarker"
                isActive={true}
                iconUrl={SigDefault}
                iconWidth={30}
                iconHeight={30}
                onPlaced={(coordinate) => {
                  console.log('배치된 좌표:', coordinate)
                }}
              />
            </XcLayers>
          </XcMap>
        </div>
        <div className="status-bar">지도를 클릭하여 마커를 배치하세요</div>
      </div>
      <CodeBlock title="PlaceMarker 코드" code={[
  '<layer.PlaceMarker',
  '  xcMap={xcMap}',
  '  layerName="placeMarker"',
  '  isActive={true}',
  '  iconUrl="/icons/marker.svg"',
  '  iconWidth={30}',
  '  iconHeight={30}',
  '  onPlaced={(coordinate) => {',
  '    console.log(\'좌표:\', coordinate)',
  '  }}',
  '/>',
].join('\n')} />
    </div>
  )
}
export default PlaceMarkerSample