import { makeWindow } from '../os/windowManager.js'

const BASE_WIDTH = 493
const BASE_HEIGHT = 397

const WALK_FRAME_MAP = {
  down: ['ethan2', 'ethan2', 'ethan3'],
  left: ['ethan4', 'ethan5', 'ethan6'],
  up: ['ethan7', 'ethan8', 'ethan9'],
  right: ['ethan10', 'ethan11', 'ethan12']
}

const RUN_FRAME_MAP = {
  down: ['ethanrun7', 'ethanrun8', 'ethanrun9'],
  left: ['ethanrun4', 'ethanrun5', 'ethanrun6'],
  up: ['ethanrun1', 'ethanrun2', 'ethanrun3'],
  right: ['ethanrun10', 'ethanrun11', 'ethanrun12']
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = src
  })
}

function getDirectionalFrames(directionals, dir) {
  if (!directionals) return null
  return directionals[dir] || directionals.down
}

function gatherUniqueNames(map) {
  const set = new Set()
  Object.values(map).forEach(names => names.forEach(name => set.add(name)))
  return Array.from(set)
}

function mapFrames(map, cache) {
  const result = {}
  Object.entries(map).forEach(([dir, names]) => {
    result[dir] = names.map(name => cache.get(name))
  })
  return result
}

export function createBattleGame() {
  const container = document.createElement('div')
  container.style.cssText = 'height:100%;background:#0b1524;display:flex;flex-direction:column;gap:8px;padding:8px;font-family:Segoe UI'

  const canvas = document.createElement('canvas')
  canvas.width = BASE_WIDTH
  canvas.height = BASE_HEIGHT
  canvas.style.width = BASE_WIDTH * 1.5 + 'px'
  canvas.style.height = BASE_HEIGHT * 1.5 + 'px'
  canvas.style.border = '1px solid rgba(0,0,0,0.35)'
  canvas.style.borderRadius = '6px'
  canvas.style.background = '#000'
  canvas.style.imageRendering = 'pixelated'

  const info = document.createElement('div')
  info.className = 'text-xs text-white'
  info.style.fontSize = '12px'
  info.innerHTML = `
    <div><strong>Controls:</strong> Arrow Keys / WASD to walk • Hold Shift to run</div>
    <div>Sprites live in <code>/public/game_assets</code>. Drop new PNGs there and reference them in <code>battleGame.js</code>.</div>
  `

  container.append(canvas, info)

  const win = makeWindow({
    title: 'Battle.exe',
    body: container,
    width: BASE_WIDTH * 1.5 + 80,
    height: BASE_HEIGHT * 1.5 + 160,
    icon: `<svg viewBox="0 0 32 32" class="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" rx="5" fill="#f8c146" stroke="#b46a00" stroke-width="1.2"/>
      <path d="M11 10h10M11 16h10M11 22h5" stroke="#5a2d00" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`
  })

  const ctx = canvas.getContext('2d')

  let backgroundImage = null
  let walkFrames = null
  let runFrames = null
  let assetsLoaded = false

  const player = {
    x: BASE_WIDTH / 2,
    y: BASE_HEIGHT / 2 + 40,
  width: 24,
  height: 30,
    direction: 'down',
    frameIndex: 1,
    frameTime: 0,
    walkSpeed: 95,
  runSpeed: 160,
  lastDoor: null
  }

const collisionRects = [
  { x: 0, y: 0, width: 120, height: 160 },
  { x: 180, y: 80, width: 20, height: 28 },
  { x: 120, y: 72, width: 45, height: 26 },
  { x: 150, y: 108, width: 13, height: 28 },
  { x: 116, y: 130, width: 16, height: 14 },
  { x: 200, y: 0, width: 46, height: 132 },
  { x: 280, y: 0, width: 213, height: 100 },
  { x: 330, y: 100, width: 15, height: 73 },
  { x: 377, y: 60, width: 116, height: 104 },
  { x: 0, y: 0, width: 120, height: 160 },
  { x: 424, y: 160, width: 68, height: 25 },
  { x: 452, y: 185, width: 41, height: 55 },
  { x: 400, y: 240, width: 93, height: 156 },
  { x: 0, y: 360, width: 400, height: 36 },
  { x: 0, y: 340, width: 156, height: 20 },
  { x: 0, y: 240, width: 20, height: 100 },
  { x: 20, y: 240, width: 60, height: 60 },
  { x: 200, y: 213, width: 15, height: 7 },
  { x: 90, y: 220, width: 13, height: 60 },
  { x: 120, y: 220, width: 31, height: 56 },
  { x: 0, y: 0, width: 120, height: 160 },
  { x: 260, y: 240, width: 75, height: 45 },
  { x: 248, y: 278, width: 14, height: 28 },
  { x: 240, y: 0, width: 26, height: 70 }
]

const doorways = [
  { name: 'Professor Elm Lab', x: 180, y: 116, width: 20, height: 10 },
  { name: "Player's Home", x: 357, y: 145, width: 20, height: 10 },
  { name: "Rival's House", x: 278, y: 284, width: 20, height: 10 },
  { name: 'Guest House', x: 102, y: 270, width: 20, height: 10 }
]

  const keys = new Set()
  const controls = {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right',
    ShiftLeft: 'shift', ShiftRight: 'shift'
  }

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}

function blockedAt(nx, ny) {
  const footprint = {
    x: nx - player.width / 2,
    y: ny - player.height / 2,
    width: player.width,
    height: player.height
  }
  return collisionRects.some(rect => rectsOverlap(footprint, rect))
}

function doorwayAt(nx, ny) {
  const footprint = {
    x: nx - player.width / 2,
    y: ny - player.height / 2,
    width: player.width,
    height: player.height
  }
  return doorways.find(rect => rectsOverlap(footprint, rect))
}

function showDoorwayPopup(name) {
  alert(`${name} is in progress. Check back soon!`)
}

  function update(dt) {
    let vx = 0
    let vy = 0
    if (keys.has('left')) vx -= 1
    if (keys.has('right')) vx += 1
    if (keys.has('up')) vy -= 1
    if (keys.has('down')) vy += 1

    let moving = false
    if (vx !== 0 || vy !== 0) {
      moving = true
      if (Math.abs(vx) > Math.abs(vy)) {
        player.direction = vx > 0 ? 'right' : 'left'
      } else {
        player.direction = vy > 0 ? 'down' : 'up'
      }

      if (vx !== 0 && vy !== 0) {
        vx *= Math.SQRT1_2
        vy *= Math.SQRT1_2
      }

      const speed = keys.has('shift') ? player.runSpeed : player.walkSpeed
      const nextX = clamp(player.x + vx * speed * dt, 20, BASE_WIDTH - 20)
      const nextY = clamp(player.y + vy * speed * dt, 35, BASE_HEIGHT - 25)

      if (!blockedAt(nextX, player.y)) {
        player.x = nextX
      }
      if (!blockedAt(player.x, nextY)) {
        player.y = nextY
      }
    }

    const door = doorwayAt(player.x, player.y)
    if (door) {
      if (player.lastDoor !== door.name) {
        showDoorwayPopup(door.name)
        player.lastDoor = door.name
      }
    } else {
      player.lastDoor = null
    }

    const frames = keys.has('shift')
      ? getDirectionalFrames(runFrames, player.direction)
      : getDirectionalFrames(walkFrames, player.direction)

    if (assetsLoaded && frames) {
      const frameDuration = keys.has('shift') ? 0.08 : 0.14
      if (moving) {
        player.frameTime += dt
        if (player.frameTime >= frameDuration) {
          player.frameIndex = (player.frameIndex + 1) % frames.length
          player.frameTime = 0
        }
      } else {
        player.frameIndex = 1
        player.frameTime = 0
      }
    }
  }

  function renderLoading() {
    ctx.fillStyle = '#0b1524'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px "Segoe UI"'
    ctx.textAlign = 'center'
    ctx.fillText('Loading New Bark Town assets...', canvas.width / 2, canvas.height / 2)
  }

  function render() {
    ctx.imageSmoothingEnabled = false
    if (!assetsLoaded || !backgroundImage) {
      renderLoading()
      return
    }

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

    const frames = keys.has('shift')
      ? getDirectionalFrames(runFrames, player.direction)
      : getDirectionalFrames(walkFrames, player.direction)

    const sprite = frames?.[player.frameIndex]
    if (sprite) {
      const drawWidth = sprite.width
      const drawHeight = sprite.height
      ctx.drawImage(
        sprite,
        Math.round(player.x - drawWidth / 2),
        Math.round(player.y - drawHeight / 2)
      )
    }
  }

  let running = true
  let lastTime = performance.now()

  function loop(now) {
    if (!running) return
    const dt = Math.min(0.05, (now - lastTime) / 1000)
    lastTime = now
    update(dt)
    render()
    requestAnimationFrame(loop)
  }

  function loadAssets() {
    const walkNames = gatherUniqueNames(WALK_FRAME_MAP)
    const runNames = gatherUniqueNames(RUN_FRAME_MAP)
    const frameNames = [...walkNames, ...runNames]
    const framePromises = frameNames.map(name => loadImage(`/game_assets/${name}.png`))

    Promise.all([
      loadImage('/game_assets/New_Bark_Town_HGSS.png'),
      ...framePromises
    ]).then(images => {
      backgroundImage = images[0]
      const cache = new Map()
      frameNames.forEach((name, idx) => {
        cache.set(name, images[idx + 1])
      })
      walkFrames = mapFrames(WALK_FRAME_MAP, cache)
      runFrames = mapFrames(RUN_FRAME_MAP, cache)
      assetsLoaded = true
    }).finally(() => {
      lastTime = performance.now()
      requestAnimationFrame(loop)
    })
  }

  const handleKeyDown = (e) => {
    const action = controls[e.code]
    if (!action) return
    e.preventDefault()
    keys.add(action)
  }

  const handleKeyUp = (e) => {
    const action = controls[e.code]
    if (!action) return
    e.preventDefault()
    keys.delete(action)
  }

  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  const cleanup = () => {
    running = false
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  }

  const closeBtn = win.querySelector('[data-act="close"]')
  closeBtn?.addEventListener('click', cleanup)

  loadAssets()
  return win
}
