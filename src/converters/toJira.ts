export function htmlToJira(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return convertNode(doc.body);
}

function convertNode(node: Node, context: string = ''): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();
  const children = Array.from(element.childNodes).map(n => convertNode(n, tagName)).join('');

  switch (tagName) {
    case 'strong':
    case 'b':
      return `*${children}*`;

    case 'em':
    case 'i':
      return `_${children}_`;

    case 'u':
      return `+${children}+`;

    case 's':
    case 'del':
    case 'strike':
      return `-${children}-`;

    case 'h1':
      return `h1. ${children}\n\n`;

    case 'h2':
      return `h2. ${children}\n\n`;

    case 'h3':
      return `h3. ${children}\n\n`;

    case 'h4':
      return `h4. ${children}\n\n`;

    case 'h5':
      return `h5. ${children}\n\n`;

    case 'h6':
      return `h6. ${children}\n\n`;

    case 'p':
      if (context === 'td' || context === 'th') {
        return children;
      }
      return children ? `${children}\n\n` : '';

    case 'br':
      return '\n';

    case 'ul':
      return convertList(element, '*');

    case 'ol':
      return convertList(element, '#');

    case 'li':
      return children;

    case 'a': {
      const href = element.getAttribute('href') || '';
      return `[${children}|${href}]`;
    }

    case 'img': {
      const src = element.getAttribute('src') || '';
      return `!${src}!`;
    }

    case 'code':
      if (element.parentElement?.tagName.toLowerCase() === 'pre') {
        return children;
      }
      return `{{${children}}}`;

    case 'pre': {
      const codeElement = element.querySelector('code');
      const code = codeElement ? codeElement.textContent : children;
      return `{code}\n${code}\n{code}\n\n`;
    }

    case 'blockquote':
      return `{quote}\n${children}{quote}\n\n`;

    case 'table':
      return convertTable(element);

    case 'thead':
    case 'tbody':
    case 'colgroup':
    case 'col':
      return children;

    case 'tr':
      return children;

    case 'th':
    case 'td':
      return children;

    default:
      return children;
  }
}

function convertList(element: HTMLElement, marker: string, depth: number = 1): string {
  const items = Array.from(element.children).filter(
    (child) => child.tagName.toLowerCase() === 'li'
  );

  return (
    items
      .map((item) => {
        const prefix = marker.repeat(depth);
        let content = '';

        Array.from(item.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            content += node.textContent || '';
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.tagName.toLowerCase() === 'ul') {
              content += '\n' + convertList(el, '*', depth + 1);
            } else if (el.tagName.toLowerCase() === 'ol') {
              content += '\n' + convertList(el, '#', depth + 1);
            } else {
              content += convertNode(node);
            }
          }
        });

        return `${prefix} ${content.trim()}`;
      })
      .join('\n') + '\n\n'
  );
}

function convertTable(table: HTMLElement): string {
  const rows = Array.from(table.querySelectorAll('tr'));
  let result = '';

  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll('th, td'));
    const isHeader = cells.length > 0 && cells[0].tagName.toLowerCase() === 'th';

    const cellContents = cells.map((cell) => {
      return Array.from(cell.childNodes)
        .map(node => convertNode(node, 'td'))
        .join('')
        .trim();
    });

    if (isHeader) {
      result += '||' + cellContents.join('||') + '||\n';
    } else {
      result += '|' + cellContents.join('|') + '|\n';
    }
  });

  return result + '\n';
}
