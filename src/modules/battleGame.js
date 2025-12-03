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

export function createBattleGame(options = {}) {
  const {
    mode = 'window',
    onComputerInteract = null,
    initialArea = 'outside',
    initialSpawn = null
  } = options
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
  `

  const interactionPrompt = document.createElement('div')
  interactionPrompt.style.cssText = `
    display:none;
    margin:8px 0 0;
    padding:6px 10px;
    border:1px solid rgba(255,255,255,0.25);
    border-radius:4px;
    color:#fefae0;
    background:rgba(11,21,36,0.7);
    font-family:'Press Start 2P','VT323',monospace;
    font-size:11px;
    text-align:center;
    text-transform:uppercase;
    letter-spacing:0.5px;
  `
  interactionPrompt.textContent = 'Press E, Enter, Space, or click to interact with the computer.'

  if (mode !== 'window') {
    container.style.border = 'none'
    container.style.borderRadius = '0'
    container.style.padding = '0'
    container.style.width = 'auto'
    container.style.height = 'auto'
    container.style.boxSizing = 'border-box'
    container.style.alignItems = 'center'
  }

  container.append(canvas, interactionPrompt, info)

  let hostElement
  if (mode === 'window') {
    hostElement = makeWindow({
      title: 'Battle.exe',
      body: container,
      width: BASE_WIDTH * 1.5 + 80,
      height: BASE_HEIGHT * 1.5 + 160,
      icon: `<svg viewBox="0 0 32 32" class="w-8 h-8">
        <rect x="4" y="4" width="24" height="24" rx="5" fill="#f8c146" stroke="#b46a00" stroke-width="1.2"/>
        <path d="M11 10h10M11 16h10M11 22h5" stroke="#5a2d00" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`
    })
  } else {
    hostElement = container
  }

  const ctx = canvas.getContext('2d')

  const backgroundCache = new Map()
  let currentBackground = null
  let walkFrames = null
  let runFrames = null
  let assetsLoaded = false

  const player = {
    x: BASE_WIDTH / 2,
    y: BASE_HEIGHT / 2 + 40,
    width: 24,
    height: 30,
    renderWidth: null,
    renderHeight: null,
    direction: 'down',
    frameIndex: 1,
    frameTime: 0,
    walkSpeed: 95,
    runSpeed: 160,
    lastZoneId: null
  }

  const OUTSIDE_COLLISIONS = [
    { x: 0, y: 0, width: 120, height: 160 },
    { x: 180, y: 80, width: 20, height: 28 },
    { x: 120, y: 72, width: 45, height: 26 },
    { x: 150, y: 108, width: 13, height: 28 },
    { x: 116, y: 130, width: 16, height: 14 },
    { x: 200, y: 0, width: 46, height: 132 },
    { x: 280, y: 0, width: 213, height: 100 },
    { x: 330, y: 100, width: 15, height: 73 },
    { x: 385, y: 60, width: 116, height: 104 },
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

  const DOWNSTAIRS_COLLISIONS = [
    { x: 0, y: 0, width: 494, height: 70 },
    { x: 0, y: 70, width: 16, height: 327 },
    { x: 0, y: 364, width: 20, height: 55 },
    { x: 453, y: 146, width: 41, height: 41 },
    { x: 284, y: 50, width: 41, height: 120 },
    { x: 288, y: 216, width: 77, height: 70 },
    { x: 0, y: 100, width: 114, height: 30 }
  ]

  const UPSTAIRS_COLLISIONS = [
    { x: 85, y: 157, width: 55, height: 17 },
    { x: 0, y: 0, width: 494, height: 119 },
    { x: 268, y: 106, width: 121, height: 48 },
    { x: 390, y: 0, width: 104, height: 397 },
    { x: 0, y: 317, width: 494, height: 81 },
    { x: 0, y: 0, width: 80, height: 397 },
    { x: 103, y: 233, width: 47, height: 75 },
    { x: 358, y: 282, width: 28, height: 27 }
  ]

  const OUTSIDE_HOME_RETURN_SPAWN = { x: 367, y: 170 }

  const AREA_CONFIG = {
    outside: {
      backgroundSrc: '/game_assets/New_Bark_Town_HGSS.png',
      playerSize: { width: 24, height: 30 },
      collisionRects: OUTSIDE_COLLISIONS,
      zones: [
        {
          id: 'professor-elm',
          type: 'message',
          name: 'Professor Elm Lab',
          rect: { x: 180, y: 116, width: 20, height: 10 },
          message: 'Professor Elm is still getting the lab ready. Check back soon!'
        },
        {
          id: 'players-home-entry',
          type: 'transition',
          name: "Player's Home",
          rect: { x: 357, y: 145, width: 20, height: 10 },
          target: 'downstairs',
          targetSpawn: { x: 141, y: 400 }
        },
        {
          id: 'rival-house',
          type: 'message',
          name: "Rival's House",
          rect: { x: 278, y: 284, width: 20, height: 10 },
          message: "Rival's House is in progress. Check back soon!"
        },
        {
          id: 'guest-house',
          type: 'message',
          name: 'Guest House',
          rect: { x: 102, y: 270, width: 20, height: 10 },
          message: 'The guest house is being decorated right now.'
        }
      ],
      clickZones: []
    },
    downstairs: {
      backgroundSrc: '/game_assets/ethan_downstairs.png',
      playerSize: { width: 32, height: 48 },
      collisionRects: DOWNSTAIRS_COLLISIONS,
      renderSize: { width: 32, height: 48 },
      zones: [
        {
          id: 'downstairs-to-outside',
          type: 'transition',
          name: 'Outside',
          rect: { x: 102, y: 316, width: 75, height: 57 },
          target: 'outside',
          targetSpawn: OUTSIDE_HOME_RETURN_SPAWN
        },
        {
          id: 'downstairs-to-upstairs',
          type: 'transition',
          name: 'Upstairs',
          rect: { x: 117, y: 71, width: 66, height: 65 },
          target: 'upstairs',
          targetSpawn: { x: 191, y: 154 }
        }
      ],
      clickZones: []
    },
    upstairs: {
      backgroundSrc: '/game_assets/ethan_room.png',
      playerSize: { width: 32, height: 48 },
      collisionRects: UPSTAIRS_COLLISIONS,
      renderSize: { width: 32, height: 48 },
      zones: [
        {
          id: 'upstairs-to-downstairs',
          type: 'transition',
          name: 'Downstairs',
          rect: { x: 138, y: 120, width: 20, height: 55 },
          target: 'downstairs',
          targetSpawn: { x: 178, y: 112 }
        }
      ],
      clickZones: [
        {
          id: 'upstairs-computer',
          rect: { x: 235, y: 115, width: 60, height: 62 },
          onInteract: () => {
            if (typeof onComputerInteract === 'function') {
              onComputerInteract()
            } else {
              alert('The computer hums quietly. Nothing new to check right now.')
            }
          },
          message: 'The computer hums quietly. Nothing new to check right now.'
        }
      ]
    }
  }

  const BACKGROUND_SOURCES = Array.from(
    new Set(Object.values(AREA_CONFIG).map(area => area.backgroundSrc))
  )

  const initialAreaKey = AREA_CONFIG[initialArea] ? initialArea : 'outside'
  const initialSpawnPoint = initialSpawn
  let currentAreaKey = initialAreaKey
  let currentArea = AREA_CONFIG[currentAreaKey]
  let transitionCooldown = 0
  let transitionHoldActive = false

  const keys = new Set()
  const controls = {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right',
    ShiftLeft: 'shift', ShiftRight: 'shift'
  }
  const INTERACT_KEYS = new Set(['KeyE', 'Enter', 'Space'])

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}

function getFootprint(nx, ny, width, height) {
  return {
    x: nx - width / 2,
    y: ny - height / 2,
    width,
    height
  }
}

function getPlayerFootprint(nx = player.x, ny = player.y) {
  return getFootprint(nx, ny, player.width, player.height)
}

function blockedAt(nx, ny) {
  const footprint = getPlayerFootprint(nx, ny)
  const collisionSet = currentArea?.collisionRects || []
  return collisionSet.some(rect => rectsOverlap(footprint, rect))
}

function zoneAt(nx, ny) {
  const footprint = getPlayerFootprint(nx, ny)
  const zones = currentArea?.zones || []
  return zones.find(zone => rectsOverlap(footprint, zone.rect))
}

function showZoneMessage(zone) {
  const text = zone.message || `${zone.name} is in progress. Check back soon!`
  alert(text)
}

function getComputerZone() {
  if (currentAreaKey !== 'upstairs') return null
  const zones = currentArea?.clickZones || []
  return zones.find(zone => zone.id === 'upstairs-computer') || null
}

function isPlayerNearComputer() {
  const zone = getComputerZone()
  if (!zone) return false
  const footprint = getPlayerFootprint()
  return rectsOverlap(footprint, zone.rect)
}

let computerPromptVisible = false
function setComputerPromptVisible(visible) {
  if (visible === computerPromptVisible) return
  computerPromptVisible = visible
  interactionPrompt.style.display = visible ? 'block' : 'none'
}

function triggerZoneInteraction(zone) {
  if (!zone) return
  if (typeof zone.onInteract === 'function') {
    zone.onInteract()
  } else {
    alert(zone.message || 'Nothing interesting happens.')
  }
}

function tryInteractWithComputer() {
  const zone = getComputerZone()
  if (!zone) return false
  const footprint = getPlayerFootprint()
  if (!rectsOverlap(footprint, zone.rect)) return false
  triggerZoneInteraction(zone)
  return true
}

function transitionToArea(areaKey, spawnPoint) {
  const nextArea = AREA_CONFIG[areaKey]
  if (!nextArea) return
  currentAreaKey = areaKey
  currentArea = nextArea
  transitionCooldown = 0.3
  transitionHoldActive = true
  player.width = nextArea.playerSize.width
  player.height = nextArea.playerSize.height
  player.renderWidth = nextArea.renderSize?.width ?? null
  player.renderHeight = nextArea.renderSize?.height ?? null
  if (spawnPoint) {
    player.x = clamp(spawnPoint.x, player.width / 2, BASE_WIDTH - player.width / 2)
    player.y = clamp(spawnPoint.y, player.height / 2, BASE_HEIGHT - player.height / 2)
  }
  currentBackground = backgroundCache.get(nextArea.backgroundSrc) || null
  player.frameIndex = 1
  player.frameTime = 0
  player.lastZoneId = null
}

function rectContainsPoint(rect, x, y) {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  )
}

function handleCanvasClick(evt) {
  const clickZones = currentArea?.clickZones || []
  if (!clickZones.length) return
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const clickX = (evt.clientX - rect.left) * scaleX
  const clickY = (evt.clientY - rect.top) * scaleY
  const zone = clickZones.find(z => rectContainsPoint(z.rect, clickX, clickY))
  if (zone) {
    triggerZoneInteraction(zone)
  }
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

    if (transitionCooldown > 0) {
      transitionCooldown = Math.max(0, transitionCooldown - dt)
    }

    let zone = zoneAt(player.x, player.y)

    if (transitionHoldActive) {
      if (!zone || zone.type !== 'transition') {
        transitionHoldActive = false
      } else {
        zone = null
      }
    }

    if (transitionCooldown <= 0 && zone) {
      if (zone.type === 'message') {
        if (player.lastZoneId !== zone.id) {
          showZoneMessage(zone)
          player.lastZoneId = zone.id
        }
      } else if (zone.type === 'transition') {
        transitionToArea(zone.target, zone.targetSpawn)
        player.lastZoneId = null
      }
    } else if (!zone && !transitionHoldActive) {
      player.lastZoneId = null
    }

    setComputerPromptVisible(isPlayerNearComputer())

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
    if (!assetsLoaded || !currentBackground) {
      renderLoading()
      return
    }

    ctx.drawImage(currentBackground, 0, 0, canvas.width, canvas.height)

    const frames = keys.has('shift')
      ? getDirectionalFrames(runFrames, player.direction)
      : getDirectionalFrames(walkFrames, player.direction)

    const sprite = frames?.[player.frameIndex]
    if (sprite) {
      const drawWidth = player.renderWidth ?? sprite.width
      const drawHeight = player.renderHeight ?? sprite.height
      ctx.drawImage(
        sprite,
        Math.round(player.x - drawWidth / 2),
        Math.round(player.y - drawHeight / 2),
        drawWidth,
        drawHeight
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
    const framePromises = frameNames.map(name =>
      loadImage(`/game_assets/${name}.png`).then(img => ({ name, img }))
    )
    const backgroundPromises = BACKGROUND_SOURCES.map(src =>
      loadImage(src).then(img => ({ src, img }))
    )

    Promise.all([Promise.all(framePromises), Promise.all(backgroundPromises)])
      .then(([frames, backgrounds]) => {
        const cache = new Map()
        frames.forEach(({ name, img }) => cache.set(name, img))
        walkFrames = mapFrames(WALK_FRAME_MAP, cache)
        runFrames = mapFrames(RUN_FRAME_MAP, cache)
        backgrounds.forEach(({ src, img }) => backgroundCache.set(src, img))
        transitionToArea(currentAreaKey, initialSpawnPoint || undefined)
        assetsLoaded = true
      })
      .finally(() => {
        lastTime = performance.now()
        requestAnimationFrame(loop)
      })
  }

  const handleKeyDown = (e) => {
    if (INTERACT_KEYS.has(e.code)) {
      if (tryInteractWithComputer()) {
        e.preventDefault()
        return
      }
    }
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
  canvas.addEventListener('click', handleCanvasClick)

  const cleanup = () => {
    running = false
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    canvas.removeEventListener('click', handleCanvasClick)
  }

  if (mode === 'window') {
    const closeBtn = hostElement.querySelector('[data-act="close"]')
    closeBtn?.addEventListener('click', cleanup)
  } else {
    hostElement.__battleCleanup = cleanup
  }

  loadAssets()
  return hostElement
}
