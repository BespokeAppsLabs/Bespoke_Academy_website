import { promises as fs } from 'fs'
import path from 'path'

export default async function V1Page() {
  // Read the markdown files from the v1 folder
  const v1FolderPath = path.join(process.cwd(), 'v1')
  const files = await fs.readdir(v1FolderPath)
  const markdownFiles = files.filter(file => file.endsWith('.md'))
  
  // Read content of each markdown file
  const contents = await Promise.all(
    markdownFiles.map(async (filename) => {
      const filePath = path.join(v1FolderPath, filename)
      const content = await fs.readFile(filePath, 'utf8')
      return { filename, content }
    })
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legacy Documentation</h1>
      <div className="grid gap-8">
        {contents.map(({ filename, content }) => (
          <article key={filename} className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">{filename}</h2>
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {content}
            </pre>
          </article>
        ))}
      </div>
    </div>
  )
}