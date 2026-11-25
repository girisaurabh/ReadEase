import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Set up pdf.js worker using unpkg or cdnjs if needed, or inline
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
} catch (e) {
  console.warn('PDF.js worker setup note:', e);
}

export interface ExtractedDocument {
  text: string;
  fileName: string;
  fileType: string;
  wordCount: number;
}

export async function extractDocumentText(file: File): Promise<ExtractedDocument> {
  const fileName = file.name;
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  // 1. Plain text / Markdown
  if (file.type === 'text/plain' || fileExtension === 'txt' || fileExtension === 'md') {
    const text = await file.text();
    if (!text.trim()) {
      throw new Error(`The file "${fileName}" is empty.`);
    }
    return {
      text: text.trim(),
      fileName,
      fileType: 'TXT Document',
      wordCount: countWords(text),
    };
  }

  // 2. Word Document (.docx)
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileExtension === 'docx'
  ) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value.trim();
      if (!text) {
        throw new Error(`Could not extract any readable text from "${fileName}". The file may be blank or contain only images.`);
      }
      return {
        text,
        fileName,
        fileType: 'Word Document (.docx)',
        wordCount: countWords(text),
      };
    } catch (err: any) {
      throw new Error(`Failed to parse DOCX file: ${err.message || 'Corrupted or unsupported document format'}`);
    }
  }

  // 3. PDF Document (.pdf)
  if (file.type === 'application/pdf' || fileExtension === 'pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ');
        fullText += pageText + '\n\n';
      }

      const text = fullText.trim();
      if (!text) {
        throw new Error(`Could not extract any text from "${fileName}". This PDF may be a scanned image or protected.`);
      }

      return {
        text,
        fileName,
        fileType: `PDF Document (${pdf.numPages} pages)`,
        wordCount: countWords(text),
      };
    } catch (err: any) {
      throw new Error(`Failed to read PDF file: ${err.message || 'Scanned or encrypted PDF.'}`);
    }
  }

  // Unsupported
  throw new Error(`Unsupported file type (.${fileExtension || 'unknown'}). Please upload a .txt, .docx, or .pdf file, or paste your text directly.`);
}

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}
