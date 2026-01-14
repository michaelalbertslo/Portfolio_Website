const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./circuitViewer-DawS3EO4.js","./OrbitControls-hv_4xcvx.js","./softwareVisualizer-DJ5s2Tm6.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(c){if(c.ep)return;c.ep=!0;const l=n(c);fetch(c.href,l)}})();const rt="modulepreload",ot=function(t,e){return new URL(t,e).href},Le={},N=function(e,n,o){let c=Promise.resolve();if(n&&n.length>0){const s=document.getElementsByTagName("link"),f=document.querySelector("meta[property=csp-nonce]"),m=(f==null?void 0:f.nonce)||(f==null?void 0:f.getAttribute("nonce"));c=Promise.allSettled(n.map(u=>{if(u=ot(u,o),u in Le)return;Le[u]=!0;const d=u.endsWith(".css"),v=d?'[rel="stylesheet"]':"";if(!!o)for(let E=s.length-1;E>=0;E--){const p=s[E];if(p.href===u&&(!d||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${v}`))return;const k=document.createElement("link");if(k.rel=d?"stylesheet":rt,d||(k.as="script"),k.crossOrigin="",k.href=u,m&&k.setAttribute("nonce",m),document.head.appendChild(k),d)return new Promise((E,p)=>{k.addEventListener("load",E),k.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${u}`)))})}))}function l(s){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=s,window.dispatchEvent(f),!f.defaultPrevented)throw s}return c.then(s=>{for(const f of s||[])f.status==="rejected"&&l(f.reason);return e().catch(l)})};let Ie=10,st=1;class at{constructor(e){this.layer=e,this.windows=new Map,this.onTaskbarUpdate=null}openWindow(e){const n="win-"+st++;e.dataset.id=n,e.style.left=100+Math.random()*200+"px",e.style.top=60+Math.random()*120+"px",e.style.zIndex=++Ie,this.layer.appendChild(e),this.windows.set(n,{el:e,title:e.querySelector(".title").textContent,active:!0}),this._bindWindow(e),this._updateTaskbar()}_bindWindow(e){const n=e.querySelector(".win-titlebar"),o=e.querySelector("[data-act=close]"),c=e.querySelector("[data-act=min]"),l=e.querySelector("[data-act=max]");[o,c,l].forEach(d=>d==null?void 0:d.addEventListener("pointerdown",v=>v.stopPropagation()));let s=!1,f=0,m=0,u=null;n.addEventListener("pointerdown",d=>{if(d.target&&d.target.closest&&d.target.closest(".win-actions")||d.button!==0)return;s=!0,u=d.pointerId;const v=e.getBoundingClientRect();f=d.clientX-v.left,m=d.clientY-v.top,e.setPointerCapture(d.pointerId),this.focus(e.dataset.id)}),e.addEventListener("pointermove",d=>{if(!s||d.pointerId!==u)return;const v=d.clientX-f,T=d.clientY-m;e.style.left=v+"px",e.style.top=Math.max(4,T)+"px"}),e.addEventListener("pointerup",d=>{d.pointerId===u&&(s=!1,u=null,e.hasPointerCapture(d.pointerId)&&e.releasePointerCapture(d.pointerId))}),e.addEventListener("pointercancel",d=>{d.pointerId===u&&(s=!1,u=null)}),e.addEventListener("lostpointercapture",()=>{s=!1,u=null}),o==null||o.addEventListener("click",()=>this.close(e.dataset.id)),c==null||c.addEventListener("click",()=>this.minimize(e.dataset.id)),l==null||l.addEventListener("click",()=>this.toggleMaximize(e.dataset.id)),e.addEventListener("mousedown",()=>this.focus(e.dataset.id))}focus(e){const n=this.windows.get(e);n&&(n.el.style.display==="none"&&(n.el.style.display=""),n.el.style.zIndex=++Ie,this.windows.forEach((o,c)=>o.active=c===e),this._updateTaskbar())}close(e){const n=this.windows.get(e);n&&(n.el.remove(),this.windows.delete(e),this._updateTaskbar())}closeAll(){this.windows.forEach(e=>e.el.remove()),this.windows.clear(),this._updateTaskbar()}minimize(e){const n=this.windows.get(e);n&&(n.el.style.display="none",n.active=!1,this._updateTaskbar())}toggleMaximize(e){const n=this.windows.get(e);if(!n)return;const o=n.el;if(o.classList.contains("maxim"))o.classList.remove("maxim"),o.style.left=o.dataset.prevLeft,o.style.top=o.dataset.prevTop,o.style.width=o.dataset.prevWidth,o.style.height=o.dataset.prevHeight;else{const c=o.getBoundingClientRect();o.dataset.prevLeft=o.style.left,o.dataset.prevTop=o.style.top,o.dataset.prevWidth=o.style.width||c.width+"px",o.dataset.prevHeight=o.style.height||c.height+"px",o.style.left="10px",o.style.top="10px",o.style.width="calc(100vw - 20px)",o.style.height="calc(100vh - 60px)",o.classList.add("maxim")}}_updateTaskbar(){if(!this.onTaskbarUpdate)return;const e=[];this.windows.forEach((n,o)=>e.push({id:o,title:n.title,active:n.active,minimized:n.el.style.display==="none"})),this.onTaskbarUpdate(e)}}function se({title:t,body:e,width:n=600,height:o=420,icon:c}){const l=document.createElement("div");l.className="win absolute",l.style.width=n+"px",l.style.height=o+"px";const s=c||`
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
  `,typeof e!="string"&&e instanceof HTMLElement&&l.querySelector(".win-body").appendChild(e),l}function g(t=""){const e="./",n=t.startsWith("/")?t.slice(1):t;return`${e.endsWith("/")?e:`${e}/`}${n}`}function We(t){return!t||typeof t!="object"||(typeof t.src=="string"&&(t.src=g(t.src)),typeof t.imagePath=="string"&&(t.imagePath=g(t.imagePath)),Array.isArray(t.images)&&(t.images=t.images.map(e=>typeof e=="string"?g(e):e)),t.children&&typeof t.children=="object"&&Object.values(t.children).forEach(e=>We(e))),t}const C={folder:`<img src="${g("icons/folder.png")}" class="w-8 h-8" alt="folder"/>`,text:`<img src="${g("icons/file.png")}" class="w-8 h-8" alt="file"/>`,hardware:`<svg viewBox="0 0 32 32" class="w-8 h-8">
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
  </svg>`,camera:`<img src="${g("icons/camera.png")}" class="w-8 h-8" alt="camera"/>`,pdf:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="4" y="2" width="24" height="28" rx="2" fill="#e74c3c" stroke="#c0392b" stroke-width="1"/>
    <rect x="7" y="5" width="18" height="4" fill="rgba(255,255,255,0.3)"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="Arial">PDF</text>
  </svg>`,back:`<svg viewBox="0 0 32 32" class="w-6 h-6">
    <path d="M20 8l-8 8 8 8" stroke="#666" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`};function _e(t,e){return t.type==="folder"?C.folder:t.type==="hardware"||e.endsWith(".sch")?C.hardware:t.type==="software"||e.endsWith(".flow")?C.software:t.type==="links"||e.endsWith(".url")?C.links:t.type==="pdf"||e.endsWith(".pdf")?C.pdf:t.type==="image"||/\.(jpg|png|gif|webp)$/i.test(e)?C.image:t.type==="gallery"?C.camera:C.text}function F(t){return t.endsWith(".txt")?t.replace(".txt",""):t}function lt(t,e){return t.type==="folder"?"File Folder":t.type==="hardware"||e.endsWith(".sch")?"Hardware Schematic":t.type==="software"||e.endsWith(".flow")?"Software Flowchart":t.type==="links"||e.endsWith(".url")?"Internet Shortcut":t.type==="pdf"||e.endsWith(".pdf")?"PDF Document":t.type==="image"?"Image File":t.type==="gallery"?"Photo Gallery":t.type==="text"||e.endsWith(".txt")?"Text Document":"File"}function ct({title:t,rootData:e,onOpenHardware:n,onOpenSoftware:o,onOpenText:c,onOpenPdf:l,onOpenGallery:s}){const f=document.createElement("div");f.className="h-full flex flex-col file-explorer";let m=[],u=e;function d(p){let i=e;for(const y of p)i.children&&i.children[y]&&(i=i.children[y]);return i}function v(){u=d(m);const p=u.children||{},i=Object.entries(p);f.innerHTML=`
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
        " ${m.length===0?'disabled style="opacity: 0.5; cursor: default;"':""}>
          ${C.back} Back
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
          ${m.map((y,b)=>`
            <span style="color: #999;">›</span>
            <span class="crumb" data-path="${m.slice(0,b+1).join("/")}" style="cursor: pointer; color: #0066cc;">${y}</span>
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
          ${i.map(([y,b])=>`
            <div class="file-item" data-name="${y}" style="
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
              ${_e(b,y)}
              <span style="
                font-size: 11px;
                word-break: break-word;
                line-height: 1.2;
                max-width: 80px;
              ">${F(y)}</span>
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
    `,T()}function T(){const p=f.querySelector(".nav-back");p&&m.length>0&&p.addEventListener("click",()=>{m.pop(),v()}),f.querySelectorAll(".crumb").forEach(i=>{i.addEventListener("click",()=>{const y=i.dataset.path;m=y?y.split("/"):[],v()})}),f.querySelectorAll(".file-item").forEach(i=>{const y=i.dataset.name,b=u.children[y];i.addEventListener("click",K=>{f.querySelectorAll(".file-item").forEach(P=>P.classList.remove("selected")),i.classList.add("selected"),k(y,b)}),i.addEventListener("dblclick",()=>{E(y,b)})})}function k(p,i){const y=f.querySelector(".details-content"),b=i.meta||{},K=F(p);let P=`
      <div style="text-align: center; margin-bottom: 12px;">
        <div style="transform: scale(1.5); display: inline-block; margin-bottom: 8px;">
          ${_e(i,p)}
        </div>
        <div style="font-weight: 600; margin-top: 8px;">${K}</div>
        <div style="color: #666; font-size: 11px;">${lt(i,p)}</div>
      </div>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
    `;if(i.type==="folder"){const M=Object.keys(i.children||{}).length;P+=`
        <div><strong>Contains:</strong> ${M} item(s)</div>
        ${b.date?`<div style="margin-top: 8px;"><strong>Date:</strong> ${b.date}</div>`:""}
        ${b.location?`<div><strong>Location:</strong> ${b.location}</div>`:""}
        ${b.category?`<div><strong>Type:</strong> ${b.category}</div>`:""}
      `}else if(i.type==="text"){const M=Array.isArray(i.content)?i.content.join(`
`):i.content,ae=M.substring(0,150)+(M.length>150?"...":"");P+=`
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
        ">${ae}</div>
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
      `}else i.type==="links"?P+=`
        <div style="margin-top: 8px;">
          ${i.links.map(M=>`
            <a href="${M.href}" target="_blank" style="
              display: block;
              padding: 6px 8px;
              margin-bottom: 4px;
              background: white;
              border: 1px solid #ccc;
              border-radius: 3px;
              color: #0066cc;
              text-decoration: none;
              font-size: 11px;
            ">${M.label} ↗</a>
          `).join("")}
        </div>
      `:i.type==="hardware"||i.type==="software"?P+=`
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
      `:i.type==="pdf"&&(P+=`
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
      `);y.innerHTML=P;const V=y.querySelector(".open-viewer-btn");V&&V.addEventListener("click",()=>E(p,i));const z=y.querySelector(".open-pdf-btn");z&&z.addEventListener("click",()=>E(p,i));const Z=y.querySelector(".open-text-btn");Z&&Z.addEventListener("click",()=>E(p,i))}function E(p,i){var y;i.type==="folder"?(m.push(p),v()):i.type==="hardware"&&n?n({title:p.replace(".sch",""),graph:i.graph,path:[...m,p]}):i.type==="software"&&o?o({title:p.replace(".flow",""),graph:i.graph,path:[...m,p]}):i.type==="text"&&c?c({title:F(p),content:i.content,images:i.images||[],path:[...m,p]}):i.type==="pdf"&&l?l({title:F(p),src:i.src,path:[...m,p]}):i.type==="gallery"&&s?s({title:F(p),imagePath:i.imagePath,path:[...m,p],linkMap:i.linkMap||{}}):i.type==="links"&&((y=i.links)!=null&&y[0])&&window.open(i.links[0].href,"_blank")}return v(),se({title:t,body:f,width:750,height:500,icon:C.folder})}function dt(t){const e=document.createElement("div");e.className="h-full about-view";const n=g(t.profileImage||"profile.png");return e.innerHTML=`
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
          ${t.links.map(o=>`
            <a 
              href="${o.href}" 
              target="_blank" 
              class="badge underline about-link-badge"
            >${o.label}</a>
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
            ${t.skills.map(o=>`<span class="badge">${o}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `,se({title:"AboutMe.exe",body:e,width:680,height:420})}const H=493,D=397,Te={down:["ethan2","ethan2","ethan3"],left:["ethan4","ethan5","ethan6"],up:["ethan7","ethan8","ethan9"],right:["ethan10","ethan11","ethan12"]},Pe={down:["ethanrun7","ethanrun8","ethanrun9"],left:["ethanrun4","ethanrun5","ethanrun6"],up:["ethanrun1","ethanrun2","ethanrun3"],right:["ethanrun10","ethanrun11","ethanrun12"]};function Ae(t){return new Promise(e=>{const n=new Image;n.onload=()=>e(n),n.onerror=()=>e(n),n.src=t})}function ee(t,e){return t?t[e]||t.down:null}function Ce(t){const e=new Set;return Object.values(t).forEach(n=>n.forEach(o=>e.add(o))),Array.from(e)}function Me(t,e){const n={};return Object.entries(t).forEach(([o,c])=>{n[o]=c.map(l=>e.get(l))}),n}function ht(t={}){const{mode:e="window",onComputerInteract:n=null,initialArea:o="outside",initialSpawn:c=null}=t,l=document.createElement("div");l.style.cssText="height:100%;background:#0b1524;display:flex;flex-direction:column;gap:8px;padding:8px;font-family:Segoe UI";const s=document.createElement("canvas");s.width=H,s.height=D,s.style.width=H*1.5+"px",s.style.height=D*1.5+"px",s.style.border="1px solid rgba(0,0,0,0.35)",s.style.borderRadius="6px",s.style.background="#000",s.style.imageRendering="pixelated";const f=document.createElement("div");f.className="text-xs text-white",f.style.fontSize="12px",f.innerHTML=`
    <div><strong>Controls:</strong> Arrow Keys / WASD to walk • Hold Shift to run</div>
  `;const m=document.createElement("div");m.style.cssText=`
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
  `,m.textContent="Press E, Enter, Space, or click to interact with the computer.",e!=="window"&&(l.style.border="none",l.style.borderRadius="0",l.style.padding="0",l.style.width="auto",l.style.height="auto",l.style.boxSizing="border-box",l.style.alignItems="center"),l.append(s,m,f);let u;e==="window"?u=se({title:"Battle.exe",body:l,width:H*1.5+80,height:D*1.5+160,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
        <rect x="4" y="4" width="24" height="24" rx="5" fill="#f8c146" stroke="#b46a00" stroke-width="1.2"/>
        <path d="M11 10h10M11 16h10M11 22h5" stroke="#5a2d00" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`}):u=l;const d=s.getContext("2d"),v=new Map;let T=null,k=null,E=null,p=!1;const i={x:H/2,y:D/2+40,width:24,height:30,renderWidth:null,renderHeight:null,direction:"down",frameIndex:1,frameTime:0,walkSpeed:95,runSpeed:160,lastZoneId:null},y=[{x:0,y:0,width:120,height:160},{x:180,y:80,width:20,height:28},{x:120,y:72,width:45,height:26},{x:150,y:108,width:13,height:28},{x:116,y:130,width:16,height:14},{x:200,y:0,width:46,height:126},{x:280,y:0,width:213,height:100},{x:330,y:100,width:15,height:73},{x:385,y:60,width:116,height:104},{x:0,y:0,width:120,height:160},{x:424,y:160,width:68,height:25},{x:452,y:185,width:41,height:55},{x:400,y:240,width:93,height:156},{x:0,y:360,width:400,height:36},{x:0,y:340,width:156,height:20},{x:0,y:240,width:20,height:100},{x:20,y:240,width:60,height:60},{x:200,y:213,width:15,height:7},{x:90,y:220,width:13,height:60},{x:120,y:220,width:31,height:56},{x:0,y:0,width:120,height:160},{x:260,y:240,width:75,height:45},{x:248,y:278,width:14,height:28},{x:240,y:0,width:26,height:70}],b=[{x:0,y:0,width:494,height:70},{x:0,y:70,width:16,height:327},{x:0,y:364,width:20,height:55},{x:453,y:146,width:41,height:41},{x:284,y:50,width:41,height:120},{x:288,y:216,width:77,height:70},{x:0,y:100,width:114,height:30}],K=[{x:85,y:157,width:55,height:17},{x:0,y:0,width:494,height:119},{x:268,y:106,width:121,height:48},{x:390,y:0,width:104,height:397},{x:0,y:317,width:494,height:81},{x:0,y:0,width:80,height:397},{x:103,y:233,width:47,height:75},{x:358,y:282,width:28,height:27}],P={x:367,y:170},V=[{x:0,y:328,width:51,height:52},{x:0,y:0,width:14,height:380},{x:12,y:229,width:81,height:45},{x:14,y:0,width:40,height:141},{x:53,y:0,width:70,height:137},{x:128,y:0,width:72,height:90},{x:199,y:0,width:35,height:112},{x:240,y:0,width:102,height:124},{x:344,y:0,width:79,height:112},{x:426,y:0,width:47,height:141},{x:244,y:195,width:230,height:82},{x:421,y:307,width:37,height:73},{x:460,y:0,width:12,height:397}],z={outside:{backgroundSrc:g("game_assets/New_Bark_Town_HGSS.png"),playerSize:{width:24,height:30},collisionRects:y,zones:[{id:"professor-elm",type:"transition",name:"Professor Elm Lab",rect:{x:180,y:116,width:20,height:10},target:"lab1f",targetSpawn:{x:120,y:340}},{id:"players-home-entry",type:"transition",name:"Player's Home",rect:{x:357,y:145,width:20,height:10},target:"downstairs",targetSpawn:{x:141,y:400}},{id:"rival-house",type:"message",name:"Rival's House",rect:{x:278,y:284,width:20,height:10},message:"Rival's House is in progress. Check back soon!"},{id:"guest-house",type:"message",name:"Guest House",rect:{x:102,y:270,width:20,height:10},message:"The guest house is being decorated right now."}],clickZones:[]},lab1f:{backgroundSrc:g("game_assets/lab_1f.png"),playerSize:{width:34,height:46},collisionRects:V,renderSize:{width:34,height:46},zones:[{id:"lab1f-exit",type:"transition",name:"Outside",rect:{x:112,y:360,width:60,height:22},target:"outside",targetSpawn:{x:190,y:155}}],clickZones:[{id:"lab1f-computer",rect:{x:128,y:90,width:72,height:34},onInteract:()=>{typeof n=="function"?n():alert("The computer hums quietly. Nothing new to check right now.")},message:"The computer hums quietly. Nothing new to check right now."},{id:"lab1f-device",rect:{x:240,y:124,width:100,height:34},onInteract:()=>{alert("The device is inactive... for now.")},message:"The device is inactive... for now."}]},downstairs:{backgroundSrc:g("game_assets/ethan_downstairs.png"),playerSize:{width:32,height:48},collisionRects:b,renderSize:{width:32,height:48},zones:[{id:"downstairs-to-outside",type:"transition",name:"Outside",rect:{x:102,y:316,width:75,height:57},target:"outside",targetSpawn:P},{id:"downstairs-to-upstairs",type:"transition",name:"Upstairs",rect:{x:117,y:71,width:66,height:65},target:"upstairs",targetSpawn:{x:191,y:154}}],clickZones:[]},upstairs:{backgroundSrc:g("game_assets/ethan_room.png"),playerSize:{width:32,height:48},collisionRects:K,renderSize:{width:32,height:48},zones:[{id:"upstairs-to-downstairs",type:"transition",name:"Downstairs",rect:{x:138,y:120,width:20,height:55},target:"downstairs",targetSpawn:{x:178,y:112}}],clickZones:[{id:"upstairs-computer",rect:{x:235,y:115,width:60,height:62},onInteract:()=>{typeof n=="function"?n():alert("The computer hums quietly. Nothing new to check right now.")},message:"The computer hums quietly. Nothing new to check right now."}]}},Z=Array.from(new Set(Object.values(z).map(r=>r.backgroundSrc))),M=z[o]?o:"outside",ae=c;let le=M,S=z[le],j=0,Y=!1;const A=new Set,fe={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",KeyW:"up",KeyS:"down",KeyA:"left",KeyD:"right",ShiftLeft:"shift",ShiftRight:"shift"},Ue=new Set(["KeyE","Enter","Space"]);function X(r,a,h){return Math.max(a,Math.min(h,r))}function Q(r,a){return r.x<a.x+a.width&&r.x+r.width>a.x&&r.y<a.y+a.height&&r.y+r.height>a.y}function Ke(r,a,h,x){return{x:r-h/2,y:a-x/2,width:h,height:x}}function J(r=i.x,a=i.y){return Ke(r,a,i.width,i.height)}function ue(r,a){const h=J(r,a);return((S==null?void 0:S.collisionRects)||[]).some(w=>Q(h,w))}function Ve(r,a){const h=J(r,a);return((S==null?void 0:S.zones)||[]).find(w=>Q(h,w.rect))}function Ze(r){const a=r.message||`${r.name} is in progress. Check back soon!`;alert(a)}function ge(){return((S==null?void 0:S.clickZones)||[]).find(a=>a.id&&a.id.includes("computer"))||null}function Ye(){const r=ge();if(!r)return!1;const a=J();return Q(a,r.rect)}let ye=!1;function Xe(r){r!==ye&&(ye=r,m.style.display=r?"block":"none")}function me(r){r&&(typeof r.onInteract=="function"?r.onInteract():alert(r.message||"Nothing interesting happens."))}function Qe(){const r=ge();if(!r)return!1;const a=J();return Q(a,r.rect)?(me(r),!0):!1}function we(r,a){var x,w;const h=z[r];h&&(le=r,S=h,j=.3,Y=!0,i.width=h.playerSize.width,i.height=h.playerSize.height,i.renderWidth=((x=h.renderSize)==null?void 0:x.width)??null,i.renderHeight=((w=h.renderSize)==null?void 0:w.height)??null,a&&(i.x=X(a.x,i.width/2,H-i.width/2),i.y=X(a.y,i.height/2,D-i.height/2)),T=v.get(h.backgroundSrc)||null,i.frameIndex=1,i.frameTime=0,i.lastZoneId=null)}function Je(r,a,h){return a>=r.x&&a<=r.x+r.width&&h>=r.y&&h<=r.y+r.height}function xe(r){const a=(S==null?void 0:S.clickZones)||[];if(!a.length)return;const h=s.getBoundingClientRect(),x=s.width/h.width,w=s.height/h.height,I=(r.clientX-h.left)*x,_=(r.clientY-h.top)*w,$=a.find(B=>Je(B.rect,I,_));$&&me($)}function et(r){let a=0,h=0;A.has("left")&&(a-=1),A.has("right")&&(a+=1),A.has("up")&&(h-=1),A.has("down")&&(h+=1);let x=!1;if(a!==0||h!==0){x=!0,Math.abs(a)>Math.abs(h)?i.direction=a>0?"right":"left":i.direction=h>0?"down":"up",a!==0&&h!==0&&(a*=Math.SQRT1_2,h*=Math.SQRT1_2);const _=A.has("shift")?i.runSpeed:i.walkSpeed,$=X(i.x+a*_*r,20,H-20),B=X(i.y+h*_*r,35,D-25);ue($,i.y)||(i.x=$),ue(i.x,B)||(i.y=B)}j>0&&(j=Math.max(0,j-r));let w=Ve(i.x,i.y);Y&&(!w||w.type!=="transition"?Y=!1:w=null),j<=0&&w?w.type==="message"?i.lastZoneId!==w.id&&(Ze(w),i.lastZoneId=w.id):w.type==="transition"&&(we(w.target,w.targetSpawn),i.lastZoneId=null):!w&&!Y&&(i.lastZoneId=null),Xe(Ye());const I=A.has("shift")?ee(E,i.direction):ee(k,i.direction);if(p&&I){const _=A.has("shift")?.08:.14;x?(i.frameTime+=r,i.frameTime>=_&&(i.frameIndex=(i.frameIndex+1)%I.length,i.frameTime=0)):(i.frameIndex=1,i.frameTime=0)}}function tt(){d.fillStyle="#0b1524",d.fillRect(0,0,s.width,s.height),d.fillStyle="#ffffff",d.font='16px "Segoe UI"',d.textAlign="center",d.fillText("Loading New Bark Town assets...",s.width/2,s.height/2)}function it(){if(d.imageSmoothingEnabled=!1,!p||!T||!(T instanceof Image)||T.naturalWidth===0||T.naturalHeight===0){tt();return}d.drawImage(T,0,0,s.width,s.height);const r=A.has("shift")?ee(E,i.direction):ee(k,i.direction),a=r==null?void 0:r[i.frameIndex];if(a){const h=i.renderWidth??a.width,x=i.renderHeight??a.height;d.drawImage(a,Math.round(i.x-h/2),Math.round(i.y-x/2),h,x)}}let ve=!0,ce=performance.now();function be(r){if(!ve)return;const a=Math.min(.05,(r-ce)/1e3);ce=r,et(a),it(),requestAnimationFrame(be)}function nt(){const r=Ce(Te),a=Ce(Pe),x=[...r,...a].map(I=>Ae(g(`game_assets/${I}.png`)).then(_=>({name:I,img:_}))),w=Z.map(I=>Ae(I).then(_=>({src:I,img:_})));Promise.all([Promise.all(x),Promise.all(w)]).then(([I,_])=>{const $=new Map;I.forEach(({name:B,img:de})=>$.set(B,de)),k=Me(Te,$),E=Me(Pe,$),_.forEach(({src:B,img:de})=>v.set(B,de)),we(le,ae||void 0),p=!0}).finally(()=>{ce=performance.now(),requestAnimationFrame(be)})}const ke=r=>{if(Ue.has(r.code)&&Qe()){r.preventDefault();return}const a=fe[r.code];a&&(r.preventDefault(),A.add(a))},Ee=r=>{const a=fe[r.code];a&&(r.preventDefault(),A.delete(a))};window.addEventListener("keydown",ke),window.addEventListener("keyup",Ee),s.addEventListener("click",xe);const Se=()=>{ve=!1,window.removeEventListener("keydown",ke),window.removeEventListener("keyup",Ee),s.removeEventListener("click",xe)};if(e==="window"){const r=u.querySelector('[data-act="close"]');r==null||r.addEventListener("click",Se)}else u.__battleCleanup=Se;return nt(),u}function pt(){const t=document.createElement("div");return t.className="help-container",t.innerHTML=`
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
  `,se({title:"Help",body:t,width:480,height:520,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <circle cx="16" cy="16" r="14" fill="#4a90d9" stroke="#2d6ba3" stroke-width="1"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Georgia, serif">?</text>
  </svg>`})}const L=new at(document.getElementById("windows"));window.wm=L;const ft=493,ut=397,$e=1.5,gt=g("documents/Michael_Albert_Resume.pdf"),yt=[{id:"projects",label:"Projects",type:"folder"},{id:"work",label:"Work Experience",type:"folder"},{id:"involvement",label:"Involvement",type:"folder"},{id:"photography",label:"Photography",type:"camera"},{id:"about",label:"AboutMe.exe",type:"chat"},{id:"help",label:"Help.exe",type:"help"}],Re=document.getElementById("desktop"),Be=document.getElementById("taskbar-items"),pe=document.getElementById("start-btn"),O=document.getElementById("start-menu"),He=document.getElementById("clock"),De=document.getElementById("os-root"),G=document.getElementById("game-root"),W=["Hello, I'm Michael. Welcome to my portfolio website! Click, press enter, e, or spacebar to continue through this intro.","This website is modeled after New Bark town from Pokemon Heart Gold! You can explore and interact with the town!","Interact (Press E, Spacebar, Enter, or Click) with the blue computers in town by to learn about me!","Press continue to enter the game, press instructions if you need help navigating the website, and press the resumé link if you are in a rush!"],{overlay:R,textBox:ne,buttonsWrapper:mt,continueBtn:wt,instructionsBtn:xt}=Tt();G.appendChild(R);let q=null,te=0,U=!1;R.addEventListener("click",je);window.addEventListener("keydown",Fe);W.length<=1&&Ge();function vt(){q||(q=ht({mode:"standalone",onComputerInteract:bt,initialArea:"upstairs",initialSpawn:{x:191,y:154}}),q.style.margin="0 auto",R.isConnected?G.insertBefore(q,R):G.appendChild(q))}function bt(){G.classList.add("hidden"),De.classList.remove("hidden"),O.classList.add("hidden")}function kt(){De.classList.add("hidden"),G.classList.remove("hidden"),O.classList.add("hidden")}wt.addEventListener("click",()=>{vt(),R.classList.add("intro-overlay--hidden"),setTimeout(()=>R.remove(),300)});xt.addEventListener("click",()=>{ne.textContent=W[W.length-1]||""});function re(t){return t.toString().padStart(2,"0")}setInterval(()=>{const t=new Date;He.textContent=`${re(t.getHours())}:${re(t.getMinutes())}`},1e3);const ze=new Date;He.textContent=`${re(ze.getHours())}:${re(ze.getMinutes())}`;pe.addEventListener("click",()=>O.classList.toggle("hidden"));document.addEventListener("click",t=>{!O.contains(t.target)&&t.target!==pe&&!pe.contains(t.target)&&O.classList.add("hidden")});document.querySelectorAll("#start-menu [data-launch]").forEach(t=>{t.addEventListener("click",()=>{t.getAttribute("data-launch")==="AboutMe"&&Oe(),O.classList.add("hidden")})});document.getElementById("shutdown").addEventListener("click",()=>{confirm("Shut down mwaOS?")&&(L.closeAll(),kt())});document.getElementById("run-cmd").addEventListener("click",()=>{N(()=>import("./terminal-sLUZwMKN.js"),[],import.meta.url).then(t=>{L.openWindow(t.createTerminal())})});const oe=[{type:"image",value:g("wallpapers/windows.jpg")},{type:"image",value:g("wallpapers/classic.jpg")},{type:"image",value:g("wallpapers/snowy_mtn.JPG")},{type:"image",value:g("wallpapers/apple.jpg")}];let ie=0;function Ne(t){const e=document.getElementById("wallpaper");t.type==="image"?(e.style.background=`url('${t.value}') center center / cover no-repeat`,e.style.backgroundSize="cover",e.style.backgroundPosition="center center",e.style.backgroundRepeat="no-repeat",e.style.backgroundColor="#000",e.style.imageRendering="auto"):(e.style.background=t.value,e.style.backgroundSize="",e.style.backgroundPosition="")}document.getElementById("change-wallpaper").addEventListener("click",()=>{ie=(ie+1)%oe.length,Ne(oe[ie])});oe.length&&Ne(oe[ie]);function Et(t){return t==="folder"?`<img src="${g("icons/folder.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="folder"/>`:t==="camera"?`<img src="${g("icons/camera.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="camera"/>`:t==="chat"?`<img src="${g("icons/chat.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="chat"/>`:t==="game"?`<img src="${g("icons/games.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="games"/>`:t==="help"?`<img src="${g("icons/help.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="help"/>`:t==="exe"?`<svg viewBox="0 0 48 48" class="w-12 h-12" style='filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));'>
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
    </svg>`:`<img src="${g("icons/file.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="file"/>`}const St=[{top:20,left:15},{top:115,left:35},{top:210,left:8},{top:305,left:45},{top:25,left:110},{top:120,left:125}];function Lt(t,e){const n=document.createElement("button");n.className="desktop-icon";const o=St[e]||{top:20+e*95,left:20};return n.style.position="absolute",n.style.top=`${o.top}px`,n.style.left=`${o.left}px`,n.innerHTML=`${Et(t.type)}<span style="max-width: 80px; text-align: center; line-height: 1.3;">${t.label}</span>`,n.addEventListener("click",()=>{t.id==="about"?Oe():t.id==="help"?_t():It(t.id,t.label)}),n}yt.forEach((t,e)=>Re.appendChild(Lt(t,e)));L.onTaskbarUpdate=t=>{Be.innerHTML="",t.forEach(e=>{const n=document.createElement("button");n.className="task-item",n.innerHTML=`
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
    `,e.active&&n.classList.add("active"),e.minimized&&(n.style.opacity="0.7"),n.addEventListener("click",()=>L.focus(e.id)),Be.appendChild(n)})};function It(t,e){fetch(g("content/items.json")).then(n=>n.json()).then(n=>{We(n);const o=n[t]||{type:"folder",children:{}},c=ct({title:e,rootData:o,onOpenHardware:l=>{N(()=>import("./circuitViewer-DawS3EO4.js"),__vite__mapDeps([0,1]),import.meta.url).then(s=>{L.openWindow(s.createCircuitViewer(l))})},onOpenSoftware:l=>{N(()=>import("./softwareVisualizer-DJ5s2Tm6.js"),__vite__mapDeps([2,1]),import.meta.url).then(s=>{L.openWindow(s.createSoftwareVisualizer(l))})},onOpenText:l=>{N(()=>import("./articleViewer-CEjeh5Ow.js"),[],import.meta.url).then(s=>{L.openWindow(s.createArticleViewer(l))})},onOpenPdf:l=>{N(()=>import("./pdfViewer-DvVElbgt.js"),[],import.meta.url).then(s=>{L.openWindow(s.createPdfViewer(l))})},onOpenGallery:l=>{N(()=>import("./galleryViewer-Abu9FELN.js"),[],import.meta.url).then(s=>{L.openWindow(s.createGalleryViewer(l))})}});L.openWindow(c)})}function Oe(){fetch(g("content/about.json")).then(t=>t.json()).then(t=>{const e=t.profileImage||"profile.png";L.openWindow(dt({...t,profileImage:g(e)}))})}function _t(){L.openWindow(pt())}function Tt(){const t=document.createElement("div");t.className="intro-overlay";const e=document.createElement("div");e.className="intro-card",e.style.width=`${ft*$e}px`,e.style.height=`${ut*$e}px`;const n=document.createElement("div");n.className="intro-text",n.textContent=W[0];const o=document.createElement("div");o.className="intro-buttons",o.style.display="none";const c=he("Continue"),l=he("More Instructions"),s=he("RESUME","a");return s.href=gt,s.target="_blank",s.rel="noopener noreferrer",o.append(c,l,s),e.append(n,o),t.append(e),{overlay:t,textBox:n,buttonsWrapper:o,continueBtn:c,instructionsBtn:l,resumeBtn:s}}function he(t,e="button"){const n=document.createElement(e);return e==="button"&&(n.type="button"),n.className="intro-button",n.textContent=t,n}function je(){U||qe()}function Fe(t){if(U)return;[" ","Space","Spacebar","Enter","e","E"].includes(t.key)&&(t.preventDefault(),qe())}function qe(){te<W.length-1?(te+=1,ne.textContent=W[te]):U||(ne.textContent=W[te],Ge())}function Ge(){U||(ne.textContent="",mt.style.display="flex",U=!0,R.removeEventListener("click",je),window.removeEventListener("keydown",Fe))}Re.addEventListener("contextmenu",t=>{t.preventDefault(),document.querySelectorAll(".context-menu").forEach(c=>c.remove());const e=document.createElement("div");e.className="menu context-menu absolute",e.style.left=t.clientX+"px",e.style.top=t.clientY+"px",e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.getBoundingClientRect();n.right>window.innerWidth&&(e.style.left=window.innerWidth-n.width-10+"px"),n.bottom>window.innerHeight-50&&(e.style.top=t.clientY-n.height+"px");function o(){e.remove(),document.removeEventListener("click",o)}setTimeout(()=>document.addEventListener("click",o),0)});export{N as _,g as a,se as m,We as n};
