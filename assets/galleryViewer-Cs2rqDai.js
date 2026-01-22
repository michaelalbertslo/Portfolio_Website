import{m as $,a as u}from"./index-CKQF8gEq.js";function E({title:v,imagePath:c,path:k=[],linkMap:f={}}){const o=document.createElement("div");o.className="gallery-container";let i=[],r=0;function x(e){if(!e)return"";try{const a=new URL(e);if(a.hostname.includes("youtu.be"))return`https://www.youtube.com/embed/${a.pathname.replace("/","")}`;if(a.hostname.includes("youtube.com")){const t=a.searchParams.get("v");if(t)return`https://www.youtube.com/embed/${t}`}return e}catch{return e}}function b(){o.innerHTML=`
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #1a1a1a;
        color: #888;
        font-family: 'Segoe UI', sans-serif;
      ">
        <div style="text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
          <div>Loading images...</div>
        </div>
      </div>
    `}function m(){o.innerHTML=`
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #1a1a1a;
        color: #888;
        font-family: 'Segoe UI', sans-serif;
      ">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">📷</div>
          <div style="font-size: 14px;">No images found</div>
          <div style="font-size: 12px; margin-top: 8px; color: #666;">
            Add images to: public${c}
          </div>
        </div>
      </div>
    `}function y(){if(typeof o._cleanupKeyboard=="function"&&(o._cleanupKeyboard(),o._cleanupKeyboard=null),i.length===0){m();return}const e=i.filter(t=>t.type==="image").length,a=i.filter(t=>t.type==="video").length;o.innerHTML=`
      <div class="gallery-wrapper" style="
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #1a1a1a;
      ">
        <!-- Toolbar -->
        <div style="
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          border-bottom: 1px solid #333;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Segoe UI', sans-serif;
        ">
          <span style="color: #aaa; font-size: 12px;">
            ${e?`${e} image${e!==1?"s":""}`:""}
            ${a?`${e?" · ":""}${a} video${a!==1?"s":""}`:""}
          </span>
        </div>
        
        <!-- Grid -->
        <div class="gallery-grid" style="
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
          align-content: start;
        ">
          ${i.map((t,d)=>`
            <div class="gallery-thumb" data-index="${d}" style="
              aspect-ratio: 1;
              border-radius: 4px;
              overflow: hidden;
              cursor: pointer;
              background: #2a2a2a;
              border: 2px solid transparent;
              transition: border-color 0.15s, transform 0.15s;
            ">
              ${t.type==="video"?`<video src="${t.src}" muted playsinline loop style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background: #000;
                  "></video>`:`<img src="${t.src}" alt="${t.name}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  " loading="lazy"/>`}
            </div>
          `).join("")}
        </div>
      </div>
    `,o.querySelectorAll(".gallery-thumb").forEach(t=>{t.addEventListener("click",()=>{r=parseInt(t.dataset.index),p()}),t.addEventListener("mouseenter",()=>{t.style.borderColor="#4a90d9",t.style.transform="scale(1.02)"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="transparent",t.style.transform="scale(1)"})})}function p(){typeof o._cleanupKeyboard=="function"&&(o._cleanupKeyboard(),o._cleanupKeyboard=null);const e=i[r];o.innerHTML=`
      <div class="lightbox" style="
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #0a0a0a;
      ">
        <!-- Toolbar -->
        <div style="
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
          border-bottom: 1px solid #222;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Segoe UI', sans-serif;
        ">
          <button class="back-to-grid" style="
            background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%);
            border: 1px solid #444;
            border-radius: 3px;
            color: #ddd;
            padding: 4px 12px;
            cursor: pointer;
            font-size: 12px;
          ">← Back to Grid</button>
          <span style="color: #888; font-size: 12px;">${r+1} / ${i.length}</span>
          <span style="color: #666; font-size: 11px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(e==null?void 0:e.name)||""}</span>
          ${e!=null&&e.link?`<a href="${e.link}" target="_blank" rel="noopener noreferrer" style="color:#4a90d9;font-size:12px;text-decoration:none;">Open on YouTube ↗</a>`:""}
        </div>
        
        <!-- Media viewer -->
        <div style="
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        ">
          ${r>0?`
            <button class="nav-prev" style="
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.6);
              border: 1px solid #333;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              z-index: 10;
            ">‹</button>
          `:""}
          
          ${e!=null&&e.link?`<iframe src="${x(e.link)}" title="${e.name}" style="
                width: 90%;
                height: 90%;
                border: 0;
                border-radius: 6px;
                background: #000;
              " allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`:(e==null?void 0:e.type)==="video"?`<video src="${e.src}" controls playsinline style="
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                  background: #000;
                "></video>`:`<img src="${e.src}" alt="${(e==null?void 0:e.name)||""}" style="
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                "/>`}
          
          ${r<i.length-1?`
            <button class="nav-next" style="
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.6);
              border: 1px solid #333;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              z-index: 10;
            ">›</button>
          `:""}
        </div>
      </div>
    `,o.querySelector(".back-to-grid").addEventListener("click",()=>{typeof o._cleanupKeyboard=="function"&&(o._cleanupKeyboard(),o._cleanupKeyboard=null),y()});const a=o.querySelector(".nav-prev"),t=o.querySelector(".nav-next");a&&a.addEventListener("click",()=>{r--,p()}),t&&t.addEventListener("click",()=>{r++,p()});const d=n=>{n.key==="ArrowLeft"&&r>0?(r--,p()):n.key==="ArrowRight"&&r<i.length-1?(r++,p()):n.key==="Escape"&&y()};document.addEventListener("keydown",d),o._cleanupKeyboard=()=>{document.removeEventListener("keydown",d)}}async function h(){b();const e=c.split("/").filter(Boolean).pop(),a=u("images-manifest.json"),t=u(c.startsWith("/")?c.slice(1):c),d=n=>n.map(s=>({type:s.match(/\.(mp4|webm)$/i)?"video":"image",name:s,src:`${t}/${s}`,link:f[s]}));try{const n=await fetch(a);if(n.ok){const g=(await n.json())[e]||[];i=d(g)}}catch(n){console.log("Gallery: Could not load manifest",n)}if(!i.length)try{const n=await fetch(`/api/gallery/${e}`);if(n.ok){const s=await n.json(),g=s.images||[],w=s.videos||[];i=[...g.map(l=>({type:"image",name:l,src:`${t}/${l}`,link:f[l]})),...w.map(l=>({type:"video",name:l,src:`${t}/${l}`,link:f[l]}))]}}catch(n){console.log("Gallery: Could not load images from API",n)}y()}return h(),$({title:v,body:o,width:650,height:500,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#5090c0" stroke="#2d6090" stroke-width="1"/>
    <circle cx="10" cy="12" r="3" fill="#ffd93d"/>
    <path d="M4 24l8-8 4 4 8-10 4 6v8H4z" fill="#4ade80"/>
  </svg>`})}export{E as createGalleryViewer};
