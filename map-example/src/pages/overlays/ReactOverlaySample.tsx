import CodeBlock from '../../components/CodeBlock'

const ReactOverlaySample = () => (
  <div className="sample-page">
    <h2>React 컴포넌트 팝업</h2>
    <p className="description">React children으로 동적 팝업 컨텐츠를 구성합니다. 차트, 테이블, 인터랙티브 UI를 팝업 안에 넣을 수 있습니다.</p>
    <CodeBlock title="React 팝업 예시" code={[
  '<overlay.OverlayComponent',
  '  xcMap={xcMap}',
  '  position={coordinate}',
  '  offset={[0, -15]}       // 오프셋 [x, y]',
  '  positioning="bottom-center"',
  '>',
  '  {/* 어떤 React 컴포넌트든 가능 */}',
  '  <SignalDetailPopup',
  '    sigId={selectedSig.id}',
  '    onClose={() => setPopup(null)}',
  '    onRoute={() => calculateRoute(selectedSig)}',
  '  >',
  '    <SignalStatusChart data={statusHistory} />',
  '  </SignalDetailPopup>',
  '</overlay.OverlayComponent>',
].join('\n')} />
    <h3 style={{ marginTop: 24, marginBottom: 12 }}>OverlayComponent Props</h3>
    <table className="props-table">
      <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td>xcMap</td><td>ReturnType&lt;useXcMap&gt;</td><td>Map 인스턴스</td></tr>
        <tr><td>position</td><td>number[]</td><td>오버레이 좌표 [lon, lat]</td></tr>
        <tr><td>offset</td><td>[number, number]</td><td>픽셀 오프셋</td></tr>
        <tr><td>positioning</td><td>string</td><td>앵커 포지셔닝 (bottom-center 등)</td></tr>
        <tr><td>children</td><td>ReactNode</td><td>팝업 컨텐츠</td></tr>
      </tbody>
    </table>
  </div>
)
export default ReactOverlaySample