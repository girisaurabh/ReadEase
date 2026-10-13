# DyslexiEase — A Dyslexia-Friendly Reading Platform

DyslexiEase is an accessible, modern, and friendly reading web application designed for people with dyslexia. Inspired by and closely reproducing the original DyslexiEase design, this platform expands upon it with a dedicated **Reading Studio**, document import (.txt, .docx, .pdf), an interactive **Reading Ruler**, and comprehensive typography and color customization.

---

## 🌟 Key Features

### 1. Reading Studio & Workspace (`/reading-workspace`)
- **Mode Switching:** Easily toggle between **Reading Mode**, **Edit Mode**, and **Split View**.
- **Distraction-Free Fullscreen:** Click *Fullscreen* to immerse into a pure, calming reading environment.
- **Sample Passages:** Instant access to 3 sample passages:
  - *The Brave Little Star* (Children's uplifting story)
  - *How Whales Sing* (Nature and science passage)
  - *Dyslexia & Creative Minds* (Informative neurodiversity guide)
- **Document Text Extractor:** Drag-and-drop or upload:
  - `.txt` (Plain text & Markdown)
  - `.docx` (Microsoft Word documents via `mammoth`)
  - `.pdf` (Multi-page PDF documents via `pdfjs-dist`)
- **Reading Ruler:** An interactive reading guide that smoothly follows mouse movement or touch, with customizable height.
- **Sentence Focus:** Subtle hover highlights on active sentences to prevent line hopping.
- **Focus Mode:** Dims ambient noise and distractions.
- **Built-in Read-Aloud:** Seamless Web Speech API speech synthesis with speed control, pause/resume, and voice selection.
- **Persistent Preferences:** All reading settings are automatically saved to `localStorage` and persist across browser reloads.
- **Reset to Defaults:** Restore original dyslexia-friendly settings with one click.

### 2. Text to Speech Reader (`/text-to-speech`)
- **Read Aloud:** Natural speech synthesis with real-time speech boundary detection.
- **Speed Selector:** Adjustable speeds (`0.5×`, `0.75×`, `1×`, `1.25×`, `1.5×`).
- **Interactive Word Panel:** Click any word in the text box to isolate and hear that individual word spoken aloud.
- **Voice Selection:** Switch between available browser voice models.
- **Direct Document Upload:** Upload `.txt`, `.docx`, or `.pdf` directly into the speech reader.
- **Animated Audio Rings & Character Artwork:** Kid pointing SVG illustration with status indicators.

### 3. Font Changer (`/font-changer`)
- Built to stop letters like **b**, **d**, **p**, and **q** from flipping and confusing readers.
- 5 Specialized Fonts:
  - **OpenDyslexic** (Weighted bottoms reduce letter rotation)
  - **Lexend** (Scientifically proven to improve reading fluency)
  - **Atkinson Hyperlegible** (Developed by the Braille Institute for distinguishability)
  - **Comic Sans** (Disproportionate letter shapes prevent reversals)
  - **Arial** (Clean sans-serif baseline)
- Interactive sliders for **Font Size**, **Line Height**, and **Letter Spacing**.
- Educational cards: *"Why fonts matter"* and *"Spacing helps too"*.

### 4. Colour Overlays (`/colour-overlay`)
- Reduces visual stress and glare (Meares-Irlen syndrome).
- 12 Curated Dyslexia Swatches:
  - *Soft Yellow*, *Peach*, *Mint Green*, *Lavender*, *Sky Blue*, *Rose*, *Cream*, *Sage*, *Lilac*, *Apricot*, *Ice Blue*, and *White*.
- Live preview panel with typography controls.
- Science card explaining the reduction in visual contrast.

### 5. Community & Educational Sections
- **Kids (`/kids`):** Uplifting affirmations (*"Your brain works differently — that's a good thing"*), interactive tools, and playful illustrations.
- **Parents (`/parents`):** Guidance on identifying signs of dyslexia, tips for supporting reading at home, and family artwork.
- **Educators (`/educators`):** Classroom statistics (*1 in 5 students*), 8 evidence-based teaching strategies, and classroom blackboard illustration.

### 6. Interactive Magic Cursor
- Custom SVG magic wand with trailing star and dot sparkles.
- Built-in toggle in the navigation bar to easily switch between the magic cursor and default pointer.
- Automatically disables on touch and mobile devices for optimal accessibility.

---

## 🛠 Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Routing:** React Router DOM (v6)
- **Icons:** Lucide React
- **Document Parsers:**
  - `mammoth` for `.docx`
  - `pdfjs-dist` for `.pdf`
- **Speech API:** Browser native Web Speech API (`SpeechSynthesis`)
- **Styling:** CSS variables, responsive fluid typography, and pure vector SVGs

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173/` in your browser.
