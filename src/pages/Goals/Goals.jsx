import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultGoals } from '../../data/dashboardData'
import layout from '../PageLayout.module.css'
import styles from './Goals.module.css'

// How much one "Log progress" click adds, per goal id. Kept separate from
// the goal data itself since it's a UI/interaction detail, not a fact
// about the goal.
const STEP_BY_ID = {
  steps: 500,
  workouts: 1,
  sleep: 0.5,
  water: 1,
  mindful: 5,
}

export default function Goals() {
  const [goals, setGoals] = useLocalStorage('pulse-react.goals', defaultGoals)

  function logProgress(id) {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, current: Math.min(g.target, round(g.current + STEP_BY_ID[id])) } : g)),
    )
  }

  function resetGoal(id) {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, current: 0 } : g)))
  }

  const completedCount = goals.filter((g) => g.current >= g.target).length

  return (
    <>
      <p className={layout.pageIntro}>
        Track today&rsquo;s goals. Progress is saved in your browser, so it&rsquo;s still here next time you open the
        app — click &ldquo;Log progress&rdquo; on any goal to update it.
      </p>

      <section className={layout.statGrid} aria-label="Goals summary">
        <div className={layout.panel}>
          <div className={styles.miniStat}>
            {completedCount}/{goals.length}
          </div>
          <div className={styles.miniLabel}>Goals completed today</div>
        </div>
      </section>

      <ul className={styles.goalList}>
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.current / g.target) * 100))
          const complete = g.current >= g.target
          return (
            <li key={g.id} className={`${layout.panel} ${styles.goalCard}`}>
              <div className={styles.goalHead}>
                <span className={styles.goalIcon} aria-hidden="true">
                  {g.icon}
                </span>
                <div className={styles.goalMeta}>
                  <div className={styles.goalName}>{g.label}</div>
                  <div className={styles.miniLabel}>
                    {formatAmount(g.current)} / {formatAmount(g.target)} {g.unit}
                  </div>
                </div>
                {complete && (
                  <span className={styles.completeBadge}>
                    🎉 Done
                  </span>
                )}
              </div>

              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${g.label} progress`}
              >
                <div className={styles.progressFill} data-complete={complete} style={{ width: `${pct}%` }} />
              </div>

              <div className={styles.goalActions}>
                <button
                  type="button"
                  className={styles.logBtn}
                  onClick={() => logProgress(g.id)}
                  disabled={complete}
                >
                  + Log progress
                </button>
                <button type="button" className={styles.resetBtn} onClick={() => resetGoal(g.id)}>
                  Reset
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function round(n) {
  return Math.round(n * 100) / 100
}

function formatAmount(n) {
  return Number.isInteger(n) ? n.toLocaleString() : n.toFixed(1)
}
