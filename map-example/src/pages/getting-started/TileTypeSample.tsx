import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, layer, IXcMapOption,
} from 'xc-map'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

type TileType = 'Base' | 'Satellite' | 'Hybrid' | 'midnight'

const TileTypeSample = () => {
  const [currentTile, setCurrentTile] = useState<TileType>('Base')

  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {},
  }

  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl, setTileType } = useVworldUrl(VWORLD_KEY, 'Base', 'Base')

  const handleTileChange = (type: TileType) => {
    setTileType(type)
    setCurrentTile(type)
  }

  const tiles: { type: TileType; label: string; emoji: string }[] = [
    { type: 'Base', label: '일반', emoji: '🗺️' },
    { type: 'Satellite', label: '위성', emoji: '🛰️' },
    { type: 'Hybrid', label: '하이브리드', emoji: '🌐' },
    { type: 'midnight', label: '다크모드', emoji: '🌙' },
  ]

  return (
    <div className="sample-page">
      <h2>VWorld 타일 변경</h2>
      <p className="description">
        useVworldUrl 훅의 setTileType 함수로 배경 지도 타일을 실시간 변경합니다.
        Base(일반), Satellite(위성), Hybrid(하이브리드), midnight(다크모드) 4종을 지원합니다.
      </p>

      <div className="control-panel">
        <span className="label">타일 타입</span>
        <div className="toggle-group">
          {tiles.map(t => (
            <button
              key={t.type}
              className={`toggle-item${currentTile === t.type ? ' active' : ''}`}
              onClick={() => handleTileChange(t.type)}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
            </XcLayers>
          </XcMap>
        </div>
        <div className="status-bar">현재: {currentTile}</div>
      </div>

      <CodeBlock
        title="타일 타입 변경 코드"
        code={`const { vworldUrl, setTileType } = useVworldUrl(
  'YOUR_API_KEY',
  'Base',       // 기본 타일
  'Base'        // 미니맵 타일
)

// 타일 변경
setTileType('midnight')  // 다크모드로
setTileType('Satellite') // 위성으로`}
      />
    </div>
  )
}

export default TileTypeSample
