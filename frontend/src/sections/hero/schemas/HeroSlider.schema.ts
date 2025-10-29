export default {
  _meta: { parts: ["slides","anim"] },
  "slides[].title":               { label: "Slide Title", type: "repeatable:text", maxItems: 3, max: 120 },
  "slides[].subtitle":            { label: "Slide Subtitle", type: "repeatable:textarea", maxItems: 3, max: 240 },
  "slides[].primaryCta.label":    { label: "Slide Button", type: "repeatable:text", maxItems: 3, max: 24 },
  "slides[].primaryCta.href":     { label: "Slide Link", type: "repeatable:url", maxItems: 3 },
  "slides[].imageUrl":            { label: "Slide Image URL", type: "repeatable:image", maxItems: 3 },
  "anim.easing":                  { label: "Easing", type: "select", options:["easeInOut","easeOut","circOut","backOut"] },
  "anim.duration":                { label: "Duration (s)", type: "number", min: 0.2, max: 2, step: 0.1 }
};