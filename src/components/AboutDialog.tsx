import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Info className="h-4 w-4 mr-2" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Rich2Jira</DialogTitle>
          <DialogDescription>
            Convert rich text to Jira Wiki Markup and Markdown with ease
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-semibold mb-2">What is Rich2Jira?</h3>
            <p className="text-sm text-muted-foreground">
              A beautiful WYSIWYG editor that converts your rich text content to both Jira Wiki Markup and Markdown format.
              Perfect for documentation, issue tracking, and knowledge management.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Real-time conversion to Jira Wiki & Markdown</li>
              <li>Full formatting support (headings, lists, tables, code, etc.)</li>
              <li>Dark mode support</li>
              <li>One-click copy to clipboard</li>
              <li>100% client-side - no data sent to servers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">React</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">TypeScript</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">Tiptap</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">Tailwind CSS</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">shadcn/ui</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Built with ❤️ for developers and content creators<br />by <a href="https://www.munim.net/">Abdul Munim</a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
