import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, layer, IXcMapOption, IMarker,
} from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const AnimationSample = () => {
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'animated': {
        type: 'marker',
        event: [
          {
            status: 'default',
            style: {
              image: { height: 30, width: 30, src: SigDefault },
              animation: {
                color: 'rgba(255, 0, 0, 0.6)',
                width: 2,
                radius: 25,
                duration: 1500,
              },
            },
          },
        ],
      },
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  const markers: IMarker<any>[] = [
    { id: 'A1', type: 'marker', featureName: 'animated', status: 'default',
      value: {}, coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'A2', type: 'marker', featureName: 'animated', status: 'default',
      value: {}, coordinate: { longitude: 126.735, latitude: 37.365 } },
  ]

  return (
    <div className="sample-page">
      <h2>마커 애니메이션</h2>
      <p className="description">
        IAnimationStyle을 사용하여 마커 주위에 원형 웨이브(pulse) 효과를 표시합니다.
        이상 상태 알림이나 긴급 장비 강조에 활용합니다.
      </p>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker xcMap={xcMap} markers={markers} layerName="animMarker"
                layerTag="animTag" zIndex={15} visible={true} />
            </XcLayers>
          </XcMap>
        </div>
      </div>

      <CodeBlock title="Animation 스타일" code={`{
  status: 'abnormal',
  style: {
    image: { src: iconUrl, width: 30, height: 30 },
    animation: {
      color: 'rgba(255, 0, 0, 0.6)', // 웨이브 색상
      width: 2,                        // 선 두께
      radius: 25,                      // 최대 반경 (px)
      duration: 1500,                  // 애니메이션 주기 (ms)
    },
  },
}`} />
    </div>
  )
}

export default AnimationSample
