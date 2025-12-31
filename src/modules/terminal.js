import { makeWindow } from '../os/windowManager.js'

const PROMPT_PREFIX = 'guest@desktop-micha MINGW64'

export function createTerminal() {
  const container = document.createElement('div')
  container.className = 'terminal-shell'
  container.innerHTML = `
    <div class="terminal-header"></div>
    <div class="terminal-output" aria-live="polite"></div>
    <input class="terminal-input-hidden" aria-label="Terminal input" />
  `

  const outputEl = container.querySelector('.terminal-output')
  const inputEl = container.querySelector('.terminal-input-hidden')
  const headerEl = container.querySelector('.terminal-header')

  let buffer = ''
  let promptLine = null
  let runningProcess = null
  let currentPath = '/'
  let fsTree = null

  function normalizePath(p) {
    if (!p) return '/'
    if (!p.startsWith('/')) p = '/' + p
    p = p.replace(/\/+/g, '/')
    if (p === '/.') p = '/'
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
    return p
  }

  function displayPath() {
    return currentPath === '/' ? '~' : currentPath
  }

  function promptText() {
    return `${PROMPT_PREFIX} ${displayPath()} (main)`
  }

  // basic placeholder command handling; future commands can hook here
  function writeLine(text = '') {
    const line = document.createElement('div')
    line.textContent = text
    outputEl.appendChild(line)
    outputEl.scrollTop = outputEl.scrollHeight
  }

  function renderPrompt() {
    if (promptLine) {
      promptLine.remove()
    }
    promptLine = document.createElement('div')
    promptLine.innerHTML = `<span class="terminal-prompt">${promptText()}</span> $ <span class="terminal-buffer">${buffer}</span>`
    outputEl.appendChild(promptLine)
    outputEl.scrollTop = outputEl.scrollHeight
    headerEl.textContent = promptText()
  }

  function handleCommand(cmd) {
    const trimmed = cmd
    if (promptLine) {
      promptLine.innerHTML = `<span class="terminal-prompt">${promptText()}</span> $ ${trimmed}`
      promptLine = null
    }
    runCommand(trimmed.trim())
  }

  container.addEventListener('click', () => inputEl.focus())

  function completeBuffer() {
    const cmds = ['help', 'ls', 'cd', 'cat', 'yes', 'strfry', 'fortune']
    const tokens = parseArgs(buffer)
    const endsWithSpace = /\s$/.test(buffer)

    if (tokens.length === 0) {
      writeLine(cmds.join('  '))
      writeLine('')
      renderPrompt()
      return
    }

    const completingCommand = tokens.length === 1 && !endsWithSpace
    let partial = endsWithSpace ? '' : tokens[tokens.length - 1]

    if (completingCommand) {
      const matches = cmds.filter(c => c.startsWith(partial))
      if (matches.length === 1) {
        buffer = matches[0] + ' '
        renderPrompt()
      } else if (matches.length > 1) {
        writeLine(matches.join('  '))
        writeLine('')
        renderPrompt()
      }
      return
    }

    const dirToken = endsWithSpace ? '' : partial
    let dirPath = currentPath
    let leaf = dirToken
    const lastSlash = dirToken.lastIndexOf('/')
    if (lastSlash >= 0) {
      dirPath = dirToken.slice(0, lastSlash) || '/'
      leaf = dirToken.slice(lastSlash + 1)
    }

    const { node } = resolvePath(dirPath || '/')
    const entries = listChildren(node).map(name => name.endsWith('/') ? name.slice(0, -1) : name)
    const matches = entries.filter(n => n.startsWith(leaf))

    if (matches.length === 1) {
      const completion = matches[0]
      const fullPath =
        (dirPath && dirPath !== '/' ? dirPath + '/' : '') +
        completion
      const needsQuote = /\s/.test(fullPath)
      const completed = needsQuote ? `"${fullPath}"` : fullPath
      const newTokens = [...tokens]
      if (!endsWithSpace) newTokens.pop()
      newTokens.push(completed)
      const child = node?.children?.[completion] || node?.children?.[`${completion}/`] || null
      buffer = newTokens.join(' ') + (child?.type === 'folder' ? '/' : ' ')
      renderPrompt()
    } else if (matches.length > 1) {
      writeLine(matches.join('  '))
      writeLine('')
      renderPrompt()
    }
  }

  function stopProcess() {
    if (runningProcess && typeof runningProcess.stop === 'function') {
      runningProcess.stop()
    }
    runningProcess = null
  }

  function parseArgs(line) {
    const args = []
    let current = ''
    let quote = null
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if ((ch === '"' || ch === "'")) {
        if (quote === ch) {
          quote = null
        } else if (!quote) {
          quote = ch
        } else {
          current += ch
        }
        continue
      }
      if (!quote && (ch === ' ' || ch === '\t')) {
        if (current.length) {
          args.push(current)
          current = ''
        }
        continue
      }
      current += ch
    }
    if (current.length) args.push(current)
    return args
  }

  async function runCommand(raw) {
    if (!raw) {
      buffer = ''
      renderPrompt()
      return
    }
    const [cmd, ...args] = parseArgs(raw)
    const handlers = {
      help,
      yes,
      ls,
      cat,
      strfry,
      fortune,
      cd
    }
    const fn = handlers[cmd]
    if (fn) {
      await fn(args)
    } else {
      writeLine(`${cmd}: command not found`)
    }
    buffer = ''
    renderPrompt()
  }

  function help() {
    writeLine('Available commands:')
    writeLine('  help                   - show this help')
    writeLine('  ls [path]              - list directories (simple view)')
    writeLine('  cd <path>              - change directory (limited virtual dirs)')
    writeLine('  cat <path>             - print file contents')
    writeLine('  yes                    - print y repeatedly (Ctrl+C to stop)')
    writeLine('  strfry <word>          - shuffle letters')
    writeLine('  fortune                - print a random fortune')
    writeLine('')
  }

  function resolvePath(pathArg) {
    let target = pathArg
    if (target === undefined || target === null || target === '' || target === '.') {
      target = currentPath
    } else if (target === '~') {
      target = '/'
    }
    const full = target.startsWith('/') ? normalizePath(target) : normalizePath(`${currentPath}/${target}`)
    const parts = full.split('/').filter(Boolean)
    let node = getFsRoot()
    for (const part of parts) {
      if (!node || node.type !== 'folder' || !node.children?.[part]) return { node: null, full }
      node = node.children[part]
    }
    return { node, full }
  }

  function listChildren(folder) {
    if (!folder || folder.type !== 'folder') return []
    return Object.entries(folder.children || {}).map(([name, child]) =>
      child.type === 'folder' ? `${name}/` : name
    )
  }

  function ls(args) {
    const targetPath = args[0] ? args[0] : '.'
    const { node, full } = resolvePath(targetPath)
    if (!node || node.type !== 'folder') {
      writeLine(`ls: cannot access '${targetPath}': No such file or directory`)
    } else {
      const entries = listChildren(node)
      writeLine(entries.join('  '))
    }
    writeLine('')
  }

  async function cat(args) {
    if (!args.length) {
      writeLine('cat: missing file operand')
      writeLine('')
      return
    }
    const rawPath = args[0]
    const { node, full } = resolvePath(rawPath)
    if (!node) {
      writeLine(`cat: ${rawPath}: No such file or directory`)
      writeLine('')
      return
    }
    if (node.type === 'folder') {
      writeLine(`cat: ${rawPath}: Is a directory`)
      writeLine('')
      return
    }
    // launch appropriate viewer
    openNode(node, full)
    writeLine('')
  }

  function strfry(args) {
    if (!args.length) {
      writeLine('strfry: missing operand')
      writeLine('')
      return
    }
    const word = args[0]
    const arr = word.split('')
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    writeLine(arr.join(''))
    writeLine('')
  }

  async function fortune() {
    try {
      const res = await fetch('/documents/fortunes.txt')
      if (!res.ok) throw new Error('missing fortune file')
      const text = await res.text()
      const fortunes = text.split('%').map(s => s.trim()).filter(Boolean)
      if (!fortunes.length) throw new Error('no fortunes')
      const pick = fortunes[Math.floor(Math.random() * fortunes.length)]
      writeLine(pick)
    } catch (err) {
      writeLine('fortune: could not load fortunes')
    }
    writeLine('')
  }

  function cd(args) {
    const dest = args[0]
    if (!dest || dest === '~') {
      currentPath = '/'
      writeLine('')
      renderPrompt()
      return
    }
    if (dest === '..') {
      if (currentPath !== '/') {
        const parts = currentPath.split('/').filter(Boolean)
        parts.pop()
        currentPath = parts.length ? '/' + parts.join('/') : '/'
      }
      writeLine('')
      renderPrompt()
      return
    }
    const { node, full } = resolvePath(dest)
    if (node && node.type === 'folder') {
      currentPath = full
      writeLine('')
    } else {
      writeLine(`cd: no such file or directory: ${dest}`)
      writeLine('')
    }
    renderPrompt()
  }

  function yes() {
    stopProcess()
    let count = 0
    const interval = setInterval(() => {
      writeLine('y')
      count += 1
      if (count >= 100) {
        stopProcess()
      }
    }, 10)
    runningProcess = {
      stop: () => {
        clearInterval(interval)
        runningProcess = null
      }
    }
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      writeLine('^C')
      stopProcess()
      buffer = ''
      renderPrompt()
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      completeBuffer()
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(buffer)
      return
    }
    if (e.key === 'Backspace') {
      e.preventDefault()
      buffer = buffer.slice(0, -1)
      renderPrompt()
      return
    }
    if (e.key.length === 1) {
      e.preventDefault()
      buffer += e.key
      renderPrompt()
      return
    }
  })

  // initial greeting
  writeLine('Welcome to mwaOS shell.')
  writeLine('Type commands and press Enter.')
  writeLine('')
  loadFs().then(tree => {
    fsTree = tree || getFsRoot()
  }).finally(() => {
    fsTree = fsTree || getFsRoot()
    renderPrompt()
    inputEl.focus()
  })

  return makeWindow({
    title: 'Terminal',
    body: container,
    width: 720,
    height: 420,
    icon: `<svg viewBox="0 0 32 32" class="w-8 h-8">
      <rect x="2" y="4" width="28" height="24" rx="3" fill="#0f172a" stroke="#8ec8ff" stroke-width="2"/>
      <path d="M8 10l5 6-5 6" stroke="#7ed957" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 22h7" stroke="#8ec8ff" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  })
}

async function loadFs() {
  try {
    const res = await fetch('/content/items.json')
    if (!res.ok) throw new Error('fs load failed')
    const data = await res.json()
    // wrap root as folder
    const root = { type: 'folder', children: data }
    // attach to active terminal instance(s) by mutation
    // since this module only exports createTerminal, we store on window for reuse
    window.__mwaFsTree = root
    return root
  } catch (e) {
    console.error('terminal fs load error', e)
    return null
  }
}

function getFsRoot() {
  return window.__mwaFsTree || fsTree || { type: 'folder', children: {} }
}

function nodeTypeIsFile(node) {
  return node && node.type && node.type !== 'folder'
}

function launchWindowForNode(node, fullPath) {
  const wm = window.wm
  if (!wm) return

  const title = fullPath.split('/').filter(Boolean).pop() || 'File'

  const openers = {
    pdf: async () => {
      const mod = await import('../modules/pdfViewer.js')
      wm.openWindow(mod.createPdfViewer({ title, src: node.src }))
    },
    text: async () => {
      const mod = await import('../modules/articleViewer.js')
      wm.openWindow(mod.createArticleViewer({ title, content: node.content, images: node.images || [] }))
    },
    gallery: async () => {
      const mod = await import('../modules/galleryViewer.js')
      wm.openWindow(mod.createGalleryViewer({ title, imagePath: node.imagePath }))
    },
    hardware: async () => {
      const mod = await import('../modules/circuitViewer.js')
      wm.openWindow(mod.createCircuitViewer({ title, graph: node.graph }))
    },
    software: async () => {
      const mod = await import('../modules/softwareVisualizer.js')
      wm.openWindow(mod.createSoftwareVisualizer({ title, graph: node.graph }))
    },
    links: async () => {
      if (node.links?.[0]?.href) window.open(node.links[0].href, '_blank')
    }
  }

  const opener = openers[node.type]
  if (opener) {
    opener()
  } else if (node.src) {
    window.open(node.src, '_blank')
  }
}

function openNode(node, fullPath) {
  if (!nodeTypeIsFile(node)) return
  launchWindowForNode(node, fullPath)
}

