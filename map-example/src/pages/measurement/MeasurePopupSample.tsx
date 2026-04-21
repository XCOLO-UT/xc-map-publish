import CodeBlock from '../../components/CodeBlock'

const MeasurePopupSample = () => (
  <div className="sample-page">
    <h2>커스텀 측정 팝업</h2>
    <p className="description">renderPopup prop으로 측정 완료 시 표시되는 팝업을 커스텀합니다.</p>
    <CodeBlock title="커스텀 팝업 렌더링" code={[
  '<interaction.Measurement',
  '  ref={measurementRef}',
  '  xcMap={xcMap}',
  '  isShowPopupUI={false}  // 기본 팝업 비활성화',
  '  renderPopup={(result) => (',
  '    <div className="custom-popup">',
  '      <h4>측정 결과</h4>',
  '      <p>거리: {result.distance}</p>',
  '      <p>면적: {result.area}</p>',
  '      <button onClick={result.onClose}>닫기</button>',
  '      <button onClick={result.onDelete}>삭제</button>',
  '    </div>',
  '  )}',
  '/>',
].join('\n')} />
    <h3 style={{ marginTop: 24, marginBottom: 12 }}>renderPopup 인자</h3>
    <table className="props-table">
      <thead><tr><th>속성</th><th>Type</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td>distance</td><td>string</td><td>포맷된 거리 문자열</td></tr>
        <tr><td>area</td><td>string</td><td>포맷된 면적 문자열</td></tr>
        <tr><td>onClose</td><td>() =&gt; void</td><td>팝업 닫기 함수</td></tr>
        <tr><td>onDelete</td><td>() =&gt; void</td><td>측정 삭제 함수</td></tr>
      </tbody>
    </table>
  </div>
)
export default MeasurePopupSample