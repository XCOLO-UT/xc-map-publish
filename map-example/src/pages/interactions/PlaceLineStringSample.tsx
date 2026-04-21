import CodeBlock from '../../components/CodeBlock'

const PlaceLineStringSample = () => (
  <div className="sample-page">
    <h2>라인 그리기</h2>
    <p className="description">layer.PlaceLineString으로 지도 위에 사용자가 라인을 직접 그립니다.</p>
    <CodeBlock title="PlaceLineString 코드" code={[
  '<layer.PlaceLineString',
  '  xcMap={xcMap}',
  '  layerName="drawLine"',
  '  isActive={true}',
  '  strokeColor="#FF4500"',
  '  strokeWidth={3}',
  '  onDrawEnd={(coordinates) => {',
  '    console.log(\'그려진 좌표:\', coordinates)',
  '  }}',
  '/>',
].join('\n')} />
    <h3 style={{ marginTop: 24, marginBottom: 12 }}>Props</h3>
    <table className="props-table">
      <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td>isActive</td><td>boolean</td><td>그리기 활성화/비활성화</td></tr>
        <tr><td>strokeColor</td><td>string</td><td>라인 색상</td></tr>
        <tr><td>strokeWidth</td><td>number</td><td>라인 두께</td></tr>
        <tr><td>onDrawEnd</td><td>(coords) =&gt; void</td><td>그리기 완료 콜백</td></tr>
      </tbody>
    </table>
  </div>
)
export default PlaceLineStringSample