const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./circuitViewer-iQR6_hSF.js","./OrbitControls-hv_4xcvx.js","./softwareVisualizer-D_DxevZL.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))r(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const s of d.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(c){if(c.ep)return;c.ep=!0;const d=i(c);fetch(c.href,d)}})();const dt="modulepreload",ct=function(t,e){return new URL(t,e).href},Pe={},D=function(e,i,r){let c=Promise.resolve();if(i&&i.length>0){const s=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),x=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));c=Promise.allSettled(i.map(y=>{if(y=ct(y,r),y in Pe)return;Pe[y]=!0;const f=y.endsWith(".css"),m=f?'[rel="stylesheet"]':"";if(!!r)for(let E=s.length-1;E>=0;E--){const g=s[E];if(g.href===y&&(!f||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${y}"]${m}`))return;const v=document.createElement("link");if(v.rel=f?"stylesheet":dt,f||(v.as="script"),v.crossOrigin="",v.href=y,x&&v.setAttribute("nonce",x),document.head.appendChild(v),f)return new Promise((E,g)=>{v.addEventListener("load",E),v.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${y}`)))})}))}function d(s){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=s,window.dispatchEvent(h),!h.defaultPrevented)throw s}return c.then(s=>{for(const h of s||[])h.status==="rejected"&&d(h.reason);return e().catch(d)})};let Ae=10,ht=1;class pt{constructor(e){this.layer=e,this.windows=new Map,this.onTaskbarUpdate=null}openWindow(e){const i="win-"+ht++;e.dataset.id=i,e.style.left=100+Math.random()*200+"px",e.style.top=60+Math.random()*120+"px",e.style.zIndex=++Ae,this.layer.appendChild(e),this.windows.set(i,{el:e,title:e.querySelector(".title").textContent,active:!0}),this._bindWindow(e),this._updateTaskbar()}_bindWindow(e){const i=e.querySelector(".win-titlebar"),r=e.querySelector("[data-act=close]"),c=e.querySelector("[data-act=min]"),d=e.querySelector("[data-act=max]");[r,c,d].forEach(f=>f==null?void 0:f.addEventListener("pointerdown",m=>m.stopPropagation()));let s=!1,h=0,x=0,y=null;i.addEventListener("pointerdown",f=>{if(f.target&&f.target.closest&&f.target.closest(".win-actions")||f.button!==0)return;s=!0,y=f.pointerId;const m=e.getBoundingClientRect();h=f.clientX-m.left,x=f.clientY-m.top,e.setPointerCapture(f.pointerId),this.focus(e.dataset.id)}),e.addEventListener("pointermove",f=>{if(!s||f.pointerId!==y)return;const m=f.clientX-h,z=f.clientY-x;e.style.left=m+"px",e.style.top=Math.max(4,z)+"px"}),e.addEventListener("pointerup",f=>{f.pointerId===y&&(s=!1,y=null,e.hasPointerCapture(f.pointerId)&&e.releasePointerCapture(f.pointerId))}),e.addEventListener("pointercancel",f=>{f.pointerId===y&&(s=!1,y=null)}),e.addEventListener("lostpointercapture",()=>{s=!1,y=null}),r==null||r.addEventListener("click",()=>this.close(e.dataset.id)),c==null||c.addEventListener("click",()=>this.minimize(e.dataset.id)),d==null||d.addEventListener("click",()=>this.toggleMaximize(e.dataset.id)),e.addEventListener("mousedown",()=>this.focus(e.dataset.id))}focus(e){const i=this.windows.get(e);i&&(i.el.style.display==="none"&&(i.el.style.display=""),i.el.style.zIndex=++Ae,this.windows.forEach((r,c)=>r.active=c===e),this._updateTaskbar())}close(e){const i=this.windows.get(e);i&&(i.el.remove(),this.windows.delete(e),this._updateTaskbar())}closeAll(){this.windows.forEach(e=>e.el.remove()),this.windows.clear(),this._updateTaskbar()}minimize(e){const i=this.windows.get(e);i&&(i.el.style.display="none",i.active=!1,this._updateTaskbar())}toggleMaximize(e){const i=this.windows.get(e);if(!i)return;const r=i.el;if(r.classList.contains("maxim"))r.classList.remove("maxim"),r.style.left=r.dataset.prevLeft,r.style.top=r.dataset.prevTop,r.style.width=r.dataset.prevWidth,r.style.height=r.dataset.prevHeight;else{const c=r.getBoundingClientRect();r.dataset.prevLeft=r.style.left,r.dataset.prevTop=r.style.top,r.dataset.prevWidth=r.style.width||c.width+"px",r.dataset.prevHeight=r.style.height||c.height+"px",r.style.left="10px",r.style.top="10px",r.style.width="calc(100vw - 20px)",r.style.height="calc(100vh - 60px)",r.classList.add("maxim")}}_updateTaskbar(){if(!this.onTaskbarUpdate)return;const e=[];this.windows.forEach((i,r)=>e.push({id:r,title:i.title,active:i.active,minimized:i.el.style.display==="none"})),this.onTaskbarUpdate(e)}}function se({title:t,body:e,width:i=600,height:r=420,icon:c}){const d=document.createElement("div");d.className="win absolute",d.style.width=i+"px",d.style.height=r+"px";const s=c||`
    <svg width="16" height="16" viewBox="0 0 16 16" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="url(#iconGrad)"/>
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5a9fd4"/>
          <stop offset="100%" stop-color="#2d6ba3"/>
        </linearGradient>
      </defs>
    </svg>
  `;return d.innerHTML=`
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
  `,typeof e!="string"&&e instanceof HTMLElement&&d.querySelector(".win-body").appendChild(e),d}function u(t=""){const e="./",i=t.startsWith("/")?t.slice(1):t;return`${e.endsWith("/")?e:`${e}/`}${i}`}function Ne(t){return!t||typeof t!="object"||(typeof t.src=="string"&&(t.src=u(t.src)),typeof t.imagePath=="string"&&(t.imagePath=u(t.imagePath)),Array.isArray(t.images)&&(t.images=t.images.map(e=>typeof e=="string"?u(e):e)),t.children&&typeof t.children=="object"&&Object.values(t.children).forEach(e=>Ne(e))),t}const A={folder:`<img src="${u("icons/folder.png")}" class="w-8 h-8" alt="folder"/>`,text:`<img src="${u("icons/file.png")}" class="w-8 h-8" alt="file"/>`,hardware:`<svg viewBox="0 0 32 32" class="w-8 h-8">
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
  </svg>`,camera:`<img src="${u("icons/camera.png")}" class="w-8 h-8" alt="camera"/>`,pdf:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="4" y="2" width="24" height="28" rx="2" fill="#e74c3c" stroke="#c0392b" stroke-width="1"/>
    <rect x="7" y="5" width="18" height="4" fill="rgba(255,255,255,0.3)"/>
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="Arial">PDF</text>
  </svg>`,back:`<svg viewBox="0 0 32 32" class="w-6 h-6">
    <path d="M20 8l-8 8 8 8" stroke="#666" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`};function Ce(t,e){return t.type==="folder"?A.folder:t.type==="hardware"||e.endsWith(".sch")?A.hardware:t.type==="software"||e.endsWith(".flow")?A.software:t.type==="links"||e.endsWith(".url")?A.links:t.type==="pdf"||e.endsWith(".pdf")?A.pdf:t.type==="image"||/\.(jpg|png|gif|webp)$/i.test(e)?A.image:t.type==="gallery"?A.camera:A.text}function q(t){return t.endsWith(".txt")?t.replace(".txt",""):t}function ft(t,e){return t.type==="folder"?"File Folder":t.type==="hardware"||e.endsWith(".sch")?"Hardware Schematic":t.type==="software"||e.endsWith(".flow")?"Software Flowchart":t.type==="links"||e.endsWith(".url")?"Internet Shortcut":t.type==="pdf"||e.endsWith(".pdf")?"PDF Document":t.type==="image"?"Image File":t.type==="gallery"?"Photo Gallery":t.type==="text"||e.endsWith(".txt")?"Text Document":"File"}function gt({title:t,rootData:e,onOpenHardware:i,onOpenSoftware:r,onOpenText:c,onOpenPdf:d,onOpenGallery:s}){const h=document.createElement("div");h.className="h-full flex flex-col file-explorer";let x=[],y=e;function f(g){let l=e;for(const o of g)l.children&&l.children[o]&&(l=l.children[o]);return l}function m(){y=f(x);const g=y.children||{},l=Object.entries(g);h.innerHTML=`
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
        " ${x.length===0?'disabled style="opacity: 0.5; cursor: default;"':""}>
          ${A.back} Back
        </button>
        <div style="width: 1px; height: 20px; background: #ccc;"></div>
        <div style="flex: 1; font-size: 12px; color: #666;">
          ${l.length} item(s)
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
          ${x.map((o,k)=>`
            <span style="color: #999;">›</span>
            <span class="crumb" data-path="${x.slice(0,k+1).join("/")}" style="cursor: pointer; color: #0066cc;">${o}</span>
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
          ${l.map(([o,k])=>`
            <div class="file-item" data-name="${o}" style="
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
              ${Ce(k,o)}
              <span style="
                font-size: 11px;
                word-break: break-word;
                line-height: 1.2;
                max-width: 80px;
              ">${q(o)}</span>
            </div>
          `).join("")}
          ${l.length===0?'<div style="color: #999; font-size: 12px; padding: 20px;">This folder is empty</div>':""}
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
    `,z()}function z(){const g=h.querySelector(".nav-back");g&&x.length>0&&g.addEventListener("click",()=>{x.pop(),m()}),h.querySelectorAll(".crumb").forEach(l=>{l.addEventListener("click",()=>{const o=l.dataset.path;x=o?o.split("/"):[],m()})}),h.querySelectorAll(".file-item").forEach(l=>{const o=l.dataset.name,k=y.children[o];l.addEventListener("click",K=>{h.querySelectorAll(".file-item").forEach(T=>T.classList.remove("selected")),l.classList.add("selected"),v(o,k)}),l.addEventListener("dblclick",()=>{E(o,k)})})}function v(g,l){const o=h.querySelector(".details-content"),k=l.meta||{},K=q(g);let T=`
      <div style="text-align: center; margin-bottom: 12px;">
        <div style="transform: scale(1.5); display: inline-block; margin-bottom: 8px;">
          ${Ce(l,g)}
        </div>
        <div style="font-weight: 600; margin-top: 8px;">${K}</div>
        <div style="color: #666; font-size: 11px;">${ft(l,g)}</div>
      </div>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
    `;if(l.type==="folder"){const C=Object.keys(l.children||{}).length;T+=`
        <div><strong>Contains:</strong> ${C} item(s)</div>
        ${k.date?`<div style="margin-top: 8px;"><strong>Date:</strong> ${k.date}</div>`:""}
        ${k.location?`<div><strong>Location:</strong> ${k.location}</div>`:""}
        ${k.category?`<div><strong>Type:</strong> ${k.category}</div>`:""}
      `}else if(l.type==="text"){const C=Array.isArray(l.content)?l.content.join(`
`):l.content,ae=C.substring(0,150)+(C.length>150?"...":"");T+=`
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
      `}else l.type==="links"?T+=`
        <div style="margin-top: 8px;">
          ${l.links.map(C=>`
            <a href="${C.href}" target="_blank" style="
              display: block;
              padding: 6px 8px;
              margin-bottom: 4px;
              background: white;
              border: 1px solid #ccc;
              border-radius: 3px;
              color: #0066cc;
              text-decoration: none;
              font-size: 11px;
            ">${C.label} ↗</a>
          `).join("")}
        </div>
      `:l.type==="hardware"||l.type==="software"?T+=`
        <div style="color: #666; margin-bottom: 8px;">
          Double-click to open ${l.type==="hardware"?"3D schematic viewer":"software flowchart"}
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
        ">Open ${l.type==="hardware"?"Schematic":"Flowchart"}</button>
      `:l.type==="pdf"&&(T+=`
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
      `);o.innerHTML=T;const Z=o.querySelector(".open-viewer-btn");Z&&Z.addEventListener("click",()=>E(g,l));const Y=o.querySelector(".open-pdf-btn");Y&&Y.addEventListener("click",()=>E(g,l));const W=o.querySelector(".open-text-btn");W&&W.addEventListener("click",()=>E(g,l))}function E(g,l){var o;l.type==="folder"?(x.push(g),m()):l.type==="hardware"&&i?i({title:g.replace(".sch",""),graph:l.graph,path:[...x,g]}):l.type==="software"&&r?r({title:g.replace(".flow",""),graph:l.graph,path:[...x,g]}):l.type==="text"&&c?c({title:q(g),content:l.content,images:l.images||[],path:[...x,g]}):l.type==="pdf"&&d?d({title:q(g),src:l.src,path:[...x,g]}):l.type==="gallery"&&s?s({title:q(g),imagePath:l.imagePath,path:[...x,g],linkMap:l.linkMap||{}}):l.type==="links"&&((o=l.links)!=null&&o[0])&&window.open(l.links[0].href,"_blank")}return m(),se({title:t,body:h,width:750,height:500,icon:A.folder})}function ut(t){const e=document.createElement("div");e.className="h-full about-view";const i=u(t.profileImage||"profile.png");return e.innerHTML=`
    <div class="flex gap-6 h-full about-layout">
      <!-- Left side: Profile Image & Quick Info -->
      <div class="flex flex-col items-center about-sidebar">
        <!-- Profile Image Container -->
        <div class="about-avatar">
          <img 
            src="${i}" 
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
  `,se({title:"AboutMe.exe",body:e,width:680,height:420})}const H=493,R=397,Me={down:["ethan2","ethan2","ethan3"],left:["ethan4","ethan5","ethan6"],up:["ethan7","ethan8","ethan9"],right:["ethan10","ethan11","ethan12"]},$e={down:["ethanrun7","ethanrun8","ethanrun9"],left:["ethanrun4","ethanrun5","ethanrun6"],up:["ethanrun1","ethanrun2","ethanrun3"],right:["ethanrun10","ethanrun11","ethanrun12"]};function Be(t){return new Promise(e=>{const i=new Image;i.onload=()=>e(i),i.onerror=()=>e(i),i.src=t})}function te(t,e){return t?t[e]||t.down:null}function ze(t){const e=new Set;return Object.values(t).forEach(i=>i.forEach(r=>e.add(r))),Array.from(e)}function We(t,e){const i={};return Object.entries(t).forEach(([r,c])=>{i[r]=c.map(d=>e.get(d))}),i}function yt(t={}){const{mode:e="window",onComputerInteract:i=null,initialArea:r="outside",initialSpawn:c=null}=t,d=document.createElement("div");d.style.cssText="height:100%;background:#0b1524;display:flex;flex-direction:column;gap:8px;padding:8px;font-family:Segoe UI";const s=document.createElement("canvas");s.width=H,s.height=R,s.style.width=H*1.5+"px",s.style.height=R*1.5+"px",s.style.border="1px solid rgba(0,0,0,0.35)",s.style.borderRadius="6px",s.style.background="#000",s.style.imageRendering="pixelated";const h=document.createElement("div");h.className="text-xs text-white",h.style.fontSize="12px",h.innerHTML=`
    <div><strong>Controls:</strong> Arrow Keys / WASD to walk • Hold Shift to run</div>
  `;const x=document.createElement("div");x.style.cssText=`
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
  `,x.textContent="Press E, Enter, Space, or click to interact with the computer.";const y=document.createElement("div");y.style.cssText=`
    display:none;
    margin:8px 0 0;
    padding:8px 12px;
    border:2px solid #8ec8ff;
    border-radius:4px;
    color:#eaf6ff;
    background:rgba(16,43,74,0.9);
    font-family:'Press Start 2P','VT323',monospace;
    font-size:11px;
    text-align:center;
    letter-spacing:0.3px;
    box-shadow:3px 3px 0 #061528;
  `,e!=="window"&&(d.style.border="none",d.style.borderRadius="0",d.style.padding="0",d.style.width="auto",d.style.height="auto",d.style.boxSizing="border-box",d.style.alignItems="center"),d.append(s,x,y,h);let f;e==="window"?f=se({title:"Battle.exe",body:d,width:H*1.5+80,height:R*1.5+160,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
        <rect x="4" y="4" width="24" height="24" rx="5" fill="#f8c146" stroke="#b46a00" stroke-width="1.2"/>
        <path d="M11 10h10M11 16h10M11 22h5" stroke="#5a2d00" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`}):f=d;const m=s.getContext("2d"),z=new Map;let v=null,E=null,g=null,l=!1;const o={x:H/2,y:R/2+40,width:24,height:30,renderWidth:null,renderHeight:null,direction:"down",frameIndex:1,frameTime:0,walkSpeed:95,runSpeed:160,lastZoneId:null},k=[{x:0,y:0,width:120,height:160},{x:180,y:80,width:20,height:28},{x:120,y:72,width:45,height:26},{x:150,y:108,width:13,height:28},{x:116,y:130,width:16,height:14},{x:200,y:0,width:46,height:126},{x:280,y:0,width:213,height:100},{x:330,y:100,width:15,height:73},{x:385,y:60,width:116,height:104},{x:0,y:0,width:120,height:160},{x:424,y:160,width:68,height:25},{x:452,y:185,width:41,height:55},{x:400,y:240,width:93,height:156},{x:0,y:360,width:400,height:36},{x:0,y:340,width:156,height:20},{x:0,y:240,width:20,height:100},{x:20,y:240,width:60,height:60},{x:200,y:213,width:15,height:7},{x:90,y:220,width:13,height:60},{x:120,y:220,width:31,height:56},{x:0,y:0,width:120,height:160},{x:260,y:240,width:75,height:45},{x:248,y:278,width:14,height:28},{x:240,y:0,width:26,height:70}],K=[{x:0,y:0,width:494,height:70},{x:0,y:70,width:16,height:327},{x:0,y:364,width:20,height:55},{x:453,y:146,width:41,height:41},{x:284,y:50,width:41,height:120},{x:288,y:216,width:77,height:70},{x:0,y:100,width:114,height:30}],T=[{x:85,y:157,width:55,height:17},{x:0,y:0,width:494,height:119},{x:268,y:106,width:121,height:48},{x:390,y:0,width:104,height:397},{x:0,y:317,width:494,height:81},{x:0,y:0,width:80,height:397},{x:103,y:233,width:47,height:75},{x:358,y:282,width:28,height:27}],Z={x:367,y:170},Y=[{x:0,y:328,width:51,height:52},{x:0,y:0,width:14,height:380},{x:12,y:229,width:81,height:45},{x:14,y:0,width:40,height:141},{x:53,y:0,width:70,height:137},{x:128,y:0,width:72,height:90},{x:199,y:0,width:35,height:112},{x:240,y:0,width:102,height:124},{x:344,y:0,width:79,height:112},{x:426,y:0,width:47,height:141},{x:244,y:195,width:230,height:82},{x:421,y:307,width:37,height:73},{x:460,y:0,width:12,height:397}],W={outside:{backgroundSrc:u("game_assets/New_Bark_Town_HGSS.png"),playerSize:{width:24,height:30},collisionRects:k,zones:[{id:"professor-elm",type:"transition",name:"Professor Elm Lab",rect:{x:180,y:116,width:20,height:10},target:"lab1f",targetSpawn:{x:120,y:340}},{id:"players-home-entry",type:"transition",name:"Player's Home",rect:{x:357,y:145,width:20,height:10},target:"downstairs",targetSpawn:{x:141,y:400}},{id:"rival-house",type:"message",name:"Rival's House",rect:{x:278,y:284,width:20,height:10},message:"Rival's House is in progress. Check back soon!"},{id:"guest-house",type:"message",name:"Guest House",rect:{x:102,y:270,width:20,height:10},message:"The guest house is being decorated right now."}],clickZones:[]},lab1f:{backgroundSrc:u("game_assets/lab_1f.png"),playerSize:{width:34,height:46},collisionRects:Y,renderSize:{width:34,height:46},zones:[{id:"lab1f-exit",type:"transition",name:"Outside",rect:{x:112,y:360,width:60,height:22},target:"outside",targetSpawn:{x:190,y:155}}],clickZones:[{id:"lab1f-computer",rect:{x:128,y:90,width:72,height:34},onInteract:()=>{typeof i=="function"?i():F("The computer hums quietly. Nothing new to check right now.")},message:"The computer hums quietly. Nothing new to check right now."},{id:"lab1f-device",rect:{x:240,y:124,width:100,height:34},onInteract:()=>{F("The device is inactive... for now.")},message:"The device is inactive... for now."}]},downstairs:{backgroundSrc:u("game_assets/ethan_downstairs.png"),playerSize:{width:32,height:48},collisionRects:K,renderSize:{width:32,height:48},zones:[{id:"downstairs-to-outside",type:"transition",name:"Outside",rect:{x:102,y:316,width:75,height:57},target:"outside",targetSpawn:Z},{id:"downstairs-to-upstairs",type:"transition",name:"Upstairs",rect:{x:117,y:71,width:66,height:65},target:"upstairs",targetSpawn:{x:191,y:154}}],clickZones:[]},upstairs:{backgroundSrc:u("game_assets/ethan_room.png"),playerSize:{width:32,height:48},collisionRects:T,renderSize:{width:32,height:48},zones:[{id:"upstairs-to-downstairs",type:"transition",name:"Downstairs",rect:{x:138,y:120,width:20,height:55},target:"downstairs",targetSpawn:{x:178,y:112}}],clickZones:[{id:"upstairs-computer",rect:{x:235,y:115,width:60,height:62},onInteract:()=>{typeof i=="function"?i():F("The computer hums quietly. Nothing new to check right now.")},message:"The computer hums quietly. Nothing new to check right now."}]}},C=Array.from(new Set(Object.values(W).map(n=>n.backgroundSrc))),ae=W[r]?r:"outside",Ye=c;let le=ae,S=W[le],j=0,X=!1;const P=new Set,xe={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",KeyW:"up",KeyS:"down",KeyA:"left",KeyD:"right",ShiftLeft:"shift",ShiftRight:"shift"},Xe=new Set(["KeyE","Enter","Space"]);function Q(n,a,p){return Math.max(a,Math.min(p,n))}function J(n,a){return n.x<a.x+a.width&&n.x+n.width>a.x&&n.y<a.y+a.height&&n.y+n.height>a.y}function Qe(n,a,p,b){return{x:n-p/2,y:a-b/2,width:p,height:b}}function ee(n=o.x,a=o.y){return Qe(n,a,o.width,o.height)}function me(n,a){const p=ee(n,a);return((S==null?void 0:S.collisionRects)||[]).some(w=>J(p,w))}function Je(n,a){const p=ee(n,a);return((S==null?void 0:S.zones)||[]).find(w=>J(p,w.rect))}let de;function F(n){n&&(y.textContent=n,y.style.display="block",de&&clearTimeout(de),de=setTimeout(()=>{y.style.display="none"},3500))}function et(n){const a=n.message||`${n.name} is in progress. Check back soon!`;F(a)}function we(){return((S==null?void 0:S.clickZones)||[]).find(a=>a.id&&a.id.includes("computer"))||null}function tt(){const n=we();if(!n)return!1;const a=ee();return J(a,n.rect)}let ve=!1;function it(n){n!==ve&&(ve=n,x.style.display=n?"block":"none")}function be(n){n&&(typeof n.onInteract=="function"?n.onInteract():F(n.message||"Nothing interesting happens."))}function nt(){const n=we();if(!n)return!1;const a=ee();return J(a,n.rect)?(be(n),!0):!1}function ke(n,a){var b,w;const p=W[n];p&&(le=n,S=p,j=.3,X=!0,o.width=p.playerSize.width,o.height=p.playerSize.height,o.renderWidth=((b=p.renderSize)==null?void 0:b.width)??null,o.renderHeight=((w=p.renderSize)==null?void 0:w.height)??null,a&&(o.x=Q(a.x,o.width/2,H-o.width/2),o.y=Q(a.y,o.height/2,R-o.height/2)),v=z.get(p.backgroundSrc)||null,o.frameIndex=1,o.frameTime=0,o.lastZoneId=null)}function ot(n,a,p){return a>=n.x&&a<=n.x+n.width&&p>=n.y&&p<=n.y+n.height}function Ee(n){const a=(S==null?void 0:S.clickZones)||[];if(!a.length)return;const p=s.getBoundingClientRect(),b=s.width/p.width,w=s.height/p.height,L=(n.clientX-p.left)*b,_=(n.clientY-p.top)*w,M=a.find(B=>ot(B.rect,L,_));M&&be(M)}function rt(n){let a=0,p=0;P.has("left")&&(a-=1),P.has("right")&&(a+=1),P.has("up")&&(p-=1),P.has("down")&&(p+=1);let b=!1;if(a!==0||p!==0){b=!0,Math.abs(a)>Math.abs(p)?o.direction=a>0?"right":"left":o.direction=p>0?"down":"up",a!==0&&p!==0&&(a*=Math.SQRT1_2,p*=Math.SQRT1_2);const _=P.has("shift")?o.runSpeed:o.walkSpeed,M=Q(o.x+a*_*n,20,H-20),B=Q(o.y+p*_*n,35,R-25);me(M,o.y)||(o.x=M),me(o.x,B)||(o.y=B)}j>0&&(j=Math.max(0,j-n));let w=Je(o.x,o.y);X&&(!w||w.type!=="transition"?X=!1:w=null),j<=0&&w?w.type==="message"?o.lastZoneId!==w.id&&(et(w),o.lastZoneId=w.id):w.type==="transition"&&(ke(w.target,w.targetSpawn),o.lastZoneId=null):!w&&!X&&(o.lastZoneId=null),it(tt());const L=P.has("shift")?te(g,o.direction):te(E,o.direction);if(l&&L){const _=P.has("shift")?.08:.14;b?(o.frameTime+=n,o.frameTime>=_&&(o.frameIndex=(o.frameIndex+1)%L.length,o.frameTime=0)):(o.frameIndex=1,o.frameTime=0)}}function st(){m.fillStyle="#0b1524",m.fillRect(0,0,s.width,s.height),m.fillStyle="#ffffff",m.font='16px "Segoe UI"',m.textAlign="center",m.fillText("Loading New Bark Town assets...",s.width/2,s.height/2)}function at(){if(m.imageSmoothingEnabled=!1,!l||!v||!(v instanceof Image)||v.naturalWidth===0||v.naturalHeight===0){st();return}m.drawImage(v,0,0,s.width,s.height);const n=P.has("shift")?te(g,o.direction):te(E,o.direction),a=n==null?void 0:n[o.frameIndex];if(a){const p=o.renderWidth??a.width,b=o.renderHeight??a.height;m.drawImage(a,Math.round(o.x-p/2),Math.round(o.y-b/2),p,b)}}let Se=!0,ce=performance.now();function Ie(n){if(!Se)return;const a=Math.min(.05,(n-ce)/1e3);ce=n,rt(a),at(),requestAnimationFrame(Ie)}function lt(){const n=ze(Me),a=ze($e),b=[...n,...a].map(L=>Be(u(`game_assets/${L}.png`)).then(_=>({name:L,img:_}))),w=C.map(L=>Be(L).then(_=>({src:L,img:_})));Promise.all([Promise.all(b),Promise.all(w)]).then(([L,_])=>{const M=new Map;L.forEach(({name:B,img:he})=>M.set(B,he)),E=We(Me,M),g=We($e,M),_.forEach(({src:B,img:he})=>z.set(B,he)),ke(le,Ye||void 0),l=!0}).finally(()=>{ce=performance.now(),requestAnimationFrame(Ie)})}const Le=n=>{if(Xe.has(n.code)&&nt()){n.preventDefault();return}const a=xe[n.code];a&&(n.preventDefault(),P.add(a))},_e=n=>{const a=xe[n.code];a&&(n.preventDefault(),P.delete(a))};window.addEventListener("keydown",Le),window.addEventListener("keyup",_e),s.addEventListener("click",Ee);const Te=()=>{Se=!1,window.removeEventListener("keydown",Le),window.removeEventListener("keyup",_e),s.removeEventListener("click",Ee)};if(e==="window"){const n=f.querySelector('[data-act="close"]');n==null||n.addEventListener("click",Te)}else f.__battleCleanup=Te;return lt(),f}function xt(){const t=document.createElement("div");return t.className="help-container",t.innerHTML=`
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
  </svg>`})}const I=new pt(document.getElementById("windows"));window.wm=I;const He=493,mt=397,pe=1.5,wt=u("documents/Michael_Albert_Resume.pdf"),vt=[{id:"projects",label:"Projects",type:"folder"},{id:"work",label:"Work Experience",type:"folder"},{id:"involvement",label:"Involvement",type:"folder"},{id:"photography",label:"Photography",type:"camera"},{id:"about",label:"AboutMe.exe",type:"chat"},{id:"help",label:"Help.exe",type:"help"}],Oe=document.getElementById("desktop"),Re=document.getElementById("taskbar-items"),ge=document.getElementById("start-btn"),N=document.getElementById("start-menu"),je=document.getElementById("clock"),Fe=document.getElementById("os-root"),O=document.getElementById("game-root"),U=["Hello, I'm Michael. Welcome to my portfolio website! Click, press enter, e, or spacebar to continue through this intro.","This website is modeled after New Bark town from Pokemon Heart Gold! You can explore and interact with the town!","Interact (Press E, Spacebar, Enter, or Click) with the blue computers in town by to learn about me!","Press continue to enter the game, press instructions if you need help navigating the website, and press the resumé link if you are in a rush!"],{overlay:$,textBox:ue,buttonsWrapper:bt,continueBtn:kt,instructionsBtn:Et,instructionsOverlay:ye,instructionsBackBtn:St}=$t();O.appendChild($);O.appendChild(ye);let G=null,ie=0,V=!1;$.addEventListener("click",Ue);window.addEventListener("keydown",Ve);U.length<=1&&Ze();function It(){G||(G=yt({mode:"standalone",onComputerInteract:Lt,initialArea:"upstairs",initialSpawn:{x:191,y:154}}),G.style.margin="0 auto",$.isConnected?O.insertBefore(G,$):O.appendChild(G))}function Lt(){O.classList.add("hidden"),Fe.classList.remove("hidden"),N.classList.add("hidden")}function _t(){Fe.classList.add("hidden"),O.classList.remove("hidden"),N.classList.add("hidden")}kt.addEventListener("click",()=>{It(),$.classList.add("intro-overlay--hidden"),setTimeout(()=>$.remove(),300)});Et.addEventListener("click",()=>{$.style.display="none",ye.style.display="flex"});St.addEventListener("click",()=>{ye.style.display="none",$.style.display="flex"});function oe(t){return t.toString().padStart(2,"0")}setInterval(()=>{const t=new Date;je.textContent=`${oe(t.getHours())}:${oe(t.getMinutes())}`},1e3);const De=new Date;je.textContent=`${oe(De.getHours())}:${oe(De.getMinutes())}`;ge.addEventListener("click",()=>N.classList.toggle("hidden"));document.addEventListener("click",t=>{!N.contains(t.target)&&t.target!==ge&&!ge.contains(t.target)&&N.classList.add("hidden")});document.querySelectorAll("#start-menu [data-launch]").forEach(t=>{t.addEventListener("click",()=>{t.getAttribute("data-launch")==="AboutMe"&&Ge(),N.classList.add("hidden")})});document.getElementById("shutdown").addEventListener("click",()=>{confirm("Shut down mwaOS?")&&(I.closeAll(),_t())});document.getElementById("run-cmd").addEventListener("click",()=>{D(()=>import("./terminal-CoJ8Ne5e.js"),[],import.meta.url).then(t=>{I.openWindow(t.createTerminal())})});const re=[{type:"image",value:u("wallpapers/windows.jpg")},{type:"image",value:u("wallpapers/classic.jpg")},{type:"image",value:u("wallpapers/snowy_mtn.JPG")},{type:"image",value:u("wallpapers/apple.jpg")}];let ne=0;function qe(t){const e=document.getElementById("wallpaper");t.type==="image"?(e.style.background=`url('${t.value}') center center / cover no-repeat`,e.style.backgroundSize="cover",e.style.backgroundPosition="center center",e.style.backgroundRepeat="no-repeat",e.style.backgroundColor="#000",e.style.imageRendering="auto"):(e.style.background=t.value,e.style.backgroundSize="",e.style.backgroundPosition="")}document.getElementById("change-wallpaper").addEventListener("click",()=>{ne=(ne+1)%re.length,qe(re[ne])});re.length&&qe(re[ne]);function Tt(t){return t==="folder"?`<img src="${u("icons/folder.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="folder"/>`:t==="camera"?`<img src="${u("icons/camera.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="camera"/>`:t==="chat"?`<img src="${u("icons/chat.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="chat"/>`:t==="game"?`<img src="${u("icons/games.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="games"/>`:t==="help"?`<img src="${u("icons/help.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="help"/>`:t==="exe"?`<svg viewBox="0 0 48 48" class="w-12 h-12" style='filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));'>
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
    </svg>`:`<img src="${u("icons/file.png")}" class="w-12 h-12" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="file"/>`}const Pt=[{top:20,left:15},{top:115,left:35},{top:210,left:8},{top:305,left:45},{top:25,left:110},{top:120,left:125}];function At(t,e){const i=document.createElement("button");i.className="desktop-icon";const r=Pt[e]||{top:20+e*95,left:20};return i.style.position="absolute",i.style.top=`${r.top}px`,i.style.left=`${r.left}px`,i.innerHTML=`${Tt(t.type)}<span style="max-width: 80px; text-align: center; line-height: 1.3;">${t.label}</span>`,i.addEventListener("click",()=>{t.id==="about"?Ge():t.id==="help"?Mt():Ct(t.id,t.label)}),i}vt.forEach((t,e)=>Oe.appendChild(At(t,e)));I.onTaskbarUpdate=t=>{Re.innerHTML="",t.forEach(e=>{const i=document.createElement("button");i.className="task-item",i.innerHTML=`
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
    `,e.active&&i.classList.add("active"),e.minimized&&(i.style.opacity="0.7"),i.addEventListener("click",()=>I.focus(e.id)),Re.appendChild(i)})};function Ct(t,e){fetch(u("content/items.json")).then(i=>i.json()).then(i=>{Ne(i);const r=i[t]||{type:"folder",children:{}},c=gt({title:e,rootData:r,onOpenHardware:d=>{D(()=>import("./circuitViewer-iQR6_hSF.js"),__vite__mapDeps([0,1]),import.meta.url).then(s=>{I.openWindow(s.createCircuitViewer(d))})},onOpenSoftware:d=>{D(()=>import("./softwareVisualizer-D_DxevZL.js"),__vite__mapDeps([2,1]),import.meta.url).then(s=>{I.openWindow(s.createSoftwareVisualizer(d))})},onOpenText:d=>{D(()=>import("./articleViewer-CEG9-YWt.js"),[],import.meta.url).then(s=>{I.openWindow(s.createArticleViewer(d))})},onOpenPdf:d=>{D(()=>import("./pdfViewer-DicGJJr3.js"),[],import.meta.url).then(s=>{I.openWindow(s.createPdfViewer(d))})},onOpenGallery:d=>{D(()=>import("./galleryViewer-Cs2rqDai.js"),[],import.meta.url).then(s=>{I.openWindow(s.createGalleryViewer(d))})}});I.openWindow(c)})}function Ge(){fetch(u("content/about.json")).then(t=>t.json()).then(t=>{const e=t.profileImage||"profile.png";I.openWindow(ut({...t,profileImage:u(e)}))})}function Mt(){I.openWindow(xt())}function $t(){const t=document.createElement("div");t.className="intro-overlay";const e=document.createElement("div");e.className="intro-card",e.style.width=`${He*pe}px`,e.style.height=`${mt*pe}px`;const i=document.createElement("div");i.className="intro-text",i.textContent=U[0];const r=document.createElement("div");r.className="intro-buttons",r.style.display="none";const c=fe("Continue"),d=fe("More Instructions"),s=fe("RESUME","a");s.href=wt,s.target="_blank",s.rel="noopener noreferrer",r.append(c,d,s),e.append(i,r),t.append(e);const h=document.createElement("div");h.className="intro-overlay",h.style.display="none",h.style.padding="32px 12px 16px",h.innerHTML=`
    <div style="
      width: ${He*pe}px;
      max-width: 95vw;
      background: #0b1524;
      border: 3px solid #8ec8ff;
      border-radius: 6px;
      box-shadow: 8px 8px 0 #0a1628;
      padding: 16px;
      color: #dbe9ff;
      font-family: 'Press Start 2P', 'VT323', monospace;
      font-size: 12px;
      line-height: 1.5;
    ">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <img src="${u("game_assets/intro_lecture.png")}" alt="guide" width="48" height="48" style="image-rendering: pixelated;"/>
        <div>
          <div style="font-size: 14px; color: #9bd1ff;">More Instructions</div>
        </div>
      </div>

      <div style="background: #102b4a; border: 2px solid #1f3f6a; padding: 10px; margin-bottom: 12px;">
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <img src="${u("game_assets/ethan_room.png")}" alt="room" width="72" height="58" style="image-rendering: pixelated; border: 2px solid #1f3f6a;"/>
          <div>
            <div style="color: #ffd93d;">[Tip #1]</div>
            <div>Use arrow keys or WASD to move. Hold Shift to run. You can leave the house and enter town by going downstairs and walking through the red doorway.</div>
          </div>
        </div>
      </div>

      <div style="background: #102b4a; border: 2px solid #1f3f6a; padding: 10px; margin-bottom: 12px;">
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <img src="${u("game_assets/lab_1f.png")}" alt="computer" width="72" height="58" style="image-rendering: pixelated; border: 2px solid #1f3f6a;"/>
          <div>
            <div style="color: #ffd93d;">[Tip #2]</div>
            <div>Interact with blue computers to learn about my projects(press E, Enter, or Space).</div>
          </div>
        </div>
      </div>

      <div style="background: #102b4a; border: 2px solid #1f3f6a; padding: 10px; margin-bottom: 12px;">
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <img src="${u("game_assets/New_Bark_Town_HGSS.png")}" alt="town" width="72" height="58" style="image-rendering: pixelated; border: 2px solid #1f3f6a;"/>
          <div>
            <div style="color: #ffd93d;">[Tip #3]</div>
            <div>Explore the rest of the town. You can enter other buildings by walking through the doors. Each building has its own features.</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; margin-top: 16px;">
        <button id="instructions-back" style="
          background: #52b82e;
          border: 3px solid #2f6b1a;
          border-radius: 3px;
          padding: 8px 16px;
          color: #0b1a0d;
          font-weight: 400;
          font-size: 12px;
          box-shadow: 3px 3px 0 #061528;
          cursor: pointer;
        ">Back to Intro</button>
      </div>
    </div>
  `;const x=h.querySelector("#instructions-back");return{overlay:t,textBox:i,buttonsWrapper:r,continueBtn:c,instructionsBtn:d,resumeBtn:s,instructionsOverlay:h,instructionsBackBtn:x}}function fe(t,e="button"){const i=document.createElement(e);return e==="button"&&(i.type="button"),i.className="intro-button",i.textContent=t,i}function Ue(){V||Ke()}function Ve(t){if(V)return;[" ","Space","Spacebar","Enter","e","E"].includes(t.key)&&(t.preventDefault(),Ke())}function Ke(){ie<U.length-1?(ie+=1,ue.textContent=U[ie]):V||(ue.textContent=U[ie],Ze())}function Ze(){V||(ue.textContent="",bt.style.display="flex",V=!0,$.removeEventListener("click",Ue),window.removeEventListener("keydown",Ve))}Oe.addEventListener("contextmenu",t=>{t.preventDefault(),document.querySelectorAll(".context-menu").forEach(c=>c.remove());const e=document.createElement("div");e.className="menu context-menu absolute",e.style.left=t.clientX+"px",e.style.top=t.clientY+"px",e.innerHTML=`
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
  `,document.body.appendChild(e);const i=e.getBoundingClientRect();i.right>window.innerWidth&&(e.style.left=window.innerWidth-i.width-10+"px"),i.bottom>window.innerHeight-50&&(e.style.top=t.clientY-i.height+"px");function r(){e.remove(),document.removeEventListener("click",r)}setTimeout(()=>document.addEventListener("click",r),0)});export{D as _,u as a,se as m,Ne as n};
