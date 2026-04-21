import CodeBlock from '../../components/CodeBlock'

const FeatureSelectAdvSample = () => (
  <div className="sample-page">
    <h2>Feature 선택 (고급)</h2>
    <p className="description">multiple 선택, defaultValue 초기 선택, 프로그래밍 방식 select/deSelect API를 사용합니다.</p>
    <CodeBlock title="고급 선택 옵션" code={[
  '<interaction.FeatureSelect',
  '  xcMap={xcMap}',
  '  layerName="marker"',
  '  layerTag="tag"',
  '  useSelectStyle={true}',
  '  multiple={true}                    // 다중 선택 허용',
  '  defaultValue={[\'SIG001\', \'SIG002\']} // 초기 선택 ID 배열',
  '  isDeselectOnClickAway={true}',
  '  isMoveCenterOnClick={true}         // 클릭 시 중심 이동',
  '  onSelectionChange={(layerName, datas, featureName) => {',
  '    console.log(\'현재 선택:\', datas)',
  '  }}',
  '/>',
  '',
  '// Imperative API',
  'selectRef.current.select(\'SIG003\')   // 프로그래밍 방식 선택',
  'selectRef.current.deSelect(\'SIG001\') // 프로그래밍 방식 해제',
  'selectRef.current.deSelectAll()      // 전체 해제',
].join('\n')} />
    <h3 style={{ marginTop: 24, marginBottom: 12 }}>고급 Props</h3>
    <table className="props-table">
      <thead><tr><th>Prop</th><th>Type</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td>multiple</td><td>boolean</td><td>다중 선택 허용</td></tr>
        <tr><td>defaultValue</td><td>string[]</td><td>초기 선택 Feature ID 목록</td></tr>
        <tr><td>isMoveCenterOnClick</td><td>boolean</td><td>클릭 시 지도 중심 이동</td></tr>
        <tr><td>getFeatureTypeStyle</td><td>function</td><td>지오메트리별 동적 선택 스타일</td></tr>
        <tr><td>onSelectionChange</td><td>function</td><td>선택 변경 콜백</td></tr>
      </tbody>
    </table>
  </div>
)
export default FeatureSelectAdvSample