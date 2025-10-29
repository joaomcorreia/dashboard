"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export type Slide = {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  imageUrl?: string;
};

export type HeroSliderProps = {
  slides: Slide[];                  // up to 3
  anim?: {
    easing?: "easeInOut"|"easeOut"|"circOut"|"backOut";
    duration?: number;              // seconds
  }
};

const EASINGS: Record<string, any> = {
  easeInOut: "easeInOut",
  easeOut: "easeOut",
  circOut: [0,0.55,0.45,1], // custom
  backOut: [0.34,1.56,0.64,1]
};

export default function HeroSlider({ slides = [], anim }: HeroSliderProps){
  const [idx, setIdx] = React.useState(0);
  const max = Math.min(3, slides.length || 1);
  const slide = slides[idx % max] || slides[0];

  const duration = anim?.duration ?? 0.6;
  const easeKey = anim?.easing ?? "easeInOut";
  const ease = EASINGS[easeKey] ?? "easeInOut";

  function next(){ setIdx((i)=> (i+1) % max); }
  function prev(){ setIdx((i)=> (i-1+max) % max); }

  return (
    <section className="section-pad bg-body">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`txt-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition:{ duration, ease } }}
                exit={{ opacity: 0, y: -10, transition:{ duration: duration*0.7, ease } }}
              >
                <h1 className="display-5 fw-bold text-primary mb-2">{slide?.title || "Add a title"}</h1>
                {slide?.subtitle && <p className="lead">{slide.subtitle}</p>}
                {slide?.primaryCta && (
                  <a className="btn btn-primary btn-lg mt-2" href={slide.primaryCta.href}>
                    {slide.primaryCta.label}
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-12 col-lg-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${idx}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1, transition:{ duration, ease } }}
                exit={{ opacity: 0, scale: 1.02, transition:{ duration: duration*0.7, ease } }}
              >
                {slide?.imageUrl && (
                  <img className="img-fluid rounded shadow-sm" src={slide.imageUrl} alt="" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* controls */}
        {max > 1 && (
          <div className="d-flex align-items-center gap-2 mt-3">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={prev}>Prev</button>
            <div className="d-flex gap-1">
              {Array.from({length:max}).map((_,i)=>(
                <button key={i}
                  type="button"
                  onClick={()=>setIdx(i)}
                  className={`btn btn-sm ${i===idx? 'btn-primary':'btn-outline-primary'}`}
                >
                  {i+1}
                </button>
              ))}
            </div>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={next}>Next</button>
          </div>
        )}
      </div>
    </section>
  );
}