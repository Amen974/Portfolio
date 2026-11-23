import { ACCENT, CLAUDE_RAYS, svgSize } from "./svg"

interface ClaudeProps {
  size?: number
}

const Claude = ({ size = 10 }: ClaudeProps) => {
  return (
    <svg viewBox="0 0 200 200" style={svgSize(size)} aria-hidden="true" focusable="false">
      <g transform="translate(100 100)">
        {CLAUDE_RAYS.map(({ angle, length, width }) => (
          <line
            key={angle}
            x1="0"
            y1="0"
            x2="0"
            y2={-length}
            stroke={ACCENT}
            strokeWidth={width}
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  )
}

export default Claude
