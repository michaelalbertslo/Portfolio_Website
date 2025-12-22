import './styles.css'
import { WindowManager } from './os/windowManager.js'
import { createFileExplorer } from './modules/fileExplorer.js'
import { createAboutMe } from './modules/aboutMe.js'
import { createBattleGame } from './modules/battleGame.js'
import { createHelpViewer } from './modules/helpViewer.js'

const wm = new WindowManager(document.getElementById('windows'))

const GAME_BASE_WIDTH = 493
const GAME_BASE_HEIGHT = 397
const GAME_SCALE = 1.5
const RESUME_PDF_PATH = '/documents/Michael_Albert_Resume.pdf'

const desktopIcons = [
  { id: 'projects', label: 'Projects', type: 'folder' },
  { id: 'work', label: 'Work Experience', type: 'folder' },
  { id: 'involvement', label: 'Involvement', type: 'folder' },
  { id: 'photography', label: 'Photography', type: 'camera' },
  { id: 'about', label: 'AboutMe.exe', type: 'chat' },
  { id: 'help', label: 'Help.exe', type: 'help' }
]

const desktop = document.getElementById('desktop')
const taskbarItems = document.getElementById('taskbar-items')
const startBtn = document.getElementById('start-btn')
const startMenu = document.getElementById('start-menu')
const clock = document.getElementById('clock')
const osRoot = document.getElementById('os-root')
const gameRoot = document.getElementById('game-root')

const INTRO_MESSAGES = [
  "Hello, I'm Michael. Welcome to my portfolio website! Click, press enter, e, or spacebar to continue.",
  "This website is modeled after New Bark town from Pokemon Heart Gold!",
  "Inside the starting bedroom, there is a computer. Interact with it to learn more about me!",
  "Press continue to enter the game, press instructions if you need help navigating the website, and press the resume link if you are in a rush!"
]

const {
  overlay: introOverlay,
  textBox: introText,
  buttonsWrapper: introButtons,
  continueBtn,
  instructionsBtn,
  resumeBtn
} = createIntroOverlay()
gameRoot.appendChild(introOverlay)

let battleInstance = null
let introStep = 0
let introComplete = false

introOverlay.addEventListener('click', handleIntroOverlayClick)
window.addEventListener('keydown', handleIntroKey)

if (INTRO_MESSAGES.length <= 1) {
  revealIntroButtons()
}

function ensureBattleMounted() {
  if (battleInstance) return
  battleInstance = createBattleGame({
    mode: 'standalone',
    onComputerInteract: enterComputerMode,
    initialArea: 'upstairs',
    initialSpawn: { x: 191, y: 154 }
  })
  battleInstance.style.margin = '0 auto'
  if (introOverlay.isConnected) {
    gameRoot.insertBefore(battleInstance, introOverlay)
  } else {
    gameRoot.appendChild(battleInstance)
  }
}

function enterComputerMode() {
  gameRoot.classList.add('hidden')
  osRoot.classList.remove('hidden')
  startMenu.classList.add('hidden')
}

function returnToGameMode() {
  osRoot.classList.add('hidden')
  gameRoot.classList.remove('hidden')
  startMenu.classList.add('hidden')
}

continueBtn.addEventListener('click', () => {
  ensureBattleMounted()
  introOverlay.classList.add('intro-overlay--hidden')
  setTimeout(() => introOverlay.remove(), 300)
})

instructionsBtn.addEventListener('click', () => {
  introText.textContent = INTRO_MESSAGES[INTRO_MESSAGES.length - 1] || ''
})

function pad(n){return n.toString().padStart(2,'0')}
setInterval(()=>{ const d=new Date(); clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}` },1000)
// Initial clock display
const d=new Date(); clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`

startBtn.addEventListener('click', ()=> startMenu.classList.toggle('hidden'))
document.addEventListener('click', (e)=>{ if(!startMenu.contains(e.target) && e.target !== startBtn && !startBtn.contains(e.target)) startMenu.classList.add('hidden') })

document.querySelectorAll('#start-menu [data-launch]').forEach(btn => {
  btn.addEventListener('click', () => {
    const app = btn.getAttribute('data-launch')
    if (app === 'AboutMe') openAbout()
    startMenu.classList.add('hidden')
  })
})

document.getElementById('shutdown').addEventListener('click', () => {
  if (confirm('Shut down mwaOS?')) {
    wm.closeAll()
    returnToGameMode()
  }
})
document.getElementById('run-cmd').addEventListener('click', () => { const cmd = prompt('Type a command (try: about:bsod)'); if (cmd === 'about:bsod') showBSOD() })

// Wallpaper configuration
// Supports both CSS gradients and image URLs
// Add your images to /public/wallpapers/ and reference them as '/wallpapers/filename.jpg'
const wallpapers = [
  
  // Windows Classic
  {
    type: 'image',
    value: '/wallpapers/windows.jpg'
  },
  {
    type: 'image',
    value: '/wallpapers/classic.jpg'
  },
  {
    type: 'image',
    value: '/wallpapers/snowy_mtn.jpg'
  },
  {
    type: 'image',
    value: '/wallpapers/apple.jpg'
  },

  // ========================================
  // ADD YOUR IMAGE WALLPAPERS BELOW
  // ========================================
  // Example image wallpapers (uncomment and update paths):
  // { type: 'image', value: '/wallpapers/bliss.jpg' },
  // { type: 'image', value: '/wallpapers/vista-aurora.jpg' },
  // { type: 'image', value: '/wallpapers/your-custom-wallpaper.png' },
]

let currentWallpaper = 0

function applyWallpaper(wallpaper) {
  const wallpaperEl = document.getElementById('wallpaper')
  
  if (wallpaper.type === 'image') {
    // Image wallpaper
    wallpaperEl.style.background = `url('${wallpaper.value}') center center / cover no-repeat`
    wallpaperEl.style.backgroundSize = 'cover'
    wallpaperEl.style.backgroundPosition = 'center center'
    wallpaperEl.style.backgroundRepeat = 'no-repeat'
    wallpaperEl.style.backgroundColor = '#000'
    wallpaperEl.style.imageRendering = 'auto'
  } else {
    // CSS gradient wallpaper
    wallpaperEl.style.background = wallpaper.value
    wallpaperEl.style.backgroundSize = ''
    wallpaperEl.style.backgroundPosition = ''
  }
}

document.getElementById('change-wallpaper').addEventListener('click', () => {
  currentWallpaper = (currentWallpaper + 1) % wallpapers.length
  applyWallpaper(wallpapers[currentWallpaper])
})

// Set initial wallpaper to the first entry
if (wallpapers.length) {
  applyWallpaper(wallpapers[currentWallpaper])
}

function showBSOD(){
  const overlay = document.createElement('div')
  overlay.className = 'fixed inset-0 bg-blue-700 text-white p-8 text-sm'
  overlay.style.fontFamily = 'Consolas, monospace'
  overlay.innerHTML = `<div class="max-w-3xl mx-auto mt-10">
    <h1 class="text-2xl mb-4">:(  Your PC ran into a problem and needs to restart.</h1>
    <p>We're just collecting some error info, and then we'll restart for you.</p>
    <p class="mt-4">Stop code: MANUALLY_INITIATED_BSOD</p>
    <p class="mt-2 text-xs opacity-60">If you'd like to know more, you can search online later for this error: MWAOS_EASTER_EGG</p>
    <button class="mt-8 border px-4 py-2 bg-white text-blue-700 font-bold rounded hover:bg-gray-100">Reboot</button>
  </div>`
  overlay.querySelector('button').addEventListener('click', ()=> overlay.remove())
  document.body.appendChild(overlay)
}

// Desktop icons - using PNG images from /icons/ folder
function iconSVG(type){
  if (type === 'folder') {
    return `<img src="/icons/folder.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="folder"/>`
  }
  if (type === 'camera') {
    return `<img src="/icons/camera.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="camera"/>`
  }
  if (type === 'chat') {
    return `<img src="/icons/chat.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="chat"/>`
  }
  if (type === 'game') {
    return `<img src="/icons/games.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="games"/>`
  }
  if (type === 'help') {
    return `<img src="/icons/help.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="help"/>`
  }
  if (type === 'exe') {
    return `<svg viewBox="0 0 48 48" class="w-12 h-12" style='filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));'>
      <defs>
        <linearGradient id="exeBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a90d9"/>
          <stop offset="100%" stop-color="#1e5aa8"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="4" fill="url(#exeBg)" stroke="rgba(100,150,200,0.6)" stroke-width="1"/>
      <rect x="8" y="8" width="32" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
      <circle cx="12" cy="11" r="1.5" fill="#ff6b6b"/>
      <circle cx="17" cy="11" r="1.5" fill="#ffd93d"/>
      <circle cx="22" cy="11" r="1.5" fill="#4ade80"/>
      <rect x="10" y="18" width="28" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
      <rect x="10" y="23" width="20" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
      <rect x="10" y="28" width="24" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
      <text x="24" y="40" text-anchor="middle" fill="white" font-size="8" font-weight="bold" font-family="Segoe UI, sans-serif">EXE</text>
    </svg>`
  }
  return `<img src="/icons/file.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="file"/>`
}

// Predefined positions for a disorganized left-side layout
const iconPositions = [
  { top: 20, left: 15 },    // Projects
  { top: 115, left: 35 },   // Work Experience
  { top: 210, left: 8 },    // Involvement
  { top: 305, left: 45 },   // Photography
  { top: 25, left: 110 },   // AboutMe.exe (right of Projects)
  { top: 120, left: 125 }   // Help.exe (right of Work Experience)
]

function createDesktopIcon(icon, index){
  const el = document.createElement('button')
  el.className = 'desktop-icon'
  const pos = iconPositions[index] || { top: 20 + index * 95, left: 20 }
  el.style.position = 'absolute'
  el.style.top = `${pos.top}px`
  el.style.left = `${pos.left}px`
  el.innerHTML = `${iconSVG(icon.type)}<span style="max-width: 80px; text-align: center; line-height: 1.3;">${icon.label}</span>`
  el.addEventListener('click', () => {
    if (icon.id === 'about') openAbout()
    else if (icon.id === 'help') openHelp()
    else openFolder(icon.id, icon.label)
  })
  return el
}
desktopIcons.forEach((i, idx) => desktop.appendChild(createDesktopIcon(i, idx)))

// Vista-style Taskbar items
wm.onTaskbarUpdate = (items) => {
  taskbarItems.innerHTML = ''
  items.forEach(it => {
    const b = document.createElement('button')
    b.className = 'task-item'
    b.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 16 16" style="flex-shrink: 0;">
        <rect x="1" y="1" width="14" height="14" rx="2" fill="url(#taskIconGrad)"/>
        <defs>
          <linearGradient id="taskIconGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5a9fd4"/>
            <stop offset="100%" stop-color="#2d6ba3"/>
          </linearGradient>
        </defs>
      </svg>
      <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px;">${it.title}</span>
    `
    if (it.active) b.classList.add('active')
    if (it.minimized) b.style.opacity = '0.7'
    b.addEventListener('click', () => wm.focus(it.id))
    taskbarItems.appendChild(b)
  })
}

// Apps
function openFolder(id, label){
  fetch('/content/items.json').then(r=>r.json()).then(data => {
    const rootData = data[id] || { type: 'folder', children: {} }
    const win = createFileExplorer({ 
      title: label, 
      rootData,
      onOpenHardware: (entry) => {
        import('./modules/circuitViewer.js').then(mod => {
          wm.openWindow(mod.createCircuitViewer(entry))
        })
      },
      onOpenSoftware: (entry) => {
        import('./modules/softwareVisualizer.js').then(mod => {
          wm.openWindow(mod.createSoftwareVisualizer(entry))
        })
      },
      onOpenText: (entry) => {
        import('./modules/articleViewer.js').then(mod => {
          wm.openWindow(mod.createArticleViewer(entry))
        })
      },
      onOpenPdf: (entry) => {
        import('./modules/pdfViewer.js').then(mod => {
          wm.openWindow(mod.createPdfViewer(entry))
        })
      },
      onOpenGallery: (entry) => {
        import('./modules/galleryViewer.js').then(mod => {
          wm.openWindow(mod.createGalleryViewer(entry))
        })
      }
    })
    wm.openWindow(win)
  })
}
function openAbout(){ fetch('/content/about.json').then(r=>r.json()).then(data => wm.openWindow(createAboutMe(data))) }
function openHelp(){ wm.openWindow(createHelpViewer()) }

function createIntroOverlay() {
  const overlay = document.createElement('div')
  overlay.className = 'intro-overlay'

  const card = document.createElement('div')
  card.className = 'intro-card'
  card.style.width = `${GAME_BASE_WIDTH * GAME_SCALE}px`
  card.style.height = `${GAME_BASE_HEIGHT * GAME_SCALE}px`

  const textBox = document.createElement('div')
  textBox.className = 'intro-text'
  textBox.textContent = INTRO_MESSAGES[0]

  const buttons = document.createElement('div')
  buttons.className = 'intro-buttons'
  buttons.style.display = 'none'

  const continueBtn = createIntroButton('Continue')
  const instructionsBtn = createIntroButton('More Instructions')
  const resumeBtn = createIntroButton('Resume', 'a')
  resumeBtn.href = RESUME_PDF_PATH
  resumeBtn.target = '_blank'
  resumeBtn.rel = 'noopener noreferrer'

  buttons.append(continueBtn, instructionsBtn, resumeBtn)
  card.append(textBox, buttons)
  overlay.append(card)

  return { overlay, textBox, buttonsWrapper: buttons, continueBtn, instructionsBtn, resumeBtn }
}

function createIntroButton(label, tag = 'button') {
  const btn = document.createElement(tag)
  if (tag === 'button') {
    btn.type = 'button'
  }
  btn.className = 'intro-button'
  btn.textContent = label
  return btn
}

function handleIntroOverlayClick() {
  if (introComplete) return
  advanceIntroSequence()
}

function handleIntroKey(e) {
  if (introComplete) return
  const allowedKeys = [' ', 'Space', 'Spacebar', 'Enter', 'e', 'E']
  if (allowedKeys.includes(e.key)) {
    e.preventDefault()
    advanceIntroSequence()
  }
}

function advanceIntroSequence() {
  if (introStep < INTRO_MESSAGES.length - 1) {
    introStep += 1
    introText.textContent = INTRO_MESSAGES[introStep]
  } else if (!introComplete) {
    introText.textContent = INTRO_MESSAGES[introStep]
    revealIntroButtons()
  }
}

function revealIntroButtons() {
  if (introComplete) return
  introText.textContent = ''
  introButtons.style.display = 'flex'
  introComplete = true
  introOverlay.removeEventListener('click', handleIntroOverlayClick)
  window.removeEventListener('keydown', handleIntroKey)
}

// Vista-style right-click desktop menu
desktop.addEventListener('contextmenu', (e)=>{
  e.preventDefault()
  // Remove any existing menus
  document.querySelectorAll('.context-menu').forEach(m => m.remove())
  
  const menu = document.createElement('div')
  menu.className = 'menu context-menu absolute'
  menu.style.left = e.clientX + 'px'
  menu.style.top = e.clientY + 'px'
  menu.innerHTML = `
    <div class="menu-item" style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 16px;">📋</span> Arrange Icons
    </div>
    <div class="menu-item" style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 16px;">🔄</span> Refresh
    </div>
    <div style="height: 1px; background: rgba(100,130,170,0.3); margin: 4px 0;"></div>
    <div class="menu-item" style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 16px;">⚙️</span> Properties
    </div>
  `
  document.body.appendChild(menu)
  
  // Position adjustment if menu goes off screen
  const rect = menu.getBoundingClientRect()
  if (rect.right > window.innerWidth) {
    menu.style.left = (window.innerWidth - rect.width - 10) + 'px'
  }
  if (rect.bottom > window.innerHeight - 50) {
    menu.style.top = (e.clientY - rect.height) + 'px'
  }
  
  function cleanup(){ menu.remove(); document.removeEventListener('click', cleanup) }
  setTimeout(()=>document.addEventListener('click', cleanup), 0)
})
