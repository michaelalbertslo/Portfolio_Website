import { makeWindow } from '../os/windowManager.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createCircuitViewer(entry){
  const container = document.createElement('div')
  container.className = 'w-full h-full bg-[#0e1626] relative'

  const tooltip = document.createElement('div')
  tooltip.className = 'tooltip hidden'
  container.appendChild(tooltip)

  const info = document.createElement('div')
  info.className = 'absolute left-2 top-2 bg-white/90 text-xs p-2 rounded border'
  info.textContent = 'Drag to rotate • Scroll to zoom • Hover for details'
  container.appendChild(info)

  const win = makeWindow({ title: entry.title + ' — 3D Schematic', body: container, width: 820, height: 560 })

  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0e1626)
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
  camera.position.set(5, 5, 8)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(devicePixelRatio)
  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const dir = new THREE.DirectionalLight(0xffffff, 0.6)
  dir.position.set(5, 10, 7); scene.add(dir)

  // Board
  const boardGeo = new THREE.BoxGeometry(12, 0.2, 8)
  const boardMat = new THREE.MeshPhongMaterial({ color: 0x0a5a2b })
  const board = new THREE.Mesh(boardGeo, boardMat)
  scene.add(board)

  // PCB traces pattern on board
  const traceGeo = new THREE.PlaneGeometry(11.8, 7.8)
  const traceCanvas = document.createElement('canvas')
  traceCanvas.width = 256; traceCanvas.height = 256
  const traceCtx = traceCanvas.getContext('2d')
  traceCtx.fillStyle = '#0a5a2b'
  traceCtx.fillRect(0, 0, 256, 256)
  traceCtx.strokeStyle = '#1a8a4b'
  traceCtx.lineWidth = 1
  for (let i = 0; i < 20; i++) {
    traceCtx.beginPath()
    traceCtx.moveTo(Math.random() * 256, Math.random() * 256)
    traceCtx.lineTo(Math.random() * 256, Math.random() * 256)
    traceCtx.stroke()
  }
  const traceTexture = new THREE.CanvasTexture(traceCanvas)
  const traceMat = new THREE.MeshBasicMaterial({ map: traceTexture, transparent: true, opacity: 0.3 })
  const traceMesh = new THREE.Mesh(traceGeo, traceMat)
  traceMesh.rotation.x = -Math.PI / 2
  traceMesh.position.y = 0.11
  scene.add(traceMesh)

  // Get nodes and edges from graph format (or use defaults)
  const nodes = (entry.graph?.nodes?.length) ? entry.graph.nodes : [
    { id: 'MCU', label: 'MCU' },
    { id: 'Sensor', label: 'Sensor' },
    { id: 'Power', label: 'Power' },
    { id: 'IO', label: 'I/O' }
  ]
  const edges = (entry.graph?.edges?.length) ? entry.graph.edges : [
    ['MCU', 'Sensor'], ['MCU', 'Power'], ['MCU', 'IO']
  ]

  // Generate positions in a grid/circular layout
  const componentColors = [0x222222, 0x0044aa, 0x884400, 0x226622, 0x660066, 0x006666]
  const components = nodes.map((node, i) => {
    const cols = Math.ceil(Math.sqrt(nodes.length))
    const row = Math.floor(i / cols)
    const col = i % cols
    const spacing = 3
    const offsetX = -(cols - 1) * spacing / 2
    const offsetZ = -(Math.ceil(nodes.length / cols) - 1) * spacing / 2
    
    return {
      id: node.id,
      label: node.label,
      pos: [offsetX + col * spacing, 0.35, offsetZ + row * spacing],
      color: componentColors[i % componentColors.length],
      type: i === 0 ? 'IC' : (i % 3 === 0 ? 'C' : 'R')
    }
  })

  const compMeshes = []
  components.forEach(c => {
    let mesh
    if (c.type === 'IC'){
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.4, 1.4), 
        new THREE.MeshPhongMaterial({ color: c.color })
      )
      // Add pins
      const pinGeo = new THREE.BoxGeometry(0.1, 0.2, 0.05)
      const pinMat = new THREE.MeshPhongMaterial({ color: 0x888888 })
      for (let p = 0; p < 4; p++) {
        const pin1 = new THREE.Mesh(pinGeo, pinMat)
        pin1.position.set(-0.6 + p * 0.4, 0, 0.75)
        mesh.add(pin1)
        const pin2 = new THREE.Mesh(pinGeo, pinMat)
        pin2.position.set(-0.6 + p * 0.4, 0, -0.75)
        mesh.add(pin2)
      }
    } else if (c.type === 'C'){
      mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.7, 24), 
        new THREE.MeshPhongMaterial({ color: c.color })
      )
    } else {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.35, 0.45), 
        new THREE.MeshPhongMaterial({ color: c.color })
      )
      // Add resistor bands
      const bandGeo = new THREE.BoxGeometry(0.12, 0.36, 0.46)
      const colors = [0xff0000, 0x000000, 0xffd700]
      colors.forEach((col, bi) => {
        const band = new THREE.Mesh(bandGeo, new THREE.MeshBasicMaterial({ color: col }))
        band.position.x = -0.3 + bi * 0.25
        mesh.add(band)
      })
    }
    mesh.position.set(c.pos[0], c.pos[1], c.pos[2])
    mesh.userData = c
    compMeshes.push(mesh)
    scene.add(mesh)

    // Add label sprite
    const sprite = makeTextSprite(c.label)
    sprite.position.set(c.pos[0], c.pos[1] + 0.8, c.pos[2])
    scene.add(sprite)
  })

  function makeTextSprite(text){
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = 'bold 14px Tahoma'
    const width = ctx.measureText(text).width + 12
    canvas.width = width; canvas.height = 20
    ctx.font = 'bold 14px Tahoma'
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
    ctx.strokeText(text, 6, 15)
    ctx.fillText(text, 6, 15)
    const texture = new THREE.CanvasTexture(canvas)
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true })
    const sprite = new THREE.Sprite(mat)
    sprite.scale.set(canvas.width / 25, canvas.height / 25, 1)
    return sprite
  }

  // Connections (PCB traces)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x99ff99, linewidth: 2 })
  edges.forEach(([a, b]) => {
    const meshA = compMeshes.find(m => m.userData.id === a)
    const meshB = compMeshes.find(m => m.userData.id === b)
    if (!meshA || !meshB) return
    
    const A = meshA.position
    const B = meshB.position
    
    // Create L-shaped trace
    const midX = (A.x + B.x) / 2
    const points = [
      new THREE.Vector3(A.x, 0.12, A.z),
      new THREE.Vector3(midX, 0.12, A.z),
      new THREE.Vector3(midX, 0.12, B.z),
      new THREE.Vector3(B.x, 0.12, B.z)
    ]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, lineMat)
    scene.add(line)
  })

  function resize(){
    const rect = container.getBoundingClientRect()
    renderer.setSize(rect.width, rect.height)
    camera.aspect = rect.width / rect.height
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize); ro.observe(container); resize()

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  function onMove(e){
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const hit = raycaster.intersectObjects(compMeshes)[0]
    if (hit){
      tooltip.classList.remove('hidden')
      tooltip.textContent = `${hit.object.userData.id} — ${hit.object.userData.label}`
      tooltip.style.left = e.clientX + 12 + 'px'
      tooltip.style.top = e.clientY + 12 + 'px'
    } else tooltip.classList.add('hidden')
  }
  renderer.domElement.addEventListener('mousemove', onMove)

  function animate(){ requestAnimationFrame(animate); renderer.render(scene, camera) }
  animate()

  return win
}
