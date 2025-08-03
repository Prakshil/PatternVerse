// Convert pattern data to our simple format
export const patterns = [
  {
    id: "top-gradient-radial",
    name: "Top Gradient Radial",
    category: "gradients",
    css: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
    code: `<div className="min-h-screen w-full relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
  }} />
</div>`
  },
  {
    id: "bottom-gradient-radial",
    name: "Bottom Gradient Radial",
    category: "gradients",
    badge: "New",
    css: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
    code: `<div className="min-h-screen w-full relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
  }} />
</div>`
  },
  {
    id: "bottom-violet-radial",
    name: "Bottom Violet Radial",
    category: "gradients",
    badge: "New",
    css: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
    code: `<div className="min-h-screen w-full relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
  }} />
</div>`
  },
  {
    id: "bottom-slate-radial",
    name: "Bottom Slate Radial",
    category: "gradients",
    badge: "New",
    css: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
    code: `<div className="min-h-screen w-full relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
  }} />
</div>`
  },
  {
    id: "radial-teal-glow",
    name: "Teal Glow",
    badge: "New",
    category: "gradients",
    css: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)",
  }} />
</div>`
  },
  {
    id: "radial-pink-glow",
    name: "Pink Glow",
    badge: "New",
    category: "gradients",
    css: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)",
  }} />
</div>`
  },
  {
    id: "radial-amber-glow",
    name: "Amber Glow",
    badge: "New",
    category: "gradients",
    css: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)",
  }} />
</div>`
  },
  {
    id: "radial-emerald-glow",
    name: "Emerald Glow",
    badge: "New",
    category: "gradients",
    css: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)",
  }} />
</div>`
  },
  {
    id: "dark-horizon-glow",
    name: "Dark Horizon Glow",
    badge: "New",
    category: "effects",
    css: "radial-gradient(125% 125% at 50% 90%, #0f0f23 40%, #1e3a8a 100%)",
    code: `<div className="min-h-screen w-full relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 90%, #0f0f23 40%, #1e3a8a 100%)",
  }} />
</div>`
  },
  {
    id: "crimson-depth",
    name: "Crimson Depth",
    badge: "New",
    category: "effects",
    css: "radial-gradient(125% 125% at 50% 100%, #1a0b0b 40%, #7f1d1d 100%)",
    code: `<div className="min-h-screen w-full relative">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(125% 125% at 50% 100%, #1a0b0b 40%, #7f1d1d 100%)",
  }} />
</div>`
  },
  {
    id: "purple-gradient-grid-right",
    name: "Purple Gradient Grid Right",
    badge: "New",
    category: "geometric",
    css: "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px), radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)",
    backgroundSize: "96px 64px, 96px 64px, 100% 100%",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    backgroundImage: "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px), radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)",
    backgroundSize: "96px 64px, 96px 64px, 100% 100%",
  }} />
</div>`
  },
  {
    id: "basic-grid",
    name: "Basic Grid",
    category: "geometric",
    css: "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    backgroundImage: "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }} />
</div>`
  },
  {
    id: "dots-grid",
    name: "Dots Grid",
    category: "geometric",
    css: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    code: `<div className="min-h-screen w-full bg-white relative">
  <div className="absolute inset-0 z-0" style={{
    backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  }} />
</div>`
  }
];
