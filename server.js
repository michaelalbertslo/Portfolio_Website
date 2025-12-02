import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/content', express.static(path.join(__dirname, 'public', 'content')))
app.use('/images', express.static(path.join(__dirname, 'public', 'images')))

// API endpoint to list images in a gallery folder
app.get('/api/gallery/:folder', (req, res) => {
  const folder = req.params.folder
  const imagesDir = path.join(__dirname, 'public', 'images', folder)
  
  // Supported image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP']
  
  try {
    if (!fs.existsSync(imagesDir)) {
      return res.json({ images: [] })
    }
    
    const files = fs.readdirSync(imagesDir)
    const images = files.filter(file => {
      const ext = path.extname(file)
      return imageExtensions.includes(ext)
    })
    
    res.json({ images })
  } catch (err) {
    console.error('Error reading gallery folder:', err)
    res.json({ images: [] })
  }
})

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`mwaOS v2 running at http://localhost:${port}`))
