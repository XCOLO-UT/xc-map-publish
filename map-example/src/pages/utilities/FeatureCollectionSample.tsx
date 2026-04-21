import CodeBlock from '../../components/CodeBlock'

const FeatureCollectionSample = () => (
  <div className="sample-page">
    <h2>toFeatureCollection</h2>
    <p className="description">배열 데이터를 GeoJSON FeatureCollection으로 변환하는 유틸리티 함수입니다.</p>
    <CodeBlock title="사용법" code={[
  'import { toFeatureCollection } from \'xc-map\'',
  '',
  '// 원본 배열 데이터 (API 응답 등)',
  'const rawData = [',
  '  { id: 1, geom: \'POINT(126.731 37.363)\', name: \'교차로A\' },',
  '  { id: 2, geom: { type: \'Point\', coordinates: [126.735, 37.365] }, name: \'교차로B\' },',
  ']',
  '',
  '// GeoJSON FeatureCollection으로 변환',
  'const featureCollection = toFeatureCollection(rawData, {',
  '  geomField: \'geom\',  // WKT 또는 GeoJSON geometry 필드',
  '  idField: \'id\',       // Feature ID로 사용할 필드',
  '})',
  '',
  '// 결과: { type: \'FeatureCollection\', features: [...] }',
  '// → layer.GeoJson의 data prop에 전달',
].join('\n')} />
    <CodeBlock title="지원 형식" code={[
  '// 1. WKT 형식',
  '{ geom: \'POINT(126.731 37.363)\' }',
  '{ geom: \'MULTILINESTRING((...))\' }',
  '{ geom: \'POLYGON((...))\' }',
  '',
  '// 2. GeoJSON Geometry 형식',
  '{ geom: { type: \'Point\', coordinates: [126.731, 37.363] } }',
  '',
  '// 3. 좌표 필드 분리',
  '// geomField를 쓰지 않고 개별 좌표 필드 사용 가능',
].join('\n')} />
  </div>
)
export default FeatureCollectionSample