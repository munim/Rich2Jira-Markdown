import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
  strongDelimiter: '**',
});

turndownService.use(gfm);

turndownService.addRule('underline', {
  filter: ['u', 'ins'],
  replacement: (content: string) => `__${content}__`,
});

turndownService.addRule('tableCellParagraph', {
  filter: (node) => {
    return (
      node.nodeName === 'P' &&
      node.parentNode !== null &&
      (node.parentNode.nodeName === 'TD' || node.parentNode.nodeName === 'TH')
    );
  },
  replacement: (content: string) => {
    const trimmed = content.trim();
    return trimmed || ' ';
  }
});

turndownService.addRule('listItemParagraph', {
  filter: (node) => {
    return (
      node.nodeName === 'P' &&
      node.parentNode !== null &&
      node.parentNode.nodeName === 'LI'
    );
  },
  replacement: (content: string) => content
});

turndownService.addRule('stripTableAttributes', {
  filter: (node) => {
    return node.nodeName === 'TABLE' || 
           node.nodeName === 'COLGROUP' || 
           node.nodeName === 'COL';
  },
  replacement: (content: string, node: any) => {
    if (node.nodeName === 'COLGROUP' || node.nodeName === 'COL') {
      return '';
    }
    return content;
  }
});

export function htmlToMarkdown(html: string): string {
  let cleanedHtml = html
    .replace(/<colgroup[^>]*>.*?<\/colgroup>/gis, '')
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/\s+colspan="1"/g, '')
    .replace(/\s+rowspan="1"/g, '')
    .replace(/<(td|th)([^>]*)><p><\/p><\/(td|th)>/gi, '<$1$2> </$3>');
  
  return turndownService.turndown(cleanedHtml);
}
