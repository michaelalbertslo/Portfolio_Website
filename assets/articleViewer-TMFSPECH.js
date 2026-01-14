import{m as l}from"./index-B_DeCNZF.js";function c({title:o,content:i,images:a=[]}){const r=document.createElement("div");r.className="h-full flex flex-col article-viewer";let e=(Array.isArray(i)?i.join(`
`):i).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^### (.+)$/gm,'<h3 style="font-size: 16px; font-weight: 600; margin: 16px 0 8px 0; color: #1a365d;">$1</h3>').replace(/^## (.+)$/gm,'<h2 style="font-size: 18px; font-weight: 600; margin: 20px 0 10px 0; color: #1a365d; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">$1</h2>').replace(/^# (.+)$/gm,'<h1 style="font-size: 22px; font-weight: 700; margin: 24px 0 12px 0; color: #1a365d;">$1</h1>').replace(/^- (.+)$/gm,'<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>').replace(/^• (.+)$/gm,'<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>').replace(/\n\n/g,'</p><p style="margin-bottom: 12px; line-height: 1.6;">').replace(/\n/g,"<br>");return e=e.replace(/\[image:(\d+)\]/g,(g,n)=>{const t=a[parseInt(n)];return t?`
        <figure style="margin: 16px 0; text-align: center;">
          <img 
            src="${t.src}" 
            alt="${t.alt||""}" 
            style="max-width: 100%; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
          />
          ${t.caption?`<figcaption style="font-size: 12px; color: #666; margin-top: 8px; font-style: italic;">${t.caption}</figcaption>`:""}
        </figure>
      `:""}),!e.startsWith("<h")&&!e.startsWith("<p")&&(e=`<p style="margin-bottom: 12px; line-height: 1.6;">${e}</p>`),r.innerHTML=`
    <!-- Toolbar -->
    <div style="
      background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
      border-bottom: 1px solid #ccc;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #666;
    ">
      <svg width="16" height="16" viewBox="0 0 32 32">
        <rect x="4" y="2" width="24" height="28" rx="2" fill="#f5f5f5" stroke="#999" stroke-width="1"/>
        <path d="M8 8h16M8 12h16M8 16h12M8 20h14M8 24h10" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span style="font-weight: 500;">${o}</span>
      <span style="color: #999;">— Text Document</span>
    </div>
    
    <!-- Content Area -->
    <div style="
      flex: 1;
      overflow: auto;
      padding: 24px 32px;
      background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
    ">
      <article style="
        max-width: 700px;
        margin: 0 auto;
        font-size: 14px;
        color: #2d3748;
        line-height: 1.7;
      ">
        ${e}
      </article>
    </div>
  `,l({title:o,body:r,width:700,height:520})}export{c as createArticleViewer};
