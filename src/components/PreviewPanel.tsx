import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

interface PreviewPanelProps {
  jiraOutput: string
  markdownOutput: string
}

export function PreviewPanel({ jiraOutput, markdownOutput }: PreviewPanelProps) {
  const { copiedText, copy } = useCopyToClipboard()

  return (
    <Tabs defaultValue="jira" className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b bg-card px-4 py-2">
        <TabsList className="grid w-full max-w-[300px] grid-cols-2">
          <TabsTrigger value="jira">Jira Wiki</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="jira" className="mt-0 p-0 border-0">
          <Button
            variant={copiedText === jiraOutput ? 'default' : 'outline'}
            size="sm"
            onClick={() => copy(jiraOutput)}
            className="gap-2"
          >
            {copiedText === jiraOutput ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="markdown" className="mt-0 p-0 border-0">
          <Button
            variant={copiedText === markdownOutput ? 'default' : 'outline'}
            size="sm"
            onClick={() => copy(markdownOutput)}
            className="gap-2"
          >
            {copiedText === markdownOutput ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </TabsContent>
      </div>

      <TabsContent value="jira" className="mt-0 flex-1 min-h-0 overflow-hidden p-4">
        <pre className="h-full overflow-auto rounded-lg border bg-muted p-4 font-mono text-sm leading-relaxed">
          {jiraOutput || 'Start typing in the editor to see output here...'}
        </pre>
      </TabsContent>

      <TabsContent value="markdown" className="mt-0 flex-1 min-h-0 overflow-hidden p-4">
        <pre className="h-full overflow-auto rounded-lg border bg-muted p-4 font-mono text-sm leading-relaxed">
          {markdownOutput || 'Start typing in the editor to see output here...'}
        </pre>
      </TabsContent>
    </Tabs>
  )
}
