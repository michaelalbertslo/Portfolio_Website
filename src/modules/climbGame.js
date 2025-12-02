import { makeWindow } from '../os/windowManager.js'

export function createClimbGame(){
  const container = document.createElement('div')
  container.className = 'w-full h-full bg-[#0b0f1a] flex items-center justify-center'
  const canvas = document.createElement('canvas')
  canvas.width = 420; canvas.height = 560
  canvas.className = 'border border-black/40 bg-black/40'
  container.appendChild(canvas)

  const win = makeWindow({ title: 'Climb.exe', body: container, width: 480, height: 640 })

  const ctx = canvas.getContext('2d')
  const state = {
    player: { x: 210, y: 500, vx: 0, vy: 0, w: 20, h: 28, onGround: false },
    grav: 0.5, jump: -10, move: 3,
    scrollY: 0, platforms: [], running: true, best: 0
  }

  function genPlatforms(){
    state.platforms = []
    let y = 520
    while (y > -2000) {
      const gap = 80 + Math.random()*60
      const x = 40 + Math.random() * 340
      state.platforms.push({ x, y, w: 80, h: 10 })
      y -= gap
    }
  }
  genPlatforms()

  const keys = new Set()
  function key(e, down){ if (!win.isConnected) return; if (down) keys.add(e.key); else keys.delete(e.key); if (e.key === 'r' && !state.running) restart() }
  window.addEventListener('keydown', e => key(e, true))
  window.addEventListener('keyup', e => key(e, false))

  function restart(){ state.player.x=210; state.player.y=500; state.player.vx=0; state.player.vy=0; state.scrollY=0; state.running=true; genPlatforms() }

  function step(){ if (!win.isConnected) return; if (state.running) update(); draw(); requestAnimationFrame(step) }

  function update(){
    const p = state.player
    p.vx = 0
    if (keys.has('ArrowLeft') || keys.has('a')) p.vx = -state.move
    if (keys.has('ArrowRight') || keys.has('d')) p.vx = state.move
    if ((keys.has('ArrowUp') || keys.has('w') || keys.has(' ')) && p.onGround) { p.vy = state.jump }

    p.vy += state.grav; p.x += p.vx; p.y += p.vy
    if (p.x < 0) p.x = 0
    if (p.x + p.w > canvas.width) p.x = canvas.width - p.w

    p.onGround = false
    for (const plat of state.platforms){
      const px1 = p.x, px2 = p.x + p.w, py2 = p.y + p.h
      const qx1 = plat.x, qx2 = plat.x + plat.w, qy1 = plat.y
      if (px2 > qx1 && px1 < qx2 && p.vy >= 0 && py2 >= qy1 && p.y < qy1){
        p.y = qy1 - p.h; p.vy = 0; p.onGround = true
      }
    }

    const screenTop = 200
    if (p.y < screenTop){
      const dy = screenTop - p.y
      p.y += dy; state.scrollY += dy
      for (const plat of state.platforms) plat.y += dy
      state.best = Math.max(state.best, Math.floor(state.scrollY))
    }

    if (p.y > canvas.height){ state.running = false }
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    const g = ctx.createLinearGradient(0,0,0,canvas.height); g.addColorStop(0,'#0c1a3a'); g.addColorStop(1,'#03060b')
    ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width, canvas.height)

    ctx.fillStyle = '#8ecae6'
    for (const plat of state.platforms){ if (plat.y - state.scrollY > canvas.height + 50) continue; ctx.fillRect(plat.x, plat.y, plat.w, plat.h) }

    ctx.fillStyle = '#ffd166'; ctx.fillRect(state.player.x, state.player.y, state.player.w, state.player.h)
    ctx.fillStyle = '#ef476f'; ctx.fillRect(state.player.x+4, state.player.y-4, 12, 6)

    ctx.fillStyle = 'white'; ctx.font = '12px Tahoma'; ctx.fillText('Height: ' + Math.floor(state.scrollY) + ' px', 10, 18)
    if (!state.running){ ctx.fillText('Game over — press R to restart', 120, 280) }
  }

  requestAnimationFrame(step)
  return win
}
