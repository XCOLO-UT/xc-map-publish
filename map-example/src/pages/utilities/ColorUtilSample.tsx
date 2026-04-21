import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { applyOpacityToColor } from 'xc-map'

const ColorUtilSample = () => {
  const [baseColor, setBaseColor] = useState('#4f8cff')
  const [opacity, setOpacity] = useState(0.5)
  const result = applyOpacityToColor(baseColor, opacity)

  const codeStr = [
    "import { applyOpacityToColor } from 'xc-map'",
    '',
    "const result = applyOpacityToColor('#4f8cff', 0.5)",
    "// result: 'rgba(79, 140, 255, 0.5)'",
  ].join('\n')

  return (
    <div className="sample-page">
      <h2>applyOpacityToColor</h2>
      <p className="description">색상 문자열에 투명도를 적용하여 rgba 값을 반환하는 유틸리티입니다.</p>

      <div className="control-panel">
        <span className="label">색상</span>
        <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} />
        <span className="label">Opacity</span>
        <input type="range" min="0" max="100" value={opacity * 100}
          onChange={e => setOpacity(Number(e.target.value) / 100)} style={{ width: 120 }} />
        <span style={{ color: 'var(--accent-blue)', fontSize: 13 }}>{opacity}</span>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 120, height: 80, background: baseColor, borderRadius: 8, display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600 }}>
          원본
        </div>
        <div style={{ width: 120, height: 80, background: result as string, borderRadius: 8, display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600,
          border: '1px solid var(--border-color)' }}>
          결과: {opacity}
        </div>
      </div>

      <CodeBlock title="코드" code={codeStr} />
    </div>
  )
}

export default ColorUtilSample