import styles from './TopBar.module.css'

export default function TopBar({
  greeting,
  dateLabel,
  ranges,
  range,
  onRangeChange,
  theme,
  onToggleTheme,
  onOpenMenu,
  menuControlsId,
}) {
  return (
    <header className={styles.top}>
      <div className={styles.leftGroup}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          aria-expanded={false}
          aria-controls={menuControlsId}
        >
          ☰
        </button>
        <div>
          <h1 className={styles.heading}>{greeting}</h1>
          <p className={styles.dateLabel}>{dateLabel}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <label className={styles.srOnly} htmlFor="range-select">
          Date range
        </label>
        <select
          id="range-select"
          className={styles.rangeSelect}
          value={range}
          onChange={(e) => onRangeChange(e.target.value)}
        >
          {ranges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onToggleTheme}
          aria-pressed={theme === 'dark'}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
