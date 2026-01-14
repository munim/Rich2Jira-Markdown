import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

export function createEditor(element: HTMLElement, onUpdate: (html: string) => void): Editor {
  const editor = new Editor({
    element,
    extensions: [
      StarterKit.configure({
        codeBlock: {
          languageClassPrefix: 'language-',
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: '<p>Start typing here... or use the toolbar to format your text.</p>',
    editorProps: {
      attributes: {
        class: 'tiptap',
      },
    },
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
  });

  return editor;
}
