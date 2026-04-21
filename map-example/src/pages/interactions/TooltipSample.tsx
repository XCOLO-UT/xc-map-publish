import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions, layer, interaction, IXcMapOption, IMarker } from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const TooltipSample = () => {
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'sig': { type: 'marker', event: [
        { status: 'default', style: { image: { height: 30, width: 30, src: SigDefault } } },
      ]},
    },
  }
  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')
  const markers: IMarker<any>[] = [
    { id: 'S1', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시교차로 #01', addr: '시흥시 정왕동 123' },
      coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'S2', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시교차로 #02', addr: '시흥시 배곧동 456' },
      coordinate: { longitude: 126.735, latitude: 37.365 } },
  ]

  return (
    <div className="sample-page">
      <h2>호버 툴팁</h2>
      <p className="description">interaction.FeatureTooltip으로 마커 호버 시 툴팁을 표시합니다.</p>
      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker xcMap={xcMap} markers={markers} layerName="tooltipMarker"
                layerTag="tooltipTag" zIndex={15} visible={true} />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureTooltip
                xcMap={xcMap}
                layerTag="tooltipTag"
                renderContent={(data: any) => (
                  <div style={{ background: '#1e2130', color: '#e4e6f0', padding: '8px 12px',
                    borderRadius: '6px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{data?.name}</div>
                    <div style={{ color: '#9498b0' }}>{data?.addr}</div>
                  </div>
                )}
              />
            </XcInteractions>
          </XcMap>
        </div>
      </div>
      <CodeBlock title="FeatureTooltip 코드" code={[
  '<interaction.FeatureTooltip',
  '  xcMap={xcMap}',
  '  layerTag="tooltipTag"',
  '  renderContent={(data) => (',
  '    <div className="tooltip-card">',
  '      <div>{data.name}</div>',
  '      <div>{data.addr}</div>',
  '    </div>',
  '  )}',
  '/>',
].join('\n')} />
    </div>
  )
}
export default TooltipSample