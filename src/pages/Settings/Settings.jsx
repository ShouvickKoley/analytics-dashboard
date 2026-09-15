import { useRef, useState } from 'react'
import layout from '../PageLayout.module.css'
import styles from './Settings.module.css'

// `settings`/`onChangeSettings` are owned by App (see src/App.jsx) rather
// than read from localStorage here directly. Settings and the Sidebar/
// Overview greeting are all mounted at the same time, so a change made in
// this form needs to update React state that the rest of the app already
// has a reference to — a second, independent localStorage-backed hook here
// would only update its own copy and never trigger those other components
// to re-render, even though localStorage itself would be correct.
export default function Settings({ settings, onChangeSettings, theme, onToggleTheme }) {
  const [draftName, setDraftName] = useState(settings.displayName)
  const [draftTime, setDraftTime] = useState(settings.reminderTime)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const isDirty = draftName !== settings.displayName || draftTime !== settings.reminderTime

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2200)
  }

  function handleSave(e) {
    e.preventDefault()
    onChangeSettings((prev) => ({ ...prev, displayName: draftName, reminderTime: draftTime }))
    showToast('Settings saved')
  }

  function setUnits(units) {
    onChangeSettings((prev) => ({ ...prev, units }))
  }

  function toggle(key) {
    onChangeSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <p className={layout.pageIntro}>
        Changes to units and notifications apply immediately. Your name and reminder time need a save.
      </p>

      <form className={`${layout.panel} ${styles.form}`} onSubmit={handleSave}>
        <h2 className={layout.panelTitle}>Profile</h2>
        <div className={styles.field}>
          <label htmlFor="display-name">Display name</label>
          <input
            id="display-name"
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            maxLength={60}
          />
        </div>

        <h2 className={styles.sectionTitle}>Appearance</h2>
        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>Dark mode</div>
            <div className={styles.toggleHint}>Applies immediately, everywhere in the app</div>
          </div>
          <button
            type="button"
            className={styles.switch}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle dark mode"
            onClick={onToggleTheme}
          >
            <span className={styles.switchThumb} data-on={theme === 'dark'} />
          </button>
        </div>

        <h2 className={styles.sectionTitle}>Units</h2>
        <div className={styles.unitToggle} role="group" aria-label="Distance units">
          <button
            type="button"
            className={styles.unitBtn}
            aria-pressed={settings.units === 'km'}
            onClick={() => setUnits('km')}
          >
            Kilometers
          </button>
          <button
            type="button"
            className={styles.unitBtn}
            aria-pressed={settings.units === 'mi'}
            onClick={() => setUnits('mi')}
          >
            Miles
          </button>
        </div>
        <p className={styles.toggleHint}>Distances on the Activity page will show in {settings.units === 'km' ? 'kilometers' : 'miles'}.</p>

        <h2 className={styles.sectionTitle}>Notifications</h2>
        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>Daily reminder</div>
            <div className={styles.toggleHint}>A nudge to close your rings</div>
          </div>
          <button
            type="button"
            className={styles.switch}
            role="switch"
            aria-checked={settings.dailyReminder}
            aria-label="Toggle daily reminder"
            onClick={() => toggle('dailyReminder')}
          >
            <span className={styles.switchThumb} data-on={settings.dailyReminder} />
          </button>
        </div>
        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>Weekly summary</div>
            <div className={styles.toggleHint}>An email recap every Monday</div>
          </div>
          <button
            type="button"
            className={styles.switch}
            role="switch"
            aria-checked={settings.weeklySummary}
            aria-label="Toggle weekly summary"
            onClick={() => toggle('weeklySummary')}
          >
            <span className={styles.switchThumb} data-on={settings.weeklySummary} />
          </button>
        </div>

        <div className={styles.field}>
          <label htmlFor="reminder-time">Reminder time</label>
          <input
            id="reminder-time"
            type="time"
            value={draftTime}
            onChange={(e) => setDraftTime(e.target.value)}
            disabled={!settings.dailyReminder}
          />
        </div>

        <div className={styles.saveRow}>
          <button type="submit" className={styles.saveBtn} disabled={!isDirty}>
            Save changes
          </button>
          {isDirty && <span className={styles.dirtyHint}>You have unsaved changes</span>}
        </div>
      </form>

      <div className={styles.toast} role="status" aria-live="polite" data-show={Boolean(toast)}>
        {toast}
      </div>
    </>
  )
}
