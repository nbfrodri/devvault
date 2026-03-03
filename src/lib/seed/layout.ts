/* eslint-disable @typescript-eslint/no-explicit-any */
export const layoutComponents: any[] = [
{
  "name": "Subtle Bento Grid",
  "category": "Layout",
  "tags": [
    "Grid",
    "Bento",
    "Tailwind"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": "tailwindEnv",
  "dependencies": {},
  "code": "import React from 'react';\nimport { LayoutDashboard, Users, CreditCard, BarChart } from 'lucide-react';\n\nexport default function BentoGrid() {\n  return (\n    <div className=\"min-h-screen bg-[#09090b] flex items-center justify-center p-4\">\n      <div className=\"grid w-full max-w-3xl grid-cols-4 grid-rows-3 gap-4 h-[400px]\">\n        {/* Main large cell */}\n        <div className=\"col-span-2 row-span-2 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10\">\n          <LayoutDashboard className=\"h-6 w-6 text-zinc-400 mb-4\" />\n          <h3 className=\"text-lg font-medium text-white\">Overview</h3>\n          <p className=\"mt-2 text-sm text-zinc-400\">A high-level view of your workspace activity and metrics.</p>\n        </div>\n        \n        {/* Top right small cells */}\n        <div className=\"col-span-2 row-span-1 flex items-center gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10\">\n          <div className=\"rounded-full bg-indigo-500/20 p-3 text-indigo-400\">\n            <Users className=\"h-5 w-5\" />\n          </div>\n          <div>\n            <h4 className=\"text-white font-medium\">Team Members</h4>\n            <p className=\"text-xs text-zinc-500\">12 Active</p>\n          </div>\n        </div>\n        \n        <div className=\"col-span-1 row-span-1 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10\">\n          <CreditCard className=\"h-5 w-5 text-zinc-400\" />\n        </div>\n        \n        <div className=\"col-span-1 row-span-1 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10\">\n          <BarChart className=\"h-5 w-5 text-emerald-400\" />\n        </div>\n\n        {/* Bottom wide cell */}\n        <div className=\"col-span-4 row-span-1 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10 flex items-center justify-between\">\n           <h3 className=\"text-white font-medium\">Weekly Report Generated</h3>\n           <span className=\"text-xs text-zinc-500\">2 hours ago</span>\n        </div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Subtle Bento Grid",
  "category": "Layout",
  "tags": [
    "Grid",
    "Bento",
    "Tailwind"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0"
  },
  "code": "import React from 'react';\nimport { LayoutDashboard, Users, CreditCard, BarChart, Activity, Zap } from 'lucide-react';\nimport { motion } from 'framer-motion';\n\nconst stagger = {\n  animate: {\n    transition: {\n      staggerChildren: 0.1\n    }\n  }\n};\n\nconst item = {\n  initial: { opacity: 0, scale: 0.95, y: 10 },\n  animate: { opacity: 1, scale: 1, y: 0, transition: { type: \"spring\", stiffness: 100 } }\n};\n\nexport default function BentoGrid() {\n  return (\n    <div className=\"min-h-[600px] bg-[#09090b] flex items-center justify-center p-8\">\n      <motion.div \n        variants={stagger} \n        initial=\"initial\" \n        animate=\"animate\" \n        className=\"grid w-full max-w-4xl grid-cols-4 grid-rows-3 gap-6 h-[500px]\"\n      >\n        {/* Main large cell */}\n        <motion.div variants={item} className=\"group relative col-span-2 row-span-2 overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/20\">\n          <div className=\"absolute top-0 right-0 p-8 opacity-20 transition-opacity group-hover:opacity-40\">\n            <Zap className=\"h-32 w-32 text-indigo-400\" />\n          </div>\n          <div className=\"relative z-10 flex h-full flex-col justify-between\">\n            <div>\n              <div className=\"mb-6 inline-flex rounded-2xl bg-indigo-500/20 p-3 text-indigo-400 ring-1 ring-inset ring-indigo-500/30\">\n                <LayoutDashboard className=\"h-6 w-6\" />\n              </div>\n              <h3 className=\"text-3xl font-semibold text-white tracking-tight\">Overview</h3>\n            </div>\n            <p className=\"mt-2 text-base text-zinc-400 max-w-[80%] leading-relaxed\">A high-level view of your entire workspace activity, real-time metrics, and AI health.</p>\n          </div>\n        </motion.div>\n        \n        {/* Top right small cells */}\n        <motion.div variants={item} className=\"col-span-2 row-span-1 overflow-hidden flex items-center gap-6 rounded-[32px] border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-xl hover:shadow-emerald-500/10\">\n          <div className=\"rounded-2xl bg-emerald-500/20 p-4 text-emerald-400 ring-1 ring-inset ring-emerald-500/30\">\n            <Users className=\"h-6 w-6\" />\n          </div>\n          <div>\n            <h4 className=\"text-lg text-white font-medium\">Team Members</h4>\n            <p className=\"text-sm text-zinc-400 mt-1\">12 Active seamlessly collaborating</p>\n          </div>\n        </motion.div>\n        \n        <motion.div variants={item} className=\"group flex flex-col justify-center items-center col-span-1 row-span-1 rounded-[32px] border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-xl hover:shadow-rose-500/10\">\n          <CreditCard className=\"h-8 w-8 text-rose-400 mb-3 transition-transform group-hover:-translate-y-1\" />\n          <span className=\"text-sm font-medium text-white/80\">Billing Status</span>\n        </motion.div>\n        \n        <motion.div variants={item} className=\"group flex flex-col justify-center items-center col-span-1 row-span-1 rounded-[32px] border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-xl hover:shadow-sky-500/10\">\n          <Activity className=\"h-8 w-8 text-sky-400 mb-3 transition-transform group-hover:-translate-y-1\" />\n          <span className=\"text-sm font-medium text-white/80\">Live Traffic</span>\n        </motion.div>\n\n        {/* Bottom wide cell */}\n        <motion.div variants={item} className=\"col-span-4 row-span-1 overflow-hidden relative rounded-[32px] border border-white/5 bg-gradient-to-r from-purple-500/10 via-white/5 to-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10 flex items-center justify-between\">\n           <div className=\"flex items-center gap-4 relative z-10\">\n             <div className=\"rounded-full bg-purple-500/20 p-2 text-purple-400\">\n               <BarChart className=\"h-5 w-5\" />\n             </div>\n             <h3 className=\"text-xl text-white font-medium\">Weekly AI Automation Report Generated</h3>\n           </div>\n           <span className=\"text-sm font-medium text-zinc-500 ring-1 ring-white/10 rounded-full px-4 py-1.5 relative z-10 bg-black/40\">2 hours ago</span>\n        </motion.div>\n      </motion.div>\n    </div>\n  );\n}\n"
},
{
  "name": "Resizable Panel",
  "category": "Layout",
  "tags": [
    "Resizable",
    "Panel",
    "Sidebar",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useRef, useState, useEffect } from 'react';\nimport { motion, useMotionValue } from 'framer-motion';\nimport { AlignLeft, LayoutDashboard, Settings } from 'lucide-react';\n\nexport default function Resizable() {\n  const containerRef = useRef<HTMLDivElement>(null);\n  const [width, setWidth] = useState(250);\n  const isDragging = useRef(false);\n  \n  const minWidth = 150;\n  const maxWidth = 400;\n\n  useEffect(() => {\n    const handleMouseMove = (e: MouseEvent) => {\n      if (!isDragging.current || !containerRef.current) return;\n      const containerRect = containerRef.current.getBoundingClientRect();\n      let newWidth = e.clientX - containerRect.left;\n      if (newWidth < minWidth) newWidth = minWidth;\n      if (newWidth > maxWidth) newWidth = maxWidth;\n      setWidth(newWidth);\n    };\n\n    const handleMouseUp = () => {\n      isDragging.current = false;\n      document.body.style.cursor = 'default';\n    };\n\n    document.addEventListener('mousemove', handleMouseMove);\n    document.addEventListener('mouseup', handleMouseUp);\n    return () => {\n      document.removeEventListener('mousemove', handleMouseMove);\n      document.removeEventListener('mouseup', handleMouseUp);\n    };\n  }, []);\n\n  return (\n    <div className=\"relative flex min-h-[500px] w-full items-center justify-center p-4 bg-[#09090b] rounded-xl border border-white/10\">\n      <div \n        ref={containerRef}\n        className=\"relative flex h-[400px] w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl\"\n      >\n        {/* Sidebar Panel */}\n        <motion.div \n          animate={{ width }}\n          transition={{ type: \"tween\", ease: \"linear\", duration: 0 }}\n          className=\"shrink-0 bg-white/2 flex flex-col\"\n        >\n          <div className=\"p-4 border-b border-white/5 flex items-center gap-2\">\n             <div className=\"h-6 w-6 rounded bg-indigo-500\" />\n             {width > 180 && <span className=\"font-semibold text-white truncate\">Acme Dashboard</span>}\n          </div>\n          <div className=\"p-2 space-y-1\">\n             <button className=\"flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-white bg-white/5\">\n               <LayoutDashboard className=\"h-4 w-4 text-indigo-400 shrink-0\" />\n               {width > 180 && <span className=\"truncate\">Overview</span>}\n             </button>\n             <button className=\"flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-colors\">\n               <Settings className=\"h-4 w-4 shrink-0\" />\n               {width > 180 && <span className=\"truncate\">Settings</span>}\n             </button>\n          </div>\n        </motion.div>\n\n        {/* Main Content Panel */}\n        <div className=\"flex-1 bg-zinc-950 p-8 flex flex-col min-w-0\">\n           <div className=\"h-8 w-1/3 rounded bg-white/10 mb-8\" />\n           <div className=\"flex-1 rounded-xl border border-dashed border-white/10 bg-white/1 flex items-center justify-center text-zinc-600\">\n              Main Content Area\n           </div>\n        </div>\n\n        {/* Resizer Handle */}\n        <div \n          onMouseDown={() => { \n            isDragging.current = true; \n            document.body.style.cursor = 'col-resize';\n          }}\n          className=\"absolute top-0 bottom-0 z-10 w-4 -translate-x-1/2 cursor-col-resize flex flex-col items-center justify-center group\"\n          style={{ left: width }}\n        >\n          <div className=\"h-full w-px bg-white/10 group-hover:bg-indigo-500/50 transition-colors\" />\n          <div className=\"absolute h-8 w-1 rounded-full bg-white/20 group-hover:bg-indigo-400 group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100\" />\n        </div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Scroll Area Custom",
  "category": "Layout",
  "tags": [
    "Scroll",
    "Area",
    "Custom Scrollbar",
    "Layout"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {},
  "code": "import React from 'react';\n\nexport default function ScrollArea() {\n  const items = Array.from({ length: 50 }).map((_, i) => `Jocelyn C. ${i + 1}`);\n\n  return (\n    <div className=\"relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"h-72 w-full max-w-sm rounded-xl border border-white/10 bg-zinc-950 p-4 shadow-2xl\">\n        <h4 className=\"mb-4 text-sm font-semibold text-white leading-none\">Tags</h4>\n        \n        {/* Note: This requires custom CSS for the scrollbar styling to work perfectly across all browsers. See standard Tailwind configs. */}\n        <div className=\"h-56 pr-4 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-800 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700\">\n          {items.map((item) => (\n            <div key={item} className=\"text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer py-1 border-b border-white/5 last:border-0\">\n              {item}\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Decorative Separator",
  "category": "Layout",
  "tags": [
    "Separator",
    "Divider",
    "Layout"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {},
  "code": "import React from 'react';\n\nexport default function Separator() {\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"w-full max-w-sm space-y-6\">\n        <div>\n          <h4 className=\"text-sm font-medium text-white\">Radix Primitives</h4>\n          <p className=\"text-sm text-zinc-400\">An open-source UI component library.</p>\n        </div>\n        <div className=\"h-px bg-white/10 w-full\" />\n        <div className=\"flex h-5 items-center space-x-4 text-sm text-zinc-400\">\n          <button className=\"hover:text-white transition-colors\">Blog</button>\n          <div className=\"w-px h-full bg-white/10\" />\n          <button className=\"hover:text-white transition-colors\">Docs</button>\n          <div className=\"w-px h-full bg-white/10\" />\n          <button className=\"hover:text-white transition-colors\">Source</button>\n        </div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Aspect Ratio Image",
  "category": "Layout",
  "tags": [
    "Image",
    "Layout",
    "Aspect Ratio"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {},
  "code": "import React from 'react';\n\nexport default function AspectRatio() {\n  return (\n    <div className=\"relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"w-full max-w-md\">\n        <div className=\"relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl pb-[56.25%] bg-zinc-900\">\n          {/* 16:9 Aspect Ratio (56.25% padding-bottom) */}\n          <img\n            src=\"https://images.unsplash.com/photo-1681412030062-632b7eaaeed9?auto=format&fit=crop&w=800&q=80\"\n            alt=\"Landscape\"\n            className=\"absolute inset-0 h-full w-full object-cover\"\n          />\n          <div className=\"absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6\">\n            <span className=\"text-white font-medium text-lg drop-shadow-md\">Beautiful Landscapes</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}\n"
}
];
