import { makeWindow } from '../os/windowManager.js'

export function createAboutMe(data){
  const el = document.createElement('div')
  el.className = 'h-full'
  
  // Profile image path - defaults to placeholder if not provided
  const profileImg = data.profileImage || '/profile.png'
  
  el.innerHTML = `
    <div class="flex gap-6 h-full">
      <!-- Left side: Profile Image & Quick Info -->
      <div class="flex flex-col items-center" style="min-width: 180px;">
        <!-- Profile Image Container -->
        <div style="
          width: 160px;
          height: 160px;
          border: 3px solid rgba(100, 140, 190, 0.5);
          border-radius: 8px;
          overflow: hidden;
          background: linear-gradient(135deg, #e8f0f8 0%, #c8d8e8 100%);
          box-shadow: 
            inset 0 2px 4px rgba(0,0,0,0.1),
            0 4px 12px rgba(0,0,0,0.15);
        ">
          <img 
            src="${profileImg}" 
            alt="Profile" 
            style="width: 100%; height: 100%; object-fit: cover;"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#666;font-size:12px;text-align:center;padding:20px;\\'>Add profile.png<br>to public/</div>'"
          />
        </div>
        
        <!-- Name & Title -->
        <div class="mt-4 text-center">
          <h2 style="font-size: 18px; font-weight: 600; color: #1a365d;">${data.name}</h2>
          ${data.title ? `<p style="font-size: 13px; color: #4a5568; margin-top: 4px;">${data.title}</p>` : ''}
          ${data.subtitle ? `<p style="font-size: 12px; color: #718096;">${data.subtitle}</p>` : ''}
        </div>
        
        <!-- Quick Links -->
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          ${data.links.map(l => `
            <a 
              href="${l.href}" 
              target="_blank" 
              class="badge underline"
              style="font-size: 11px;"
            >${l.label}</a>
          `).join('')}
        </div>
      </div>
      
      <!-- Right side: About & Skills -->
      <div class="flex-1 overflow-auto pr-2">
        <!-- About Me Section -->
        <div class="forum-card mb-4">
          <h3 style="
            font-size: 15px;
            font-weight: 600;
            color: #2d3748;
            border-bottom: 1px solid rgba(100, 140, 190, 0.3);
            padding-bottom: 8px;
            margin-bottom: 12px;
          ">About Me</h3>
          <p style="
            font-size: 13px;
            line-height: 1.6;
            color: #4a5568;
            white-space: pre-wrap;
          ">${data.about}</p>
        </div>
        
        <!-- Skills Section -->
        <div class="forum-card">
          <h3 style="
            font-size: 15px;
            font-weight: 600;
            color: #2d3748;
            border-bottom: 1px solid rgba(100, 140, 190, 0.3);
            padding-bottom: 8px;
            margin-bottom: 12px;
          ">Skills</h3>
          <div class="flex flex-wrap gap-2">
            ${data.skills.map(s => `<span class="badge">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `
  return makeWindow({ title: 'AboutMe.exe', body: el, width: 680, height: 420 })
}
