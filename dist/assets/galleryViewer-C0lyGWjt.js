import{m as b}from"./index-Df5W57sZ.js";function k({title:g,imagePath:a,path:m=[],linkMap:f={}}){const n=document.createElement("div");n.className="gallery-container";let i=[],r=0;function y(e){if(!e)return"";try{const o=new URL(e);if(o.hostname.includes("youtu.be"))return`https://www.youtube.com/embed/${o.pathname.replace("/","")}`;if(o.hostname.includes("youtube.com")){const t=o.searchParams.get("v");if(t)return`https://www.youtube.com/embed/${t}`}return e}catch{return e}}function u(){n.innerHTML=`
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
    `}function v(){n.innerHTML=`
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
            Add images to: public${a}
          </div>
        </div>
      </div>
    `}function p(){if(i.length===0){v();return}const e=i.filter(t=>t.type==="image").length,o=i.filter(t=>t.type==="video").length;n.innerHTML=`
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
            ${o?`${e?" · ":""}${o} video${o!==1?"s":""}`:""}
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
          ${i.map((t,s)=>`
            <div class="gallery-thumb" data-index="${s}" style="
              aspect-ratio: 1;
              border-radius: 4px;
              overflow: hidden;
              cursor: pointer;
              background: #2a2a2a;
              border: 2px solid transparent;
              transition: border-color 0.15s, transform 0.15s;
            ">
              ${t.type==="video"?`<video src="${a}/${t.name}" muted playsinline loop style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background: #000;
                  "></video>`:`<img src="${a}/${t.name}" alt="${t.name}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  " loading="lazy"/>`}
            </div>
          `).join("")}
        </div>
      </div>
    `,n.querySelectorAll(".gallery-thumb").forEach(t=>{t.addEventListener("click",()=>{r=parseInt(t.dataset.index),l()}),t.addEventListener("mouseenter",()=>{t.style.borderColor="#4a90d9",t.style.transform="scale(1.02)"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="transparent",t.style.transform="scale(1)"})})}function l(){const e=i[r];n.innerHTML=`
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
          
          ${e!=null&&e.link?`<iframe src="${y(e.link)}" title="${e.name}" style="
                width: 90%;
                height: 90%;
                border: 0;
                border-radius: 6px;
                background: #000;
              " allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`:(e==null?void 0:e.type)==="video"?`<video src="${a}/${e.name}" controls playsinline style="
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                  background: #000;
                "></video>`:`<img src="${a}/${(e==null?void 0:e.name)||""}" alt="${(e==null?void 0:e.name)||""}" style="
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
    `,n.querySelector(".back-to-grid").addEventListener("click",p);const o=n.querySelector(".nav-prev"),t=n.querySelector(".nav-next");o&&o.addEventListener("click",()=>{r--,l()}),t&&t.addEventListener("click",()=>{r++,l()});const s=d=>{d.key==="ArrowLeft"&&r>0?(r--,l()):d.key==="ArrowRight"&&r<i.length-1?(r++,l()):d.key==="Escape"&&p()};document.addEventListener("keydown",s),n._cleanupKeyboard=()=>{document.removeEventListener("keydown",s)}}async function x(){u();try{const e=a.split("/").filter(Boolean).pop(),o=await fetch(`/api/gallery/${e}`);if(o.ok){const t=await o.json(),s=t.images||[],d=t.videos||[];i=[...s.map(c=>({type:"image",name:c,link:f[c]})),...d.map(c=>({type:"video",name:c,link:f[c]}))]}else i=[]}catch(e){console.log("Gallery: Could not load images",e),i=[]}p()}return x(),b({title:g,body:n,width:650,height:500,icon:`<svg viewBox="0 0 32 32" class="w-8 h-8">
    <rect x="2" y="4" width="28" height="24" rx="2" fill="#5090c0" stroke="#2d6090" stroke-width="1"/>
    <circle cx="10" cy="12" r="3" fill="#ffd93d"/>
    <path d="M4 24l8-8 4 4 8-10 4 6v8H4z" fill="#4ade80"/>
  </svg>`})}export{k as createGalleryViewer};
