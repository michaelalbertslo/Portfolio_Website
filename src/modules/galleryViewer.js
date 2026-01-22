import { makeWindow } from '../os/windowManager.js'
import { assetPath } from '../utils/assetPath.js'

// Gallery viewer for media folders with optional per-item links (e.g., YouTube)
export function createGalleryViewer({ title, imagePath, path = [], linkMap = {} }) {
  const container = document.createElement('div')
  container.className = 'gallery-container'
  
  let mediaItems = [] // { type: 'image' | 'video', name: string, link?: string }
  let currentIndex = 0
  let isLoading = true

  function toEmbedUrl(url) {
    if (!url) return ''
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${u.pathname.replace('/', '')}`
      }
      if (u.hostname.includes('youtube.com')) {
        const id = u.searchParams.get('v')
        if (id) return `https://www.youtube.com/embed/${id}`
      }
      return url
    } catch {
      return url
    }
  }
  
  // Render loading state
  function renderLoading() {
    container.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #1a1a1a;
        color: #888;
        font-family: 'Segoe UI', sans-serif;
      ">
        <div style="text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
          <div>Loading images...</div>
        </div>
      </div>
    `
  }
  
  // Render empty state
  function renderEmpty() {
    container.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #1a1a1a;
        color: #888;
        font-family: 'Segoe UI', sans-serif;
      ">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">📷</div>
          <div style="font-size: 14px;">No images found</div>
          <div style="font-size: 12px; margin-top: 8px; color: #666;">
            Add images to: public${imagePath}
          </div>
        </div>
      </div>
    `
  }
  
  // Render gallery grid
  function renderGallery() {
    if (typeof container._cleanupKeyboard === 'function') {
      container._cleanupKeyboard()
      container._cleanupKeyboard = null
    }
    if (mediaItems.length === 0) {
      renderEmpty()
      return
    }
    
    const imageCount = mediaItems.filter(m => m.type === 'image').length
    const videoCount = mediaItems.filter(m => m.type === 'video').length
    container.innerHTML = `
      <div class="gallery-wrapper" style="
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #1a1a1a;
      ">
        <!-- Toolbar -->
        <div style="
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          border-bottom: 1px solid #333;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Segoe UI', sans-serif;
        ">
          <span style="color: #aaa; font-size: 12px;">
            ${imageCount ? `${imageCount} image${imageCount !== 1 ? 's' : ''}` : ''}
            ${videoCount ? `${imageCount ? ' · ' : ''}${videoCount} video${videoCount !== 1 ? 's' : ''}` : ''}
          </span>
        </div>
        
        <!-- Grid -->
        <div class="gallery-grid" style="
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
          align-content: start;
        ">
          ${mediaItems.map((item, i) => `
            <div class="gallery-thumb" data-index="${i}" style="
              aspect-ratio: 1;
              border-radius: 4px;
              overflow: hidden;
              cursor: pointer;
              background: #2a2a2a;
              border: 2px solid transparent;
              transition: border-color 0.15s, transform 0.15s;
            ">
              ${item.type === 'video'
                ? `<video src="${item.src}" muted playsinline loop style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background: #000;
                  "></video>`
                : `<img src="${item.src}" alt="${item.name}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  " loading="lazy"/>`
              }
            </div>
          `).join('')}
        </div>
      </div>
    `
    
    // Bind click events for thumbnails
    container.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        currentIndex = parseInt(thumb.dataset.index)
        renderLightbox()
      })
      thumb.addEventListener('mouseenter', () => {
        thumb.style.borderColor = '#4a90d9'
        thumb.style.transform = 'scale(1.02)'
      })
      thumb.addEventListener('mouseleave', () => {
        thumb.style.borderColor = 'transparent'
        thumb.style.transform = 'scale(1)'
      })
    })
  }
  
  // Render lightbox view
  function renderLightbox() {
    if (typeof container._cleanupKeyboard === 'function') {
      container._cleanupKeyboard()
      container._cleanupKeyboard = null
    }
    const item = mediaItems[currentIndex]
    
    container.innerHTML = `
      <div class="lightbox" style="
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #0a0a0a;
      ">
        <!-- Toolbar -->
        <div style="
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
          border-bottom: 1px solid #222;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Segoe UI', sans-serif;
        ">
          <button class="back-to-grid" style="
            background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%);
            border: 1px solid #444;
            border-radius: 3px;
            color: #ddd;
            padding: 4px 12px;
            cursor: pointer;
            font-size: 12px;
          ">← Back to Grid</button>
          <span style="color: #888; font-size: 12px;">${currentIndex + 1} / ${mediaItems.length}</span>
          <span style="color: #666; font-size: 11px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item?.name || ''}</span>
          ${item?.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" style="color:#4a90d9;font-size:12px;text-decoration:none;">Open on YouTube ↗</a>` : ''}
        </div>
        
        <!-- Media viewer -->
        <div style="
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        ">
          ${currentIndex > 0 ? `
            <button class="nav-prev" style="
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.6);
              border: 1px solid #333;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              z-index: 10;
            ">‹</button>
          ` : ''}
          
          ${item?.link
              ? `<iframe src="${toEmbedUrl(item.link)}" title="${item.name}" style="
                width: 90%;
                height: 90%;
                border: 0;
                border-radius: 6px;
                background: #000;
              " allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            : item?.type === 'video'
              ? `<video src="${item.src}" controls playsinline style="
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                  background: #000;
                "></video>`
              : `<img src="${item.src}" alt="${item?.name || ''}" style="
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                "/>`
          }
          
          ${currentIndex < mediaItems.length - 1 ? `
            <button class="nav-next" style="
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.6);
              border: 1px solid #333;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              z-index: 10;
            ">›</button>
          ` : ''}
        </div>
      </div>
    `
    
    // Bind events
    container.querySelector('.back-to-grid').addEventListener('click', () => {
      if (typeof container._cleanupKeyboard === 'function') {
        container._cleanupKeyboard()
        container._cleanupKeyboard = null
      }
      renderGallery()
    })
    
    const prevBtn = container.querySelector('.nav-prev')
    const nextBtn = container.querySelector('.nav-next')
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex--
        renderLightbox()
      })
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex++
        renderLightbox()
      })
    }
    
    // Keyboard navigation
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--
        renderLightbox()
      } else if (e.key === 'ArrowRight' && currentIndex < mediaItems.length - 1) {
        currentIndex++
        renderLightbox()
      } else if (e.key === 'Escape') {
        renderGallery()
      }
    }
    
    document.addEventListener('keydown', handleKeydown)
    
    // Cleanup on re-render
    container._cleanupKeyboard = () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }
  
  // Load media (images/videos) from manifest (static) or dev API fallback
  async function loadImages() {
    renderLoading()

    const folderName = imagePath.split('/').filter(Boolean).pop()
    const manifestUrl = assetPath('images-manifest.json')
    const normalizedBase = assetPath(imagePath.startsWith('/') ? imagePath.slice(1) : imagePath)
    const normalizeMedia = (names) => names.map((name) => ({
      type: name.match(/\.(mp4|webm)$/i) ? 'video' : 'image',
      name,
      src: `${normalizedBase}/${name}`,
      link: linkMap[name]
    }))

    try {
      // Try static manifest first (works on GitHub Pages)
      const response = await fetch(manifestUrl)
      if (response.ok) {
        const data = await response.json()
        const names = data[folderName] || []
        mediaItems = normalizeMedia(names)
      }
    } catch (err) {
      console.log('Gallery: Could not load manifest', err)
    }

    // Dev fallback to API if manifest missing
    if (!mediaItems.length) {
      try {
        const response = await fetch(`/api/gallery/${folderName}`)
        if (response.ok) {
          const data = await response.json()
          const images = data.images || []
          const videos = data.videos || []
          mediaItems = [
            ...images.map(name => ({ type: 'image', name, src: `${normalizedBase}/${name}`, link: linkMap[name] })),
            ...videos.map(name => ({ type: 'video', name, src: `${normalizedBase}/${name}`, link: linkMap[name] }))
          ]
        }
      } catch (err) {
        console.log('Gallery: Could not load images from API', err)
      }
    }

    isLoading = false
    renderGallery()
  }
  
  // Initialize
  loadImages()
  
  const icon = `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#5090c0" stroke="#2d6090" stroke-width="1"/>
    <circle cx="10" cy="12" r="3" fill="#ffd93d"/>
    <path d="M4 24l8-8 4 4 8-10 4 6v8H4z" fill="#4ade80"/>
  </svg>`
  
  return makeWindow({
    title,
    body: container,
    width: 650,
    height: 500,
    icon
  })
}

