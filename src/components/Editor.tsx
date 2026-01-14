import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useState } from 'react'
import { Toolbar } from './Toolbar'

interface EditorProps {
  onUpdate: (html: string) => void
}

export function Editor({ onUpdate }: EditorProps) {
  const [selectionUpdate, setSelectionUpdate] = useState(0)

  const editor = useEditor({
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
      Placeholder.configure({
        placeholder: 'Start typing or paste content here...',
      }),
    ],
    content: '<p>Welcome to Rich2Jira! Start typing to see the magic.</p>',
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
    onSelectionUpdate: () => {
      setSelectionUpdate((prev) => prev + 1)
    },
    editorProps: {
      attributes: {
        class: 'tiptap',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      onUpdate(editor.getHTML())
    }
  }, [editor, onUpdate])

  return (
    <div className="flex flex-col h-full">
      <Toolbar editor={editor} key={selectionUpdate} />
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
