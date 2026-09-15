// Mock data for the dashboard. Swap any of this for a real API call —
// nothing else in the component tree needs to change as long as the
// shapes below are preserved.

export const user = {
  name: 'Jordan Miles',
  initials: 'JM',
  plan: 'Free plan',
}

export const navItems = [
  { path: '/', label: 'Overview', icon: '📊' },
  { path: '/activity', label: 'Activity', icon: '🏃' },
  { path: '/heart-rate', label: 'Heart rate', icon: '❤️' },
  { path: '/sleep', label: 'Sleep', icon: '😴' },
  { path: '/goals', label: 'Goals', icon: '🎯' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
]

export const dateRanges = ['This week', 'Last week', 'This month']

// ---------------------------------------------------------------------
// Overview — varies by the selected date range so the range selector
// actually does something instead of just sitting there as UI.
// ---------------------------------------------------------------------
const overviewByRange = {
  'This week': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    steps: [62, 74, 58, 81, 69, 90, 84],
    activeMinutes: [32, 41, 28, 47, 38, 55, 44],
    heartRate: [64, 66, 63, 68, 65, 61, 64],
    stats: [
      { id: 'steps', icon: '👣', color: 'accent', value: '8,412', label: 'Steps today', delta: 8, direction: 'up', to: '/activity' },
      { id: 'calories', icon: '🔥', color: 'accent-3', value: '2,140', label: 'Calories burned', delta: 3, direction: 'up', to: '/activity' },
      { id: 'active', icon: '⏱️', color: 'accent-2', value: '47', label: 'Active minutes', delta: 2, direction: 'down', to: '/activity' },
      { id: 'heart', icon: '❤️', color: 'danger', value: '64', unit: 'bpm', label: 'Resting heart rate', delta: 1, direction: 'up', to: '/heart-rate' },
    ],
    rings: [
      { id: 'move', label: 'Move', pct: 0.82, color: 'accent-3', radius: 58 },
      { id: 'exercise', label: 'Exercise', pct: 0.65, color: 'accent-2', radius: 46 },
      { id: 'stand', label: 'Stand', pct: 0.9, color: 'accent', radius: 34 },
    ],
  },
  'Last week': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    steps: [55, 60, 71, 49, 66, 78, 52],
    activeMinutes: [25, 33, 40, 22, 36, 48, 27],
    heartRate: [66, 65, 67, 70, 64, 62, 65],
    stats: [
      { id: 'steps', icon: '👣', color: 'accent', value: '7,102', label: 'Avg. steps / day', delta: 5, direction: 'down', to: '/activity' },
      { id: 'calories', icon: '🔥', color: 'accent-3', value: '1,960', label: 'Avg. calories burned', delta: 4, direction: 'down', to: '/activity' },
      { id: 'active', icon: '⏱️', color: 'accent-2', value: '33', label: 'Avg. active minutes', delta: 6, direction: 'down', to: '/activity' },
      { id: 'heart', icon: '❤️', color: 'danger', value: '66', unit: 'bpm', label: 'Avg. resting heart rate', delta: 2, direction: 'up', to: '/heart-rate' },
    ],
    rings: [
      { id: 'move', label: 'Move', pct: 0.71, color: 'accent-3', radius: 58 },
      { id: 'exercise', label: 'Exercise', pct: 0.54, color: 'accent-2', radius: 46 },
      { id: 'stand', label: 'Stand', pct: 0.8, color: 'accent', radius: 34 },
    ],
  },
  'This month': {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    steps: [58, 66, 71, 77],
    activeMinutes: [30, 35, 41, 46],
    heartRate: [66, 65, 64, 63],
    stats: [
      { id: 'steps', icon: '👣', color: 'accent', value: '54,810', label: 'Steps this month', delta: 11, direction: 'up', to: '/activity' },
      { id: 'calories', icon: '🔥', color: 'accent-3', value: '14,320', label: 'Calories burned', delta: 7, direction: 'up', to: '/activity' },
      { id: 'active', icon: '⏱️', color: 'accent-2', value: '286', label: 'Active minutes', delta: 9, direction: 'up', to: '/activity' },
      { id: 'heart', icon: '❤️', color: 'danger', value: '64', unit: 'bpm', label: 'Avg. resting heart rate', delta: 3, direction: 'down', to: '/heart-rate' },
    ],
    rings: [
      { id: 'move', label: 'Move', pct: 0.88, color: 'accent-3', radius: 58 },
      { id: 'exercise', label: 'Exercise', pct: 0.73, color: 'accent-2', radius: 46 },
      { id: 'stand', label: 'Stand', pct: 0.94, color: 'accent', radius: 34 },
    ],
  },
}

export function getOverviewData(range) {
  return overviewByRange[range] ?? overviewByRange['This week']
}

export const recentActivity = [
  { id: 1, icon: '🏃', color: 'accent', name: 'Morning run', time: 'Today, 6:42 AM', amount: '5.2 km' },
  { id: 2, icon: '🚴', color: 'accent-2', name: 'Cycling', time: 'Yesterday, 5:10 PM', amount: '12.8 km' },
  { id: 3, icon: '🏊', color: 'accent-3', name: 'Swimming', time: 'Tue, 7:00 AM', amount: '32 min' },
  { id: 4, icon: '🧘', color: 'danger', name: 'Yoga', time: 'Mon, 8:15 PM', amount: '25 min' },
]

// ---------------------------------------------------------------------
// Activity page
// ---------------------------------------------------------------------
export const workoutLog = [
  { id: 1, type: 'Running', icon: '🏃', color: 'accent', date: 'Today, 6:42 AM', durationMin: 28, distanceKm: 5.2, calories: 340, avgHr: 152 },
  { id: 2, type: 'Cycling', icon: '🚴', color: 'accent-2', date: 'Yesterday, 5:10 PM', durationMin: 46, distanceKm: 12.8, calories: 410, avgHr: 138 },
  { id: 3, type: 'Swimming', icon: '🏊', color: 'accent-3', date: 'Tue, 7:00 AM', durationMin: 32, distanceKm: 1.4, calories: 300, avgHr: 130 },
  { id: 4, type: 'Yoga', icon: '🧘', color: 'danger', date: 'Mon, 8:15 PM', durationMin: 25, distanceKm: 0, calories: 110, avgHr: 96 },
  { id: 5, type: 'Running', icon: '🏃', color: 'accent', date: 'Sun, 8:02 AM', durationMin: 34, distanceKm: 6.1, calories: 390, avgHr: 158 },
  { id: 6, type: 'Strength', icon: '🏋️', color: 'accent-2', date: 'Sat, 4:30 PM', durationMin: 50, distanceKm: 0, calories: 280, avgHr: 122 },
  { id: 7, type: 'Cycling', icon: '🚴', color: 'accent-2', date: 'Fri, 6:15 PM', durationMin: 61, distanceKm: 18.3, calories: 520, avgHr: 141 },
]

export const activityTypes = ['All', 'Running', 'Cycling', 'Swimming', 'Strength', 'Yoga']

export const weeklyDistance = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  distanceKmX10: [0, 61, 14, 0, 0, 183, 52], // distance km * 10, so BarChart's shared scale reads cleanly
  durationMin: [0, 46, 32, 25, 0, 61, 34],
}

// ---------------------------------------------------------------------
// Heart rate page
// ---------------------------------------------------------------------
const heartRateByRange = {
  '7 days': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    resting: [64, 66, 63, 68, 65, 61, 64],
  },
  '30 days': {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    resting: [67, 66, 64, 63],
  },
  '90 days': {
    labels: ['Mo 1', 'Mo 2', 'Mo 3'],
    resting: [69, 65, 63],
  },
}
export const heartRateRanges = Object.keys(heartRateByRange)
export function getHeartRateData(range) {
  return heartRateByRange[range] ?? heartRateByRange['7 days']
}
export const heartRateZones = [
  { id: 'rest', label: 'Resting', range: '50–68 bpm', color: 'accent-2', pct: 0.42 },
  { id: 'fat-burn', label: 'Fat burn', range: '69–129 bpm', color: 'accent', pct: 0.31 },
  { id: 'cardio', label: 'Cardio', range: '130–159 bpm', color: 'accent-3', pct: 0.2 },
  { id: 'peak', label: 'Peak', range: '160+ bpm', color: 'danger', pct: 0.07 },
]

// ---------------------------------------------------------------------
// Sleep page
// ---------------------------------------------------------------------
export const sleepNights = [
  { label: 'Mon', hours: 7.2, score: 82 },
  { label: 'Tue', hours: 6.4, score: 71 },
  { label: 'Wed', hours: 7.8, score: 88 },
  { label: 'Thu', hours: 5.9, score: 63 },
  { label: 'Fri', hours: 6.9, score: 76 },
  { label: 'Sat', hours: 8.3, score: 93 },
  { label: 'Sun', hours: 7.5, score: 85 },
]
export const sleepStages = [
  { id: 'awake', label: 'Awake', color: 'danger', pct: 0.05 },
  { id: 'light', label: 'Light sleep', color: 'accent', pct: 0.5 },
  { id: 'deep', label: 'Deep sleep', color: 'accent-2', pct: 0.25 },
  { id: 'rem', label: 'REM', color: 'accent-3', pct: 0.2 },
]

// ---------------------------------------------------------------------
// Goals page — persisted client-side (see useLocalStorage), this is just
// the seed data used the first time the app runs with an empty store.
// ---------------------------------------------------------------------
export const defaultGoals = [
  { id: 'steps', icon: '👣', label: 'Daily steps', target: 10000, current: 8412, unit: 'steps' },
  { id: 'workouts', icon: '🏋️', label: 'Workouts this week', target: 5, current: 3, unit: 'sessions' },
  { id: 'sleep', icon: '😴', label: 'Sleep per night', target: 8, current: 7.1, unit: 'hours' },
  { id: 'water', icon: '💧', label: 'Water intake', target: 8, current: 5, unit: 'glasses' },
  { id: 'mindful', icon: '🧘', label: 'Mindful minutes', target: 20, current: 20, unit: 'minutes' },
]

// ---------------------------------------------------------------------
// Settings page defaults — persisted client-side (see useLocalStorage).
// ---------------------------------------------------------------------
export const defaultSettings = {
  displayName: 'Jordan Miles',
  units: 'km',
  dailyReminder: true,
  weeklySummary: true,
  reminderTime: '07:30',
}
