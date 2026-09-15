import { useMemo, useState } from 'react'
import BarChart from '../../components/BarChart/BarChart'
import { activityTypes, weeklyDistance, workoutLog } from '../../data/dashboardData'
import layout from '../PageLayout.module.css'
import styles from './Activity.module.css'

const KM_TO_MI = 0.621371

function formatDistance(km, units) {
  if (km === 0) return null
  return units === 'mi' ? `${(km * KM_TO_MI).toFixed(1)} mi` : `${km.toFixed(1)} km`
}

// `settings` is owned by App and passed down (see the comment in
// Settings.jsx) so a units change made on the Settings page is reflected
// here the moment you navigate over, without a second source of truth.
export default function Activity({ settings }) {
  const [filter, setFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(
    () => workoutLog.filter((w) => filter === 'All' || w.type === filter),
    [filter],
  )

  const totals = useMemo(
    () =>
      filtered.reduce(
        (acc, w) => ({
          count: acc.count + 1,
          minutes: acc.minutes + w.durationMin,
          calories: acc.calories + w.calories,
          distanceKm: acc.distanceKm + w.distanceKm,
        }),
        { count: 0, minutes: 0, calories: 0, distanceKm: 0 },
      ),
    [filtered],
  )

  return (
    <>
      <p className={layout.pageIntro}>
        Every logged workout, filterable by type. Click a workout to see its detail — average heart rate, pace, and
        calories.
      </p>

      <section className={layout.statGrid} aria-label="Activity totals">
        <div className={layout.panel}>
          <div className={styles.miniStat}>{totals.count}</div>
          <div className={styles.miniLabel}>Workouts</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{totals.minutes}</div>
          <div className={styles.miniLabel}>Total minutes</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{totals.calories.toLocaleString()}</div>
          <div className={styles.miniLabel}>Calories burned</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{formatDistance(totals.distanceKm, settings.units) ?? '0'}</div>
          <div className={styles.miniLabel}>Distance covered</div>
        </div>
      </section>

      <section className={`${layout.panel} ${layout.panelFull}`} style={{ marginBottom: 14 }}>
        <h2 className={layout.panelTitle}>Weekly distance</h2>
        <p className={layout.panelSub}>Distance vs. duration, last 7 days</p>
        <BarChart
          labels={weeklyDistance.labels}
          seriesA={weeklyDistance.distanceKmX10}
          seriesB={weeklyDistance.durationMin}
          seriesALabel="Distance (km x10)"
          seriesBLabel="Duration (min)"
          title="Weekly distance chart"
          description="Bar chart comparing daily distance and workout duration across the last 7 days."
        />
      </section>

      <div className={styles.filterRow} role="group" aria-label="Filter by workout type">
        {activityTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={styles.chip}
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <ul className={styles.log}>
        {filtered.map((w) => {
          const isOpen = expandedId === w.id
          const distance = formatDistance(w.distanceKm, settings.units)
          return (
            <li key={w.id} className={styles.logItem}>
              <button
                type="button"
                className={styles.logHeader}
                aria-expanded={isOpen}
                aria-controls={`workout-detail-${w.id}`}
                onClick={() => setExpandedId(isOpen ? null : w.id)}
              >
                <span className={styles.logIcon} data-color={w.color} aria-hidden="true">
                  {w.icon}
                </span>
                <span className={styles.logMeta}>
                  <span className={styles.logName}>{w.type}</span>
                  <span className={styles.logTime}>{w.date}</span>
                </span>
                <span className={styles.logAmount}>{distance ?? `${w.durationMin} min`}</span>
                <span className={styles.chevron} data-open={isOpen} aria-hidden="true">
                  ▾
                </span>
              </button>
              {isOpen && (
                <div id={`workout-detail-${w.id}`} className={styles.logDetail}>
                  <div>
                    <span className={styles.detailLabel}>Duration</span>
                    <span>{w.durationMin} min</span>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Calories</span>
                    <span>{w.calories}</span>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Avg. heart rate</span>
                    <span>{w.avgHr} bpm</span>
                  </div>
                  {distance && (
                    <div>
                      <span className={styles.detailLabel}>Distance</span>
                      <span>{distance}</span>
                    </div>
                  )}
                </div>
              )}
            </li>
          )
        })}
        {filtered.length === 0 && <p className={layout.pageIntro}>No workouts logged for this filter yet.</p>}
      </ul>
    </>
  )
}
