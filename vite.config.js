import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

function generateGalleryManifest() {
  const imagesRoot = path.join(process.cwd(), 'public', 'images')
  const manifestPath = path.join(process.cwd(), 'public', 'images-manifest.json')
  const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP', '.mp4', '.webm'])

  const manifest = {}
  if (fs.existsSync(imagesRoot)) {
    const folders = fs.readdirSync(imagesRoot, { withFileTypes: true })
    folders.forEach((entry) => {
      if (!entry.isDirectory()) return
      const folderName = entry.name
      const folderPath = path.join(imagesRoot, folderName)
      const files = fs.readdirSync(folderPath, { withFileTypes: true })
      const media = files
        .filter((f) => f.isFile() && imageExtensions.has(path.extname(f.name)))
        .map((f) => f.name)
      manifest[folderName] = media
    })
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
}

// Plugin to serve gallery image listings during development
function galleryApiPlugin() {
  return {
    name: 'gallery-api',
    buildStart() {
      generateGalleryManifest()
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Handle /api/gallery/:folder requests
        const match = req.url?.match(/^\/api\/gallery\/([^/?]+)/)
        if (match) {
          const folder = match[1]
          const imagesDir = path.join(process.cwd(), 'public', 'images', folder)
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP']
          
          try {
            let images = []
            if (fs.existsSync(imagesDir)) {
              const files = fs.readdirSync(imagesDir)
              images = files.filter(file => {
                const ext = path.extname(file)
                return imageExtensions.includes(ext)
              })
            }
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ images }))
          } catch (err) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ images: [] }))
          }
          return
        }
        next()
      })
    }
  }
}

export default defineConfig({
  base: './',
  plugins: [galleryApiPlugin()],
  server: { port: 5173, open: true },
  build: { outDir: 'dist' }
})
