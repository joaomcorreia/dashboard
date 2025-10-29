"use client";
import React from "react";

type Meta = { label:string; type:string; max?:number; maxItems?:number; options?:string[]; min?:number; maxNum?:number; step?:number };
type Schema = Record<string, Meta>;

function getByPath(obj:any, path:string){
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts){ if (cur==null) return undefined; cur = cur[p]; }
  return cur;
}
function setByPath(obj:any, path:string, value:any){
  const parts = path.split(".");
  let cur = obj;
  parts.forEach((p, i)=>{
    if (i===parts.length-1) cur[p] = value;
    else cur = (cur[p] ||= {});
  });
}

export default function FieldInspector({
  schema, values, onChange
}:{ schema:Schema; values:any; onChange:(k:string,v:any)=>void }){
  const entries = Object.entries(schema);

  function change(path:string, val:any){ onChange(path, val); }

  // detect repeatable groups like "slides[].title"
  const groups = Object.keys(schema)
    .filter(k => k.includes("[]"))
    .reduce<Record<string,string[]>>((acc, key)=>{
      const group = key.split("[]")[0]; // e.g., "slides"
      (acc[group] ||= []).push(key);
      return acc;
    }, {});

  return (
    <div className="d-flex flex-column gap-3">
      {/* Render group editors first */}
      {Object.entries(groups).map(([group, keys])=>{
        const maxItems = Math.max(...keys.map(k => schema[k]?.maxItems || 3));
        const current = (values[group] || []) as any[];
        return (
          <div key={group} className="border rounded-3 p-2">
            <div className="fw-semibold mb-2 text-capitalize">{group}</div>

            {current.map((item, idx)=>(
              <div key={idx} className="border rounded p-2 mb-2">
                {keys.map(k=>{
                  const field = k.split("[]").join(`[${idx}]`);
                  const fieldKey = k.split("].").pop() || k; // label only
                  const meta = schema[k];
                  // map nested path into item (e.g., slides[0].primaryCta.label)
                  const absolute = `${group}[${idx}]${k.substring(group.length+2)}`;
                  const val = getByPath(values, absolute) ?? "";

                  return (
                    <div className="mb-2" key={k}>
                      <label className="form-label small">{meta.label} (#{idx+1})</label>
                      {renderInput(meta, val, (v:any)=>{
                        const clone = JSON.parse(JSON.stringify(values||{}));
                        setByPath(clone, absolute, v);
                        onChange(group, (clone[group] || [])); // pass array back
                      })}
                    </div>
                  );
                })}
              </div>
            ))}

            {(current.length < maxItems) && (
              <button type="button" className="btn btn-outline-secondary btn-sm"
                onClick={()=>{
                  const clone = Array.from(current);
                  clone.push({});
                  onChange(group, clone);
                }}>
                + Add {group.slice(0,-1)}
              </button>
            )}
          </div>
        );
      })}

      {/* Render simple fields (non-repeatable) */}
      {entries.filter(([k])=>!k.includes("[]")).map(([key, meta])=>{
        const val = getByPath(values, key) ?? (meta.type==="number" ? 0 : "");
        return (
          <div key={key}>
            <label className="form-label fw-semibold">{meta.label}</label>
            {renderInput(meta, val, (v:any)=> change(key, v))}
          </div>
        );
      })}
    </div>
  );
}

function renderInput(meta:Meta, value:any, onChange:(v:any)=>void){
  const common = { className: "form-control", value } as any;

  if (meta.type === "textarea") {
    return <textarea {...common} onChange={e=>onChange(e.target.value)} maxLength={meta.max} />;
  }
  if (meta.type === "image" || meta.type === "url") {
    return <input {...common} type="url" onChange={e=>onChange(e.target.value)} maxLength={meta.max} />;
  }
  if (meta.type === "number") {
    return <input className="form-control" type="number"
      value={value} step={meta.step ?? 0.1}
      min={meta.min as any} max={(meta as any).maxNum as any}
      onChange={e=>onChange(parseFloat(e.target.value))} />;
  }
  if (meta.type === "select") {
    return (
      <select className="form-select" value={value} onChange={e=>onChange(e.target.value)}>
        {(meta.options || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }
  if (meta.type?.startsWith("repeatable:")){
    // already handled by group editor above
    return <div className="text-muted small">Managed in group editor above.</div>;
  }
  // default text
  return <input {...common} type="text" onChange={e=>onChange(e.target.value)} maxLength={meta.max} />;
}