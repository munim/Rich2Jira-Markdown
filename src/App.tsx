import { useState, useCallback } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import { Header } from './components/Header'
import { Editor } from './components/Editor'
import { PreviewPanel } from './components/PreviewPanel'
import { Footer } from './components/Footer'
import { htmlToJira } from './converters/toJira'
import { htmlToMarkdown } from './converters/toMarkdown'

function App() {
  const [jiraOutput, setJiraOutput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')

  const handleEditorUpdate = useCallback((html: string) => {
    setJiraOutput(htmlToJira(html))
    setMarkdownOutput(htmlToMarkdown(html))
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="rich2jira-theme">
      <div className="flex h-screen flex-col bg-background">
        <Header />

        <main className="flex flex-1 overflow-hidden">
          <div className="flex w-1/2 flex-col border-r">
            <div className="border-b bg-card px-4 py-2">
              <h2 className="text-sm font-semibold">Editor</h2>
            </div>
            <Editor onUpdate={handleEditorUpdate} />
          </div>

          <div className="flex w-1/2 flex-col">
            <PreviewPanel jiraOutput={jiraOutput} markdownOutput={markdownOutput} />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
