import { makeWindow } from '../os/windowManager.js'

export function createHelpViewer() {
  const container = document.createElement('div')
  container.className = 'help-container'
  
  container.innerHTML = `
    <div style="
      height: 100%;
      overflow-y: auto;
      background: linear-gradient(180deg, #f0f4f8 0%, #e8ecf0 100%);
      font-family: 'Segoe UI', Tahoma, sans-serif;
    ">
      <!-- Header -->
      <div style="
        background: linear-gradient(180deg, #4a90d9 0%, #2d6ba3 100%);
        padding: 20px 24px;
        color: white;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      ">
        <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Welcome to mwaOS</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 13px;">A retro-inspired portfolio experience</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 20px 24px;">
        
        <!-- Navigation Section -->
        <div style="
          background: white;
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        ">
          <h2 style="margin: 0 0 12px 0; font-size: 15px; color: #2d6ba3; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Basic Navigation
          </h2>
          <ul style="margin: 0; padding-left: 24px; color: #444; font-size: 13px; line-height: 1.8;">
            <li><strong>Double-click</strong> desktop icons to open folders and programs</li>
            <li><strong>Drag</strong> window title bars to move windows around</li>
            <li><strong>Click</strong> the Start button for quick access menu</li>
            <li><strong>Click</strong> taskbar items to switch between open windows</li>
          </ul>
        </div>
        
        <!-- Folders Section -->
        <div style="
          background: white;
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        ">
          <h2 style="margin: 0 0 12px 0; font-size: 15px; color: #2d6ba3; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Desktop Folders
          </h2>
          <ul style="margin: 0; padding-left: 24px; color: #444; font-size: 13px; line-height: 1.8;">
            <li><strong>Projects</strong> — Engineering and coding projects</li>
            <li><strong>Work Experience</strong> — Professional experience and internships</li>
            <li><strong>Involvement</strong> — Community service and extracurriculars</li>
            <li><strong>Photography</strong> — Circuit bent camera galleries</li>
          </ul>
        </div>
        
        <!-- File Types Section -->
        <div style="
          background: white;
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        ">
          <h2 style="margin: 0 0 12px 0; font-size: 15px; color: #2d6ba3; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> File Types
          </h2>
          <ul style="margin: 0; padding-left: 24px; color: #444; font-size: 13px; line-height: 1.8;">
            <li><strong>README</strong> — Project overviews and descriptions</li>
            <li><strong>.sch files</strong> — Hardware diagrams (interactive!)</li>
            <li><strong>.flow files</strong> — Software architecture visualizations</li>
            <li><strong>.pdf files</strong> — Detailed reports and documents</li>
            <li><strong>.url files</strong> — External links (opens in new tab)</li>
            <li><strong>Galleries</strong> — Photo collections from various cameras</li>
          </ul>
        </div>
        
        <!-- Programs Section -->
        <div style="
          background: white;
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        ">
          <h2 style="margin: 0 0 12px 0; font-size: 15px; color: #2d6ba3; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Programs
          </h2>
          <ul style="margin: 0; padding-left: 24px; color: #444; font-size: 13px; line-height: 1.8;">
            <li><strong>AboutMe.exe</strong> — Learn more about me and my background</li>
            <li><strong>Battle.exe</strong> — A fun mini-game to pass the time</li>
            <li><strong>Help.exe</strong> — You're reading it right now!</li>
          </ul>
        </div>
        
        <!-- Tips Section -->
        <div style="
          background: linear-gradient(135deg, #e8f4fd 0%, #d4e8f7 100%);
          border-radius: 6px;
          padding: 16px 20px;
          border-left: 4px solid #4a90d9;
        ">
          <h2 style="margin: 0 0 10px 0; font-size: 15px; color: #2d6ba3; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Pro Tips
          </h2>
          <ul style="margin: 0; padding-left: 24px; color: #444; font-size: 13px; line-height: 1.8;">
            <li>Use the <strong>Back</strong> button in file explorer to navigate up</li>
            <li>Click the <strong>breadcrumb path</strong> to jump to any folder level</li>
            <li>Try <strong>Change Wallpaper</strong> in the Start menu!</li>
            <li>In galleries, use <strong>arrow keys</strong> to navigate photos</li>
          </ul>
        </div>
        
      </div>
    </div>
  `
  
  const icon = `<svg viewBox="0 0 32 32" class="w-8 h-8">
    <circle cx="16" cy="16" r="14" fill="#4a90d9" stroke="#2d6ba3" stroke-width="1"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Georgia, serif">?</text>
  </svg>`
  
  return makeWindow({
    title: 'Help',
    body: container,
    width: 480,
    height: 520,
    icon
  })
}

