import { type Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Code,
  Quote,
  Table,
  MoreHorizontal,
  Rows3,
  Columns3,
  Trash2,
  Plus,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ToolbarProps {
  editor: Editor | null
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null

  const isInTable = editor.isActive('table')

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-card px-2 py-2 md:px-4">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className="hidden md:inline-flex"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="hidden md:inline-flex"
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 4 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className="hidden md:inline-flex"
      >
        <Heading4 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 5 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className="hidden md:inline-flex"
      >
        <Heading5 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 6 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className="hidden md:inline-flex"
      >
        <Heading6 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        className="hidden md:inline-flex"
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        className="hidden md:inline-flex"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table className="h-4 w-4" />
      </Button>

      {isInTable && (
        <>
          <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().addRowBefore().run()}
            title="Add row above"
            className="hidden md:inline-flex"
          >
            <Rows3 className="h-4 w-4 mr-1" />
            <Plus className="h-3 w-3" />
            <span className="ml-1 text-xs">↑</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            title="Add row below"
            className="hidden md:inline-flex"
          >
            <Rows3 className="h-4 w-4 mr-1" />
            <Plus className="h-3 w-3" />
            <span className="ml-1 text-xs">↓</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().deleteRow().run()}
            title="Delete row"
            className="hidden md:inline-flex"
          >
            <Rows3 className="h-4 w-4 mr-1" />
            <Trash2 className="h-3 w-3" />
          </Button>

          <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            title="Add column left"
            className="hidden md:inline-flex"
          >
            <Columns3 className="h-4 w-4 mr-1" />
            <Plus className="h-3 w-3" />
            <span className="ml-1 text-xs">←</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            title="Add column right"
            className="hidden md:inline-flex"
          >
            <Columns3 className="h-4 w-4 mr-1" />
            <Plus className="h-3 w-3" />
            <span className="ml-1 text-xs">→</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            title="Delete column"
            className="hidden md:inline-flex"
          >
            <Columns3 className="h-4 w-4 mr-1" />
            <Trash2 className="h-3 w-3" />
          </Button>

          <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().deleteTable().run()}
            title="Delete table"
            className="hidden md:inline-flex"
          >
            <Table className="h-4 w-4 mr-1" />
            <Trash2 className="h-3 w-3" />
          </Button>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough className="h-4 w-4 mr-2" />
            Strikethrough
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 className="h-4 w-4 mr-2" />
            Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
            <Heading4 className="h-4 w-4 mr-2" />
            Heading 4
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
            <Heading5 className="h-4 w-4 mr-2" />
            Heading 5
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
            <Heading6 className="h-4 w-4 mr-2" />
            Heading 6
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleCode().run()}>
            <Code className="h-4 w-4 mr-2" />
            Code
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote className="h-4 w-4 mr-2" />
            Blockquote
          </DropdownMenuItem>
          {isInTable && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                <Rows3 className="h-4 w-4 mr-2" />
                Add row above
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                <Rows3 className="h-4 w-4 mr-2" />
                Add row below
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete row
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                <Columns3 className="h-4 w-4 mr-2" />
                Add column left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                <Columns3 className="h-4 w-4 mr-2" />
                Add column right
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete column
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete table
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
