import { Link } from 'react-router-dom'
import layout from '../PageLayout.module.css'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={`${layout.panel} ${styles.wrap}`}>
      <div className={styles.emoji} aria-hidden="true">
        🧭
      </div>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={layout.pageIntro}>That section doesn&rsquo;t exist. Head back to the overview.</p>
      <Link to="/" className={styles.link}>
        ← Back to Overview
      </Link>
    </div>
  )
}
