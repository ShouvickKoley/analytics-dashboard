// Mock data for the dashboard. Swap any of this for a real API call —
// nothing else in the component tree needs to change as long as the
// shapes below are preserved.

export const user = {
  name: 'Jordan Miles',
  initials: 'JM',
  plan: 'Free plan',
}

export const navItems = [
  { id: 'overview', label: 'Overview', icon: '📊', current: true },
  { id: 'activity', label: 'Activity', icon: '🏃' },
  { id: 'heart-rate', label: 'Heart rate', icon: '❤️' },
  { id: 'sleep', label: 'Sleep', icon: '😴' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export const statCards = [
  { id: 'steps', icon: '👣', color: 'accent', value: '8,412', label: 'Steps today', delta: 8, direction: 'up' },
  { id: 'calories', icon: '🔥', color: 'accent-3', value: '2,140', label: 'Calories burned', delta: 3, direction: 'up' },
  { id: 'active', icon: '⏱️', color: 'accent-2', value: '47', label: 'Active minutes', delta: 2, direction: 'down' },
  { id: 'heart', icon: '❤️', color: 'danger', value: '64', unit: 'bpm', label: 'Resting heart rate', delta: 1, direction: 'up' },
]

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const weeklyActivity = {
  steps: [62, 74, 58, 81, 69, 90, 84], // steps x100
  activeMinutes: [32, 41, 28, 47, 38, 55, 44],
}

export const heartRateTrend = [64, 66, 63, 68, 65, 61, 64]

export const rings = [
  { id: 'move', label: 'Move', pct: 0.82, color: 'accent-3', radius: 58 },
  { id: 'exercise', label: 'Exercise', pct: 0.65, color: 'accent-2', radius: 46 },
  { id: 'stand', label: 'Stand', pct: 0.9, color: 'accent', radius: 34 },
]

export const recentActivity = [
  { id: 1, icon: '🏃', color: 'accent', name: 'Morning run', time: 'Today, 6:42 AM', amount: '5.2 km' },
  { id: 2, icon: '🚴', color: 'accent-2', name: 'Cycling', time: 'Yesterday, 5:10 PM', amount: '12.8 km' },
  { id: 3, icon: '🏊', color: 'accent-3', name: 'Swimming', time: 'Tue, 7:00 AM', amount: '32 min' },
  { id: 4, icon: '🧘', color: 'danger', name: 'Yoga', time: 'Mon, 8:15 PM', amount: '25 min' },
]

export const dateRanges = ['This week', 'Last week', 'This month']
