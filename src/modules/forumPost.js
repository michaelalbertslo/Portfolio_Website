import { makeWindow } from '../os/windowManager.js'
export function createForumPost(entry){
  const el = document.createElement('div')
  el.className = 'space-y-2'
  el.innerHTML = `
    <div class="forum-card">
      <div class="text-xs text-gray-500">${entry.date || ''} ${entry.location ? '• ' + entry.location : ''}</div>
      <h2 class="text-xl font-semibold mb-2">${entry.title}</h2>
      <p class="text-sm leading-relaxed whitespace-pre-wrap">${entry.description}</p>
    </div>
  `
  return makeWindow({ title: entry.title, body: el, width: 720, height: 520 })
}
