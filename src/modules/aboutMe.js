import { makeWindow } from '../os/windowManager.js'

export function createAboutMe(data){
  const el = document.createElement('div')
  el.className = 'h-full about-view'
  
  // Profile image path - defaults to placeholder if not provided
  const profileImg = data.profileImage || '/profile.png'
  
  el.innerHTML = `
    <div class="flex gap-6 h-full about-layout">
      <!-- Left side: Profile Image & Quick Info -->
      <div class="flex flex-col items-center about-sidebar">
        <!-- Profile Image Container -->
        <div class="about-avatar">
          <img 
            src="${profileImg}" 
            alt="Profile" 
            class="about-avatar__img"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'about-avatar__placeholder\\'>Add profile.png<br>to public/</div>'"
          />
        </div>
        
        <!-- Name & Title -->
        <div class="mt-4 text-center about-identity">
          <h2 class="about-name">${data.name}</h2>
          ${data.title ? `<p class="about-title">${data.title}</p>` : ''}
          ${data.subtitle ? `<p class="about-subtitle">${data.subtitle}</p>` : ''}
        </div>
        
        <!-- Quick Links -->
        <div class="mt-4 flex flex-wrap justify-center gap-2 about-links">
          ${data.links.map(l => `
            <a 
              href="${l.href}" 
              target="_blank" 
              class="badge underline about-link-badge"
            >${l.label}</a>
          `).join('')}
        </div>
      </div>
      
      <!-- Right side: About & Skills -->
      <div class="flex-1 overflow-auto pr-2 about-content">
        <!-- About Me Section -->
        <div class="forum-card mb-4 about-card">
          <h3>About Me</h3>
          <p class="about-text">${data.about}</p>
        </div>
        
        <!-- Skills Section -->
        <div class="forum-card about-card">
          <h3>Skills</h3>
          <div class="flex flex-wrap gap-2 about-skills">
            ${data.skills.map(s => `<span class="badge">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `
  return makeWindow({ title: 'AboutMe.exe', body: el, width: 680, height: 420 })
}
