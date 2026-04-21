import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions, XcOverlays,
  layer, interaction, overlay, IXcMapOption, IMarker } from 'xc-map'
import SigDefault from '../../assets/icons/map/sig_default.svg'
import SigSelected from '../../assets/icons/map/sig_selected.svg'
import SigAbnormal from '../../assets/icons/map/sig_abnormal.svg'
import CctvDefault from '../../assets/icons/map/cctv_default.svg'
import CctvSelected from '../../assets/icons/map/cctv_selected.svg'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const TrafficSignalSample = () => {
  const [popupData, setPopupData] = useState<any>(null)
  const [popupCoord, setPopupCoord] = useState<number[] | null>(null)

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {
      'sig': { type: 'marker', event: [
        { status: 'default', style: { image: { height: 30, width: 30, src: SigDefault } } },
        { status: 'selected', style: { image: { height: 35, width: 35, src: SigSelected } } },
        { status: 'abnormal', style: { image: { height: 30, width: 30, src: SigAbnormal },
          animation: { color: 'rgba(255,0,0,0.6)', width: 2, radius: 25, duration: 1500 } } },
      ]},
      'cctv': { type: 'marker', event: [
        { status: 'default', style: { image: { height: 28, width: 28, src: CctvDefault } } },
        { status: 'selected', style: { image: { height: 42, width: 42, src: CctvSelected } } },
      ]},
    },
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  const markers: IMarker<any>[] = [
    { id: 'S1', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '시흥시 정왕동 교차로', deviceType: '신호제어기', status: '정상', lastUpdate: '2024-01-15 10:30' },
      coordinate: { longitude: 126.731, latitude: 37.363 } },
    { id: 'S2', type: 'marker', featureName: 'sig', status: 'abnormal',
      value: { name: '시흥시 배곧 교차로', deviceType: '신호제어기', status: '통신이상', lastUpdate: '2024-01-15 10:25' },
      coordinate: { longitude: 126.735, latitude: 37.365 } },
    { id: 'S3', type: 'marker', featureName: 'sig', status: 'default',
      value: { name: '목감 교차로', deviceType: '신호제어기', status: '정상', lastUpdate: '2024-01-15 10:30' },
      coordinate: { longitude: 126.728, latitude: 37.361 } },
    { id: 'C1', type: 'marker', featureName: 'cctv', status: 'default',
      value: { name: 'CCTV 정왕동', deviceType: 'CCTV', status: '녹화중' },
      coordinate: { longitude: 126.725, latitude: 37.360 } },
    { id: 'C2', type: 'marker', featureName: 'cctv', status: 'default',
      value: { name: 'CCTV 배곧', deviceType: 'CCTV', status: '녹화중' },
      coordinate: { longitude: 126.733, latitude: 37.367 } },
  ]

  return (
    <div className="sample-page">
      <h2>신호등 모니터링 (통합 예시)</h2>
      <p className="description">
        Marker + FeatureSelect + Overlay + Animation을 조합한 실무 통합 예시입니다.
        신호제어기(sig)와 CCTV(cctv)를 표시하고, 이상 장비에 웨이브 애니메이션, 클릭 시 상세 팝업을 제공합니다.
      </p>
      <div className="map-container" style={{ height: 600 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
              <layer.Marker xcMap={xcMap} markers={markers} layerName="signalMarker"
                layerTag="signalTag" zIndex={15} visible={true} />
            </XcLayers>
            <XcInteractions>
              <interaction.FeatureSelect
                xcMap={xcMap} layerName="signalMarker" layerTag="signalTag"
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
                  <div style={{ background: '#1e2130', border: '1px solid #2a2d3e', borderRadius: 10,
                    padding: '16px 20px', color: '#e4e6f0', fontSize: 13, minWidth: 240,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{popupData.name}</span>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4,
                        background: popupData.status === '정상' ? '#34d399' : '#f87171', color: '#fff' }}>
                        {popupData.status}
                      </span>
                    </div>
                    <div style={{ color: '#9498b0', fontSize: 12, lineHeight: 1.8 }}>
                      <div>장비유형: {popupData.deviceType}</div>
                      {popupData.lastUpdate && <div>최종갱신: {popupData.lastUpdate}</div>}
                    </div>
                    <button onClick={() => { setPopupData(null); setPopupCoord(null) }}
                      style={{ marginTop: 10, width: '100%', padding: '6px', fontSize: 12,
                        background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      닫기
                    </button>
                  </div>
                </overlay.OverlayComponent>
              )}
            </XcOverlays>
          </XcMap>
        </div>
      </div>
      <CodeBlock title="통합 패턴" code={[
        '// 1. Marker: 장비 위치 표시',
        '// 2. FeatureSelect: 클릭 이벤트 처리',
        '// 3. Overlay: 상세 팝업 표시',
        '// 4. Animation: 이상 장비 강조',
        '',
        '<XcMap xcMap={xcMap} xcMapOption={xcMapOption}>',
        '  <XcLayers>',
        '    <layer.Xyz ... />',
        '    <layer.Marker markers={markers} ... />',
        '  </XcLayers>',
        '  <XcInteractions>',
        '    <interaction.FeatureSelect onClick={showPopup} ... />',
        '  </XcInteractions>',
        '  <XcOverlays>',
        '    <overlay.OverlayComponent position={coord}>',
        '      <SignalDetailPopup data={popupData} />',
        '    </overlay.OverlayComponent>',
        '  </XcOverlays>',
        '</XcMap>',
      ].join('\n')} />
    </div>
  )
}
export default TrafficSignalSample