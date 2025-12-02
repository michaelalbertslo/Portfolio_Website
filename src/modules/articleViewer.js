import { makeWindow } from '../os/windowManager.js'

export function createArticleViewer({ title, content, images = [] }) {
  const container = document.createElement('div')
  container.className = 'h-full flex flex-col'
  
  // Support content as array of lines (for easier JSON editing)
  let textContent = Array.isArray(content) ? content.join('\n') : content
  
  // Process content - support basic formatting
  // Convert **text** to bold, *text* to italic, [image:0] to image references
  let processedContent = textContent
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size: 16px; font-weight: 600; margin: 16px 0 8px 0; color: #1a365d;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size: 18px; font-weight: 600; margin: 20px 0 10px 0; color: #1a365d; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size: 22px; font-weight: 700; margin: 24px 0 12px 0; color: #1a365d;">$1</h1>')
    .replace(/^- (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>')
    .replace(/^• (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>')
    .replace(/\n\n/g, '</p><p style="margin-bottom: 12px; line-height: 1.6;">')
    .replace(/\n/g, '<br>')
  
  // Process image references [image:0], [image:1], etc.
  processedContent = processedContent.replace(/\[image:(\d+)\]/g, (match, index) => {
    const img = images[parseInt(index)]
    if (img) {
      return `
        <figure style="margin: 16px 0; text-align: center;">
          <img 
            src="${img.src}" 
            alt="${img.alt || ''}" 
            style="max-width: 100%; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
          />
          ${img.caption ? `<figcaption style="font-size: 12px; color: #666; margin-top: 8px; font-style: italic;">${img.caption}</figcaption>` : ''}
        </figure>
      `
    }
    return ''
  })
  
  // Wrap in paragraph if not already
  if (!processedContent.startsWith('<h') && !processedContent.startsWith('<p')) {
    processedContent = `<p style="margin-bottom: 12px; line-height: 1.6;">${processedContent}</p>`
  }
  
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
      color: #666;
    ">
      <svg width="16" height="16" viewBox="0 0 32 32">
        <rect x="4" y="2" width="24" height="28" rx="2" fill="#f5f5f5" stroke="#999" stroke-width="1"/>
        <path d="M8 8h16M8 12h16M8 16h12M8 20h14M8 24h10" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span style="font-weight: 500;">${title}</span>
      <span style="color: #999;">— Text Document</span>
    </div>
    
    <!-- Content Area -->
    <div style="
      flex: 1;
      overflow: auto;
      padding: 24px 32px;
      background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
    ">
      <article style="
        max-width: 700px;
        margin: 0 auto;
        font-size: 14px;
        color: #2d3748;
        line-height: 1.7;
      ">
        ${processedContent}
      </article>
    </div>
  `
  
  return makeWindow({ 
    title: title, 
    body: container, 
    width: 700, 
    height: 520,
  })
}

