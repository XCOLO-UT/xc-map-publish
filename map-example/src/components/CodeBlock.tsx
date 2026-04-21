import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  title?: string
  code: string
  language?: string
}

const CodeBlock = ({ title, code, language = 'tsx' }: CodeBlockProps) => {
  return (
    <div className="code-section">
      {title && (
        <div className="code-title">
          <span>📝</span> {title}
        </div>
      )}
      <div className="code-block-wrapper">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '16px',
            fontSize: '13px',
            lineHeight: '1.6',
            background: 'transparent',
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
