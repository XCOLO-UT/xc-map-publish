import CodeBlock from '../../components/CodeBlock'

const FeatureStyleSample = () => {
  return (
    <div className="sample-page">
      <h2>FeatureStyle 시스템</h2>
      <p className="description">
        IFeatureStyle은 xc-map의 핵심 스타일 시스템입니다.
        featureName을 키로 하여 FeatureType과 상태별(event) 스타일을 매핑합니다.
        모든 레이어 컴포넌트는 이 시스템을 기반으로 Feature를 렌더링합니다.
      </p>

      <CodeBlock title="IFeatureStyle 구조" code={`interface IFeatureStyle {
  [featureName: string]: {
    type: FeatureType       // 'marker' | 'point' | 'vector' | 'polygon' | 'polyline' | 'stripe'
    event: IFeatureEvent[]  // 상태별 스타일 배열
  }
}

interface IFeatureEvent {
  status: string            // 'default' | 'selected' | 'abnormal' | 커스텀
  style: IStyleConfig       // 해당 상태의 스타일 설정
}

// 스타일 설정 (타입에 따라 필요한 속성이 다름)
interface IStyleConfig {
  // 모든 타입
  zIndex?: number
  label?: IInfoStyle           // 텍스트 라벨

  // marker 타입
  image?: { src: string, width: number, height: number }
  animation?: IAnimationStyle  // 마커 웨이브 효과

  // point 타입
  radius?: number

  // vector / polygon / polyline 공통
  fill?: { color: string }
  stroke?: { color: string, width: number, lineDash?: number[] }

  // stripe 타입
  stripe?: { color: string, width: number, gap: number }

  // arrow (라인에 방향 화살표)
  arrow?: { color: string, size: number, interval: number }
}`} />

      <CodeBlock title="featureStyle 예시 (19종)" code={`const featureStyle: IFeatureStyle = {
  // ── 마커 타입 (아이콘 기반) ──
  'sig':   { type: 'marker', event: [
    { status: 'default',  style: { image: { src: sig_default,  w: 30, h: 30 } } },
    { status: 'selected', style: { image: { src: sig_selected, w: 30, h: 30 } } },
    { status: 'abnormal', style: { image: { src: sig_abnormal, w: 30, h: 30 } } },
  ]},
  'cctv':  { type: 'marker', event: [...] },
  'vds':   { type: 'marker', event: [...] },
  'dms':   { type: 'marker', event: [...] },

  // ── 벡터 타입 (면/선 기반) ──
  'trafficLink': { type: 'vector', event: [
    { status: 'default',  style: { fill: { color: '#999' }, stroke: { color: '#999', width: 5 } } },
    { status: 'selected', style: { fill: { color: '#0034FF' }, stroke: { color: '#FFF', width: 2 } } },
    { status: '1',        style: { fill: { color: '#86ED00' }, ... } },  // 원활
    { status: '2',        style: { fill: { color: '#F9E100' }, ... } },  // 서행
    { status: '3',        style: { fill: { color: '#FF992A' }, ... } },  // 정체
    { status: '4',        style: { fill: { color: '#FF1E00' }, ... } },  // 심한정체
  ]},

  // ── 줄무늬 타입 ──
  'crosswalk': { type: 'stripe', event: [
    { status: 'default',  style: { stripe: { color: '#FFF', width: 14, gap: 12 } } },
    { status: 'selected', style: { stripe: { color: '#FFD700', width: 14, gap: 12 } } },
  ]},
}`} />
    </div>
  )
}

export default FeatureStyleSample
