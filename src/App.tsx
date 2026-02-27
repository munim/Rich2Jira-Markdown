import { useState, useCallback } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import { Header } from './components/Header'
import { Editor } from './components/Editor'
import { PreviewPanel } from './components/PreviewPanel'
import { Footer } from './components/Footer'
import { htmlToJira } from './converters/toJira'
import { htmlToMarkdown } from './converters/toMarkdown'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Copy, Check } from 'lucide-react'
import { Button } from './components/ui/button'
import { useCopyToClipboard } from './hooks/useCopyToClipboard'

function App() {
  const [jiraOutput, setJiraOutput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')
  const { copiedText: jiraCopied, copy: copyJira } = useCopyToClipboard()
  const { copiedText: mdCopied, copy: copyMd } = useCopyToClipboard()

  const handleEditorUpdate = useCallback((html: string) => {
    setJiraOutput(htmlToJira(html))
    setMarkdownOutput(htmlToMarkdown(html))
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="rich2jira-theme">
      <div className="flex h-screen flex-col bg-background">
        <Header />

        <main className="hidden md:flex flex-1 overflow-hidden">
          <div className="flex w-1/2 flex-col border-r">
            <div className="border-b bg-card px-4 py-2">
              <h2 className="text-sm font-semibold">Editor</h2>
            </div>
            <Editor onUpdate={handleEditorUpdate} />
          </div>

          <div className="flex w-1/2 flex-col min-h-0">
            <PreviewPanel jiraOutput={jiraOutput} markdownOutput={markdownOutput} />
          </div>
        </main>

        <main className="flex md:hidden flex-1 flex-col overflow-hidden">
          <Tabs defaultValue="editor" className="flex flex-1 flex-col">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="jira">Jira</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden">
              <Editor onUpdate={handleEditorUpdate} />
            </TabsContent>

            <TabsContent value="jira" className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b bg-card px-4 py-2">
                  <h2 className="text-sm font-semibold">Jira Wiki Markup</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyJira(jiraOutput)}
                  >
                    {jiraCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                    {jiraOutput || 'Start typing in the Editor tab...'}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="markdown" className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b bg-card px-4 py-2">
                  <h2 className="text-sm font-semibold">Markdown</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyMd(markdownOutput)}
                  >
                    {mdCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                    {markdownOutput || 'Start typing in the Editor tab...'}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
