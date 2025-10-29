"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/brand.css";

import HeroSplit from "@/sections/hero/HeroSplit";
import HeroCenter from "@/sections/hero/HeroCenter";
import HeroSlider from "@/sections/hero/HeroSlider";
import ServicesGrid3x3 from "@/sections/services/ServicesGrid3x3";
import CtaBar from "@/sections/cta/CtaBar";
import FieldInspector from "@/components/editor/FieldInspector";
import Clippy2 from "@/components/clippy/Clippy2";

import HeroSplitSchema from "@/sections/hero/schemas/HeroSplit.schema";
import HeroCenterSchema from "@/sections/hero/schemas/HeroCenter.schema";
import HeroSliderSchema from "@/sections/hero/schemas/HeroSlider.schema";
import ServicesGrid3x3Schema from "@/sections/services/schemas/ServicesGrid3x3.schema";
import CtaBarSchema from "@/sections/cta/schemas/CtaBar.schema";
import React, { useMemo, useState } from "react";

const RENDERERS:any = { HeroSplit, HeroCenter, HeroSlider, ServicesGrid3x3, CtaBar };
const SCHEMAS:any   = { HeroSplit:HeroSplitSchema, HeroCenter:HeroCenterSchema, HeroSlider:HeroSliderSchema, ServicesGrid3x3:ServicesGrid3x3Schema, CtaBar:CtaBarSchema };

// Sample brand + content (replace with API later)
const INITIAL_BRAND = {
  primary:"#0D47A1", secondary:"#1976D2", accent:"#E3F2FD", background:"#FFFFFF"
};

const INITIAL_CONTENT = {
  templateId: "bs-split-002",
  sections: [
    {
      key: "hero",
      variant: "HeroSlider",
      fields: {
        slides: [
          {
            title: "Your website. Built by AI.",
            subtitle: "Launch in minutes with multilingual SEO.",
            "primaryCta.label": "Start Now",
            "primaryCta.href": "/register",
            imageUrl: "https://picsum.photos/seed/slide1/800/500"
          },
          {
            title: "Pick a template, customize fast.",
            subtitle: "Brand colors apply instantly.",
            "primaryCta.label": "See Templates",
            "primaryCta.href": "#templates",
            imageUrl: "https://picsum.photos/seed/slide2/800/500"
          }
        ],
        "anim.easing": "easeInOut",
        "anim.duration": 0.6
      }
    },
    {
      key: "services",
      variant: "ServicesGrid3x3",
      fields: {
        title: "What we do",
        items: [
          {"label":"Installations"},
          {"label":"Painting"},
          {"label":"Renovations"},
          {"label":"Repairs"},
          {"label":"Consulting"},
          {"label":"Maintenance"}
        ]
      }
    },
    {
      key: "cta",
      variant: "CtaBar",
      fields: {
        text: "Ready to launch your site?",
        "cta.label": "Get Started",
        "cta.href": "/register"
      }
    }
  ]
};

export default function PreviewPage(){
  const [brand, setBrand] = useState(INITIAL_BRAND);
  const [site, setSite]   = useState<any>(INITIAL_CONTENT);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // apply brand colors via CSS variables
  const brandStyle = useMemo(()=>{
    // Convert hex to RGB for Bootstrap's RGB variables
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return "0, 0, 0";
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    };

    return {
      ['--brand-primary' as any]: brand.primary,
      ['--brand-secondary']: brand.secondary,
      ['--brand-accent']: brand.accent,
      ['--brand-bg']: brand.background,
      // Bootstrap overrides with proper CSS variables
      ['--bs-primary']: brand.primary,
      ['--bs-primary-rgb']: hexToRgb(brand.primary),
      ['--bs-secondary']: brand.secondary,
      ['--bs-secondary-rgb']: hexToRgb(brand.secondary),
      ['--bs-info']: brand.accent,
      ['--bs-body-bg']: brand.background,
      // Button color overrides  
      ['--bs-btn-bg']: brand.primary,
      ['--bs-btn-border-color']: brand.primary,
      ['--bs-btn-hover-bg']: `color-mix(in srgb, ${brand.primary} 85%, black)`,
      ['--bs-btn-hover-border-color']: `color-mix(in srgb, ${brand.primary} 85%, black)`,
    };
  }, [brand]);

  const current = site.sections[selectedIdx];
  const Schema = SCHEMAS[current.variant];

  function handleFieldChange(path:string, value:any){
    const next = JSON.parse(JSON.stringify(site));
    setByPath(next.sections[selectedIdx].fields, path, value);
    setSite(next);
  }

  return (
    <div style={brandStyle as React.CSSProperties}>
      <div className="container-fluid py-4">
        <div className="d-flex align-items-center gap-3 mb-3 px-3">
          <h1 className="h4 m-0">Live Preview</h1>
          <div className="ms-auto d-flex gap-2">
            <input className="form-control form-control-color" title="Primary" type="color" value={brand.primary} onChange={e=>setBrand({...brand, primary:e.target.value})}/>
            <input className="form-control form-control-color" title="Secondary" type="color" value={brand.secondary} onChange={e=>setBrand({...brand, secondary:e.target.value})}/>
            <input className="form-control form-control-color" title="Accent" type="color" value={brand.accent} onChange={e=>setBrand({...brand, accent:e.target.value})}/>
            <input className="form-control form-control-color" title="Background" type="color" value={brand.background} onChange={e=>setBrand({...brand, background:e.target.value})}/>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5 order-lg-1">  {/* inspector */}
            <div className="border rounded-3 p-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="fw-semibold">Inspector</div>
                <select className="form-select w-auto"
                  value={current.variant}
                  onChange={e=>{
                    const variant = e.target.value;
                    const next = JSON.parse(JSON.stringify(site));
                    next.sections[selectedIdx].variant = variant;
                    setSite(next);
                  }}>
                  <option value="HeroSplit">HeroSplit</option>
                  <option value="HeroCenter">HeroCenter</option>
                  <option value="HeroSlider">HeroSlider</option>
                  <option value="ServicesGrid3x3">ServicesGrid3x3</option>
                  <option value="CtaBar">CtaBar</option>
                </select>
              </div>
              <FieldInspector schema={Schema} values={current.fields} onChange={handleFieldChange} />
            </div>
          </div>

          <div className="col-12 col-lg-7 order-lg-2">  {/* preview */}
            {site.sections.map((s:any, i:number)=>{
              const Cmp = RENDERERS[s.variant];
              return (
                <div key={i} onClick={()=>setSelectedIdx(i)} className={i===selectedIdx ? "border border-primary rounded-3" : ""}>
                  <Cmp {...unflatten(s.fields)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Clippy2
        brand={brand}
        setBrand={setBrand}
        getContext={()=>{
          const hero = site.sections.find((s:any)=>s.key==='hero') || site.sections[0];
          const title = hero?.fields?.title || "";
          const servicesSec = site.sections.find((s:any)=>s.key==='services');
          return {
            business: title,
            type: servicesSec ? "services" : "general",
            services: (servicesSec?.fields?.items || []).map((x:any)=>x.label),
            locale: "en"
          };
        }}
        getCurrentSection={() => site.sections[selectedIdx] || null}
        getEditableFields={()=>{
          const sec = site.sections[selectedIdx];
          if (!sec) return [];
          const schema = SCHEMAS[sec.variant] || {};
          const entries = Object.entries(schema)
            .filter(([k,v]:any)=> k !== "_meta" && typeof v === "object" && (v.type === "text" || v.type === "textarea" || v.type === "image"));
          return entries.map(([k])=>k);
        }}
        getField={(path)=> site.sections[selectedIdx]?.fields?.[path] || ""}
        setField={(path,value)=>{
          const next = JSON.parse(JSON.stringify(site));
          setByPath(next.sections[selectedIdx].fields, path, value);
          setSite(next);
        }}
      />
    </div>
  );
}

// helpers
function unflatten(obj:any){
  const out:any = {};
  Object.entries(obj || {}).forEach(([k,v])=>{
    const parts = k.split('.');
    let p = out;
    parts.forEach((part, idx)=>{
      if (idx === parts.length-1) p[part] = v;
      else p = (p[part] ||= {});
    });
  });
  return out;
}
function setByPath(target:any, path:string, value:any){
  const parts = path.split('.');
  let p = target;
  parts.forEach((part, idx)=>{
    if (idx === parts.length-1) p[part] = value;
    else p = (p[part] ||= {});
  });
}