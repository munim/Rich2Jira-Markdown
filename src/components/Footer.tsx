export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-card">
      <div className="flex items-center justify-center px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Built with ❤️ for developers and content creators by <a href="https://www.munim.net/">Abdul Munim</a>. Copyright © {currentYear} Rich2Jira. MIT License.
        </p>
      </div>
    </footer>
  )
}
