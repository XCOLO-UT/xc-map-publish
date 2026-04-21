import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useXcMap, useVworldUrl, XcMap, XcLayers, XcOverlays, XcInteractions,
  layer, interaction, overlay, IXcMapOption, IMarker } from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigSelected from '../../assets/icons/map/sig_selected.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const BasicOverlaySample = () => {
  const [popupData, setPopupData] = useState<any>(null)
  const [popupCoord, setPopupCoord] = useState<number[] | null>(null)

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'sig': { type: 'marker', event: [
        { status: 'default', style: { image: { height: 30, width: 30, src: SigDefault } } },
        { status: 'selected', style: { image: { height: 35, width: 35, src: SigSelected } } },
      ]},
    },
  }
  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  const markers: IMarker<any>[] = [
    { id: 'S1', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시교차로 #01', status: '정상' },
      coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'S2', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시교차로 #02', status: '이상' },
      coordinate: { longitude: 126.735, latitude: 37.365 } },
  ]

  return (
    <div className="sample-page">
      <h2>기본 팝업</h2>
      <p className="description">overlay.OverlayComponent로 Feature 클릭 시 팝업을 표시합니다.</p>
      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker xcMap={xcMap} markers={markers} layerName="overlayMarker"
                layerTag="overlayTag" zIndex={15} visible={true} />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap} layerName="overlayMarker" layerTag="overlayTag"
                useSelectStyle={true} isDeselectOnClickAway={true}
                onClick={(fn, datas, coord) => {
                  if (datas.length > 0) {
                    setPopupData(datas[0])
                    setPopupCoord(coord ? [coord[0], coord[1]] : null)
                  }
                }}
                onClickAway={() => { setPopupData(null); setPopupCoord(null) }}
              />
            </XcInteractions>
            <XcOverlays>
              {popupData && popupCoord && (
                <overlay.OverlayComponent xcMap={xcMap} position={popupCoord}>
                  <div style={{ background: '#1e2130', border: '1px solid #2a2d3e', borderRadius: 8,
                    padding: '12px 16px', color: '#e4e6f0', fontSize: 13, minWidth: 180,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{popupData.name}</div>
                    <div style={{ color: '#9498b0' }}>상태: {popupData.status}</div>
                    <button onClick={() => { setPopupData(null); setPopupCoord(null) }}
                      style={{ marginTop: 8, padding: '4px 12px', fontSize: 12, background: '#4f8cff',
                        color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                      닫기
                    </button>
                  </div>
                </overlay.OverlayComponent>
              )}
            </XcOverlays>
          </XcMap>
        </div>
      </div>
      <CodeBlock title="Overlay 코드" code={[
  '<XcOverlays>',
  '  <overlay.OverlayComponent xcMap={xcMap} position={coordinate}>',
  '    <div className="popup-card">',
  '      <h4>{data.name}</h4>',
  '      <p>상태: {data.status}</p>',
  '    </div>',
  '  </overlay.OverlayComponent>',
  '</XcOverlays>',
].join('\n')} />
    </div>
  )
}
export default BasicOverlaySample