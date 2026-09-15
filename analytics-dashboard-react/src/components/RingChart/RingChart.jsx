import styles from './RingChart.module.css'

const CENTER = 70
const STROKE = 9

export default function RingChart({ rings }) {
  const summary = rings.map((r) => `${r.label} ${Math.round(r.pct * 100)} percent`).join(', ')

  return (
    <div className={styles.wrap}>
      <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`Daily goal progress: ${summary}`}>
        {rings.map((r) => (
          <circle key={`${r.id}-track`} cx={CENTER} cy={CENTER} r={r.radius} className={styles.track} strokeWidth={STROKE} />
        ))}
        {rings.map((r) => {
          const circumference = 2 * Math.PI * r.radius
          const offset = circumference * (1 - r.pct)
          return (
            <circle
              key={r.id}
              cx={CENTER}
              cy={CENTER}
              r={r.radius}
              className={styles.ring}
              data-color={r.color}
              strokeWidth={STROKE}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          )
        })}
      </svg>
      <ul className={styles.legend}>
        {rings.map((r) => (
          <li key={r.id}>
            <span className={styles.dot} data-color={r.color} aria-hidden="true" />
            {r.label} {Math.round(r.pct * 100)}%
          </li>
        ))}
      </ul>
    </div>
  )
}
