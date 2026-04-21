import CodeBlock from '../../components/CodeBlock'

const MapOptionsSample = () => {
  return (
    <div className="sample-page">
      <h2>지도 옵션 설정</h2>
      <p className="description">
        IXcMapOption은 viewOption(지도 뷰 설정)과 featureStyle(Feature 스타일 매핑) 두 가지 핵심 속성으로 구성됩니다.
      </p>

      <CodeBlock title="IXcMapOption 전체 구조" code={`const xcMapOption: IXcMapOption = {
  // 1. 지도 뷰 설정
  viewOption: {
    center: [126.730, 37.363],  // [경도, 위도] EPSG:4326
    zoom: 15,                    // 초기 줌 레벨
    maxZoom: 21,                 // 최대 줌
    minZoom: 7,                  // 최소 줌
    multiWorld: true,            // 지도 반복 표시
    constrainResolution: false,  // 줌 단계 제한
  },

  // 2. Feature 스타일 매핑
  featureStyle: {
    'featureName': {             // featureName별 스타일 정의
      type: 'marker',            // FeatureType: marker|point|vector|polygon|polyline|stripe
      event: [
        {
          status: 'default',     // 상태 이름
          style: {               // 해당 상태의 스타일
            image: { src: iconUrl, width: 30, height: 30 },
            fill: { color: '#e00' },
            stroke: { color: '#000', width: 2 },
          },
        },
        { status: 'selected', style: { ... } },
        { status: 'abnormal', style: { ... } },
      ],
    },
  },
}`} />

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>FeatureType 종류</h3>
      <table className="props-table">
        <thead><tr><th>Type</th><th>용도</th><th>주요 스타일 속성</th></tr></thead>
        <tbody>
          <tr><td>marker</td><td>아이콘 마커</td><td>image: {'{src, width, height}'}</td></tr>
          <tr><td>point</td><td>원형 점</td><td>radius, fill, stroke</td></tr>
          <tr><td>vector</td><td>벡터(면+선)</td><td>fill, stroke</td></tr>
          <tr><td>polygon</td><td>다각형</td><td>fill, stroke</td></tr>
          <tr><td>polyline</td><td>라인</td><td>stroke</td></tr>
          <tr><td>stripe</td><td>줄무늬 패턴</td><td>stripe: {'{color, width, gap}'}</td></tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>확장 스타일 속성</h3>
      <table className="props-table">
        <thead><tr><th>속성</th><th>Type</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>arrow</td><td>{'{color, size, interval}'}</td><td>라인 위 방향 화살표</td></tr>
          <tr><td>zIndex</td><td>number</td><td>Feature 렌더링 순서</td></tr>
          <tr><td>label</td><td>IInfoStyle</td><td>Feature 라벨 스타일</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default MapOptionsSample
