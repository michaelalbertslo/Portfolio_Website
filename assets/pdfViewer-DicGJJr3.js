import{a as r,m as n}from"./index-CKQF8gEq.js";function d({title:e,src:o}){const i=r(o||""),t=document.createElement("div");return t.className="h-full flex flex-col pdf-viewer",t.innerHTML=`
    <!-- Toolbar -->
    <div style="
      background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
      border-bottom: 1px solid #ccc;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    ">
      <svg width="16" height="16" viewBox="0 0 32 32">
        <rect x="4" y="2" width="24" height="28" rx="2" fill="#e74c3c"/>
        <text x="16" y="20" text-anchor="middle" fill="white" font-size="8" font-weight="bold">PDF</text>
      </svg>
      <span style="font-weight: 500; color: #333;">${e}</span>
      <span style="color: #999;">— PDF Document</span>
      <div style="flex: 1;"></div>
      <a href="${i}" target="_blank" style="
        padding: 4px 12px;
        background: linear-gradient(180deg, #f7f7f7 0%, #e0e0e0 100%);
        border: 1px solid #999;
        border-radius: 3px;
        color: #333;
        text-decoration: none;
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1v10M4 7l4 4 4-4M2 14h12"/>
        </svg>
        Open in New Tab
      </a>
    </div>
    
    <!-- PDF Embed -->
    <div style="flex: 1; background: #525659; position: relative;">
      <iframe 
        src="${i}" 
        style="
          width: 100%;
          height: 100%;
          border: none;
        "
        title="${e}"
      ></iframe>
    </div>
  `,n({title:e,body:t,width:850,height:650})}export{d as createPdfViewer};
