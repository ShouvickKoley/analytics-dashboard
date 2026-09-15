import styles from './StatCard.module.css'

export default function StatCard({ icon, color, value, unit, label, delta, direction }) {
  const isUp = direction === 'up'
  return (
    <div className={styles.card}>
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
    </div>
  )
}
