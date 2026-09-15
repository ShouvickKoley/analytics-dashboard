import { useState } from 'react'
import LineChart from '../../components/LineChart/LineChart'
import { getHeartRateData, heartRateRanges, heartRateZones } from '../../data/dashboardData'
import layout from '../PageLayout.module.css'
import styles from './HeartRate.module.css'

export default function HeartRate() {
  const [range, setRange] = useState(heartRateRanges[0])
  const data = getHeartRateData(range)
  const avg = Math.round(data.resting.reduce((a, b) => a + b, 0) / data.resting.length)
  const min = Math.min(...data.resting)
  const max = Math.max(...data.resting)

  return (
    <>
      <p className={layout.pageIntro}>
        Resting heart rate over time, with a breakdown of how much time you spend in each heart-rate zone.
      </p>

      <section className={layout.statGrid} aria-label="Heart rate summary">
        <div className={layout.panel}>
          <div className={styles.miniStat}>{avg}</div>
          <div className={styles.miniLabel}>Avg. resting bpm</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{min}</div>
          <div className={styles.miniLabel}>Lowest</div>
        </div>
        <div className={layout.panel}>
          <div className={styles.miniStat}>{max}</div>
          <div className={styles.miniLabel}>Highest</div>
        </div>
      </section>

      <section className={layout.panelGrid}>
        <div className={layout.panel}>
          <div className={styles.panelHead}>
            <div>
              <h2 className={layout.panelTitle}>Resting heart rate</h2>
              <p className={layout.panelSub}>Tap a range to update the chart</p>
            </div>
            <div className={styles.rangeToggle} role="group" aria-label="Time range">
              {heartRateRanges.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={styles.rangeBtn}
                  aria-pressed={range === r}
                  onClick={() => setRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <LineChart
            labels={data.labels}
            values={data.resting}
            unit="bpm"
            title="Resting heart rate chart"
            description={`Line chart of resting heart rate over the last ${range}.`}
          />
        </div>

        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>Time in zones</h2>
          <p className={layout.panelSub}>Share of active time per heart-rate zone</p>
          <ul className={styles.zoneList}>
            {heartRateZones.map((z) => (
              <li key={z.id} className={styles.zoneItem}>
                <div className={styles.zoneLabelRow}>
                  <span>
                    <strong>{z.label}</strong> <span className={styles.zoneRange}>{z.range}</span>
                  </span>
                  <span>{Math.round(z.pct * 100)}%</span>
                </div>
                <div className={styles.zoneTrack}>
                  <div className={styles.zoneFill} data-color={z.color} style={{ width: `${z.pct * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
