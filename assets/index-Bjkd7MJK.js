const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/circuitViewer-CjOeRHjr.js","assets/OrbitControls-hv_4xcvx.js","assets/softwareVisualizer-8YnuHtBs.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))r(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(c){if(c.ep)return;c.ep=!0;const l=n(c);fetch(c.href,l)}})();const it="modulepreload",nt=function(t){return"/"+t},Ee={},W=function(e,n,r){let c=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),g=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));c=Promise.allSettled(n.map(p=>{if(p=nt(p),p in Ee)return;Ee[p]=!0;const x=p.endsWith(".css"),h=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${h}`))return;const y=document.createElement("link");if(y.rel=x?"stylesheet":it,x||(y.as="script"),y.crossOrigin="",y.href=p,g&&y.setAttribute("nonce",g),document.head.appendChild(y),x)return new Promise((S,B)=>{y.addEventListener("load",S),y.addEventListener("error",()=>B(new Error(`Unable to preload CSS for ${p}`)))})}))}function l(s){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=s,window.dispatchEvent(g),!g.defaultPrevented)throw s}return c.then(s=>{for(const g of s||[])g.status==="rejected"&&l(g.reason);return e().catch(l)})};let Ie=10,ot=1;class rt{constructor(e){this.layer=e,this.windows=new Map,this.onTaskbarUpdate=null}openWindow(e){const n="win-"+ot++;e.dataset.id=n,e.style.left=100+Math.random()*200+"px",e.style.top=60+Math.random()*120+"px",e.style.zIndex=++Ie,this.layer.appendChild(e),this.windows.set(n,{el:e,title:e.querySelector(".title").textContent,active:!0}),this._bindWindow(e),this._updateTaskbar()}_bindWindow(e){const n=e.querySelector(".win-titlebar"),r=e.querySelector("[data-act=close]"),c=e.querySelector("[data-act=min]"),l=e.querySelector("[data-act=max]");[r,c,l].forEach(h=>h==null?void 0:h.addEventListener("pointerdown",y=>y.stopPropagation()));let s=!1,g=0,p=0,x=null;n.addEventListener("pointerdown",h=>{if(h.target&&h.target.closest&&h.target.closest(".win-actions")||h.button!==0)return;s=!0,x=h.pointerId;const y=e.getBoundingClientRect();g=h.clientX-y.left,p=h.clientY-y.top,e.setPointerCapture(h.pointerId),this.focus(e.dataset.id)}),e.addEventListener("pointermove",h=>{if(!s||h.pointerId!==x)return;const y=h.clientX-g,S=h.clientY-p;e.style.left=y+"px",e.style.top=Math.max(4,S)+"px"}),e.addEventListener("pointerup",h=>{h.pointerId===x&&(s=!1,x=null,e.hasPointerCapture(h.pointerId)&&e.releasePointerCapture(h.pointerId))}),e.addEventListener("pointercancel",h=>{h.pointerId===x&&(s=!1,x=null)}),e.addEventListener("lostpointercapture",()=>{s=!1,x=null}),r==null||r.addEventListener("click",()=>this.close(e.dataset.id)),c==null||c.addEventListener("click",()=>this.minimize(e.dataset.id)),l==null||l.addEventListener("click",()=>this.toggleMaximize(e.dataset.id)),e.addEventListener("mousedown",()=>this.focus(e.dataset.id))}focus(e){const n=this.windows.get(e);n&&(n.el.style.display==="none"&&(n.el.style.display=""),n.el.style.zIndex=++Ie,this.windows.forEach((r,c)=>r.active=c===e),this._updateTaskbar())}close(e){const n=this.windows.get(e);n&&(n.el.remove(),this.windows.delete(e),this._updateTaskbar())}closeAll(){this.windows.forEach(e=>e.el.remove()),this.windows.clear(),this._updateTaskbar()}minimize(e){const n=this.windows.get(e);n&&(n.el.style.display="none",n.active=!1,this._updateTaskbar())}toggleMaximize(e){const n=this.windows.get(e);if(!n)return;const r=n.el;if(r.classList.contains("maxim"))r.classList.remove("maxim"),r.style.left=r.dataset.prevLeft,r.style.top=r.dataset.prevTop,r.style.width=r.dataset.prevWidth,r.style.height=r.dataset.prevHeight;else{const c=r.getBoundingClientRect();r.dataset.prevLeft=r.style.left,r.dataset.prevTop=r.style.top,r.dataset.prevWidth=r.style.width||c.width+"px",r.dataset.prevHeight=r.style.height||c.height+"px",r.style.left="10px",r.style.top="10px",r.style.width="calc(100vw - 20px)",r.style.height="calc(100vh - 60px)",r.classList.add("maxim")}}_updateTaskbar(){if(!this.onTaskbarUpdate)return;const e=[];this.windows.forEach((n,r)=>e.push({id:r,title:n.title,active:n.active,minimized:n.el.style.display==="none"})),this.onTaskbarUpdate(e)}}function ne({title:t,body:e,width:n=600,height:r=420,icon:c}){const l=document.createElement("div");l.className="win absolute",l.style.width=n+"px",l.style.height=r+"px";const s=c||`
    <svg width="16" height="16" viewBox="0 0 16 16" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="url(#iconGrad)"/>
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5a9fd4"/>
          <stop offset="100%" stop-color="#2d6ba3"/>
        </linearGradient>
      </defs>
    </svg>
  `;return l.innerHTML=`
    <div class="win-titlebar">
      <div class="title" style="display: flex; align-items: center; gap: 8px;">
        ${s}
        <span>${t}</span>
      </div>
      <div class="win-actions">
        <button title="Minimize" data-act="min">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="1" y="7" width="8" height="2" fill="currentColor"/>
          </svg>
        </button>
        <button title="Maximize" data-act="max">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
        <button title="Close" data-act="close">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="win-body overflow-auto" style="height: calc(100% - 32px);">${typeof e=="string"?e:""}</div>
  `,typeof e!="string"&&e instanceof HTMLElement&&l.querySelector(".win-body").appendChild(e),l}const _={folder:'<img src="/icons/folder.png" class="w-8 h-8" alt="folder"/>',text:'<img src="/icons/file.png" class="w-8 h-8" alt="file"/>',hardware:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="6" width="28" height="20" rx="2" fill="#1a5f2a" stroke="#0d3d18" stroke-width="1"/>
    <rect x="6" y="10" width="8" height="6" fill="#333"/>
    <circle cx="22" cy="13" r="3" fill="none" stroke="#4ade80" stroke-width="1.5"/>
    <path d="M6 20h6M14 20h4M20 20h6" stroke="#4ade80" stroke-width="1"/>
    <rect x="8" y="11" width="4" height="4" fill="#666"/>
  </svg>`,software:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#1e3a5f" stroke="#0d1f33" stroke-width="1"/>
    <rect x="4" y="6" width="24" height="3" fill="#2d5a87"/>
    <circle cx="7" cy="7.5" r="1" fill="#ff6b6b"/>
    <circle cx="10" cy="7.5" r="1" fill="#ffd93d"/>
    <circle cx="13" cy="7.5" r="1" fill="#4ade80"/>
    <path d="M8 14l4 4-4 4M14 22h8" stroke="#7ec8e3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,links:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <circle cx="16" cy="16" r="12" fill="#4a90d9" stroke="#2d6ba3" stroke-width="1"/>
    <path d="M10 16h12M16 10v12" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="16" r="6" fill="none" stroke="white" stroke-width="1.5"/>
  </svg>`,image:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#5090c0" stroke="#2d6090" stroke-width="1"/>
    <circle cx="10" cy="12" r="3" fill="#ffd93d"/>
    <path d="M4 24l8-8 4 4 8-10 4 6v8H4z" fill="#4ade80"/>
  </svg>`,camera:'<img src="/icons/camera.png" class="w-8 h-8" alt="camera"/>',pdf:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="4" y="2" width="24" height="28" rx="2" fill="#e74c3c" stroke="#c0392b" stroke-width="1"/>
    <rect x="7" y="5" width="18" height="4" fill="rgba(255,255,255,0.3)"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="Arial">PDF</text>
  </svg>`,back:`<svg viewBox="0 0 32 32" class="w-6 h-6">
    <path d="M20 8l-8 8 8 8" stroke="#666" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`};function Le(t,e){return t.type==="folder"?_.folder:t.type==="hardware"||e.endsWith(".sch")?_.hardware:t.type==="software"||e.endsWith(".flow")?_.software:t.type==="links"||e.endsWith(".url")?_.links:t.type==="pdf"||e.endsWith(".pdf")?_.pdf:t.type==="image"||/\.(jpg|png|gif|webp)$/i.test(e)?_.image:t.type==="gallery"?_.camera:_.text}function F(t){return t.endsWith(".txt")?t.replace(".txt",""):t}function st(t,e){return t.type==="folder"?"File Folder":t.type==="hardware"||e.endsWith(".sch")?"Hardware Schematic":t.type==="software"||e.endsWith(".flow")?"Software Flowchart":t.type==="links"||e.endsWith(".url")?"Internet Shortcut":t.type==="pdf"||e.endsWith(".pdf")?"PDF Document":t.type==="image"?"Image File":t.type==="gallery"?"Photo Gallery":t.type==="text"||e.endsWith(".txt")?"Text Document":"File"}function at({title:t,rootData:e,onOpenHardware:n,onOpenSoftware:r,onOpenText:c,onOpenPdf:l,onOpenGallery:s}){const g=document.createElement("div");g.className="h-full flex flex-col file-explorer";let p=[],x=e;function h(u){let i=e;for(const f of u)i.children&&i.children[f]&&(i=i.children[f]);return i}function y(){x=h(p);const u=x.children||{},i=Object.entries(u);g.innerHTML=`
      <!-- Toolbar -->
      <div style="
        background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
        border-bottom: 1px solid #ccc;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        <button class="nav-back" style="
          padding: 4px 8px;
          border: 1px solid #aaa;
          border-radius: 3px;
          background: linear-gradient(180deg, #fff 0%, #e8e8e8 100%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        " ${p.length===0?'disabled style="opacity: 0.5; cursor: default;"':""}>
          ${_.back} Back
        </button>
        <div style="width: 1px; height: 20px; background: #ccc;"></div>
        <div style="flex: 1; font-size: 12px; color: #666;">
          ${i.length} item(s)
        </div>
      </div>
      
      <!-- Address Bar -->
      <div style="
        background: white;
        border-bottom: 1px solid #ccc;
        padding: 6px 8px;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <span style="font-size: 12px; color: #666;">Path:</span>
        <div class="breadcrumb" style="
          flex: 1;
          background: white;
          border: 1px solid #ccc;
          border-radius: 2px;
          padding: 4px 8px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span class="crumb" data-path="" style="cursor: pointer; color: #0066cc;">${t}</span>
          ${p.map((f,v)=>`
            <span style="color: #999;">›</span>
            <span class="crumb" data-path="${p.slice(0,v+1).join("/")}" style="cursor: pointer; color: #0066cc;">${f}</span>
          `).join("")}
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div style="flex: 1; display: flex; overflow: hidden;">
        <!-- File List -->
        <div class="file-list" style="
          flex: 1;
          overflow: auto;
          padding: 8px;
          background: white;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          gap: 4px;
        ">
          ${i.map(([f,v])=>`
            <div class="file-item" data-name="${f}" style="
              width: 90px;
              padding: 8px 4px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
              border-radius: 4px;
              cursor: pointer;
              text-align: center;
              border: 1px solid transparent;
            ">
              ${Le(v,f)}
              <span style="
                font-size: 11px;
                word-break: break-word;
                line-height: 1.2;
                max-width: 80px;
              ">${F(f)}</span>
            </div>
          `).join("")}
          ${i.length===0?'<div style="color: #999; font-size: 12px; padding: 20px;">This folder is empty</div>':""}
        </div>
        
        <!-- Details Panel -->
        <div class="details-panel" style="
          width: 240px;
          border-left: 1px solid #ccc;
          background: linear-gradient(180deg, #f0f4f8 0%, #e4e9ed 100%);
          padding: 12px;
          overflow: auto;
        ">
          <div class="details-content" style="font-size: 12px; color: #333;">
            <div style="text-align: center; padding: 20px; color: #888;">
              Select an item to see details
            </div>
          </div>
        </div>
      </div>
    `,S()}function S(){const u=g.querySelector(".nav-back");u&&p.length>0&&u.addEventListener("click",()=>{p.pop(),y()}),g.querySelectorAll(".crumb").forEach(i=>{i.addEventListener("click",()=>{const f=i.dataset.path;p=f?f.split("/"):[],y()})}),g.querySelectorAll(".file-item").forEach(i=>{const f=i.dataset.name,v=x.children[f];i.addEventListener("click",oe=>{g.querySelectorAll(".file-item").forEach(T=>T.classList.remove("selected")),i.classList.add("selected"),B(f,v)}),i.addEventListener("dblclick",()=>{M(f,v)})})}function B(u,i){const f=g.querySelector(".details-content"),v=i.meta||{},oe=F(u);let T=`
      <div style="text-align: center; margin-bottom: 12px;">
        <div style="transform: scale(1.5); display: inline-block; margin-bottom: 8px;">
          ${Le(i,u)}
        </div>
        <div style="font-weight: 600; margin-top: 8px;">${oe}</div>
        <div style="color: #666; font-size: 11px;">${st(i,u)}</div>
      </div>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
    `;if(i.type==="folder"){const A=Object.keys(i.children||{}).length;T+=`
        <div><strong>Contains:</strong> ${A} item(s)</div>
        ${v.date?`<div style="margin-top: 8px;"><strong>Date:</strong> ${v.date}</div>`:""}
        ${v.location?`<div><strong>Location:</strong> ${v.location}</div>`:""}
        ${v.category?`<div><strong>Type:</strong> ${v.category}</div>`:""}
      `}else if(i.type==="text"){const A=Array.isArray(i.content)?i.content.join(`
`):i.content,se=A.substring(0,150)+(A.length>150?"...":"");T+=`
        <div style="
          background: white;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 3px;
          max-height: 120px;
          overflow: hidden;
          white-space: pre-wrap;
          font-size: 11px;
          line-height: 1.4;
          margin-bottom: 12px;
        ">${se}</div>
        <button class="open-text-btn" style="
          width: 100%;
          padding: 8px;
          background: linear-gradient(180deg, #f7f7f7 0%, #e0e0e0 100%);
          color: #333;
          border: 1px solid #999;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        ">Open Document</button>
      `}else i.type==="links"?T+=`
        <div style="margin-top: 8px;">
          ${i.links.map(A=>`
            <a href="${A.href}" target="_blank" style="
              display: block;
              padding: 6px 8px;
              margin-bottom: 4px;
              background: white;
              border: 1px solid #ccc;
              border-radius: 3px;
              color: #0066cc;
              text-decoration: none;
              font-size: 11px;
            ">${A.label} ↗</a>
          `).join("")}
        </div>
      `:i.type==="hardware"||i.type==="software"?T+=`
        <div style="color: #666; margin-bottom: 8px;">
          Double-click to open ${i.type==="hardware"?"3D schematic viewer":"software flowchart"}
        </div>
        <button class="open-viewer-btn" style="
          width: 100%;
          padding: 8px;
          background: linear-gradient(180deg, #4a90d9 0%, #2d6ba3 100%);
          color: white;
          border: 1px solid #1e5080;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        ">Open ${i.type==="hardware"?"Schematic":"Flowchart"}</button>
      `:i.type==="pdf"&&(T+=`
        <div style="color: #666; margin-bottom: 8px;">
          Double-click to open PDF document in viewer
        </div>
        <button class="open-pdf-btn" style="
          width: 100%;
          padding: 8px;
          background: linear-gradient(180deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          border: 1px solid #a93226;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        ">Open PDF</button>
      `);f.innerHTML=T;const re=f.querySelector(".open-viewer-btn");re&&re.addEventListener("click",()=>M(u,i));const $=f.querySelector(".open-pdf-btn");$&&$.addEventListener("click",()=>M(u,i));const U=f.querySelector(".open-text-btn");U&&U.addEventListener("click",()=>M(u,i))}function M(u,i){var f;i.type==="folder"?(p.push(u),y()):i.type==="hardware"&&n?n({title:u.replace(".sch",""),graph:i.graph,path:[...p,u]}):i.type==="software"&&r?r({title:u.replace(".flow",""),graph:i.graph,path:[...p,u]}):i.type==="text"&&c?c({title:F(u),content:i.content,images:i.images||[],path:[...p,u]}):i.type==="pdf"&&l?l({title:F(u),src:i.src,path:[...p,u]}):i.type==="gallery"&&s?s({title:F(u),imagePath:i.imagePath,path:[...p,u],linkMap:i.linkMap||{}}):i.type==="links"&&((f=i.links)!=null&&f[0])&&window.open(i.links[0].href,"_blank")}return y(),ne({title:t,body:g,width:750,height:500,icon:_.folder})}function lt(t){const e=document.createElement("div");e.className="h-full about-view";const n=t.profileImage||"/profile.png";return e.innerHTML=`
    <div class="flex gap-6 h-full about-layout">
      <!-- Left side: Profile Image & Quick Info -->
      <div class="flex flex-col items-center about-sidebar">
        <!-- Profile Image Container -->
        <div class="about-avatar">
          <img 
            src="${n}" 
            alt="Profile" 
            class="about-avatar__img"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'about-avatar__placeholder\\'>Add profile.png<br>to public/</div>'"
          />
        </div>
        
        <!-- Name & Title -->
        <div class="mt-4 text-center about-identity">
          <h2 class="about-name">${t.name}</h2>
          ${t.title?`<p class="about-title">${t.title}</p>`:""}
          ${t.subtitle?`<p class="about-subtitle">${t.subtitle}</p>`:""}
        </div>
        
        <!-- Quick Links -->
        <div class="mt-4 flex flex-wrap justify-center gap-2 about-links">
          ${t.links.map(r=>`
            <a 
              href="${r.href}" 
              target="_blank" 
              class="badge underline about-link-badge"
            >${r.label}</a>
          `).join("")}
        </div>
      </div>
      
      <!-- Right side: About & Skills -->
      <div class="flex-1 overflow-auto pr-2 about-content">
        <!-- About Me Section -->
        <div class="forum-card mb-4 about-card">
          <h3>About Me</h3>
          <p class="about-text">${t.about}</p>
        </div>
        
        <!-- Skills Section -->
        <div class="forum-card about-card">
          <h3>Skills</h3>
          <div class="flex flex-wrap gap-2 about-skills">
            ${t.skills.map(r=>`<span class="badge">${r}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `,ne({title:"AboutMe.exe",body:e,width:680,height:420})}const N=493,R=397,_e={down:["ethan2","ethan2","ethan3"],left:["ethan4","ethan5","ethan6"],up:["ethan7","ethan8","ethan9"],right:["ethan10","ethan11","ethan12"]},Te={down:["ethanrun7","ethanrun8","ethanrun9"],left:["ethanrun4","ethanrun5","ethanrun6"],up:["ethanrun1","ethanrun2","ethanrun3"],right:["ethanrun10","ethanrun11","ethanrun12"]};function Ae(t){return new Promise(e=>{const n=new Image;n.onload=()=>e(n),n.onerror=()=>e(n),n.src=t})}function X(t,e){return t?t[e]||t.down:null}function Ce(t){const e=new Set;return Object.values(t).forEach(n=>n.forEach(r=>e.add(r))),Array.from(e)}function Me(t,e){const n={};return Object.entries(t).forEach(([r,c])=>{n[r]=c.map(l=>e.get(l))}),n}function ct(t={}){const{mode:e="window",onComputerInteract:n=null,initialArea:r="outside",initialSpawn:c=null}=t,l=document.createElement("div");l.style.cssText="height:100%;background:#0b1524;display:flex;flex-direction:column;gap:8px;padding:8px;font-family:Segoe UI";const s=document.createElement("canvas");s.width=N,s.height=R,s.style.width=N*1.5+"px",s.style.height=R*1.5+"px",s.style.border="1px solid rgba(0,0,0,0.35)",s.style.borderRadius="6px",s.style.background="#000",s.style.imageRendering="pixelated";const g=document.createElement("div");g.className="text-xs text-white",g.style.fontSize="12px",g.innerHTML=`
    <div><strong>Controls:</strong> Arrow Keys / WASD to walk • Hold Shift to run</div>
  `;const p=document.createElement("div");p.style.cssText=`
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
  `,p.textContent="Press E, Enter, Space, or click to interact with the computer.",e!=="window"&&(l.style.border="none",l.style.borderRadius="0",l.style.padding="0",l.style.width="auto",l.style.height="auto",l.style.boxSizing="border-box",l.style.alignItems="center"),l.append(s,p,g);let x;e==="window"?x=ne({title:"Battle.exe",body:l,width:N*1.5+80,height:R*1.5+160,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
        <rect x="4" y="4" width="24" height="24" rx="5" fill="#f8c146" stroke="#b46a00" stroke-width="1.2"/>
        <path d="M11 10h10M11 16h10M11 22h5" stroke="#5a2d00" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`}):x=l;const h=s.getContext("2d"),y=new Map;let S=null,B=null,M=null,u=!1;const i={x:N/2,y:R/2+40,width:24,height:30,renderWidth:null,renderHeight:null,direction:"down",frameIndex:1,frameTime:0,walkSpeed:95,runSpeed:160,lastZoneId:null},$={outside:{backgroundSrc:"/game_assets/New_Bark_Town_HGSS.png",playerSize:{width:24,height:30},collisionRects:[{x:0,y:0,width:120,height:160},{x:180,y:80,width:20,height:28},{x:120,y:72,width:45,height:26},{x:150,y:108,width:13,height:28},{x:116,y:130,width:16,height:14},{x:200,y:0,width:46,height:126},{x:280,y:0,width:213,height:100},{x:330,y:100,width:15,height:73},{x:385,y:60,width:116,height:104},{x:0,y:0,width:120,height:160},{x:424,y:160,width:68,height:25},{x:452,y:185,width:41,height:55},{x:400,y:240,width:93,height:156},{x:0,y:360,width:400,height:36},{x:0,y:340,width:156,height:20},{x:0,y:240,width:20,height:100},{x:20,y:240,width:60,height:60},{x:200,y:213,width:15,height:7},{x:90,y:220,width:13,height:60},{x:120,y:220,width:31,height:56},{x:0,y:0,width:120,height:160},{x:260,y:240,width:75,height:45},{x:248,y:278,width:14,height:28},{x:240,y:0,width:26,height:70}],zones:[{id:"professor-elm",type:"transition",name:"Professor Elm Lab",rect:{x:180,y:116,width:20,height:10},target:"lab1f",targetSpawn:{x:120,y:340}},{id:"players-home-entry",type:"transition",name:"Player's Home",rect:{x:357,y:145,width:20,height:10},target:"downstairs",targetSpawn:{x:141,y:400}},{id:"rival-house",type:"message",name:"Rival's House",rect:{x:278,y:284,width:20,height:10},message:"Rival's House is in progress. Check back soon!"},{id:"guest-house",type:"message",name:"Guest House",rect:{x:102,y:270,width:20,height:10},message:"The guest house is being decorated right now."}],clickZones:[]},lab1f:{backgroundSrc:"/game_assets/lab_1f.png",playerSize:{width:34,height:46},collisionRects:[{x:0,y:328,width:51,height:52},{x:0,y:0,width:14,height:380},{x:12,y:229,width:81,height:45},{x:14,y:0,width:40,height:141},{x:53,y:0,width:70,height:137},{x:128,y:0,width:72,height:90},{x:199,y:0,width:35,height:112},{x:240,y:0,width:102,height:124},{x:344,y:0,width:79,height:112},{x:426,y:0,width:47,height:141},{x:244,y:195,width:230,height:82},{x:421,y:307,width:37,height:73},{x:460,y:0,width:12,height:397}],renderSize:{width:34,height:46},zones:[{id:"lab1f-exit",type:"transition",name:"Outside",rect:{x:112,y:360,width:60,height:22},target:"outside",targetSpawn:{x:190,y:155}}],clickZones:[{id:"lab1f-computer",rect:{x:128,y:90,width:72,height:34},onInteract:()=>{typeof n=="function"?n():alert("The computer hums quietly. Nothing new to check right now.")},message:"The computer hums quietly. Nothing new to check right now."},{id:"lab1f-device",rect:{x:240,y:124,width:100,height:34},onInteract:()=>{alert("The device is inactive... for now.")},message:"The device is inactive... for now."}]},downstairs:{backgroundSrc:"/game_assets/ethan_downstairs.png",playerSize:{width:32,height:48},collisionRects:[{x:0,y:0,width:494,height:70},{x:0,y:70,width:16,height:327},{x:0,y:364,width:20,height:55},{x:453,y:146,width:41,height:41},{x:284,y:50,width:41,height:120},{x:288,y:216,width:77,height:70},{x:0,y:100,width:114,height:30}],renderSize:{width:32,height:48},zones:[{id:"downstairs-to-outside",type:"transition",name:"Outside",rect:{x:102,y:316,width:75,height:57},target:"outside",targetSpawn:{x:367,y:170}},{id:"downstairs-to-upstairs",type:"transition",name:"Upstairs",rect:{x:117,y:71,width:66,height:65},target:"upstairs",targetSpawn:{x:191,y:154}}],clickZones:[]},upstairs:{backgroundSrc:"/game_assets/ethan_room.png",playerSize:{width:32,height:48},collisionRects:[{x:85,y:157,width:55,height:17},{x:0,y:0,width:494,height:119},{x:268,y:106,width:121,height:48},{x:390,y:0,width:104,height:397},{x:0,y:317,width:494,height:81},{x:0,y:0,width:80,height:397},{x:103,y:233,width:47,height:75},{x:358,y:282,width:28,height:27}],renderSize:{width:32,height:48},zones:[{id:"upstairs-to-downstairs",type:"transition",name:"Downstairs",rect:{x:138,y:120,width:20,height:55},target:"downstairs",targetSpawn:{x:178,y:112}}],clickZones:[{id:"upstairs-computer",rect:{x:235,y:115,width:60,height:62},onInteract:()=>{typeof n=="function"?n():alert("The computer hums quietly. Nothing new to check right now.")},message:"The computer hums quietly. Nothing new to check right now."}]}},U=Array.from(new Set(Object.values($).map(o=>o.backgroundSrc))),A=$[r]?r:"outside",se=c;let ae=A,b=$[ae],H=0,K=!1;const L=new Set,pe={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",KeyW:"up",KeyS:"down",KeyA:"left",KeyD:"right",ShiftLeft:"shift",ShiftRight:"shift"},qe=new Set(["KeyE","Enter","Space"]);function V(o,a,d){return Math.max(a,Math.min(d,o))}function Z(o,a){return o.x<a.x+a.width&&o.x+o.width>a.x&&o.y<a.y+a.height&&o.y+o.height>a.y}function Ge(o,a,d,m){return{x:o-d/2,y:a-m/2,width:d,height:m}}function Y(o=i.x,a=i.y){return Ge(o,a,i.width,i.height)}function ue(o,a){const d=Y(o,a);return((b==null?void 0:b.collisionRects)||[]).some(w=>Z(d,w))}function Ue(o,a){const d=Y(o,a);return((b==null?void 0:b.zones)||[]).find(w=>Z(d,w.rect))}function Ke(o){const a=o.message||`${o.name} is in progress. Check back soon!`;alert(a)}function ge(){return((b==null?void 0:b.clickZones)||[]).find(a=>a.id&&a.id.includes("computer"))||null}function Ve(){const o=ge();if(!o)return!1;const a=Y();return Z(a,o.rect)}let fe=!1;function Ze(o){o!==fe&&(fe=o,p.style.display=o?"block":"none")}function ye(o){o&&(typeof o.onInteract=="function"?o.onInteract():alert(o.message||"Nothing interesting happens."))}function Ye(){const o=ge();if(!o)return!1;const a=Y();return Z(a,o.rect)?(ye(o),!0):!1}function we(o,a){var m,w;const d=$[o];d&&(ae=o,b=d,H=.3,K=!0,i.width=d.playerSize.width,i.height=d.playerSize.height,i.renderWidth=((m=d.renderSize)==null?void 0:m.width)??null,i.renderHeight=((w=d.renderSize)==null?void 0:w.height)??null,a&&(i.x=V(a.x,i.width/2,N-i.width/2),i.y=V(a.y,i.height/2,R-i.height/2)),S=y.get(d.backgroundSrc)||null,i.frameIndex=1,i.frameTime=0,i.lastZoneId=null)}function Xe(o,a,d){return a>=o.x&&a<=o.x+o.width&&d>=o.y&&d<=o.y+o.height}function xe(o){const a=(b==null?void 0:b.clickZones)||[];if(!a.length)return;const d=s.getBoundingClientRect(),m=s.width/d.width,w=s.height/d.height,E=(o.clientX-d.left)*m,I=(o.clientY-d.top)*w,C=a.find(P=>Xe(P.rect,E,I));C&&ye(C)}function Qe(o){let a=0,d=0;L.has("left")&&(a-=1),L.has("right")&&(a+=1),L.has("up")&&(d-=1),L.has("down")&&(d+=1);let m=!1;if(a!==0||d!==0){m=!0,Math.abs(a)>Math.abs(d)?i.direction=a>0?"right":"left":i.direction=d>0?"down":"up",a!==0&&d!==0&&(a*=Math.SQRT1_2,d*=Math.SQRT1_2);const I=L.has("shift")?i.runSpeed:i.walkSpeed,C=V(i.x+a*I*o,20,N-20),P=V(i.y+d*I*o,35,R-25);ue(C,i.y)||(i.x=C),ue(i.x,P)||(i.y=P)}H>0&&(H=Math.max(0,H-o));let w=Ue(i.x,i.y);K&&(!w||w.type!=="transition"?K=!1:w=null),H<=0&&w?w.type==="message"?i.lastZoneId!==w.id&&(Ke(w),i.lastZoneId=w.id):w.type==="transition"&&(we(w.target,w.targetSpawn),i.lastZoneId=null):!w&&!K&&(i.lastZoneId=null),Ze(Ve());const E=L.has("shift")?X(M,i.direction):X(B,i.direction);if(u&&E){const I=L.has("shift")?.08:.14;m?(i.frameTime+=o,i.frameTime>=I&&(i.frameIndex=(i.frameIndex+1)%E.length,i.frameTime=0)):(i.frameIndex=1,i.frameTime=0)}}function Je(){h.fillStyle="#0b1524",h.fillRect(0,0,s.width,s.height),h.fillStyle="#ffffff",h.font='16px "Segoe UI"',h.textAlign="center",h.fillText("Loading New Bark Town assets...",s.width/2,s.height/2)}function et(){if(h.imageSmoothingEnabled=!1,!u||!S||!(S instanceof Image)||S.naturalWidth===0||S.naturalHeight===0){Je();return}h.drawImage(S,0,0,s.width,s.height);const o=L.has("shift")?X(M,i.direction):X(B,i.direction),a=o==null?void 0:o[i.frameIndex];if(a){const d=i.renderWidth??a.width,m=i.renderHeight??a.height;h.drawImage(a,Math.round(i.x-d/2),Math.round(i.y-m/2),d,m)}}let me=!0,le=performance.now();function ve(o){if(!me)return;const a=Math.min(.05,(o-le)/1e3);le=o,Qe(a),et(),requestAnimationFrame(ve)}function tt(){const o=Ce(_e),a=Ce(Te),m=[...o,...a].map(E=>Ae(`/game_assets/${E}.png`).then(I=>({name:E,img:I}))),w=U.map(E=>Ae(E).then(I=>({src:E,img:I})));Promise.all([Promise.all(m),Promise.all(w)]).then(([E,I])=>{const C=new Map;E.forEach(({name:P,img:ce})=>C.set(P,ce)),B=Me(_e,C),M=Me(Te,C),I.forEach(({src:P,img:ce})=>y.set(P,ce)),we(ae,se||void 0),u=!0}).finally(()=>{le=performance.now(),requestAnimationFrame(ve)})}const be=o=>{if(qe.has(o.code)&&Ye()){o.preventDefault();return}const a=pe[o.code];a&&(o.preventDefault(),L.add(a))},ke=o=>{const a=pe[o.code];a&&(o.preventDefault(),L.delete(a))};window.addEventListener("keydown",be),window.addEventListener("keyup",ke),s.addEventListener("click",xe);const Se=()=>{me=!1,window.removeEventListener("keydown",be),window.removeEventListener("keyup",ke),s.removeEventListener("click",xe)};if(e==="window"){const o=x.querySelector('[data-act="close"]');o==null||o.addEventListener("click",Se)}else x.__battleCleanup=Se;return tt(),x}function dt(){const t=document.createElement("div");return t.className="help-container",t.innerHTML=`
    <div class="help-scroll" style="height: 100%; overflow-y: auto;">
      <!-- Header -->
      <div class="help-hero" style="padding: 20px 24px;">
        <h1 style="margin: 0;">Welcome to mwaOS</h1>
        <p style="margin: 8px 0 0 0;">A retro-inspired portfolio experience</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 20px 24px;">
        
        <!-- Navigation Section -->
        <div class="help-section" data-help-section>
          <h2 style="margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Basic Navigation
          </h2>
          <ul style="margin: 0; padding-left: 24px;">
            <li><strong>Double-click</strong> desktop icons to open folders and programs</li>
            <li><strong>Drag</strong> window title bars to move windows around</li>
            <li><strong>Click</strong> the Start button for quick access menu</li>
            <li><strong>Click</strong> taskbar items to switch between open windows</li>
          </ul>
        </div>
        
        <!-- Folders Section -->
        <div class="help-section" data-help-section>
          <h2 style="margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Desktop Folders
          </h2>
          <ul style="margin: 0; padding-left: 24px;">
            <li><strong>Projects</strong> — Engineering and coding projects</li>
            <li><strong>Work Experience</strong> — Professional experience and internships</li>
            <li><strong>Involvement</strong> — Community service and extracurriculars</li>
            <li><strong>Photography</strong> — Circuit bent camera galleries</li>
          </ul>
        </div>
        
        <!-- File Types Section -->
        <div class="help-section" data-help-section>
          <h2 style="margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> File Types
          </h2>
          <ul style="margin: 0; padding-left: 24px;">
            <li><strong>README</strong> — Project overviews and descriptions</li>
            <li><strong>.sch files</strong> — Hardware diagrams (interactive!)</li>
            <li><strong>.flow files</strong> — Software architecture visualizations</li>
            <li><strong>.pdf files</strong> — Detailed reports and documents</li>
            <li><strong>.url files</strong> — External links (opens in new tab)</li>
            <li><strong>Galleries</strong> — Photo collections from various cameras</li>
          </ul>
        </div>
        
        <!-- Programs Section -->
        <div class="help-section" data-help-section>
          <h2 style="margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Programs
          </h2>
          <ul style="margin: 0; padding-left: 24px;">
            <li><strong>AboutMe.exe</strong> — Learn more about me and my background</li>
            <li><strong>Battle.exe</strong> — A fun mini-game to pass the time</li>
            <li><strong>Help.exe</strong> — You're reading it right now!</li>
          </ul>
        </div>
        
        <!-- Tips Section -->
        <div class="help-section help-section--tips" data-help-section>
          <h2 style="margin: 0 0 10px 0; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;"></span> Pro Tips
          </h2>
          <ul style="margin: 0; padding-left: 24px;">
            <li>Use the <strong>Back</strong> button in file explorer to navigate up</li>
            <li>Click the <strong>breadcrumb path</strong> to jump to any folder level</li>
            <li>Try <strong>Change Wallpaper</strong> in the Start menu!</li>
            <li>In galleries, use <strong>arrow keys</strong> to navigate photos</li>
          </ul>
        </div>
        
      </div>
    </div>
  `,ne({title:"Help",body:t,width:480,height:520,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <circle cx="16" cy="16" r="14" fill="#4a90d9" stroke="#2d6ba3" stroke-width="1"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Georgia, serif">?</text>
  </svg>`})}const k=new rt(document.getElementById("windows"));window.wm=k;const ht=493,pt=397,Pe=1.5,ut="/documents/Michael_Albert_Resume.pdf",gt=[{id:"projects",label:"Projects",type:"folder"},{id:"work",label:"Work Experience",type:"folder"},{id:"involvement",label:"Involvement",type:"folder"},{id:"photography",label:"Photography",type:"camera"},{id:"about",label:"AboutMe.exe",type:"chat"},{id:"help",label:"Help.exe",type:"help"}],ze=document.getElementById("desktop"),Be=document.getElementById("taskbar-items"),he=document.getElementById("start-btn"),D=document.getElementById("start-menu"),Oe=document.getElementById("clock"),Ne=document.getElementById("os-root"),q=document.getElementById("game-root"),z=["Hello, I'm Michael. Welcome to my portfolio website! Click, press enter, e, or spacebar to continue through this intro.","This website is modeled after New Bark town from Pokemon Heart Gold! You can explore and interact with the town!","Interact (Press E, Spacebar, Enter, or Click) with the blue computers in town by to learn about me!","Press continue to enter the game, press instructions if you need help navigating the website, and press the resumé link if you are in a rush!"],{overlay:O,textBox:ee,buttonsWrapper:ft,continueBtn:yt,instructionsBtn:wt}=Lt();q.appendChild(O);let j=null,Q=0,G=!1;O.addEventListener("click",De);window.addEventListener("keydown",He);z.length<=1&&je();function xt(){j||(j=ct({mode:"standalone",onComputerInteract:mt,initialArea:"upstairs",initialSpawn:{x:191,y:154}}),j.style.margin="0 auto",O.isConnected?q.insertBefore(j,O):q.appendChild(j))}function mt(){q.classList.add("hidden"),Ne.classList.remove("hidden"),D.classList.add("hidden")}function vt(){Ne.classList.add("hidden"),q.classList.remove("hidden"),D.classList.add("hidden")}yt.addEventListener("click",()=>{xt(),O.classList.add("intro-overlay--hidden"),setTimeout(()=>O.remove(),300)});wt.addEventListener("click",()=>{ee.textContent=z[z.length-1]||""});function te(t){return t.toString().padStart(2,"0")}setInterval(()=>{const t=new Date;Oe.textContent=`${te(t.getHours())}:${te(t.getMinutes())}`},1e3);const $e=new Date;Oe.textContent=`${te($e.getHours())}:${te($e.getMinutes())}`;he.addEventListener("click",()=>D.classList.toggle("hidden"));document.addEventListener("click",t=>{!D.contains(t.target)&&t.target!==he&&!he.contains(t.target)&&D.classList.add("hidden")});document.querySelectorAll("#start-menu [data-launch]").forEach(t=>{t.addEventListener("click",()=>{t.getAttribute("data-launch")==="AboutMe"&&We(),D.classList.add("hidden")})});document.getElementById("shutdown").addEventListener("click",()=>{confirm("Shut down mwaOS?")&&(k.closeAll(),vt())});document.getElementById("run-cmd").addEventListener("click",()=>{W(()=>import("./terminal-DfiG4KgR.js"),[]).then(t=>{k.openWindow(t.createTerminal())})});const ie=[{type:"image",value:"/wallpapers/windows.jpg"},{type:"image",value:"/wallpapers/classic.jpg"},{type:"image",value:"/wallpapers/snowy_mtn.jpg"},{type:"image",value:"/wallpapers/apple.jpg"}];let J=0;function Re(t){const e=document.getElementById("wallpaper");t.type==="image"?(e.style.background=`url('${t.value}') center center / cover no-repeat`,e.style.backgroundSize="cover",e.style.backgroundPosition="center center",e.style.backgroundRepeat="no-repeat",e.style.backgroundColor="#000",e.style.imageRendering="auto"):(e.style.background=t.value,e.style.backgroundSize="",e.style.backgroundPosition="")}document.getElementById("change-wallpaper").addEventListener("click",()=>{J=(J+1)%ie.length,Re(ie[J])});ie.length&&Re(ie[J]);function bt(t){return t==="folder"?'<img src="/icons/folder.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="folder"/>':t==="camera"?'<img src="/icons/camera.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="camera"/>':t==="chat"?'<img src="/icons/chat.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="chat"/>':t==="game"?'<img src="/icons/games.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="games"/>':t==="help"?'<img src="/icons/help.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="help"/>':t==="exe"?`<svg viewBox="0 0 48 48" class="w-12 h-12" style='filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));'>
      <defs>
        <linearGradient id="exeBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a90d9"/>
          <stop offset="100%" stop-color="#1e5aa8"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="4" fill="url(#exeBg)" stroke="rgba(100,150,200,0.6)" stroke-width="1"/>
      <rect x="8" y="8" width="32" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
      <circle cx="12" cy="11" r="1.5" fill="#ff6b6b"/>
      <circle cx="17" cy="11" r="1.5" fill="#ffd93d"/>
      <circle cx="22" cy="11" r="1.5" fill="#4ade80"/>
      <rect x="10" y="18" width="28" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
      <rect x="10" y="23" width="20" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
      <rect x="10" y="28" width="24" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
      <text x="24" y="40" text-anchor="middle" fill="white" font-size="8" font-weight="bold" font-family="Segoe UI, sans-serif">EXE</text>
    </svg>`:'<img src="/icons/file.png" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="file"/>'}const kt=[{top:20,left:15},{top:115,left:35},{top:210,left:8},{top:305,left:45},{top:25,left:110},{top:120,left:125}];function St(t,e){const n=document.createElement("button");n.className="desktop-icon";const r=kt[e]||{top:20+e*95,left:20};return n.style.position="absolute",n.style.top=`${r.top}px`,n.style.left=`${r.left}px`,n.innerHTML=`${bt(t.type)}<span style="max-width: 80px; text-align: center; line-height: 1.3;">${t.label}</span>`,n.addEventListener("click",()=>{t.id==="about"?We():t.id==="help"?It():Et(t.id,t.label)}),n}gt.forEach((t,e)=>ze.appendChild(St(t,e)));k.onTaskbarUpdate=t=>{Be.innerHTML="",t.forEach(e=>{const n=document.createElement("button");n.className="task-item",n.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 16 16" style="flex-shrink: 0;">
        <rect x="1" y="1" width="14" height="14" rx="2" fill="url(#taskIconGrad)"/>
        <defs>
          <linearGradient id="taskIconGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5a9fd4"/>
            <stop offset="100%" stop-color="#2d6ba3"/>
          </linearGradient>
        </defs>
      </svg>
      <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px;">${e.title}</span>
    `,e.active&&n.classList.add("active"),e.minimized&&(n.style.opacity="0.7"),n.addEventListener("click",()=>k.focus(e.id)),Be.appendChild(n)})};function Et(t,e){fetch("/content/items.json").then(n=>n.json()).then(n=>{const r=n[t]||{type:"folder",children:{}},c=at({title:e,rootData:r,onOpenHardware:l=>{W(()=>import("./circuitViewer-CjOeRHjr.js"),__vite__mapDeps([0,1])).then(s=>{k.openWindow(s.createCircuitViewer(l))})},onOpenSoftware:l=>{W(()=>import("./softwareVisualizer-8YnuHtBs.js"),__vite__mapDeps([2,1])).then(s=>{k.openWindow(s.createSoftwareVisualizer(l))})},onOpenText:l=>{W(()=>import("./articleViewer-B_uRCk4S.js"),[]).then(s=>{k.openWindow(s.createArticleViewer(l))})},onOpenPdf:l=>{W(()=>import("./pdfViewer-CQKmUUk0.js"),[]).then(s=>{k.openWindow(s.createPdfViewer(l))})},onOpenGallery:l=>{W(()=>import("./galleryViewer-mokeSg_E.js"),[]).then(s=>{k.openWindow(s.createGalleryViewer(l))})}});k.openWindow(c)})}function We(){fetch("/content/about.json").then(t=>t.json()).then(t=>k.openWindow(lt(t)))}function It(){k.openWindow(dt())}function Lt(){const t=document.createElement("div");t.className="intro-overlay";const e=document.createElement("div");e.className="intro-card",e.style.width=`${ht*Pe}px`,e.style.height=`${pt*Pe}px`;const n=document.createElement("div");n.className="intro-text",n.textContent=z[0];const r=document.createElement("div");r.className="intro-buttons",r.style.display="none";const c=de("Continue"),l=de("More Instructions"),s=de("RESUME","a");return s.href=ut,s.target="_blank",s.rel="noopener noreferrer",r.append(c,l,s),e.append(n,r),t.append(e),{overlay:t,textBox:n,buttonsWrapper:r,continueBtn:c,instructionsBtn:l,resumeBtn:s}}function de(t,e="button"){const n=document.createElement(e);return e==="button"&&(n.type="button"),n.className="intro-button",n.textContent=t,n}function De(){G||Fe()}function He(t){if(G)return;[" ","Space","Spacebar","Enter","e","E"].includes(t.key)&&(t.preventDefault(),Fe())}function Fe(){Q<z.length-1?(Q+=1,ee.textContent=z[Q]):G||(ee.textContent=z[Q],je())}function je(){G||(ee.textContent="",ft.style.display="flex",G=!0,O.removeEventListener("click",De),window.removeEventListener("keydown",He))}ze.addEventListener("contextmenu",t=>{t.preventDefault(),document.querySelectorAll(".context-menu").forEach(c=>c.remove());const e=document.createElement("div");e.className="menu context-menu absolute",e.style.left=t.clientX+"px",e.style.top=t.clientY+"px",e.innerHTML=`
    <div class="menu-item" style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 16px;">📋</span> Arrange Icons
    </div>
    <div class="menu-item" style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 16px;">🔄</span> Refresh
    </div>
    <div style="height: 1px; background: rgba(100,130,170,0.3); margin: 4px 0;"></div>
    <div class="menu-item" style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 16px;">⚙️</span> Properties
    </div>
  `,document.body.appendChild(e);const n=e.getBoundingClientRect();n.right>window.innerWidth&&(e.style.left=window.innerWidth-n.width-10+"px"),n.bottom>window.innerHeight-50&&(e.style.top=t.clientY-n.height+"px");function r(){e.remove(),document.removeEventListener("click",r)}setTimeout(()=>document.addEventListener("click",r),0)});export{W as _,ne as m};
