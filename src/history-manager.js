const STORAGE_KEY = 'qr_generator_history'
const MAX_HISTORY_ITEMS = 50

export class HistoryManager {
  constructor() {
    this.history = this.load()
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history))
    } catch (error) {
      console.warn('Failed to save history:', error)
    }
  }

  add(item) {
    // Remove duplicates by text
    this.history = this.history.filter(h => h.text !== item.text)

    // Add to beginning
    this.history.unshift(item)

    // Limit size
    if (this.history.length > MAX_HISTORY_ITEMS) {
      this.history = this.history.slice(0, MAX_HISTORY_ITEMS)
    }

    this.save()
    return this.history
  }

  getAll() {
    return [...this.history]
  }

  getByIndex(index) {
    return this.history[index] || null
  }

  delete(index) {
    this.history.splice(index, 1)
    this.save()
    return this.history
  }

  clear() {
    this.history = []
    this.save()
    return this.history
  }

  getCount() {
    return this.history.length
  }
}
