import { useState } from 'react'
import BarChart from '../../components/BarChart/BarChart'
import { sleepNights, sleepStages } from '../../data/dashboardData'
import layout from '../PageLayout.module.css'
import styles from './Sleep.module.css'

const SLEEP_GOAL_HOURS = 8

function scoreLabel(score) {
  if (score >= 85) return 'Great'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Fair'
  return 'Poor'
}

export default function Sleep() {
  const [selectedIndex, setSelectedIndex] = useState(sleepNights.length - 1)
  const selected = sleepNights[selectedIndex]
  const avgHours = (sleepNights.reduce((a, n) => a + n.hours, 0) / sleepNights.length).toFixed(1)
  const avgScore = Math.round(sleepNights.reduce((a, n) => a + n.score, 0) / sleepNights.length)

  return (
    <>
      <p className={layout.pageIntro}>
        Click any night below to see its detail. The summary card updates to match whichever night you select.
      </p>

      <section className={layout.statGrid} aria-label="Sleep summary">
        <div className={layout.panel}>
          <div className={styles.miniStat}>{avgHours}h</div>
          <div className={styles.miniLabel}>Avg. sleep / night</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{avgScore}</div>
          <div className={styles.miniLabel}>Avg. sleep score</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{SLEEP_GOAL_HOURS}h</div>
          <div className={styles.miniLabel}>Nightly goal</div>
        </div>
      </section>

      <section className={layout.panelGrid}>
        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>Sleep vs. goal</h2>
          <p className={layout.panelSub}>Hours slept vs. your {SLEEP_GOAL_HOURS}-hour goal, last 7 nights</p>
          <BarChart
            labels={sleepNights.map((n) => n.label)}
            seriesA={sleepNights.map((n) => n.hours)}
            seriesB={sleepNights.map(() => SLEEP_GOAL_HOURS)}
            seriesALabel="Hours slept"
            seriesBLabel="Goal"
            title="Sleep vs goal chart"
            description="Bar chart comparing nightly hours slept against an 8-hour goal, over the last 7 nights."
          />
        </div>

        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>Sleep stages</h2>
          <p className={layout.panelSub}>Average composition of a night&rsquo;s sleep</p>
          <ul className={styles.stageList}>
            {sleepStages.map((s) => (
              <li key={s.id} className={styles.stageItem}>
                <div className={styles.stageLabelRow}>
                  <span>{s.label}</span>
                  <span>{Math.round(s.pct * 100)}%</span>
                </div>
                <div className={styles.stageTrack}>
                  <div className={styles.stageFill} data-color={s.color} style={{ width: `${s.pct * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${layout.panel} ${layout.panelFull}`}>
        <h2 className={layout.panelTitle}>Nightly detail</h2>
        <p className={layout.panelSub}>Select a night to inspect it</p>

        <div className={styles.nightRow} role="group" aria-label="Select a night">
          {sleepNights.map((n, i) => (
            <button
              key={n.label + i}
              type="button"
              className={styles.nightBtn}
              aria-pressed={i === selectedIndex}
              onClick={() => setSelectedIndex(i)}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className={styles.detailCard} aria-live="polite">
          <div>
            <div className={styles.detailValue}>{selected.hours}h</div>
            <div className={styles.miniLabel}>Time asleep</div>
          </div>
          <div>
            <div className={styles.detailValue}>{selected.score}</div>
            <div className={styles.miniLabel}>Sleep score</div>
          </div>
          <div>
            <div className={styles.detailValue}>{scoreLabel(selected.score)}</div>
            <div className={styles.miniLabel}>Quality</div>
          </div>
        </div>
      </section>
    </>
  )
}
