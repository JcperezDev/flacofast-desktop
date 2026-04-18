export function formatMs(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return '-- ms'
  return `${Math.round(value)} ms`
}

export function formatPct(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return '--%'
  return `${value.toFixed(value < 1 ? 1 : 0)}%`
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}
