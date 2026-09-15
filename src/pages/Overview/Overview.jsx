import StatCard from '../../components/StatCard/StatCard'
import BarChart from '../../components/BarChart/BarChart'
import LineChart from '../../components/LineChart/LineChart'
import RingChart from '../../components/RingChart/RingChart'
import ActivityList from '../../components/ActivityList/ActivityList'
import { getOverviewData, recentActivity } from '../../data/dashboardData'
import layout from '../PageLayout.module.css'

export default function Overview({ range }) {
  const data = getOverviewData(range)

  return (
    <>
      <section className={layout.statGrid} aria-label="Key metrics">
        {data.stats.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </section>

      <section className={layout.panelGrid}>
        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>
            {range === 'This month' ? 'Monthly activity' : 'Weekly activity'}
          </h2>
          <p className={layout.panelSub}>Steps vs. active minutes — {range.toLowerCase()}</p>
          <BarChart
            labels={data.labels}
            seriesA={data.steps}
            seriesB={data.activeMinutes}
            seriesALabel="Steps (x100)"
            seriesBLabel="Active minutes"
            title="Activity chart"
            description={`Bar chart comparing step count and active minutes, ${range.toLowerCase()}.`}
          />
        </div>

        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>Today&rsquo;s rings</h2>
          <p className={layout.panelSub}>Move · Exercise · Stand</p>
          <RingChart rings={data.rings} />
        </div>
      </section>

      <section className={layout.panelGrid}>
        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>Heart rate trend</h2>
          <p className={layout.panelSub}>Resting bpm — {range.toLowerCase()}</p>
          <LineChart
            labels={data.labels}
            values={data.heartRate}
            unit="bpm"
            title="Heart rate trend chart"
            description={`Line chart of average resting heart rate, ${range.toLowerCase()}.`}
          />
        </div>

        <div className={layout.panel}>
          <h2 className={layout.panelTitle}>Recent activity</h2>
          <p className={layout.panelSub}>Latest logged workouts</p>
          <ActivityList items={recentActivity} />
        </div>
      </section>
    </>
  )
}
