import CodeBlock from '../../components/CodeBlock'

const AreaMeasureSample = () => (
  <div className="sample-page">
    <h2>면적 측정</h2>
    <p className="description">Polygon과 Circle 타입으로 면적과 반경을 측정합니다.</p>
    <CodeBlock title="면적/반경 측정" code={[
  '// Polygon 면적 측정',
  'measurementRef.current.setMeasureType(\'Polygon\')',
  '',
  '// Circle 반경 측정',
  'measurementRef.current.setMeasureType(\'Circle\')',
  '',
  '// 결과: "면적: 1,234.56 m²" 또는 "반경: 100.0 m"',
].join('\n')} />
    <CodeBlock title="측정 타입별 동작" code={[
  'type MeasureType = \'\' | \'LineString\' | \'Polygon\' | \'Circle\'',
  '',
  '// \'\'       → 측정 비활성화',
  '// \'LineString\' → 거리 측정 (더블클릭으로 완료)',
  '// \'Polygon\'    → 면적 측정 (더블클릭으로 닫기)',
  '// \'Circle\'     → 반경 측정 (드래그로 원 그리기)',
].join('\n')} />
  </div>
)
export default AreaMeasureSample