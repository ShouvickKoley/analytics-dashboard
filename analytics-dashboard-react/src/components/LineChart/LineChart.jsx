import { useId, useMemo } from 'react'
import styles from './LineChart.module.css'

const WIDTH = 560
const HEIGHT = 180
const PAD_LEFT = 32
const PAD_RIGHT = 10
const PAD_TOP = 16
const PAD_BOTTOM = 26

export default function LineChart({ labels, values, unit, title, description }) {
  const titleId = useId()
  const descId = useId()

  const { path, area, points, gridLines } = useMemo(() => {
    const chartW = WIDTH - PAD_LEFT - PAD_RIGHT
    const chartH = HEIGHT - PAD_TOP - PAD_BOTTOM
    const min = Math.min(...values) - 2
    const max = Math.max(...values) + 2

    const pts = values.map((v, i) => {
      const x = PAD_LEFT + (i / (values.length - 1)) * chartW
      const y = PAD_TOP + chartH - ((v - min) / (max - min)) * chartH
      return { x, y, v, label: labels[i] }
    })

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
    const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)},${PAD_TOP + chartH} L ${pts[0].x.toFixed(1)},${PAD_TOP + chartH} Z`
    const grid = [0, 1, 2, 3].map((g) => PAD_TOP + (g / 3) * chartH)

    return { path: linePath, area: areaPath, points: pts, gridLines: grid }
  }, [values, labels])

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className={styles.svg}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>

      {gridLines.map((y, i) => (
        <line key={i} x1={PAD_LEFT} y1={y} x2={WIDTH - PAD_RIGHT} y2={y} className={styles.gridLine} />
      ))}

      <path d={area} className={styles.area} />
      <path d={path} className={styles.line} />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" className={styles.point}>
            <title>
              {p.label}: {p.v} {unit}
            </title>
          </circle>
          <text x={p.x} y={HEIGHT - 6} textAnchor="middle" className={styles.axisLabel}>
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
