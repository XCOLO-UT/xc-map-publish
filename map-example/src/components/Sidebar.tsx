import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface MenuItem {
  label: string
  path?: string
  badge?: string
  children?: MenuItem[]
  icon?: string
}

const menuData: MenuItem[] = [
  { label: '홈', path: '/', icon: '🏠' },
  {
    label: '기본 설정', icon: '📌',
    children: [
      { label: '지도 초기화', path: '/getting-started/init' },
      { label: '지도 옵션', path: '/getting-started/options' },
      { label: 'VWorld 타일 변경', path: '/getting-started/tile' },
    ],
  },
  {
    label: '레이어', icon: '🗺️',
    children: [
      { label: 'XYZ 타일', path: '/layers/xyz' },
      { label: 'WFS 벡터', path: '/layers/wfs' },
      { label: '마커 (Marker)', path: '/layers/marker' },
      { label: 'GeoJSON', path: '/layers/geojson', badge: 'NEW' },
      { label: '미니맵', path: '/layers/minimap' },
      { label: '레이어 공통', path: '/layers/common' },
    ],
  },
  {
    label: '스타일', icon: '🎨',
    children: [
      { label: 'FeatureStyle 시스템', path: '/styling/feature' },
      { label: '상태별 스타일', path: '/styling/status' },
      { label: '줄무늬 패턴 (Stripe)', path: '/styling/stripe', badge: 'NEW' },
      { label: '방향 화살표 (Arrow)', path: '/styling/arrow', badge: 'NEW' },
      { label: '마커 애니메이션', path: '/styling/animation' },
      { label: '커스텀 라벨 (renderLabel)', path: '/styling/render-label', badge: 'NEW' },
    ],
  },
  {
    label: '인터랙션', icon: '🖱️',
    children: [
      { label: 'Feature 선택', path: '/interactions/select' },
      { label: 'Feature 선택 (고급)', path: '/interactions/select-advanced' },
      { label: '호버 툴팁', path: '/interactions/tooltip' },
      { label: '마커 배치 (PlaceMarker)', path: '/interactions/place-marker' },
      { label: '라인 그리기', path: '/interactions/draw-line' },
    ],
  },
  {
    label: '측정 도구', icon: '📐',
    children: [
      { label: '거리 측정', path: '/measurement/distance', badge: 'NEW' },
      { label: '면적 측정', path: '/measurement/area', badge: 'NEW' },
      { label: '스타일 커스터마이징', path: '/measurement/style' },
      { label: '커스텀 팝업', path: '/measurement/popup' },
    ],
  },
  {
    label: '오버레이', icon: '💬',
    children: [
      { label: '기본 팝업', path: '/overlays/basic' },
      { label: 'React 컴포넌트 팝업', path: '/overlays/react' },
    ],
  },
  {
    label: '유틸리티', icon: '🔧',
    children: [
      { label: 'toFeatureCollection', path: '/utilities/feature-collection' },
      { label: 'applyOpacityToColor', path: '/utilities/color' },
      { label: 'useXcMapFunctions', path: '/utilities/map-functions' },
    ],
  },
  {
    label: '통합 예시', icon: '🔗',
    children: [
      { label: '신호등 모니터링', path: '/integrated/signal' },
      { label: '교통 링크', path: '/integrated/traffic' },
    ],
  },
]

const Sidebar = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    menuData.forEach(item => {
      if (item.children) initial[item.label] = true
    })
    return initial
  })

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>xc-map Examples</h1>
        <div className="version">v0.3.1 · OpenLayers 10.x</div>
      </div>
      <nav className="sidebar-nav">
        {menuData.map(item => {
          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.path!}
                className={({ isActive }) => `menu-item${isActive ? ' active' : ''}`}
                end
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          }

          const isOpen = openGroups[item.label] ?? true

          return (
            <div className="menu-group" key={item.label}>
              <div className="menu-group-title" onClick={() => toggleGroup(item.label)}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className={`arrow${isOpen ? ' open' : ''}`}>▶</span>
              </div>
              {isOpen && (
                <div className="menu-group-items">
                  {item.children.map(child => (
                    <NavLink
                      key={child.path}
                      to={child.path!}
                      className={({ isActive }) => `menu-item${isActive ? ' active' : ''}`}
                    >
                      <span>{child.label}</span>
                      {child.badge && <span className="badge">{child.badge}</span>}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
