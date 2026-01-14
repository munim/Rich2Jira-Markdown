import type { Editor } from '@tiptap/core';

interface ToolbarButton {
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}

interface ToolbarGroup {
  buttons: ToolbarButton[];
}

export function createToolbar(editor: Editor, container: HTMLElement): void {
  const groups: ToolbarGroup[] = [
    {
      buttons: [
        {
          icon: 'B',
          title: 'Bold',
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold'),
        },
        {
          icon: 'I',
          title: 'Italic',
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic'),
        },
        {
          icon: 'U',
          title: 'Underline',
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline'),
        },
        {
          icon: 'S',
          title: 'Strikethrough',
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike'),
        },
      ],
    },
    {
      buttons: [
        {
          icon: 'H1',
          title: 'Heading 1',
          action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => editor.isActive('heading', { level: 1 }),
        },
        {
          icon: 'H2',
          title: 'Heading 2',
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => editor.isActive('heading', { level: 2 }),
        },
        {
          icon: 'H3',
          title: 'Heading 3',
          action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => editor.isActive('heading', { level: 3 }),
        },
      ],
    },
    {
      buttons: [
        {
          icon: '• List',
          title: 'Bullet List',
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList'),
        },
        {
          icon: '1. List',
          title: 'Numbered List',
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList'),
        },
      ],
    },
    {
      buttons: [
        {
          icon: '🔗',
          title: 'Link',
          action: () => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          },
          isActive: () => editor.isActive('link'),
        },
        {
          icon: '🖼️',
          title: 'Image',
          action: () => {
            const url = window.prompt('Enter image URL:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          },
        },
      ],
    },
    {
      buttons: [
        {
          icon: '</> Code',
          title: 'Code Block',
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock'),
        },
        {
          icon: '` `',
          title: 'Inline Code',
          action: () => editor.chain().focus().toggleCode().run(),
          isActive: () => editor.isActive('code'),
        },
        {
          icon: '" "',
          title: 'Blockquote',
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive('blockquote'),
        },
      ],
    },
    {
      buttons: [
        {
          icon: '⊞ Table',
          title: 'Insert Table',
          action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
        },
      ],
    },
  ];

  container.innerHTML = '';

  groups.forEach((group, groupIndex) => {
    group.buttons.forEach((btn) => {
      const button = document.createElement('button');
      button.className = 'toolbar-button';
      button.textContent = btn.icon;
      button.title = btn.title;
      button.addEventListener('click', btn.action);

      if (btn.isActive) {
        editor.on('update', () => {
          button.classList.toggle('is-active', btn.isActive!());
        });
        editor.on('selectionUpdate', () => {
          button.classList.toggle('is-active', btn.isActive!());
        });
      }

      container.appendChild(button);
    });

    if (groupIndex < groups.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'toolbar-divider';
      container.appendChild(divider);
    }
  });
}
