import CodeBlock from '../../components/CodeBlock'

const MapFunctionsSample = () => (
  <div className="sample-page">
    <h2>useXcMapFunctions</h2>
    <p className="description">지도 조작을 위한 유틸리티 함수 모음입니다.</p>
    <CodeBlock title="사용법" code={[
  'import { useXcMapFunctions } from \'xc-map\'',
  '',
  'const {',
  '  animateMove,    // 부드러운 이동',
  '  getCenter,      // 현재 중심 좌표',
  '  setZoomLevel,   // 줌 레벨 설정',
  '  onMove,         // 이동 이벤트 리스너',
  '  onDrag,         // 드래그 이벤트 리스너',
  '} = useXcMapFunctions(xcMap)',
  '',
  '// 부드러운 이동',
  'animateMove([126.730, 37.363], { duration: 1000, zoom: 17 })',
  '',
  '// 현재 중심 좌표 가져오기',
  'const [lon, lat] = getCenter()',
  '',
  '// 줌 레벨 설정',
  'setZoomLevel(18)',
  '',
  '// 이동 이벤트',
  'onMove((center, zoom) => {',
  '  console.log(\'이동:\', center, zoom)',
  '})',
].join('\n')} />
    <h3 style={{ marginTop: 24, marginBottom: 12 }}>함수 목록</h3>
    <table className="props-table">
      <thead><tr><th>함수</th><th>인자</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td>animateMove</td><td>(coord, options?)</td><td>애니메이션 이동 (zoom, duration)</td></tr>
        <tr><td>getCenter</td><td>()</td><td>현재 중심 좌표 [lon, lat] 반환</td></tr>
        <tr><td>setZoomLevel</td><td>(level)</td><td>줌 레벨 즉시 변경</td></tr>
        <tr><td>onMove</td><td>(callback)</td><td>지도 이동 완료 이벤트 리스너</td></tr>
        <tr><td>onDrag</td><td>(callback)</td><td>지도 드래그 이벤트 리스너</td></tr>
      </tbody>
    </table>
  </div>
)
export default MapFunctionsSample