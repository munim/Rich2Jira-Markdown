import './style.css';
import Alpine from 'alpinejs';
import { createEditor } from './editor';
import { createToolbar } from './toolbar';
import { htmlToJira } from './converters/toJira';
import { htmlToMarkdown } from './converters/toMarkdown';

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

Alpine.data('appStore', () => ({
  theme: localStorage.getItem('theme') || 'light',
  activeTab: 'jira' as 'jira' | 'markdown',
  jiraOutput: '',
  markdownOutput: '',
  copiedJira: false,
  copiedMarkdown: false,

  init() {
    this.applyTheme();
    this.initEditor();
  },

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  },

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  },

  initEditor() {
    const editorElement = document.getElementById('editor');
    const toolbarElement = document.getElementById('toolbar');

    if (!editorElement || !toolbarElement) return;

    const editor = createEditor(editorElement, (html: string) => {
      this.updatePreviews(html);
    });

    createToolbar(editor, toolbarElement);

    this.updatePreviews(editor.getHTML());
  },

  updatePreviews(html: string) {
    this.jiraOutput = htmlToJira(html);
    this.markdownOutput = htmlToMarkdown(html);
  },

  async copyToClipboard(format: 'jira' | 'markdown') {
    const text = format === 'jira' ? this.jiraOutput : this.markdownOutput;

    try {
      await navigator.clipboard.writeText(text);

      if (format === 'jira') {
        this.copiedJira = true;
        setTimeout(() => (this.copiedJira = false), 2000);
      } else {
        this.copiedMarkdown = true;
        setTimeout(() => (this.copiedMarkdown = false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  },
}));

window.Alpine = Alpine;
Alpine.start();
