import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Plugin to serve gallery image listings during development
function galleryApiPlugin() {
  return {
    name: 'gallery-api',
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
  plugins: [galleryApiPlugin()],
  server: { port: 5173, open: true },
  build: { outDir: 'dist' }
})
