export interface FormatExportOptions {
  text: string;
  fontName: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  paragraphSpacing: number;
  textAlign: string;
  bgColor: string;
  textColor: string;
  fileName?: string;
}

export function downloadAsHtml(options: FormatExportOptions): void {
  const cleanText = options.text.trim();
  if (!cleanText) {
    throw new Error('Please add some text before downloading.');
  }

  const paragraphs = cleanText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br />')}</p>`)
    .join('\n');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DyslexiEase — Formatted Reading Document</title>
  
  <!-- Dyslexia Font Embeds -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  
  <style>
    @font-face {
      font-family: 'OpenDyslexic';
      font-style: normal;
      font-weight: 400;
      src: local('OpenDyslexic'), url('https://fonts.cdnfonts.com/s/19808/OpenDyslexic-Regular.woff') format('woff');
      font-display: swap;
    }
    @font-face {
      font-family: 'OpenDyslexic';
      font-style: normal;
      font-weight: 700;
      src: local('OpenDyslexic Bold'), url('https://fonts.cdnfonts.com/s/19808/OpenDyslexic-Bold.woff') format('woff');
      font-display: swap;
    }

    body {
      margin: 0;
      padding: 40px 20px;
      background-color: ${options.bgColor || '#FEFCE8'};
      color: ${options.textColor || '#1E1B4B'};
      font-family: ${options.fontFamily};
      font-size: ${options.fontSize}px;
      line-height: ${options.lineHeight};
      letter-spacing: ${options.letterSpacing}em;
      word-spacing: ${options.wordSpacing}em;
      text-align: ${options.textAlign || 'left'};
      -webkit-font-smoothing: antialiased;
    }

    .document-wrapper {
      max-width: 820px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    .meta-bar {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 32px;
      padding-bottom: 14px;
      border-bottom: 1.5px solid rgba(0, 0, 0, 0.08);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
    }

    .meta-pill {
      background: rgba(0, 0, 0, 0.05);
      padding: 2px 8px;
      border-radius: 999px;
    }

    p {
      margin-top: 0;
      margin-bottom: ${options.paragraphSpacing || 1.8}em;
    }

    @media print {
      body {
        padding: 0;
        background: #fff;
      }
      .document-wrapper {
        border: none;
        box-shadow: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="document-wrapper">
    <div class="meta-bar">
      <span>DyslexiEase Formatted Document</span>
      <span>
        Font: <span class="meta-pill">${options.fontName}</span> &bull; 
        Size: <span class="meta-pill">${options.fontSize}px</span> &bull; 
        Spacing: <span class="meta-pill">${options.letterSpacing}em</span>
      </span>
    </div>
    <div class="content-body">
      ${paragraphs}
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const safeName = (options.fileName || 'dyslexiease-formatted-text').replace(/[^a-z0-9_-]/gi, '_');
  triggerDownload(blob, `${safeName}.html`);
}

export function downloadAsTxt(text: string, fileName = 'dyslexiease-text'): void {
  const cleanText = text.trim();
  if (!cleanText) {
    throw new Error('Please add some text before downloading.');
  }

  const blob = new Blob([cleanText], { type: 'text/plain;charset=utf-8' });
  const safeName = fileName.replace(/[^a-z0-9_-]/gi, '_');
  triggerDownload(blob, `${safeName}.txt`);
}

function triggerDownload(blob: Blob, fullFileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fullFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
