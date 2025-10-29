"use client";
import React, { useMemo, useState } from "react";
import axios from "axios";

// --- contrast helpers (unchanged) ---
function luminance(hex:string){ const c=hex.replace("#",""); const r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;
  const f=(x:number)=>x<=0.03928? x/12.92:Math.pow((x+0.055)/1.055,2.4); return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); }
function contrastRatio(a:string,b:string){ const L1=luminance(a),L2=luminance(b); const [hi,lo]=L1>L2?[L1,L2]:[L2,L1]; return (hi+0.05)/(lo+0.05); }
function randomImage(q:string){ return `https://picsum.photos/seed/${encodeURIComponent(q)}-${Math.floor(Math.random()*1e6)}/800/500`; }

type ClippyProps = {
  brand: { primary:string; secondary:string; accent:string; background:string };
  setBrand: (b:any)=>void;

  /** Context about the site (business/type/services/locale) */
  getContext: () => { business?:string; type?:string; services?:string[]; locale?:string };

  /** Current section API */
  getCurrentSection: () => { key:string; variant:string; fields:any } | null;

  /** List of editable text fields for current section (derived from schema) */
  getEditableFields: () => string[]; // e.g., ["title","subtitle","body","quote.text"]

  /** Get/set a field on the current section */
  getField: (path:string)=>string;
  setField: (path:string, value:string)=>void;

  apiBase?: string;
};

export default function Clippy2({
  brand, setBrand, getContext, getCurrentSection, getEditableFields, getField, setField, apiBase
}: ClippyProps){
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  const [targetField, setTargetField] = useState<string>("");

  const base = apiBase || (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api");

  const checks = useMemo(()=>[
    {label:"Primary on Background", ratio: contrastRatio(brand.primary, brand.background)},
    {label:"Secondary on Background", ratio: contrastRatio(brand.secondary, brand.background)},
    {label:"Accent on Background", ratio: contrastRatio(brand.accent, brand.background)},
  ], [brand]);
  const needsFix = checks.some(c => c.ratio < 4.5);

  // --- actions ---
  async function improveCurrentField(){
    const sec = getCurrentSection();
    if (!sec) return;
    const field = targetField || (getEditableFields()[0] || "");
    if (!field) return;
    setBusy(true);
    try {
      const ctx = getContext();
      const { data } = await axios.post(`${base}/builder/ai/suggest/`, {
        text: getField(field) || "",
        business_name: ctx.business || "Your Business",
        business_type: ctx.type || "services",
        services: ctx.services || [],
        tone: "professional",
        char_limit: 160
      }, { withCredentials:true });
      if (data?.suggestion) setField(field, data.suggestion);
    } finally { setBusy(false); }
  }

  function swapHeroImage(){
    const ctx = getContext();
    const q = (ctx.type || ctx.business || "brand").toString().split(" ")[0];
    setField("imageUrl", randomImage(q));
  }

  function fixContrast(){
    let { primary, background } = brand;
    let tries=0;
    function tweak(hex:string, darker=true){
      const c=hex.replace("#",""); let r=parseInt(c.slice(0,2),16),g=parseInt(c.slice(2,4),16),b=parseInt(c.slice(4,6),16);
      const delta=darker?-8:8; r=Math.max(0,Math.min(255,r+delta)); g=Math.max(0,Math.min(255,g+delta)); b=Math.max(0,Math.min(255,b+delta));
      return "#"+[r,g,b].map(x=>x.toString(16).padStart(2,"0")).join("");
    }
    let p=primary; while(contrastRatio(p,background)<4.5 && tries<24){ p=tweak(p,true); tries++; }
    setBrand({ ...brand, primary:p });
  }

  const fields = getEditableFields();
  const sec = getCurrentSection();

  return (
    <div style={{position:"fixed", right:16, bottom:16, zIndex:1000}}>
      {open ? (
        <div className="card shadow" style={{width: 380}}>
          <div className="card-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img src="https://i.imgur.com/2v3G9YQ.png" alt="Clippy" width={24} height={24}/>
              <strong>Clippy 2.0</strong>
            </div>
            <button className="btn btn-sm btn-outline-secondary" onClick={()=>setOpen(false)}>Minimize</button>
          </div>
          <div className="card-body d-flex flex-column gap-2">
            <div className="small text-muted">
              I can rewrite any text field in the selected section, swap images, adjust colors, and check accessibility.
            </div>

            {needsFix && (
              <div className="alert alert-warning py-2">
                Low contrast detected. <button className="btn btn-sm btn-warning ms-1" onClick={fixContrast}>Auto-fix</button>
              </div>
            )}

            {/* target field picker */}
            {!!fields.length && (
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" value={targetField} onChange={e=>setTargetField(e.target.value)}>
                  <option value="">{sec ? `${sec.key} • choose field…` : "choose field…"}</option>
                  {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <button className="btn btn-primary btn-sm" disabled={busy || !fields.length} onClick={improveCurrentField}>
                  {busy ? "Thinking…" : "AI improve"}
                </button>
              </div>
            )}

            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={swapHeroImage}>
                Replace hero image
              </button>
            </div>

            <div className="border rounded p-2 small">
              <div className="fw-semibold mb-1">Tips</div>
              <ul className="m-0 ps-3">
                <li>Keep headlines concise; use verbs in CTAs.</li>
                <li>High contrast (≥4.5:1) improves readability.</li>
                <li>Pick fields in the dropdown to rewrite with AI.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={()=>setOpen(true)}>Open Clippy</button>
      )}
    </div>
  );
}