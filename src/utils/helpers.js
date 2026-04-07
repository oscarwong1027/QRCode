export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function truncateText(text, maxLength = 30) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

export function getDomainFromUrl(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function sanitizeFilename(text, maxLength = 50) {
  if (!text || text.trim().length === 0) {
    return 'qr-code'
  }

  // Replace invalid filename characters with underscores
  let sanitized = text
    .replace(/[<>:"/\\|?*]/g, '_')  // Windows/Unix invalid chars
    .replace(/\s+/g, ' ')              // Collapse multiple spaces
    .trim()

  // Truncate if too long
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength).trim()
  }

  // Remove trailing periods (Windows restriction)
  sanitized = sanitized.replace(/\.$/, '')

  // If empty after sanitization, return default
  if (sanitized.length === 0) {
    return 'qr-code'
  }

  return sanitized
}
