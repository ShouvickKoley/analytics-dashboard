import { useEffect, useRef } from 'react'
import styles from './Sidebar.module.css'

/**
 * Primary navigation. Renders as a static column on desktop and as an
 * off-canvas drawer (with a backdrop, focus management, and Escape-to-close)
 * on narrower viewports. The same markup serves both — only CSS toggles
 * between "docked" and "overlay" presentation.
 */
export default function Sidebar({ items, user, isOpen, onClose, id }) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      )}
      <aside
        id={id}
        ref={panelRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Primary"
      >
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <div className={styles.brandMark} aria-hidden="true" />
            <span>Pulse</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Sections">
          <ul className={styles.navList}>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.navLink}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={onClose}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <div className={styles.userChip}>
            <div className={styles.avatar} aria-hidden="true">
              {user.initials}
            </div>
            <div>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.plan}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
