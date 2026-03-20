import QRCode from 'qrcode'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export class BatchGenerator {
  constructor(options = {}) {
    this.defaultOptions = {
      width: 256,
      height: 256,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'M',
      ...options
    }
  }

  parseInput(input) {
    // Split by newlines and filter empty lines
    return input
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
  }

  async generateAll(items, onProgress = null) {
    const results = []
    const total = items.length

    for (let i = 0; i < items.length; i++) {
      const text = items[i]
      try {
        const dataUrl = await QRCode.toDataURL(text, this.defaultOptions)
        results.push({
          text,
          dataUrl,
          success: true,
          index: i
        })
      } catch (error) {
        results.push({
          text,
          error: error.message,
          success: false,
          index: i
        })
      }

      if (onProgress) {
        onProgress((i + 1) / total)
      }
    }

    return results
  }

  async downloadAsZip(results, filename = 'qr-codes.zip') {
    const zip = new JSZip()
    const folder = zip.folder('qr-codes')

    results.forEach((result, index) => {
      if (result.success && result.dataUrl) {
        // Create safe filename from text or use index
        const safeName = this.sanitizeFilename(result.text, index)
        const base64Data = result.dataUrl.replace(/^data:image\/png;base64,/, '')
        folder.file(`${safeName}.png`, base64Data, { base64: true })
      }
    })

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, filename)
  }

  sanitizeFilename(text, index) {
    // Create a safe filename from the text
    let name = text
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9\-_]/g, '_')
      .substring(0, 50)

    if (!name || name === '_') {
      name = `qr-code-${index + 1}`
    }

    // Add timestamp to avoid duplicates
    return `${name}_${Date.now()}_${index + 1}`
  }

  downloadIndividual(result) {
    if (!result.success || !result.dataUrl) return

    const safeName = this.sanitizeFilename(result.text, 0)
    const link = document.createElement('a')
    link.download = `${safeName}.png`
    link.href = result.dataUrl
    link.click()
  }

  async generateWithLogo(items, logoImage, onProgress = null, logoSize = 0.3) {
    const results = []
    const total = items.length

    for (let i = 0; i < items.length; i++) {
      const text = items[i]
      try {
        // Create a temporary canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Generate QR on canvas with higher error correction for logo
        await QRCode.toCanvas(canvas, text, {
          ...this.defaultOptions,
          errorCorrectionLevel: 'H'
        })

        // Draw logo in center
        const logoWidth = canvas.width * logoSize
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth
        const x = (canvas.width - logoWidth) / 2
        const y = (canvas.height - logoHeight) / 2

        // Draw white background for logo
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(x, y, logoWidth, logoHeight)

        // Draw logo
        ctx.drawImage(logoImage, x, y, logoWidth, logoHeight)

        // Get data URL
        const dataUrl = canvas.toDataURL('image/png')

        results.push({
          text,
          dataUrl,
          success: true,
          index: i
        })
      } catch (error) {
        results.push({
          text,
          error: error.message,
          success: false,
          index: i
        })
      }

      if (onProgress) {
        onProgress((i + 1) / total)
      }
    }

    return results
  }
}
