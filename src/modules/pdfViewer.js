import { makeWindow } from '../os/windowManager.js'
import { assetPath } from '../utils/assetPath.js'

export function createPdfViewer({ title, src }) {
  const resolvedSrc = assetPath(src || '')
  const container = document.createElement('div')
  container.className = 'h-full flex flex-col pdf-viewer'
  
  container.innerHTML = `
    <!-- Toolbar -->
    <div style="
      background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
      border-bottom: 1px solid #ccc;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    ">
      <svg width="16" height="16" viewBox="0 0 32 32">
        <rect x="4" y="2" width="24" height="28" rx="2" fill="#e74c3c"/>
        <text x="16" y="20" text-anchor="middle" fill="white" font-size="8" font-weight="bold">PDF</text>
      </svg>
      <span style="font-weight: 500; color: #333;">${title}</span>
      <span style="color: #999;">— PDF Document</span>
      <div style="flex: 1;"></div>
      <a href="${resolvedSrc}" target="_blank" style="
        padding: 4px 12px;
        background: linear-gradient(180deg, #f7f7f7 0%, #e0e0e0 100%);
        border: 1px solid #999;
        border-radius: 3px;
        color: #333;
        text-decoration: none;
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1v10M4 7l4 4 4-4M2 14h12"/>
        </svg>
        Open in New Tab
      </a>
    </div>
    
    <!-- PDF Embed -->
    <div style="flex: 1; background: #525659; position: relative;">
      <iframe 
        src="${resolvedSrc}" 
        style="
          width: 100%;
          height: 100%;
          border: none;
        "
        title="${title}"
      ></iframe>
    </div>
  `
  
  return makeWindow({ 
    title: title, 
    body: container, 
    width: 850, 
    height: 650,
  })
}

