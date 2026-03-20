import QRCode from 'qrcode'

export class QRGenerator {
  constructor() {
    this.defaultOptions = {
      width: 256,
      height: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    }
  }

  async generate(text, options = {}) {
    if (!text || text.trim() === '') {
      throw new Error('Text is required')
    }

    const config = { ...this.defaultOptions, ...options }

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: config.width,
        height: config.height,
        margin: config.margin,
        color: config.color,
        errorCorrectionLevel: config.errorCorrectionLevel
      })

      return {
        text,
        dataUrl,
        timestamp: Date.now(),
        options: config
      }
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`)
    }
  }

  async generateToCanvas(text, canvas, options = {}) {
    if (!text || text.trim() === '') {
      throw new Error('Text is required')
    }

    const config = { ...this.defaultOptions, ...options }

    try {
      await QRCode.toCanvas(canvas, text, {
        width: config.width,
        height: config.height,
        margin: config.margin,
        color: config.color,
        errorCorrectionLevel: config.errorCorrectionLevel
      })

      return canvas
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`)
    }
  }

  validateErrorLevel(level) {
    const validLevels = ['L', 'M', 'Q', 'H']
    return validLevels.includes(level) ? level : 'M'
  }
}
