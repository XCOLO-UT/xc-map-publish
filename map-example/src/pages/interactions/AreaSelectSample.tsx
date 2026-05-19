import { useRef, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useXcMap, useVworldUrl, XcMap, XcLayers, XcInteractions,
  layer, interaction, IXcMapOption, ICoordinate,
} from 'xc-map'
import { IAreaSelectApis } from 'xc-map/dist/types/components/interaction/AreaSelect'

const VWORLD_KEY = 'CD3F7039-2DA1-3E89-94F1-5688725D2E84'

const AreaSelectSample = () => {
  // ── Refs ──
  const areaSelectRef = useRef<IAreaSelectApis>(null)

  // ── State ──
  const [areaCoords, setAreaCoords] = useState<ICoordinate[]>([])
  const [maxPointsInput, setMaxPointsInput] = useState<string>('')
  const [isContinuous, setIsContinuous] = useState(false)
  const [isKeepArea, setIsKeepArea] = useState(true)
  const [isClearPrevious, setIsClearPrevious] = useState(true)

  // ── 지도 설정 ──
  const xcMapOption: IXcMapOption = {
    viewOption: { center: [126.730, 37.363], zoom: 15, maxZoom: 21 },
    featureStyle: {},
  }
  const xcMap = useXcMap(xcMapOption)
  const { vworldUrl } = useVworldUrl(VWORLD_KEY, 'midnight', 'Base')

  const maxPoints = maxPointsInput ? parseInt(maxPointsInput, 10) : undefined

  return (
    <div className="sample-page">
      <h2>영역 선택 (AreaSelect)</h2>
      <p className="description">
        지도 위에 다각형을 그려 영역을 선택하고, 꼭짓점 좌표(ICoordinate[])를 반환받습니다.
        <code>maxPoints</code>로 꼭짓점 수를 제한할 수 있습니다 (3=삼각형, 4=사각형).
      </p>

      {/* ── 옵션 컨트롤 ── */}
      <div style={{
        display: 'flex', gap: '16px', flexWrap: 'wrap',
        padding: '12px 16px', background: '#1e1e2e', borderRadius: '8px', marginBottom: '12px',
        alignItems: 'center', fontSize: '13px',
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          maxPoints:
          <input
            type="number" min="3" placeholder="자유"
            value={maxPointsInput}
            onChange={(e) => setMaxPointsInput(e.target.value)}
            style={{
              width: '70px', padding: '4px 8px', background: '#2a2a3e',
              border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '12px',
            }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isContinuous} onChange={e => setIsContinuous(e.target.checked)} />
          연속 그리기
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isKeepArea} onChange={e => setIsKeepArea(e.target.checked)} />
          영역 유지
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isClearPrevious} onChange={e => setIsClearPrevious(e.target.checked)} />
          이전 삭제
        </label>
      </div>

      {/* ── 액션 버튼 ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button className="sample-btn primary" onClick={() => areaSelectRef.current?.start()}>
          🔷 그리기 시작
        </button>
        <button className="sample-btn" onClick={() => areaSelectRef.current?.stop()}>
          ⏹️ 중지
        </button>
        <button className="sample-btn danger" onClick={() => { areaSelectRef.current?.clear(); setAreaCoords([]) }}>
          🗑️ 삭제
        </button>
      </div>

      {/* ── 지도 ── */}
      <div className="map-container">
        <div style={{ height: '100%', width: '100%' }}>
          <XcMap xcMap={xcMap} xcMapOption={xcMapOption}>
            <XcLayers>
              <layer.Xyz url={vworldUrl} xcMap={xcMap} layerName="base" />
            </XcLayers>
            <XcInteractions>
              <interaction.AreaSelect
                ref={areaSelectRef}
                xcMap={xcMap}
                maxPoints={maxPoints}
                isContinuous={isContinuous}
                isKeepArea={isKeepArea}
                isClearPrevious={isClearPrevious}
                areaSelectStyle={{
                  stroke: { color: '#FF6B00', width: 2 },
                  fill: { color: 'rgba(255, 107, 0, 0.15)' },
                  drawing: {
                    stroke: { color: 'rgba(255, 107, 0, 0.5)', width: 1.5 },
                    fill: { color: 'rgba(255, 107, 0, 0.05)' },
                  },
                }}
                onDrawEnd={(coordinates) => {
                  console.log('영역 선택 완료:', coordinates)
                  setAreaCoords(coordinates)
                }}
                onDrawing={(coordinates) => {
                  console.log('그리기 중:', coordinates.length, '점')
                }}
              />
            </XcInteractions>
          </XcMap>
        </div>

        {/* ── 결과 표시 ── */}
        <div className="status-bar" style={{ maxHeight: '120px', overflow: 'auto' }}>
          {areaCoords.length > 0 ? (
            <span>
              📌 선택 영역 ({areaCoords.length}개 꼭짓점) —{' '}
              {areaCoords.map((c, i) =>
                `${i + 1}. [${c.latitude.toFixed(6)}, ${c.longitude.toFixed(6)}]`
              ).join(' | ')}
            </span>
          ) : (
            <span>🔷 그리기 시작 버튼을 누른 후, 지도에서 클릭하여 다각형을 그려보세요</span>
          )}
        </div>
      </div>

      {/* ── Props 설명 ── */}
      <div style={{
        padding: '16px', background: '#1e1e2e', borderRadius: '8px',
        margin: '16px 0', fontSize: '13px', lineHeight: '1.8',
      }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '14px' }}>📋 Props 설명</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444', textAlign: 'left' }}>
              <th style={{ padding: '6px 8px' }}>Prop</th>
              <th style={{ padding: '6px 8px' }}>타입</th>
              <th style={{ padding: '6px 8px' }}>기본값</th>
              <th style={{ padding: '6px 8px' }}>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#FF6B00' }}>maxPoints</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>number?</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>undefined</td>
              <td style={{ padding: '6px 8px' }}>꼭짓점 수 제한 (3=삼각형, 4=사각형, 미설정=자유)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#FF6B00' }}>isContinuous</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>boolean</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>false</td>
              <td style={{ padding: '6px 8px' }}>true: 연속 그리기 / false: 1개 완성 후 자동 stop</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#FF6B00' }}>isKeepArea</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>boolean</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>true</td>
              <td style={{ padding: '6px 8px' }}>true: 영역 유지 / false: 좌표만 반환 후 영역 삭제</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#FF6B00' }}>isClearPrevious</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>boolean</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>true</td>
              <td style={{ padding: '6px 8px' }}>새 그리기 시 이전 영역 자동 삭제 (isKeepArea=true일 때 유효)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#FF6B00' }}>onDrawEnd</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>(coords: ICoordinate[]) =&gt; void</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>필수</td>
              <td style={{ padding: '6px 8px' }}>그리기 완료 시 꼭짓점 좌표 배열 반환</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 8px', color: '#FF6B00' }}>onDrawing</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>(coords: ICoordinate[]) =&gt; void</td>
              <td style={{ padding: '6px 8px', color: '#888' }}>선택</td>
              <td style={{ padding: '6px 8px' }}>그리기 중 실시간 좌표 콜백</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── API 설명 ── */}
      <div style={{
        padding: '16px', background: '#1e1e2e', borderRadius: '8px',
        margin: '0 0 16px', fontSize: '13px', lineHeight: '1.8',
      }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '14px' }}>🔌 APIs (ref)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444', textAlign: 'left' }}>
              <th style={{ padding: '6px 8px' }}>메서드</th>
              <th style={{ padding: '6px 8px' }}>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#4FC3F7' }}>start()</td>
              <td style={{ padding: '6px 8px' }}>Draw 인터랙션을 지도에 추가하여 그리기 시작</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '6px 8px', color: '#4FC3F7' }}>stop()</td>
              <td style={{ padding: '6px 8px' }}>Draw 인터랙션을 제거하여 그리기 중지</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 8px', color: '#4FC3F7' }}>clear()</td>
              <td style={{ padding: '6px 8px' }}>그려진 영역 모두 삭제</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── 코드 예시 ── */}
      <CodeBlock title="기본 사용법" code={`const areaSelectRef = useRef<IAreaSelectApis>(null)

<interaction.AreaSelect
  ref={areaSelectRef}
  xcMap={xcMap}
  maxPoints={4}              // 사각형만 (생략=자유 다각형)
  isContinuous={false}       // 1개 완성 후 자동 stop
  isKeepArea={true}          // 영역 유지
  isClearPrevious={true}     // 새 그리기 시 이전 삭제
  areaSelectStyle={{
    stroke: { color: '#FF6B00', width: 2 },
    fill: { color: 'rgba(255, 107, 0, 0.15)' },
  }}
  onDrawEnd={(coordinates) => {
    console.log('선택 좌표:', coordinates)
    // [{ latitude: 37.xxx, longitude: 126.xxx }, ...]
  }}
/>

// 제어
areaSelectRef.current?.start()  // 그리기 시작
areaSelectRef.current?.stop()   // 그리기 중지
areaSelectRef.current?.clear()  // 영역 삭제`} />

      <CodeBlock title="삼각형 전용 (maxPoints=3)" code={`<interaction.AreaSelect
  ref={areaSelectRef}
  xcMap={xcMap}
  maxPoints={3}  // 3번 클릭 후 자동 완성
  onDrawEnd={(coordinates) => {
    // coordinates.length === 3 (삼각형)
  }}
/>`} />

      <CodeBlock title="좌표만 반환 (영역 삭제)" code={`<interaction.AreaSelect
  ref={areaSelectRef}
  xcMap={xcMap}
  isKeepArea={false}  // 좌표만 반환, 영역 즉시 삭제
  onDrawEnd={(coordinates) => {
    sendToServer(coordinates)
  }}
/>`} />
    </div>
  )
}

export default AreaSelectSample
