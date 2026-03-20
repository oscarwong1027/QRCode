export class LogoOverlay {
  constructor() {
    this.maxLogoSize = 0.3 // 30% of QR code size
    this.padding = 0.05 // 5% padding around logo
  }

  async loadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target.result
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  async loadImageFromUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Failed to load image from URL'))
      img.src = url
    })
  }

  async applyLogo(qrCanvasOrDataUrl, logoImage, options = {}) {
    const { sizeRatio = 0.25, withPadding = true, paddingColor = '#ffffff' } = options

    // Create QR canvas if dataUrl provided
    let qrCanvas = qrCanvasOrDataUrl
    if (typeof qrCanvasOrDataUrl === 'string') {
      qrCanvas = await this.dataUrlToCanvas(qrCanvasOrDataUrl)
    }

    // Create output canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const size = qrCanvas.width
    canvas.width = size
    canvas.height = size

    // Draw QR code
    ctx.drawImage(qrCanvas, 0, 0)

    // Calculate logo dimensions
    const logoWidth = size * Math.min(sizeRatio, this.maxLogoSize)
    const logoHeight = (logoImage.height / logoImage.width) * logoWidth

    const x = (size - logoWidth) / 2
    const y = (size - logoHeight) / 2

    // Draw padding background if requested
    if (withPadding) {
      const padding = size * this.padding
      ctx.fillStyle = paddingColor
      ctx.fillRect(
        x - padding,
        y - padding,
        logoWidth + padding * 2,
        logoHeight + padding * 2
      )
    }

    // Draw logo
    ctx.drawImage(logoImage, x, y, logoWidth, logoHeight)

    return canvas
  }

  async dataUrlToCanvas(dataUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        resolve(canvas)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = dataUrl
    })
  }

  validateLogoSize(logoWidth, qrSize) {
    const ratio = logoWidth / qrSize
    return ratio <= this.maxLogoSize
  }

  getRecommendedSize(qrSize) {
    return {
      width: qrSize * this.maxLogoSize,
      height: qrSize * this.maxLogoSize
    }
  }

  canvasToDataUrl(canvas, type = 'image/png', quality = 1.0) {
    return canvas.toDataURL(type, quality)
  }

  downloadCanvas(canvas, filename = 'qr-code-with-logo.png') {
    const link = document.createElement('a')
    link.download = filename
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}
