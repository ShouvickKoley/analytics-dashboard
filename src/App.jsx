import { useId, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import TopBar from './components/TopBar/TopBar'
import StatCard from './components/StatCard/StatCard'
import BarChart from './components/BarChart/BarChart'
import LineChart from './components/LineChart/LineChart'
import RingChart from './components/RingChart/RingChart'
import ActivityList from './components/ActivityList/ActivityList'
import { useTheme } from './hooks/useTheme'
import {
  user,
  navItems,
  statCards,
  days,
  weeklyActivity,
  heartRateTrend,
  rings,
  recentActivity,
  dateRanges,
} from './data/dashboardData'
import styles from './App.module.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [range, setRange] = useState(dateRanges[0])
  const sidebarId = useId()

  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [],
  )

  return (
    <div className={styles.layout}>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Sidebar id={sidebarId} items={navItems} user={user} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className={styles.content}>
        <TopBar
          greeting={`Good morning, ${user.name.split(' ')[0]}`}
          dateLabel={dateLabel}
          ranges={dateRanges}
          range={range}
          onRangeChange={setRange}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenMenu={() => setMenuOpen(true)}
          menuControlsId={sidebarId}
        />

        <main id="main" className={styles.main}>
          <section className={styles.statGrid} aria-label="Key metrics">
            {statCards.map((card) => (
              <StatCard key={card.id} {...card} />
            ))}
          </section>

          <section className={styles.panelGrid}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Weekly activity</h2>
              <p className={styles.panelSub}>Steps vs. active minutes, last 7 days</p>
              <BarChart
                labels={days}
                seriesA={weeklyActivity.steps}
                seriesB={weeklyActivity.activeMinutes}
                seriesALabel="Steps (x100)"
                seriesBLabel="Active minutes"
                title="Weekly activity chart"
                description="Bar chart comparing daily step count and active minutes across Monday through Sunday."
              />
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Today&rsquo;s rings</h2>
              <p className={styles.panelSub}>Move · Exercise · Stand</p>
              <RingChart rings={rings} />
            </div>
          </section>

          <section className={styles.panelGrid}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Heart rate trend</h2>
              <p className={styles.panelSub}>Beats per minute over the last 7 days</p>
              <LineChart
                labels={days}
                values={heartRateTrend}
                unit="bpm"
                title="Heart rate trend chart"
                description="Line chart of average resting heart rate per day, ranging from 61 to 68 beats per minute over the last 7 days."
              />
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Recent activity</h2>
              <p className={styles.panelSub}>Latest logged workouts</p>
              <ActivityList items={recentActivity} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
