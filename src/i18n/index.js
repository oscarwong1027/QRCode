export const translations = {
  en: {
    // Header
    title: 'QR Code Generator',
    subtitle: 'Generate beautiful QR codes with advanced customization',

    // Tabs
    tabSingle: 'Single QR',
    tabBatch: 'Batch',
    tabHistory: 'History',

    // Single QR Section
    textOrUrl: 'Text or URL',
    textPlaceholder: 'https://example.com or any text...',
    size: 'Size (px)',
    errorCorrection: 'Error Correction',
    errorLow: 'Low (7%)',
    errorMedium: 'Medium (15%)',
    errorQuartile: 'Quartile (25%)',
    errorHigh: 'High (30%)',
    foregroundColor: 'Foreground Color',
    backgroundColor: 'Background Color',
    logo: 'Logo (optional)',
    logoPlaceholder: 'Click or drag to upload logo',
    logoSize: 'Logo Size:',
    generateQR: 'Generate QR Code',
    generating: 'Generating...',

    // Batch Section
    batchInputLabel: 'Enter multiple URLs/Text (one per line)',
    batchPlaceholder: 'https://example1.com\nhttps://example2.com\nhttps://example3.com',
    batchGenerate: 'Generate Batch',
    batchProgress: 'Progress',
    successful: 'successful',
    failed: 'failed',
    downloadZIP: 'Download ZIP',
    useLogoFromSingle: 'Use logo from Single QR tab',
    logoInfo: 'Upload a logo in the Single QR tab to use it for batch generation',

    // History Section
    historyTitle: 'Generated QR Codes',
    clearHistory: 'Clear',
    noHistory: 'No history yet. Generate your first QR code!',
    load: 'Load',
    download: 'Download',
    delete: 'Delete',
    confirmClear: 'Are you sure you want to clear all history?',

    // Preview Section
    previewTitle: 'Preview',
    previewPlaceholder: 'Your QR code will appear here',
    downloadPNG: 'Download PNG',

    // Language
    language: 'Language',

    // Errors
    enterText: 'Please enter some text or URL',
    enterBatchText: 'Please enter some text or URLs',
    maxBatch: 'Maximum 100 items allowed for batch generation',
    uploadImage: 'Please upload an image file',
    errorGenerating: 'Error generating QR code:',
    errorBatch: 'Error generating batch:',
    errorLoading: 'Error loading image:',
  },

  zh: {
    title: '二维码生成器',
    subtitle: '生成精美的二维码，支持高级自定义',

    tabSingle: '单个二维码',
    tabBatch: '批量生成',
    tabHistory: '历史记录',

    textOrUrl: '文本或网址',
    textPlaceholder: 'https://example.com 或任意文本...',
    size: '尺寸 (像素)',
    errorCorrection: '纠错级别',
    errorLow: '低 (7%)',
    errorMedium: '中 (15%)',
    errorQuartile: '较高 (25%)',
    errorHigh: '高 (30%)',
    foregroundColor: '前景色',
    backgroundColor: '背景色',
    logo: 'Logo (可选)',
    logoPlaceholder: '点击或拖拽上传Logo',
    logoSize: 'Logo大小：',
    generateQR: '生成二维码',
    generating: '生成中...',

    batchInputLabel: '输入多个网址/文本 (每行一个)',
    batchPlaceholder: 'https://example1.com\nhttps://example2.com\nhttps://example3.com',
    batchGenerate: '批量生成',
    batchProgress: '进度',
    successful: '成功',
    failed: '失败',
    downloadZIP: '下载ZIP',
    useLogoFromSingle: '使用单个二维码标签中的Logo',
    logoInfo: '在单个二维码标签中上传Logo，以便在批量生成时使用',

    historyTitle: '生成的二维码',
    clearHistory: '清空',
    noHistory: '暂无历史记录。生成您的第一个二维码！',
    load: '加载',
    download: '下载',
    delete: '删除',
    confirmClear: '确定要清空所有历史记录吗？',

    previewTitle: '预览',
    previewPlaceholder: '您的二维码将显示在这里',
    downloadPNG: '下载PNG',

    language: '语言',

    enterText: '请输入文本或网址',
    enterBatchText: '请输入文本或网址',
    maxBatch: '批量生成最多支持100个项目',
    uploadImage: '请上传图片文件',
    errorGenerating: '生成二维码时出错：',
    errorBatch: '批量生成时出错：',
    errorLoading: '加载图片时出错：',
  },

  es: {
    title: 'Generador de Códigos QR',
    subtitle: 'Genera códigos QR hermosos con personalización avanzada',

    tabSingle: 'QR Individual',
    tabBatch: 'Lote',
    tabHistory: 'Historial',

    textOrUrl: 'Texto o URL',
    textPlaceholder: 'https://example.com o cualquier texto...',
    size: 'Tamaño (px)',
    errorCorrection: 'Corrección de Errores',
    errorLow: 'Baja (7%)',
    errorMedium: 'Media (15%)',
    errorQuartile: 'Cuartil (25%)',
    errorHigh: 'Alta (30%)',
    foregroundColor: 'Color de Primer Plano',
    backgroundColor: 'Color de Fondo',
    logo: 'Logo (opcional)',
    logoPlaceholder: 'Haz clic o arrastra para subir logo',
    logoSize: 'Tamaño del Logo:',
    generateQR: 'Generar Código QR',
    generating: 'Generando...',

    batchInputLabel: 'Introduce múltiples URLs/Texto (uno por línea)',
    batchPlaceholder: 'https://example1.com\nhttps://example2.com\nhttps://example3.com',
    batchGenerate: 'Generar Lote',
    batchProgress: 'Progreso',
    successful: 'exitosos',
    failed: 'fallidos',
    downloadZIP: 'Descargar ZIP',
    useLogoFromSingle: 'Usar logo de la pestaña QR Individual',
    logoInfo: 'Sube un logo en la pestaña QR Individual para usarlo en generación por lotes',

    historyTitle: 'Códigos QR Generados',
    clearHistory: 'Limpiar',
    noHistory: 'Aún no hay historial. ¡Genera tu primer código QR!',
    load: 'Cargar',
    download: 'Descargar',
    delete: 'Eliminar',
    confirmClear: '¿Estás seguro de que quieres borrar todo el historial?',

    previewTitle: 'Vista Previa',
    previewPlaceholder: 'Tu código QR aparecerá aquí',
    downloadPNG: 'Descargar PNG',

    language: 'Idioma',

    enterText: 'Por favor introduce texto o URL',
    enterBatchText: 'Por favor introduce texto o URLs',
    maxBatch: 'Máximo 100 elementos permitidos para generación por lotes',
    uploadImage: 'Por favor sube un archivo de imagen',
    errorGenerating: 'Error al generar código QR:',
    errorBatch: 'Error al generar lote:',
    errorLoading: 'Error al cargar imagen:',
  },

  ja: {
    title: 'QRコードジェネレーター',
    subtitle: '高度なカスタマイズで美しいQRコードを生成',

    tabSingle: '単一QR',
    tabBatch: '一括生成',
    tabHistory: '履歴',

    textOrUrl: 'テキストまたはURL',
    textPlaceholder: 'https://example.com または任意のテキスト...',
    size: 'サイズ (px)',
    errorCorrection: '誤り訂正レベル',
    errorLow: '低 (7%)',
    errorMedium: '中 (15%)',
    errorQuartile: '四分位 (25%)',
    errorHigh: '高 (30%)',
    foregroundColor: '前景色',
    backgroundColor: '背景色',
    logo: 'ロゴ (オプション)',
    logoPlaceholder: 'クリックまたはドラッグしてロゴをアップロード',
    logoSize: 'ロゴサイズ：',
    generateQR: 'QRコードを生成',
    generating: '生成中...',

    batchInputLabel: '複数のURL/テキストを入力（1行に1つ）',
    batchPlaceholder: 'https://example1.com\nhttps://example2.com\nhttps://example3.com',
    batchGenerate: '一括生成',
    batchProgress: '進捗',
    successful: '成功',
    failed: '失敗',
    downloadZIP: 'ZIPをダウンロード',
    useLogoFromSingle: '単一QRタブからロゴを使用',
    logoInfo: '一括生成で使用するには、単一QRタブでロゴをアップロードしてください',

    historyTitle: '生成したQRコード',
    clearHistory: 'クリア',
    noHistory: '履歴はありません。最初のQRコードを生成してください！',
    load: '読み込み',
    download: 'ダウンロード',
    delete: '削除',
    confirmClear: 'すべての履歴を削除してもよろしいですか？',

    previewTitle: 'プレビュー',
    previewPlaceholder: 'QRコードがここに表示されます',
    downloadPNG: 'PNGをダウンロード',

    language: '言語',

    enterText: 'テキストまたはURLを入力してください',
    enterBatchText: 'テキストまたはURLを入力してください',
    maxBatch: '一括生成は最大100項目までです',
    uploadImage: '画像ファイルをアップロードしてください',
    errorGenerating: 'QRコードの生成中にエラーが発生しました：',
    errorBatch: '一括生成中にエラーが発生しました：',
    errorLoading: '画像の読み込み中にエラーが発生しました：',
  },

  fr: {
    title: 'Générateur de QR Code',
    subtitle: 'Générez de magnifiques codes QR avec personnalisation avancée',

    tabSingle: 'QR Individuel',
    tabBatch: 'Lot',
    tabHistory: 'Historique',

    textOrUrl: 'Texte ou URL',
    textPlaceholder: 'https://example.com ou n\'importe quel texte...',
    size: 'Taille (px)',
    errorCorrection: 'Correction d\'Erreur',
    errorLow: 'Faible (7%)',
    errorMedium: 'Moyenne (15%)',
    errorQuartile: 'Quartile (25%)',
    errorHigh: 'Élevée (30%)',
    foregroundColor: 'Couleur de Premier Plan',
    backgroundColor: 'Couleur d\'Arrière-plan',
    logo: 'Logo (optionnel)',
    logoPlaceholder: 'Cliquez ou faites glisser pour télécharger un logo',
    logoSize: 'Taille du Logo :',
    generateQR: 'Générer le QR Code',
    generating: 'Génération...',

    batchInputLabel: 'Entrez plusieurs URLs/Textes (un par ligne)',
    batchPlaceholder: 'https://example1.com\nhttps://example2.com\nhttps://example3.com',
    batchGenerate: 'Générer en Lot',
    batchProgress: 'Progression',
    successful: 'réussis',
    failed: 'échoués',
    downloadZIP: 'Télécharger ZIP',
    useLogoFromSingle: 'Utiliser le logo de l\'onglet QR Individuel',
    logoInfo: 'Téléchargez un logo dans l\'onglet QR Individuel pour l\'utiliser en génération par lot',

    historyTitle: 'Codes QR Générés',
    clearHistory: 'Effacer',
    noHistory: 'Pas encore d\'historique. Générez votre premier code QR !',
    load: 'Charger',
    download: 'Télécharger',
    delete: 'Supprimer',
    confirmClear: 'Êtes-vous sûr de vouloir effacer tout l\'historique ?',

    previewTitle: 'Aperçu',
    previewPlaceholder: 'Votre code QR apparaîtra ici',
    downloadPNG: 'Télécharger PNG',

    language: 'Langue',

    enterText: 'Veuillez entrer du texte ou une URL',
    enterBatchText: 'Veuillez entrer du texte ou des URLs',
    maxBatch: 'Maximum 100 éléments autorisés pour la génération par lot',
    uploadImage: 'Veuillez télécharger un fichier image',
    errorGenerating: 'Erreur lors de la génération du QR code :',
    errorBatch: 'Erreur lors de la génération du lot :',
    errorLoading: 'Erreur lors du chargement de l\'image :',
  },

  de: {
    title: 'QR-Code Generator',
    subtitle: 'Erstellen Sie schöne QR-Codes mit erweiterten Anpassungsoptionen',

    tabSingle: 'Einzelner QR',
    tabBatch: 'Stapel',
    tabHistory: 'Verlauf',

    textOrUrl: 'Text oder URL',
    textPlaceholder: 'https://example.com oder beliebiger Text...',
    size: 'Größe (px)',
    errorCorrection: 'Fehlerkorrektur',
    errorLow: 'Niedrig (7%)',
    errorMedium: 'Mittel (15%)',
    errorQuartile: 'Quartil (25%)',
    errorHigh: 'Hoch (30%)',
    foregroundColor: 'Vordergrundfarbe',
    backgroundColor: 'Hintergrundfarbe',
    logo: 'Logo (optional)',
    logoPlaceholder: 'Klicken oder ziehen Sie zum Hochladen eines Logos',
    logoSize: 'Logo-Größe:',
    generateQR: 'QR-Code Generieren',
    generating: 'Generierung...',

    batchInputLabel: 'Geben Sie mehrere URLs/Texte ein (einer pro Zeile)',
    batchPlaceholder: 'https://example1.com\nhttps://example2.com\nhttps://example3.com',
    batchGenerate: 'Stapel Generieren',
    batchProgress: 'Fortschritt',
    successful: 'erfolgreich',
    failed: 'fehlgeschlagen',
    downloadZIP: 'ZIP Herunterladen',
    useLogoFromSingle: 'Logo vom Einzel-QR-Tab verwenden',
    logoInfo: 'Laden Sie ein Logo im Einzel-QR-Tab hoch, um es für die Stapelgenerierung zu verwenden',

    historyTitle: 'Generierte QR-Codes',
    clearHistory: 'Löschen',
    noHistory: 'Noch kein Verlauf. Generieren Sie Ihren ersten QR-Code!',
    load: 'Laden',
    download: 'Herunterladen',
    delete: 'Löschen',
    confirmClear: 'Sind Sie sicher, dass Sie den gesamten Verlauf löschen möchten?',

    previewTitle: 'Vorschau',
    previewPlaceholder: 'Ihr QR-Code erscheint hier',
    downloadPNG: 'PNG Herunterladen',

    language: 'Sprache',

    enterText: 'Bitte geben Sie Text oder eine URL ein',
    enterBatchText: 'Bitte geben Sie Text oder URLs ein',
    maxBatch: 'Maximal 100 Elemente für Stapelgenerierung erlaubt',
    uploadImage: 'Bitte laden Sie eine Bilddatei hoch',
    errorGenerating: 'Fehler beim Generieren des QR-Codes:',
    errorBatch: 'Fehler bei der Stapelgenerierung:',
    errorLoading: 'Fehler beim Laden des Bildes:',
  }
}

export const languageNames = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ja: '日本語',
  fr: 'Français',
  de: 'Deutsch'
}

const STORAGE_KEY = 'qr_generator_language'

export class I18n {
  constructor() {
    this.currentLang = this.loadLanguage() || 'en'
    this.listeners = []
  }

  loadLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  }

  saveLanguage() {
    try {
      localStorage.setItem(STORAGE_KEY, this.currentLang)
    } catch {
      // Ignore
    }
  }

  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLang = lang
      this.saveLanguage()
      this.notifyListeners()
    }
  }

  getLanguage() {
    return this.currentLang
  }

  t(key) {
    const langData = translations[this.currentLang] || translations.en
    return langData[key] || translations.en[key] || key
  }

  onChange(callback) {
    this.listeners.push(callback)
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLang))
  }

  getLanguageOptions() {
    return Object.entries(languageNames).map(([code, name]) => ({
      code,
      name
    }))
  }
}

export const i18n = new I18n()
