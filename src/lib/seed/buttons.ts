/* eslint-disable @typescript-eslint/no-explicit-any */
export const buttonComponents: any[] = [
{
  "name": "Neon Glass Connect Button",
  "category": "Buttons",
  "tags": [
    "Neon",
    "Interactive",
    "Tailwind"
  ],
  "rawFolderId": "uiFolder",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Zap } from 'lucide-react';\n\nexport default function NeonButton() {\n  const [active, setActive] = useState(false);\n\n  return (\n    <div className=\"min-h-screen bg-black flex items-center justify-center p-4\">\n      <button \n        onClick={() => setActive(!active)}\n        className={`relative overflow-hidden rounded-xl px-8 py-3 font-semibold transition-all duration-300 focus:outline-none ${\n          active \n            ? 'bg-pink-500/20 text-pink-300 shadow-[0_0_40px_-5px_rgba(236,72,153,0.5)]' \n            : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'\n        }`}\n      >\n        {active && (\n          <div className=\"absolute inset-0 rounded-xl ring-1 ring-inset ring-pink-500/50\" />\n        )}\n        <div className=\"relative flex items-center gap-2\">\n          <Zap className={`h-5 w-5 ${active ? 'text-pink-400' : 'text-zinc-500'}`} />\n          <span>{active ? 'CONNECTED' : 'INITIALIZE'}</span>\n        </div>\n      </button>\n    </div>\n  );\n}\n"
},
{
  "name": "Neon Glass Connect Button",
  "category": "Buttons",
  "tags": [
    "Neon",
    "Interactive",
    "Tailwind"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Zap } from 'lucide-react';\n\nexport default function NeonButton() {\n  const [active, setActive] = useState(false);\n\n  return (\n    <div className=\"min-h-screen bg-black flex items-center justify-center p-4\">\n      <button \n        onClick={() => setActive(!active)}\n        className={`relative overflow-hidden rounded-xl px-8 py-3 font-semibold transition-all duration-300 focus:outline-none ${\n          active \n            ? 'bg-pink-500/20 text-pink-300 shadow-[0_0_40px_-5px_rgba(236,72,153,0.5)]' \n            : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'\n        }`}\n      >\n        {active && (\n          <div className=\"absolute inset-0 rounded-xl ring-1 ring-inset ring-pink-500/50\" />\n        )}\n        <div className=\"relative flex items-center gap-2\">\n          <Zap className={`h-5 w-5 ${active ? 'text-pink-400' : 'text-zinc-500'}`} />\n          <span>{active ? 'CONNECTED' : 'INITIALIZE'}</span>\n        </div>\n      </button>\n    </div>\n  );\n}\n"
}
];
