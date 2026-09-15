import { useId, useMemo } from 'react'
import styles from './BarChart.module.css'

const WIDTH = 560
const HEIGHT = 220
const PAD_LEFT = 30
const PAD_BOTTOM = 26
const PAD_TOP = 10

/**
 * A grouped bar chart drawn as plain SVG (no charting library). Scales via
 * viewBox, so it stays crisp and correctly proportioned at any container
 * width — from a 320px phone screen up to a wide desktop panel.
 */
export default function BarChart({ labels, seriesA, seriesB, seriesALabel, seriesBLabel, title, description }) {
  const titleId = useId()
  const descId = useId()

  const { bars, gridLines } = useMemo(() => {
    const chartW = WIDTH - PAD_LEFT - 10
    const chartH = HEIGHT - PAD_BOTTOM - PAD_TOP
    const groupW = chartW / labels.length
    const maxVal = Math.max(...seriesA, ...seriesB, 1) * 1.15

    const barsOut = labels.map((label, i) => {
      const x0 = PAD_LEFT + i * groupW
      const barW = groupW * 0.28
      const aH = (seriesA[i] / maxVal) * chartH
      const bH = (seriesB[i] / maxVal) * chartH
      return {
        label,
        ax: x0 + groupW * 0.18,
        ay: PAD_TOP + chartH - aH,
        aH,
        bx: x0 + groupW * 0.54,
        by: PAD_TOP + chartH - bH,
        bH,
        barW,
        labelX: x0 + groupW / 2,
        aVal: seriesA[i],
        bVal: seriesB[i],
      }
    })

    const gridOut = [0, 1, 2, 3, 4].map((g) => PAD_TOP + chartH - (g / 4) * chartH)

    return { bars: barsOut, gridLines: gridOut }
  }, [labels, seriesA, seriesB])

  return (
    <div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dot} data-series="a" /> {seriesALabel}
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dot} data-series="b" /> {seriesBLabel}
        </span>
      </div>

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
          <line key={i} x1={PAD_LEFT} y1={y} x2={WIDTH} y2={y} className={styles.gridLine} />
        ))}

        {bars.map((b, i) => (
          <g key={i}>
            <rect x={b.ax} y={b.ay} width={b.barW} height={b.aH} rx="4" className={styles.barA}>
              <title>
                {b.label}: {b.aVal * 100} steps
              </title>
            </rect>
            <rect x={b.bx} y={b.by} width={b.barW} height={b.bH} rx="4" className={styles.barB}>
              <title>
                {b.label}: {b.bVal} active minutes
              </title>
            </rect>
            <text x={b.labelX} y={HEIGHT - 6} textAnchor="middle" className={styles.axisLabel}>
              {b.label}
            </text>
          </g>
        ))}
      </svg>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">{seriesALabel}</th>
            <th scope="col">{seriesBLabel}</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{seriesA[i] * 100}</td>
              <td>{seriesB[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
