import styles from './ActivityList.module.css'

export default function ActivityList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.icon} data-color={item.color} aria-hidden="true">
            {item.icon}
          </div>
          <div className={styles.meta}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.time}>{item.time}</div>
          </div>
          <div className={styles.amount}>{item.amount}</div>
        </li>
      ))}
    </ul>
  )
}
