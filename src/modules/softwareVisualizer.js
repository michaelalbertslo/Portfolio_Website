import { makeWindow } from '../os/windowManager.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createSoftwareVisualizer(entry){
  const container = document.createElement('div')
  container.className = 'w-full h-full bg-[#0b1020] relative'

  const info = document.createElement('div')
  info.className = 'absolute left-2 top-2 bg-white/90 text-xs p-2 rounded border'
  info.textContent = 'Drag nodes • Scroll to zoom • Click a node for details'
  container.appendChild(info)

  const detail = document.createElement('div')
  detail.className = 'absolute right-2 top-2 bg-white/95 text-xs p-2 rounded border w-56 h-32 overflow-auto'
  detail.textContent = entry.description || ''
  container.appendChild(detail)

  const win = makeWindow({ title: entry.title + ' — Software Visualizer', body: container, width: 820, height: 560 })

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0b1020)
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
  camera.position.set(0, 8, 14)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(devicePixelRatio)
  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.7))
  const dir = new THREE.DirectionalLight(0xffffff, 0.5)
  dir.position.set(5, 10, 7); scene.add(dir)

  const nodes = (entry.graph && entry.graph.nodes?.length) ? entry.graph.nodes : [
    { id: 'UI', label: 'UI' }, { id: 'API', label: 'API' },
    { id: 'DB', label: 'Database' }, { id: 'Worker', label: 'Worker' }, { id: 'Auth', label: 'Auth' }
  ]
  const edges = (entry.graph && entry.graph.edges?.length) ? entry.graph.edges : [
    ['UI','API'], ['API','DB'], ['API','Worker'], ['UI','Auth'], ['Auth','DB']
  ]

  const R = 5
  nodes.forEach((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2
    n.x = Math.cos(angle) * R; n.y = 0; n.z = Math.sin(angle) * R
  })

  const nodeMeshes = []
  const textSprites = []

  const sphereGeo = new THREE.SphereGeometry(0.5, 24, 24)
  nodes.forEach(n => {
    const mesh = new THREE.Mesh(sphereGeo, new THREE.MeshPhongMaterial({ color: 0x3399ff }))
    mesh.position.set(n.x, n.y, n.z); mesh.userData = n; scene.add(mesh); nodeMeshes.push(mesh)
    const sprite = makeTextSprite(n.label); sprite.position.set(n.x, n.y + 0.9, n.z); scene.add(sprite); textSprites.push(sprite)
  })

  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff })
  const edgeLines = edges.map(([a,b]) => {
    const A = nodeMeshes.find(m => m.userData.id === a)
    const B = nodeMeshes.find(m => m.userData.id === b)
    const geo = new THREE.BufferGeometry().setFromPoints([A.position, B.position])
    const line = new THREE.Line(geo, lineMat); scene.add(line); return line
  })

  function makeTextSprite(text){
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d')
    ctx.font = '16px Tahoma'; const width = ctx.measureText(text).width + 10
    canvas.width = width; canvas.height = 22; ctx.font = '16px Tahoma'
    ctx.fillStyle = 'white'; ctx.strokeStyle = 'black'; ctx.lineWidth = 4
    ctx.strokeText(text, 5, 16); ctx.fillText(text, 5, 16)
    const texture = new THREE.CanvasTexture(canvas)
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true })
    const sprite = new THREE.Sprite(mat); sprite.scale.set(canvas.width/30, canvas.height/30, 1); return sprite
  }

  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2()
  function onClick(e){
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    ray.setFromCamera(mouse, camera)
    const hit = ray.intersectObjects(nodeMeshes)[0]
    if (hit){ const n = hit.object.userData; detail.innerHTML = `<div class="font-semibold mb-1">${n.label}</div><div>ID: ${n.id}</div>` }
  }
  renderer.domElement.addEventListener('click', onClick)

  function resize(){ const rect = container.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); camera.aspect = rect.width/rect.height; camera.updateProjectionMatrix() }
  const ro = new ResizeObserver(resize); ro.observe(container); resize()

  function animate(){
    requestAnimationFrame(animate)
    nodeMeshes.forEach((m,i) => { m.position.y = Math.sin(performance.now()/1000 + i) * 0.1 })
    textSprites.forEach((s,i) => { s.position.y = 0.9 + Math.sin(performance.now()/1000 + i) * 0.1 })
    edgeLines.forEach((line, i) => {
      const [a,b] = edges[i]
      const A = nodeMeshes.find(m => m.userData.id === a).position
      const B = nodeMeshes.find(m => m.userData.id === b).position
      line.geometry.setFromPoints([A, B])
    })
    renderer.render(scene, camera)
  }
  animate()

  return win
}
