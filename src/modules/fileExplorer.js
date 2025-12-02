import { makeWindow } from '../os/windowManager.js'

// File type icons - using PNG images from /icons/ folder where available
const icons = {
  folder: `<img src="/icons/folder.png" class="w-8 h-8" alt="folder"/>`,
  
  text: `<img src="/icons/file.png" class="w-8 h-8" alt="file"/>`,
  
  hardware: `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="6" width="28" height="20" rx="2" fill="#1a5f2a" stroke="#0d3d18" stroke-width="1"/>
    <rect x="6" y="10" width="8" height="6" fill="#333"/>
    <circle cx="22" cy="13" r="3" fill="none" stroke="#4ade80" stroke-width="1.5"/>
    <path d="M6 20h6M14 20h4M20 20h6" stroke="#4ade80" stroke-width="1"/>
    <rect x="8" y="11" width="4" height="4" fill="#666"/>
  </svg>`,
  
  software: `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#1e3a5f" stroke="#0d1f33" stroke-width="1"/>
    <rect x="4" y="6" width="24" height="3" fill="#2d5a87"/>
    <circle cx="7" cy="7.5" r="1" fill="#ff6b6b"/>
    <circle cx="10" cy="7.5" r="1" fill="#ffd93d"/>
    <circle cx="13" cy="7.5" r="1" fill="#4ade80"/>
    <path d="M8 14l4 4-4 4M14 22h8" stroke="#7ec8e3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  
  links: `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <circle cx="16" cy="16" r="12" fill="#4a90d9" stroke="#2d6ba3" stroke-width="1"/>
    <path d="M10 16h12M16 10v12" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="16" r="6" fill="none" stroke="white" stroke-width="1.5"/>
  </svg>`,
  
  image: `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#5090c0" stroke="#2d6090" stroke-width="1"/>
    <circle cx="10" cy="12" r="3" fill="#ffd93d"/>
    <path d="M4 24l8-8 4 4 8-10 4 6v8H4z" fill="#4ade80"/>
  </svg>`,
  
  camera: `<img src="/icons/camera.png" class="w-8 h-8" alt="camera"/>`,
  
  pdf: `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="4" y="2" width="24" height="28" rx="2" fill="#e74c3c" stroke="#c0392b" stroke-width="1"/>
    <rect x="7" y="5" width="18" height="4" fill="rgba(255,255,255,0.3)"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="Arial">PDF</text>
  </svg>`,
  
  back: `<svg viewBox="0 0 32 32" class="w-6 h-6">
    <path d="M20 8l-8 8 8 8" stroke="#666" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

// Get icon for file type
function getIcon(item, name) {
  if (item.type === 'folder') return icons.folder
  if (item.type === 'hardware' || name.endsWith('.sch')) return icons.hardware
  if (item.type === 'software' || name.endsWith('.flow')) return icons.software
  if (item.type === 'links' || name.endsWith('.url')) return icons.links
  if (item.type === 'pdf' || name.endsWith('.pdf')) return icons.pdf
  if (item.type === 'image' || /\.(jpg|png|gif|webp)$/i.test(name)) return icons.image
  if (item.type === 'gallery') return icons.camera
  return icons.text
}

// Get clean display name (remove extensions for text files)
function getDisplayName(name) {
  // Remove .txt extension for cleaner display
  if (name.endsWith('.txt')) {
    return name.replace('.txt', '')
  }
  return name
}

// Get file extension label
function getTypeLabel(item, name) {
  if (item.type === 'folder') return 'File Folder'
  if (item.type === 'hardware' || name.endsWith('.sch')) return 'Hardware Schematic'
  if (item.type === 'software' || name.endsWith('.flow')) return 'Software Flowchart'
  if (item.type === 'links' || name.endsWith('.url')) return 'Internet Shortcut'
  if (item.type === 'pdf' || name.endsWith('.pdf')) return 'PDF Document'
  if (item.type === 'image') return 'Image File'
  if (item.type === 'gallery') return 'Photo Gallery'
  if (item.type === 'text' || name.endsWith('.txt')) return 'Text Document'
  return 'File'
}

export function createFileExplorer({ title, rootData, onOpenHardware, onOpenSoftware, onOpenText, onOpenPdf, onOpenGallery }) {
  const container = document.createElement('div')
  container.className = 'h-full flex flex-col'
  
  // Navigation state
  let currentPath = []
  let currentData = rootData
  
  // Get data at current path
  function getDataAtPath(path) {
    let data = rootData
    for (const segment of path) {
      if (data.children && data.children[segment]) {
        data = data.children[segment]
      }
    }
    return data
  }
  
  // Build the explorer UI
  function render() {
    currentData = getDataAtPath(currentPath)
    const items = currentData.children || {}
    const itemEntries = Object.entries(items)
    
    container.innerHTML = `
      <!-- Toolbar -->
      <div style="
        background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
        border-bottom: 1px solid #ccc;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        <button class="nav-back" style="
          padding: 4px 8px;
          border: 1px solid #aaa;
          border-radius: 3px;
          background: linear-gradient(180deg, #fff 0%, #e8e8e8 100%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        " ${currentPath.length === 0 ? 'disabled style="opacity: 0.5; cursor: default;"' : ''}>
          ${icons.back} Back
        </button>
        <div style="width: 1px; height: 20px; background: #ccc;"></div>
        <div style="flex: 1; font-size: 12px; color: #666;">
          ${itemEntries.length} item(s)
        </div>
      </div>
      
      <!-- Address Bar -->
      <div style="
        background: white;
        border-bottom: 1px solid #ccc;
        padding: 6px 8px;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <span style="font-size: 12px; color: #666;">Path:</span>
        <div class="breadcrumb" style="
          flex: 1;
          background: white;
          border: 1px solid #ccc;
          border-radius: 2px;
          padding: 4px 8px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span class="crumb" data-path="" style="cursor: pointer; color: #0066cc;">${title}</span>
          ${currentPath.map((segment, i) => `
            <span style="color: #999;">›</span>
            <span class="crumb" data-path="${currentPath.slice(0, i + 1).join('/')}" style="cursor: pointer; color: #0066cc;">${segment}</span>
          `).join('')}
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div style="flex: 1; display: flex; overflow: hidden;">
        <!-- File List -->
        <div class="file-list" style="
          flex: 1;
          overflow: auto;
          padding: 8px;
          background: white;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          gap: 4px;
        ">
          ${itemEntries.map(([name, item]) => `
            <div class="file-item" data-name="${name}" style="
              width: 90px;
              padding: 8px 4px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
              border-radius: 4px;
              cursor: pointer;
              text-align: center;
              border: 1px solid transparent;
            ">
              ${getIcon(item, name)}
              <span style="
                font-size: 11px;
                word-break: break-word;
                line-height: 1.2;
                max-width: 80px;
              ">${getDisplayName(name)}</span>
            </div>
          `).join('')}
          ${itemEntries.length === 0 ? '<div style="color: #999; font-size: 12px; padding: 20px;">This folder is empty</div>' : ''}
        </div>
        
        <!-- Details Panel -->
        <div class="details-panel" style="
          width: 240px;
          border-left: 1px solid #ccc;
          background: linear-gradient(180deg, #f0f4f8 0%, #e4e9ed 100%);
          padding: 12px;
          overflow: auto;
        ">
          <div class="details-content" style="font-size: 12px; color: #333;">
            <div style="text-align: center; padding: 20px; color: #888;">
              Select an item to see details
            </div>
          </div>
        </div>
      </div>
    `
    
    // Bind events
    bindEvents()
  }
  
  function bindEvents() {
    // Back button
    const backBtn = container.querySelector('.nav-back')
    if (backBtn && currentPath.length > 0) {
      backBtn.addEventListener('click', () => {
        currentPath.pop()
        render()
      })
    }
    
    // Breadcrumb navigation
    container.querySelectorAll('.crumb').forEach(crumb => {
      crumb.addEventListener('click', () => {
        const path = crumb.dataset.path
        currentPath = path ? path.split('/') : []
        render()
      })
    })
    
    // File items
    container.querySelectorAll('.file-item').forEach(item => {
      const name = item.dataset.name
      const data = currentData.children[name]
      
      // Single click - show details
      item.addEventListener('click', (e) => {
        // Remove selection from all
        container.querySelectorAll('.file-item').forEach(i => {
          i.style.background = ''
          i.style.border = '1px solid transparent'
        })
        // Select this one
        item.style.background = 'linear-gradient(180deg, rgba(150,190,230,0.5) 0%, rgba(120,160,210,0.3) 100%)'
        item.style.border = '1px solid rgba(80,130,190,0.5)'
        
        showDetails(name, data)
      })
      
      // Double click - open
      item.addEventListener('dblclick', () => {
        openItem(name, data)
      })
    })
  }
  
  function showDetails(name, data) {
    const panel = container.querySelector('.details-content')
    const meta = data.meta || {}
    const displayName = getDisplayName(name)
    
    let detailsHtml = `
      <div style="text-align: center; margin-bottom: 12px;">
        <div style="transform: scale(1.5); display: inline-block; margin-bottom: 8px;">
          ${getIcon(data, name)}
        </div>
        <div style="font-weight: 600; margin-top: 8px;">${displayName}</div>
        <div style="color: #666; font-size: 11px;">${getTypeLabel(data, name)}</div>
      </div>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
    `
    
    if (data.type === 'folder') {
      const childCount = Object.keys(data.children || {}).length
      detailsHtml += `
        <div><strong>Contains:</strong> ${childCount} item(s)</div>
        ${meta.date ? `<div style="margin-top: 8px;"><strong>Date:</strong> ${meta.date}</div>` : ''}
        ${meta.location ? `<div><strong>Location:</strong> ${meta.location}</div>` : ''}
        ${meta.category ? `<div><strong>Type:</strong> ${meta.category}</div>` : ''}
      `
    } else if (data.type === 'text') {
      // Show preview and open button for text files
      // Support content as array of lines
      const textContent = Array.isArray(data.content) ? data.content.join('\n') : data.content
      const preview = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '')
      detailsHtml += `
        <div style="
          background: white;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 3px;
          max-height: 120px;
          overflow: hidden;
          white-space: pre-wrap;
          font-size: 11px;
          line-height: 1.4;
          margin-bottom: 12px;
        ">${preview}</div>
        <button class="open-text-btn" style="
          width: 100%;
          padding: 8px;
          background: linear-gradient(180deg, #f7f7f7 0%, #e0e0e0 100%);
          color: #333;
          border: 1px solid #999;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        ">Open Document</button>
      `
    } else if (data.type === 'links') {
      detailsHtml += `
        <div style="margin-top: 8px;">
          ${data.links.map(l => `
            <a href="${l.href}" target="_blank" style="
              display: block;
              padding: 6px 8px;
              margin-bottom: 4px;
              background: white;
              border: 1px solid #ccc;
              border-radius: 3px;
              color: #0066cc;
              text-decoration: none;
              font-size: 11px;
            ">${l.label} ↗</a>
          `).join('')}
        </div>
      `
    } else if (data.type === 'hardware' || data.type === 'software') {
      detailsHtml += `
        <div style="color: #666; margin-bottom: 8px;">
          Double-click to open ${data.type === 'hardware' ? '3D schematic viewer' : 'software flowchart'}
        </div>
        <button class="open-viewer-btn" style="
          width: 100%;
          padding: 8px;
          background: linear-gradient(180deg, #4a90d9 0%, #2d6ba3 100%);
          color: white;
          border: 1px solid #1e5080;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        ">Open ${data.type === 'hardware' ? 'Schematic' : 'Flowchart'}</button>
      `
    } else if (data.type === 'pdf') {
      detailsHtml += `
        <div style="color: #666; margin-bottom: 8px;">
          Double-click to open PDF document in viewer
        </div>
        <button class="open-pdf-btn" style="
          width: 100%;
          padding: 8px;
          background: linear-gradient(180deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          border: 1px solid #a93226;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        ">Open PDF</button>
      `
    }
    
    panel.innerHTML = detailsHtml
    
    // Bind open viewer button if present
    const openBtn = panel.querySelector('.open-viewer-btn')
    if (openBtn) {
      openBtn.addEventListener('click', () => openItem(name, data))
    }
    
    // Bind open PDF button if present
    const openPdfBtn = panel.querySelector('.open-pdf-btn')
    if (openPdfBtn) {
      openPdfBtn.addEventListener('click', () => openItem(name, data))
    }
    
    // Bind open text button if present
    const openTextBtn = panel.querySelector('.open-text-btn')
    if (openTextBtn) {
      openTextBtn.addEventListener('click', () => openItem(name, data))
    }
  }
  
  function openItem(name, data) {
    if (data.type === 'folder') {
      currentPath.push(name)
      render()
    } else if (data.type === 'hardware' && onOpenHardware) {
      onOpenHardware({
        title: name.replace('.sch', ''),
        graph: data.graph,
        path: [...currentPath, name]
      })
    } else if (data.type === 'software' && onOpenSoftware) {
      onOpenSoftware({
        title: name.replace('.flow', ''),
        graph: data.graph,
        path: [...currentPath, name]
      })
    } else if (data.type === 'text' && onOpenText) {
      // Open text file in article viewer
      onOpenText({
        title: getDisplayName(name),
        content: data.content,
        images: data.images || [],
        path: [...currentPath, name]
      })
    } else if (data.type === 'pdf' && onOpenPdf) {
      // Open PDF in PDF viewer
      onOpenPdf({
        title: getDisplayName(name),
        src: data.src,
        path: [...currentPath, name]
      })
    } else if (data.type === 'gallery' && onOpenGallery) {
      // Open gallery viewer
      onOpenGallery({
        title: getDisplayName(name),
        imagePath: data.imagePath,
        path: [...currentPath, name]
      })
    } else if (data.type === 'links' && data.links?.[0]) {
      window.open(data.links[0].href, '_blank')
    }
  }
  
  // Initial render
  render()
  
  return makeWindow({ 
    title, 
    body: container, 
    width: 750, 
    height: 500,
    icon: icons.folder 
  })
}
