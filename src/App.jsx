import { useId, useMemo, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import TopBar from './components/TopBar/TopBar'
import Overview from './pages/Overview/Overview'
import Activity from './pages/Activity/Activity'
import HeartRate from './pages/HeartRate/HeartRate'
import Sleep from './pages/Sleep/Sleep'
import Goals from './pages/Goals/Goals'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'
import { useTheme } from './hooks/useTheme'
import { useLocalStorage } from './hooks/useLocalStorage'
import { user, navItems, dateRanges, defaultSettings } from './data/dashboardData'
import styles from './App.module.css'

// Per-route header content. Overview is the only page whose data depends
// on the date-range selector, so it's the only one that shows it.
function getPageMeta(pathname, firstName) {
  switch (pathname) {
    case '/':
      return { title: `Good morning, ${firstName}`, showRangeSelector: true }
    case '/activity':
      return { title: 'Activity', showRangeSelector: false }
    case '/heart-rate':
      return { title: 'Heart rate', showRangeSelector: false }
    case '/sleep':
      return { title: 'Sleep', showRangeSelector: false }
    case '/goals':
      return { title: 'Goals', showRangeSelector: false }
    case '/settings':
      return { title: 'Settings', showRangeSelector: false }
    default:
      return { title: 'Pulse', showRangeSelector: false }
  }
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  // Settings lives here, not inside the Settings page, because the sidebar
  // (display name) and the Activity page (units) need to react to it too,
  // and they're all mounted alongside Settings rather than instead of it.
  const [settings, setSettings] = useLocalStorage('pulse-react.settings', defaultSettings)
  const [menuOpen, setMenuOpen] = useState(false)
  const [range, setRange] = useState(dateRanges[0])
  const sidebarId = useId()
  const location = useLocation()

  const displayName = settings.displayName || user.name
  const pageMeta = getPageMeta(location.pathname, displayName.split(' ')[0])

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

      <Sidebar
        id={sidebarId}
        items={navItems}
        user={{ ...user, name: displayName }}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className={styles.content}>
        <TopBar
          title={pageMeta.title}
          dateLabel={dateLabel}
          showRangeSelector={pageMeta.showRangeSelector}
          ranges={dateRanges}
          range={range}
          onRangeChange={setRange}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenMenu={() => setMenuOpen(true)}
          menuControlsId={sidebarId}
        />

        <main id="main" className={styles.main}>
          <Routes>
            <Route path="/" element={<Overview range={range} />} />
            <Route path="/activity" element={<Activity settings={settings} />} />
            <Route path="/heart-rate" element={<HeartRate />} />
            <Route path="/sleep" element={<Sleep />} />
            <Route path="/goals" element={<Goals />} />
            <Route
              path="/settings"
              element={
                <Settings settings={settings} onChangeSettings={setSettings} theme={theme} onToggleTheme={toggleTheme} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
