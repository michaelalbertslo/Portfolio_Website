import{m as $,a as u}from"./index-B_DeCNZF.js";function E({title:v,imagePath:c,path:k=[],linkMap:f={}}){const n=document.createElement("div");n.className="gallery-container";let r=[],a=0;function x(e){if(!e)return"";try{const i=new URL(e);if(i.hostname.includes("youtu.be"))return`https://www.youtube.com/embed/${i.pathname.replace("/","")}`;if(i.hostname.includes("youtube.com")){const t=i.searchParams.get("v");if(t)return`https://www.youtube.com/embed/${t}`}return e}catch{return e}}function m(){n.innerHTML=`
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
    `}function h(){n.innerHTML=`
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
    `}function g(){if(r.length===0){h();return}const e=r.filter(t=>t.type==="image").length,i=r.filter(t=>t.type==="video").length;n.innerHTML=`
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
            ${i?`${e?" · ":""}${i} video${i!==1?"s":""}`:""}
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
          ${r.map((t,d)=>`
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
    `,n.querySelectorAll(".gallery-thumb").forEach(t=>{t.addEventListener("click",()=>{a=parseInt(t.dataset.index),p()}),t.addEventListener("mouseenter",()=>{t.style.borderColor="#4a90d9",t.style.transform="scale(1.02)"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="transparent",t.style.transform="scale(1)"})})}function p(){const e=r[a];n.innerHTML=`
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
          <span style="color: #888; font-size: 12px;">${a+1} / ${r.length}</span>
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
          ${a>0?`
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
          
          ${a<r.length-1?`
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
    `,n.querySelector(".back-to-grid").addEventListener("click",g);const i=n.querySelector(".nav-prev"),t=n.querySelector(".nav-next");i&&i.addEventListener("click",()=>{a--,p()}),t&&t.addEventListener("click",()=>{a++,p()});const d=o=>{o.key==="ArrowLeft"&&a>0?(a--,p()):o.key==="ArrowRight"&&a<r.length-1?(a++,p()):o.key==="Escape"&&g()};document.addEventListener("keydown",d),n._cleanupKeyboard=()=>{document.removeEventListener("keydown",d)}}async function b(){m();const e=c.split("/").filter(Boolean).pop(),i=u("images-manifest.json"),t=u(c.startsWith("/")?c.slice(1):c),d=o=>o.map(s=>({type:s.match(/\.(mp4|webm)$/i)?"video":"image",name:s,src:`${t}/${s}`,link:f[s]}));try{const o=await fetch(i);if(o.ok){const y=(await o.json())[e]||[];r=d(y)}}catch(o){console.log("Gallery: Could not load manifest",o)}if(!r.length)try{const o=await fetch(`/api/gallery/${e}`);if(o.ok){const s=await o.json(),y=s.images||[],w=s.videos||[];r=[...y.map(l=>({type:"image",name:l,src:`${t}/${l}`,link:f[l]})),...w.map(l=>({type:"video",name:l,src:`${t}/${l}`,link:f[l]}))]}}catch(o){console.log("Gallery: Could not load images from API",o)}g()}return b(),$({title:v,body:n,width:650,height:500,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#5090c0" stroke="#2d6090" stroke-width="1"/>
    <circle cx="10" cy="12" r="3" fill="#ffd93d"/>
    <path d="M4 24l8-8 4 4 8-10 4 6v8H4z" fill="#4ade80"/>
  </svg>`})}export{E as createGalleryViewer};
