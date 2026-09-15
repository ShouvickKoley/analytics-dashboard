import { Link } from 'react-router-dom'
import styles from './StatCard.module.css'

export default function StatCard({ icon, color, value, unit, label, delta, direction, to }) {
  const isUp = direction === 'up'
  const content = (
    <>
      <div className={styles.row}>
        <div className={styles.icon} data-color={color} aria-hidden="true">
          {icon}
        </div>
        <span className={`${styles.delta} ${isUp ? styles.up : styles.down}`}>
          {isUp ? '▲' : '▼'} {delta}%
        </span>
      </div>
      <div className={styles.value}>
        {value}
        {unit && <span className={styles.unit}> {unit}</span>}
      </div>
      <div className={styles.label}>{label}</div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`${styles.card} ${styles.clickable}`} aria-label={`${label}: ${value}${unit ? ` ${unit}` : ''}. View details.`}>
        {content}
      </Link>
    )
  }

  return <div className={styles.card}>{content}</div>
}
