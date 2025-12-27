let z = 10
let nextId = 1

export class WindowManager {
  constructor(layerEl){
    this.layer = layerEl
    this.windows = new Map()
    this.onTaskbarUpdate = null
  }

  openWindow(winEl){
    const id = 'win-' + (nextId++)
    winEl.dataset.id = id
    winEl.style.left = (100 + Math.random() * 200) + 'px'
    winEl.style.top = (60 + Math.random() * 120) + 'px'
    winEl.style.zIndex = ++z
    this.layer.appendChild(winEl)
    this.windows.set(id, { el: winEl, title: winEl.querySelector('.title').textContent, active: true })
    this._bindWindow(winEl)
    this._updateTaskbar()
  }

  _bindWindow(el){
    const titlebar = el.querySelector('.win-titlebar')
    const closeBtn = el.querySelector('[data-act=close]')
    const minBtn = el.querySelector('[data-act=min]')
    const maxBtn = el.querySelector('[data-act=max]')

    ;[closeBtn, minBtn, maxBtn].forEach(btn => btn?.addEventListener('pointerdown', ev => ev.stopPropagation()))

    // Dragging state
    let dragging = false
    let offsetX = 0, offsetY = 0
    let currentPointerId = null

    // Start drag on titlebar pointerdown
    titlebar.addEventListener('pointerdown', (e) => {
      // Do not start drag when clicking action buttons
      if (e.target && e.target.closest && e.target.closest('.win-actions')) return
      if (e.button !== 0) return
      
      dragging = true
      currentPointerId = e.pointerId
      const rect = el.getBoundingClientRect()
      offsetX = e.clientX - rect.left
      offsetY = e.clientY - rect.top
      
      // Capture pointer on the window element
      el.setPointerCapture(e.pointerId)
      this.focus(el.dataset.id)
    })

    // Handle move on the window element (where capture is set)
    el.addEventListener('pointermove', (e) => {
      if (!dragging || e.pointerId !== currentPointerId) return
      const nextLeft = e.clientX - offsetX
      const nextTop = e.clientY - offsetY
      // Constrain so titlebar stays visible
      el.style.left = nextLeft + 'px'
      el.style.top = Math.max(4, nextTop) + 'px'
    })

    // End drag on pointerup (on window element)
    el.addEventListener('pointerup', (e) => {
      if (e.pointerId !== currentPointerId) return
      dragging = false
      currentPointerId = null
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId)
      }
    })

    // Handle pointer cancel (e.g., if pointer is interrupted)
    el.addEventListener('pointercancel', (e) => {
      if (e.pointerId !== currentPointerId) return
      dragging = false
      currentPointerId = null
    })

    // Also handle lostpointercapture as a safety net
    el.addEventListener('lostpointercapture', () => {
      dragging = false
      currentPointerId = null
    })

    closeBtn?.addEventListener('click', () => this.close(el.dataset.id))
    minBtn?.addEventListener('click', () => this.minimize(el.dataset.id))
    maxBtn?.addEventListener('click', () => this.toggleMaximize(el.dataset.id))

    el.addEventListener('mousedown', () => this.focus(el.dataset.id))
  }

  focus(id){
    const w = this.windows.get(id)
    if (!w) return
    if (w.el.style.display === 'none') w.el.style.display = ''
    w.el.style.zIndex = ++z
    this.windows.forEach((v,k)=> v.active = (k === id))
    this._updateTaskbar()
  }

  close(id){
    const w = this.windows.get(id)
    if (!w) return
    w.el.remove()
    this.windows.delete(id)
    this._updateTaskbar()
  }

  closeAll(){
    this.windows.forEach(w => w.el.remove())
    this.windows.clear()
    this._updateTaskbar()
  }

  minimize(id){
    const w = this.windows.get(id)
    if (!w) return
    w.el.style.display = 'none'
    w.active = false
    this._updateTaskbar()
  }

  toggleMaximize(id){
    const w = this.windows.get(id)
    if (!w) return
    const el = w.el
    if (el.classList.contains('maxim')){
      el.classList.remove('maxim')
      el.style.left = el.dataset.prevLeft
      el.style.top = el.dataset.prevTop
      el.style.width = el.dataset.prevWidth
      el.style.height = el.dataset.prevHeight
    } else {
      const rect = el.getBoundingClientRect()
      el.dataset.prevLeft = el.style.left
      el.dataset.prevTop = el.style.top
      el.dataset.prevWidth = el.style.width || rect.width + 'px'
      el.dataset.prevHeight = el.style.height || rect.height + 'px'
      el.style.left = '10px'
      el.style.top = '10px'
      el.style.width = 'calc(100vw - 20px)'
      el.style.height = 'calc(100vh - 60px)'
      el.classList.add('maxim')
    }
  }

  _updateTaskbar(){
    if (!this.onTaskbarUpdate) return
    const items = []
    this.windows.forEach((w, id)=> items.push({ id, title: w.title, active: w.active, minimized: w.el.style.display === 'none' }))
    this.onTaskbarUpdate(items)
  }
}

// Vista-style window helper
export function makeWindow({ title, body, width=600, height=420, icon }){
  const el = document.createElement('div')
  el.className = 'win absolute'
  el.style.width = width + 'px'
  el.style.height = height + 'px'
  
  // Vista-style window icon
  const iconHtml = icon ? icon : `
    <svg width="16" height="16" viewBox="0 0 16 16" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="url(#iconGrad)"/>
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5a9fd4"/>
          <stop offset="100%" stop-color="#2d6ba3"/>
        </linearGradient>
      </defs>
    </svg>
  `
  
  el.innerHTML = `
    <div class="win-titlebar">
      <div class="title" style="display: flex; align-items: center; gap: 8px;">
        ${iconHtml}
        <span>${title}</span>
      </div>
      <div class="win-actions">
        <button title="Minimize" data-act="min">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="1" y="7" width="8" height="2" fill="currentColor"/>
          </svg>
        </button>
        <button title="Maximize" data-act="max">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
        <button title="Close" data-act="close">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="win-body overflow-auto" style="height: calc(100% - 32px);">${typeof body === 'string' ? body : ''}</div>
  `
  if (typeof body !== 'string' && body instanceof HTMLElement){
    el.querySelector('.win-body').appendChild(body)
  }
  return el
}
