import { QRGenerator } from '../qr-generator.js'
import { HistoryManager } from '../history-manager.js'
import { BatchGenerator } from '../batch-generator.js'
import { LogoOverlay } from '../logo-overlay.js'
import { createIcon, createButton } from './components.js'
import { debounce, formatDate, truncateText, downloadDataUrl, sanitizeFilename } from '../utils/helpers.js'

export class UIController {
  constructor(i18n) {
    this.qrGenerator = new QRGenerator()
    this.historyManager = new HistoryManager()
    this.batchGenerator = new BatchGenerator()
    this.logoOverlay = new LogoOverlay()
    this.currentLogo = null
    this.i18n = i18n
    this.app = document.querySelector('#app')
  }

  init() {
    this.render()
    this.attachEventListeners()
    this.renderHistory()

    // Listen for language changes
    this.i18n.onChange(() => {
      this.render()
      this.attachEventListeners()
      this.renderHistory()
    })
  }

  t(key) {
    return this.i18n.t(key)
  }

  render() {
    this.app.innerHTML = `
      <div class="container">
        <header class="header">
          <div class="header-content">
            <div class="header-title">
              <h1>${this.t('title')}</h1>
              <p>${this.t('subtitle')}</p>
            </div>
            <div class="language-selector">
              <label for="language-select">${this.t('language')}</label>
              <select id="language-select" class="form-control">
                ${this.i18n.getLanguageOptions().map(lang => `
                  <option value="${lang.code}" ${this.i18n.getLanguage() === lang.code ? 'selected' : ''}>
                    ${lang.name}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>
        </header>

        <div class="content">
          <div class="left-panel">
            <div class="tabs">
              <button class="tab active" data-tab="single">${this.t('tabSingle')}</button>
              <button class="tab" data-tab="batch">${this.t('tabBatch')}</button>
              <button class="tab" data-tab="history">${this.t('tabHistory')} (${this.historyManager.getCount()})</button>
            </div>

            <div class="tab-content active" id="tab-single">
              <div class="section">
                <div class="form-group">
                  <label>${this.t('textOrUrl')}</label>
                  <input type="text" id="text-input" class="form-control" placeholder="${this.t('textPlaceholder')}">
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>${this.t('size')}</label>
                    <input type="number" id="size-input" class="form-control" value="256" min="100" max="500" step="10">
                  </div>
                  <div class="form-group">
                    <label>${this.t('errorCorrection')}</label>
                    <select id="error-level" class="form-control">
                      <option value="L">${this.t('errorLow')}</option>
                      <option value="M" selected>${this.t('errorMedium')}</option>
                      <option value="Q">${this.t('errorQuartile')}</option>
                      <option value="H">${this.t('errorHigh')}</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>${this.t('foregroundColor')}</label>
                    <input type="color" id="color-dark" value="#000000">
                  </div>
                  <div class="form-group">
                    <label>${this.t('backgroundColor')}</label>
                    <input type="color" id="color-light" value="#ffffff">
                  </div>
                </div>

                <div class="form-group">
                  <label>${this.t('logo')}</label>
                  <div class="logo-upload" id="logo-upload">
                    <input type="file" id="logo-input" accept="image/*">
                    <div id="logo-upload-content">
                      ${createIcon('upload', 32).outerHTML}
                      <p>${this.t('logoPlaceholder')}</p>
                    </div>
                    <img id="logo-preview" class="logo-preview" style="display: none;">
                  </div>
                  <div class="logo-size-control" id="logo-size-control" style="display: none;">
                    <label>${this.t('logoSize')} <span id="logo-size-value">25%</span></label>
                    <input type="range" id="logo-size" min="10" max="30" value="25">
                  </div>
                </div>

                <button class="btn btn-primary btn-block" id="generate-btn">
                  ${createIcon('qr', 18).outerHTML}
                  ${this.t('generateQR')}
                </button>
              </div>
            </div>

            <div class="tab-content" id="tab-batch">
              <div class="section">
                <div class="form-group">
                  <label>${this.t('batchInputLabel')}</label>
                  <textarea id="batch-input" class="form-control" rows="6" placeholder="${this.t('batchPlaceholder')}"></textarea>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>${this.t('size')}</label>
                    <input type="number" id="batch-size" class="form-control" value="256" min="100" max="500" step="10">
                  </div>
                  <div class="form-group">
                    <label>${this.t('errorCorrection')}</label>
                    <select id="batch-error-level" class="form-control">
                      <option value="L">${this.t('errorLow')}</option>
                      <option value="M">${this.t('errorMedium')}</option>
                      <option value="Q">${this.t('errorQuartile')}</option>
                      <option value="H" selected>${this.t('errorHigh')}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group" id="batch-logo-control" style="display: none;">
                  <label>${this.t('useLogoFromSingle')}</label>
                  <div class="alert alert-info">
                    ${createIcon('info', 16).outerHTML}
                    ${this.t('logoInfo')}
                  </div>
                </div>

                <div class="progress-container" id="batch-progress" style="display: none;">
                  <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                  </div>
                  <div class="progress-text" id="progress-text">0%</div>
                </div>

                <button class="btn btn-primary btn-block" id="batch-generate-btn">
                  ${createIcon('batch', 18).outerHTML}
                  ${this.t('batchGenerate')}
                </button>

                <div id="batch-results"></div>
              </div>
            </div>

            <div class="tab-content" id="tab-history">
              <div class="section">
                <div class="history-header">
                  <h3 class="section-title">
                    ${createIcon('history', 20).outerHTML}
                    ${this.t('historyTitle')}
                  </h3>
                  <button class="btn btn-danger btn-sm" id="clear-history-btn" ${this.historyManager.getCount() === 0 ? 'disabled' : ''}>
                    ${createIcon('trash', 16).outerHTML}
                    ${this.t('clearHistory')}
                  </button>
                </div>
                <div class="history-list" id="history-list">
                  <div class="history-empty">${this.t('noHistory')}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="right-panel">
            <div class="section">
              <h3 class="section-title">
                ${createIcon('image', 20).outerHTML}
                ${this.t('previewTitle')}
              </h3>
              <div class="preview-container" id="preview-container">
                <div class="preview-placeholder">
                  ${createIcon('qr', 64).outerHTML}
                  <p>${this.t('previewPlaceholder')}</p>
                </div>
              </div>
              <div id="preview-actions" style="display: none; margin-top: 16px;">
                <button class="btn btn-primary btn-block" id="download-btn">
                  ${createIcon('download', 18).outerHTML}
                  ${this.t('downloadPNG')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    this.cacheElements()
  }

  cacheElements() {
    this.elements = {
      textInput: document.getElementById('text-input'),
      sizeInput: document.getElementById('size-input'),
      errorLevel: document.getElementById('error-level'),
      colorDark: document.getElementById('color-dark'),
      colorLight: document.getElementById('color-light'),
      generateBtn: document.getElementById('generate-btn'),
      previewContainer: document.getElementById('preview-container'),
      previewActions: document.getElementById('preview-actions'),
      downloadBtn: document.getElementById('download-btn'),
      logoUpload: document.getElementById('logo-upload'),
      logoInput: document.getElementById('logo-input'),
      logoPreview: document.getElementById('logo-preview'),
      logoUploadContent: document.getElementById('logo-upload-content'),
      logoSizeControl: document.getElementById('logo-size-control'),
      logoSize: document.getElementById('logo-size'),
      logoSizeValue: document.getElementById('logo-size-value'),
      tabs: document.querySelectorAll('.tab'),
      tabContents: document.querySelectorAll('.tab-content'),
      batchInput: document.getElementById('batch-input'),
      batchSize: document.getElementById('batch-size'),
      batchErrorLevel: document.getElementById('batch-error-level'),
      batchGenerateBtn: document.getElementById('batch-generate-btn'),
      batchProgress: document.getElementById('batch-progress'),
      progressFill: document.getElementById('progress-fill'),
      progressText: document.getElementById('progress-text'),
      batchResults: document.getElementById('batch-results'),
      historyList: document.getElementById('history-list'),
      clearHistoryBtn: document.getElementById('clear-history-btn'),
      languageSelect: document.getElementById('language-select')
    }
  }

  attachEventListeners() {
    // Language selector
    this.elements.languageSelect.addEventListener('change', (e) => {
      this.i18n.setLanguage(e.target.value)
    })

    // Tab switching
    this.elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab))
    })

    // Generate single QR
    this.elements.generateBtn.addEventListener('click', () => this.generateSingle())
    this.elements.textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.generateSingle()
    })

    // Download
    this.elements.downloadBtn.addEventListener('click', () => this.downloadCurrent())

    // Logo upload
    this.elements.logoUpload.addEventListener('click', () => this.elements.logoInput.click())
    this.elements.logoUpload.addEventListener('dragover', (e) => {
      e.preventDefault()
      this.elements.logoUpload.style.borderColor = 'var(--primary-color)'
    })
    this.elements.logoUpload.addEventListener('dragleave', () => {
      this.elements.logoUpload.style.borderColor = ''
    })
    this.elements.logoUpload.addEventListener('drop', (e) => {
      e.preventDefault()
      this.elements.logoUpload.style.borderColor = ''
      if (e.dataTransfer.files.length > 0) {
        this.handleLogoUpload(e.dataTransfer.files[0])
      }
    })
    this.elements.logoInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleLogoUpload(e.target.files[0])
      }
    })

    // Logo size slider
    this.elements.logoSize.addEventListener('input', (e) => {
      this.elements.logoSizeValue.textContent = e.target.value + '%'
    })

    // Batch generation
    this.elements.batchGenerateBtn.addEventListener('click', () => this.generateBatch())

    // Clear history
    this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory())
  }

  switchTab(tabName) {
    this.elements.tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName)
    })
    this.elements.tabContents.forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`)
    })

    // Update history count in tab
    if (tabName === 'history') {
      this.renderHistory()
    }
  }

  async generateSingle() {
    const text = this.elements.textInput.value.trim()
    if (!text) {
      alert(this.t('enterText'))
      return
    }

    const options = {
      width: parseInt(this.elements.sizeInput.value),
      height: parseInt(this.elements.sizeInput.value),
      color: {
        dark: this.elements.colorDark.value,
        light: this.elements.colorLight.value
      },
      errorCorrectionLevel: this.elements.errorLevel.value
    }

    this.elements.generateBtn.disabled = true
    this.elements.generateBtn.innerHTML = '<div class="spinner"></div> ' + this.t('generating')

    try {
      let result

      if (this.currentLogo) {
        // Generate with logo overlay
        const canvas = document.createElement('canvas')
        await this.qrGenerator.generateToCanvas(text, canvas, {
          ...options,
          errorCorrectionLevel: 'H' // Use high error correction for logo
        })

        const logoSize = parseInt(this.elements.logoSize.value) / 100
        const finalCanvas = await this.logoOverlay.applyLogo(canvas, this.currentLogo, {
          sizeRatio: logoSize
        })

        result = {
          text,
          dataUrl: finalCanvas.toDataURL('image/png'),
          timestamp: Date.now(),
          options
        }
      } else {
        // Generate without logo
        result = await this.qrGenerator.generate(text, options)
      }

      this.currentResult = result
      this.renderPreview(result.dataUrl, text)
      this.historyManager.add(result)
      this.updateHistoryTabCount()
    } catch (error) {
      alert(this.t('errorGenerating') + ' ' + error.message)
    } finally {
      this.elements.generateBtn.disabled = false
      this.elements.generateBtn.innerHTML = `
        ${createIcon('qr', 18).outerHTML}
        ${this.t('generateQR')}
      `
    }
  }

  renderPreview(dataUrl, text) {
    this.elements.previewContainer.innerHTML = `
      <div class="qr-result">
        <img src="${dataUrl}" alt="QR Code">
        <div class="qr-text">${truncateText(text, 50)}</div>
      </div>
    `
    this.elements.previewContainer.classList.add('has-qr')
    this.elements.previewActions.style.display = 'block'
  }

  downloadCurrent() {
    if (this.currentResult) {
      const filename = sanitizeFilename(this.currentResult.text) + '.png'
      downloadDataUrl(this.currentResult.dataUrl, filename)
    }
  }

  async handleLogoUpload(file) {
    if (!file.type.startsWith('image/')) {
      alert(this.t('uploadImage'))
      return
    }

    try {
      this.currentLogo = await this.logoOverlay.loadImage(file)
      this.elements.logoPreview.src = URL.createObjectURL(file)
      this.elements.logoPreview.style.display = 'block'
      this.elements.logoUploadContent.style.display = 'none'
      this.elements.logoUpload.classList.add('has-file')
      this.elements.logoSizeControl.style.display = 'block'
      document.getElementById('batch-logo-control').style.display = 'block'
    } catch (error) {
      alert(this.t('errorLoading') + ' ' + error.message)
    }
  }

  async generateBatch() {
    const input = this.elements.batchInput.value.trim()
    if (!input) {
      alert(this.t('enterBatchText'))
      return
    }

    const items = this.batchGenerator.parseInput(input)
    if (items.length === 0) {
      alert(this.t('enterBatchText'))
      return
    }

    if (items.length > 100) {
      alert(this.t('maxBatch'))
      return
    }

    const options = {
      width: parseInt(this.elements.batchSize.value),
      height: parseInt(this.elements.batchSize.value),
      errorCorrectionLevel: this.elements.batchErrorLevel.value
    }

    this.batchGenerator.defaultOptions = options

    this.elements.batchGenerateBtn.disabled = true
    this.elements.batchGenerateBtn.innerHTML = '<div class="spinner"></div> ' + this.t('generating')
    this.elements.batchProgress.style.display = 'block'
    this.elements.batchResults.innerHTML = ''

    try {
      let results

      if (this.currentLogo) {
        const logoSize = parseInt(this.elements.logoSize.value) / 100
        results = await this.batchGenerator.generateWithLogo(
          items,
          this.currentLogo,
          (progress) => this.updateProgress(progress),
          logoSize
        )
      } else {
        results = await this.batchGenerator.generateAll(
          items,
          (progress) => this.updateProgress(progress)
        )
      }

      this.renderBatchResults(results)
    } catch (error) {
      alert(this.t('errorBatch') + ' ' + error.message)
    } finally {
      this.elements.batchGenerateBtn.disabled = false
      this.elements.batchGenerateBtn.innerHTML = `
        ${createIcon('batch', 18).outerHTML}
        ${this.t('batchGenerate')}
      `
      this.elements.batchProgress.style.display = 'none'
    }
  }

  updateProgress(progress) {
    const percentage = Math.round(progress * 100)
    this.elements.progressFill.style.width = percentage + '%'
    this.elements.progressText.textContent = percentage + '%'
  }

  renderBatchResults(results) {
    const successCount = results.filter(r => r.success).length
    const failCount = results.length - successCount

    const header = document.createElement('div')
    header.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <strong>${successCount}</strong> ${this.t('successful')}, <strong>${failCount}</strong> ${this.t('failed')}
        </div>
        ${successCount > 0 ? `
          <button class="btn btn-primary btn-sm" id="download-all-btn">
            ${createIcon('download', 16).outerHTML}
            ${this.t('downloadZIP')}
          </button>
        ` : ''}
      </div>
    `

    const list = document.createElement('div')
    list.className = 'batch-results'

    results.forEach((result, index) => {
      const item = document.createElement('div')
      item.className = 'batch-item'
      item.innerHTML = `
        ${result.success ? `<img src="${result.dataUrl}" alt="QR">` : createIcon('x', 32).outerHTML}
        <div class="batch-item-info">
          <div class="batch-item-text">${truncateText(result.text, 40)}</div>
          <div class="batch-item-status ${result.success ? 'success' : 'error'}">
            ${result.success ? this.t('successful') : result.error}
          </div>
        </div>
        ${result.success ? `
          <button class="btn btn-secondary btn-sm download-item-btn" data-index="${index}">
            ${createIcon('download', 16).outerHTML}
          </button>
        ` : ''}
      `
      list.appendChild(item)
    })

    this.elements.batchResults.innerHTML = ''
    this.elements.batchResults.appendChild(header)
    this.elements.batchResults.appendChild(list)

    // Attach download handlers
    const zipBtn = header.querySelector('#download-all-btn')
    if (zipBtn) {
      zipBtn.addEventListener('click', () => {
        this.batchGenerator.downloadAsZip(results.filter(r => r.success))
      })
    }

    list.querySelectorAll('.download-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index)
        this.batchGenerator.downloadIndividual(results[index])
      })
    })
  }

  renderHistory() {
    const history = this.historyManager.getAll()

    if (history.length === 0) {
      this.elements.historyList.innerHTML = `<div class="history-empty">${this.t('noHistory')}</div>`
      this.elements.clearHistoryBtn.disabled = true
      return
    }

    this.elements.clearHistoryBtn.disabled = false
    this.elements.historyList.innerHTML = ''

    history.forEach((item, index) => {
      const el = document.createElement('div')
      el.className = 'history-item'
      el.innerHTML = `
        <img src="${item.dataUrl}" alt="QR">
        <div class="history-item-info">
          <div class="history-item-text">${truncateText(item.text, 35)}</div>
          <div class="history-item-date">${formatDate(item.timestamp)}</div>
        </div>
        <div class="history-actions">
          <button class="btn btn-secondary btn-sm load-btn" title="${this.t('load')}">
            ${createIcon('upload', 16).outerHTML}
          </button>
          <button class="btn btn-secondary btn-sm download-btn" title="${this.t('download')}">
            ${createIcon('download', 16).outerHTML}
          </button>
          <button class="btn btn-danger btn-sm delete-btn" title="${this.t('delete')}">
            ${createIcon('x', 16).outerHTML}
          </button>
        </div>
      `

      // Load
      el.querySelector('.load-btn').addEventListener('click', (e) => {
        e.stopPropagation()
        this.loadFromHistory(item)
      })

      // Download
      el.querySelector('.download-btn').addEventListener('click', (e) => {
        e.stopPropagation()
        const filename = sanitizeFilename(item.text) + '.png'
        downloadDataUrl(item.dataUrl, filename)
      })

      // Delete
      el.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation()
        this.historyManager.delete(index)
        this.renderHistory()
        this.updateHistoryTabCount()
      })

      // Click to load
      el.addEventListener('click', () => this.loadFromHistory(item))

      this.elements.historyList.appendChild(el)
    })
  }

  loadFromHistory(item) {
    this.elements.textInput.value = item.text
    if (item.options) {
      this.elements.sizeInput.value = item.options.width || 256
      this.elements.colorDark.value = item.options.color?.dark || '#000000'
      this.elements.colorLight.value = item.options.color?.light || '#ffffff'
      this.elements.errorLevel.value = item.options.errorCorrectionLevel || 'M'
    }
    this.currentResult = item
    this.renderPreview(item.dataUrl, item.text)
    this.switchTab('single')
  }

  clearHistory() {
    if (confirm(this.t('confirmClear'))) {
      this.historyManager.clear()
      this.renderHistory()
      this.updateHistoryTabCount()
    }
  }

  updateHistoryTabCount() {
    const historyTab = document.querySelector('.tab[data-tab="history"]')
    if (historyTab) {
      historyTab.textContent = `${this.t('tabHistory')} (${this.historyManager.getCount()})`
    }
  }
}
