import CodeBlock from '../../components/CodeBlock'

const MeasureStyleSample = () => (
  <div className="sample-page">
    <h2>측정 스타일 커스터마이징</h2>
    <p className="description">measurementStyles prop으로 측정선, 채움, 포인트, 팝업 스타일을 커스텀합니다.</p>
    <CodeBlock title="커스텀 측정 스타일" code={[
  '<interaction.Measurement',
  '  ref={measurementRef}',
  '  xcMap={xcMap}',
  '  measurementStyles={{',
  '    lineColor: \'#FF6B6B\',          // 측정선 색상',
  '    lineWidth: 3,                   // 측정선 두께',
  '    fillColor: \'rgba(255,107,107,0.2)\', // 채움 색상',
  '    pointColor: \'#FFD700\',         // 포인트 색상',
  '    pointRadius: 5,                 // 포인트 반경',
  '    segmentFontSize: 12,           // 구간 텍스트 크기',
  '    segmentFontColor: \'#FFF\',      // 구간 텍스트 색상',
  '    totalFontSize: 14,             // 합계 텍스트 크기',
  '    totalFontColor: \'#FFD700\',     // 합계 텍스트 색상',
  '  }}',
  '/>',
].join('\n')} />
  </div>
)
export default MeasureStyleSample