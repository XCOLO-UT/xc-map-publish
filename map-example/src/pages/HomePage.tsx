import { useNavigate } from 'react-router-dom'

const categories = [
  { icon: '📌', title: '기본 설정', count: '3 예시', path: '/getting-started/init' },
  { icon: '🗺️', title: '레이어', count: '6 예시', path: '/layers/xyz' },
  { icon: '🎨', title: '스타일', count: '6 예시', path: '/styling/feature' },
  { icon: '🖱️', title: '인터랙션', count: '5 예시', path: '/interactions/select' },
  { icon: '📐', title: '측정 도구', count: '4 예시', path: '/measurement/distance' },
  { icon: '💬', title: '오버레이', count: '2 예시', path: '/overlays/basic' },
  { icon: '🔧', title: '유틸리티', count: '3 예시', path: '/utilities/feature-collection' },
  { icon: '🔗', title: '통합 예시', count: '2 예시', path: '/integrated/signal' },
]

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>xc-map Examples</h1>
        <p>
          OpenLayers 10.x 기반 React 지도 라이브러리의 모든 기능을
          도메인별로 분류한 대화형 예시 갤러리입니다.
        </p>
      </div>

      <div className="home-cards">
        {categories.map(cat => (
          <div
            key={cat.title}
            className="home-card"
            onClick={() => navigate(cat.path)}
          >
            <div className="card-icon">{cat.icon}</div>
            <div className="card-title">{cat.title}</div>
            <div className="card-count">{cat.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
