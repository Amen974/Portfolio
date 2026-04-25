
interface Claude {
  size?: number
  animate?: boolean
}

const Claude = ({size = 10}: Claude) => {
  return (
    <svg viewBox="0 0 200 200" style={{ width: `${size}vw`, height: `${size}vw` }}>
  <g transform="translate(100, 100)">
    <line x1="0" y1="0" x2="0" y2="-90" stroke="#da7756" strokeWidth="18" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="40" y2="-75" stroke="#da7756" strokeWidth="12" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="75" y2="-40" stroke="#da7756" strokeWidth="16" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="85" y2="10" stroke="#da7756" strokeWidth="10" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="60" y2="65" stroke="#da7756" strokeWidth="18" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="20" y2="80" stroke="#da7756" strokeWidth="12" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="-30" y2="85" stroke="#da7756" strokeWidth="16" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="-70" y2="55" stroke="#da7756" strokeWidth="10" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="-80" y2="0" stroke="#da7756" strokeWidth="18" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="-75" y2="-45" stroke="#da7756" strokeWidth="14" strokeLinecap="round"/>
    <line x1="0" y1="0" x2="-40" y2="-70" stroke="#da7756" strokeWidth="10" strokeLinecap="round"/>
  </g>
</svg>
  )
}

export default Claude