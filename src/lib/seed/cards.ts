/* eslint-disable @typescript-eslint/no-explicit-any */
export const cardComponents: any[] = [
{
  "name": "Glassmorphic Pricing Card",
  "category": "Cards",
  "tags": [
    "Pricing",
    "Glass",
    "Tailwind"
  ],
  "rawFolderId": "uiFolder",
  "rawEnvironmentId": "animatedEnv",
  "dependencies": {},
  "code": "import React from 'react';\nimport { Check } from 'lucide-react';\nimport { motion } from 'framer-motion';\n\nexport default function PricingCard() {\n  return (\n    <div className=\"min-h-screen bg-black flex items-center justify-center p-4\" style={{ backgroundImage: \"radial-gradient(ellipse at top var(--tw-gradient-stops))\", \"--tw-gradient-from\": \"rgba(99, 102, 241, 0.15)\", \"--tw-gradient-to\": \"rgba(0, 0, 0, 1)\", \"--tw-gradient-stops\": \"var(--tw-gradient-from), var(--tw-gradient-to)\" } as any}>\n      <motion.div \n        initial={{ y: 20, opacity: 0 }}\n        animate={{ y: 0, opacity: 1 }}\n        transition={{ duration: 0.5, ease: \"easeOut\" }}\n        className=\"relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl w-full max-w-sm\"\n      >\n        <div className=\"absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-50\" />\n        \n        <div className=\"relative\">\n          <span className=\"inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-300\">\n            PRO EDITION\n          </span>\n          \n          <div className=\"mt-6 flex items-baseline text-white\">\n            <span className=\"text-5xl font-extrabold tracking-tight\">$49</span>\n            <span className=\"ml-1 text-xl font-medium text-white/50\">/mo</span>\n          </div>\n          \n          <p className=\"mt-4 text-sm text-white/60\">\n            Advanced features for professional developers and teams scaling up.\n          </p>\n          \n          <ul className=\"mt-8 space-y-4\">\n            {['Unlimited Projects', 'Custom Domains', '24/7 Priority Support', 'Analytics Dashboard'].map((feature) => (\n              <li key={feature} className=\"flex items-center gap-3\">\n                <div className=\"flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20\">\n                  <Check className=\"h-3 w-3 text-indigo-300\" />\n                </div>\n                <span className=\"text-sm text-white/80\">{feature}</span>\n              </li>\n            ))}\n          </ul>\n          \n          <button className=\"mt-10 w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]\">\n            Upgrade to Pro\n          </button>\n        </div>\n      </motion.div>\n    </div>\n  );\n}\n"
},
{
  "name": "Holographic Stats Card",
  "category": "Cards",
  "tags": [
    "Stats",
    "Hologram",
    "Tailwind",
    "Framer Motion"
  ],
  "rawFolderId": "widgetsFolder",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0"
  },
  "code": "import React from 'react';\nimport { Activity } from 'lucide-react';\nimport { motion } from 'framer-motion';\n\nexport default function HolographicStats() {\n  return (\n    <div className=\"min-h-screen bg-[#09090b] flex items-center justify-center p-4\">\n      <motion.div \n        whileHover={{ scale: 1.02 }}\n        className=\"relative overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-950/10 p-6 backdrop-blur-md w-full max-w-sm group\"\n      >\n        <div className=\"absolute inset-0 bg-gradient-to-b from-sky-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100\" />\n        \n        <div className=\"relative flex items-center justify-between\">\n          <div>\n            <p className=\"text-sm font-medium text-sky-400\">Monthly Traffic</p>\n            <p className=\"mt-2 text-4xl font-light tracking-tight text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]\">\n              45.2K\n            </p>\n          </div>\n          <div className=\"flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]\">\n            <Activity className=\"h-6 w-6\" />\n          </div>\n        </div>\n        \n        <div className=\"relative mt-6 flex items-center text-sm text-sky-300/80\">\n          <span className=\"font-medium text-emerald-400\">+12.5%</span>\n          <span className=\"ml-2\">from last month</span>\n        </div>\n      </motion.div>\n    </div>\n  );\n}\n"
},
{
  "name": "Glassmorphic Pricing Card",
  "category": "Cards",
  "tags": [
    "Pricing",
    "Glass",
    "Tailwind"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React from 'react';\nimport { Check, Sparkles } from 'lucide-react';\nimport { motion } from 'framer-motion';\n\nexport default function PricingCard() {\n  return (\n    <div className=\"min-h-screen bg-black flex items-center justify-center p-4\" style={{ backgroundImage: \"radial-gradient(ellipse at top var(--tw-gradient-stops))\", \"--tw-gradient-from\": \"rgba(99, 102, 241, 0.15)\", \"--tw-gradient-to\": \"rgba(0, 0, 0, 1)\", \"--tw-gradient-stops\": \"var(--tw-gradient-from), var(--tw-gradient-to)\" } as any}>\n      <motion.div \n        initial={{ y: 20, opacity: 0, scale: 0.95 }}\n        animate={{ y: 0, opacity: 1, scale: 1 }}\n        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}\n        className=\"relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl w-full max-w-sm group hover:border-indigo-500/50 transition-colors duration-500\"\n      >\n        <div className=\"absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500\" />\n        \n        <div className=\"relative\">\n          <div className=\"flex justify-between items-center\">\n            <span className=\"inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1.5 text-xs font-semibold tracking-wider text-indigo-300 ring-1 ring-inset ring-indigo-500/30\">\n              <Sparkles className=\"h-3 w-3\" /> PRO EDITION\n            </span>\n          </div>\n          \n          <div className=\"mt-8 flex items-baseline text-white\">\n            <span className=\"text-6xl font-extrabold tracking-tight\">$49</span>\n            <span className=\"ml-1 text-xl font-medium text-white/50\">/mo</span>\n          </div>\n          \n          <p className=\"mt-4 text-sm text-white/60 leading-relaxed\">\n            Advanced features for professional developers and teams scaling up their applications.\n          </p>\n          \n          <motion.ul \n            initial=\"hidden\"\n            animate=\"visible\"\n            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}\n            className=\"mt-8 space-y-4\"\n          >\n            {['Unlimited Projects', 'Custom Domains', '24/7 Priority Support', 'Analytics Dashboard'].map((feature) => (\n              <motion.li \n                key={feature} \n                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}\n                className=\"flex items-center gap-3\"\n              >\n                <div className=\"flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-inset ring-indigo-500/30 group-hover:bg-indigo-500/30 transition-colors\">\n                  <Check className=\"h-3 w-3 text-indigo-300\" />\n                </div>\n                <span className=\"text-sm text-white/80\">{feature}</span>\n              </motion.li>\n            ))}\n          </motion.ul>\n          \n          <button className=\"mt-10 w-full rounded-xl bg-indigo-500 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all ease-out hover:scale-[1.02] hover:bg-indigo-400 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] active:scale-95\">\n            Upgrade to Pro\n          </button>\n        </div>\n      </motion.div>\n    </div>\n  );\n}\n"
},
{
  "name": "Holographic Stats Card",
  "category": "Cards",
  "tags": [
    "Stats",
    "Hologram",
    "Tailwind",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0"
  },
  "code": "import React from 'react';\nimport { Activity } from 'lucide-react';\nimport { motion } from 'framer-motion';\n\nexport default function HolographicStats() {\n  return (\n    <div className=\"min-h-screen bg-[#09090b] flex items-center justify-center p-4\">\n      <motion.div \n        whileHover={{ scale: 1.02 }}\n        className=\"relative overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-950/10 p-6 backdrop-blur-md w-full max-w-sm group\"\n      >\n        <div className=\"absolute inset-0 bg-gradient-to-b from-sky-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100\" />\n        \n        <div className=\"relative flex items-center justify-between\">\n          <div>\n            <p className=\"text-sm font-medium text-sky-400\">Monthly Traffic</p>\n            <p className=\"mt-2 text-4xl font-light tracking-tight text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]\">\n              45.2K\n            </p>\n          </div>\n          <div className=\"flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]\">\n            <Activity className=\"h-6 w-6\" />\n          </div>\n        </div>\n        \n        <div className=\"relative mt-6 flex items-center text-sm text-sky-300/80\">\n          <span className=\"font-medium text-emerald-400\">+12.5%</span>\n          <span className=\"ml-2\">from last month</span>\n        </div>\n      </motion.div>\n    </div>\n  );\n}\n"
},
{
  "name": "Interactive Profile Card",
  "category": "Cards",
  "tags": [
    "Card",
    "Profile",
    "Tailwind",
    "Hover"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React from 'react';\nimport { Github, Twitter, Mail } from 'lucide-react';\n\nexport default function ProfileCard() {\n  return (\n    <div className=\"min-h-[400px] bg-[#0a0a0a] flex items-center justify-center p-4\">\n      <div className=\"group relative w-full max-w-sm rounded-[2rem] bg-zinc-950 p-2 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20\">\n        <div className=\"absolute inset-0 rounded-[2rem] bg-gradient-to-b from-indigo-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100\" />\n        <div className=\"relative flex flex-col items-center rounded-[1.75rem] border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-xl\">\n          <div className=\"relative mb-6 h-24 w-24 rounded-full p-1 ring-2 ring-indigo-500/50\">\n            <img\n              src=\"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200\"\n              alt=\"Profile\"\n              className=\"h-full w-full rounded-full object-cover\"\n            />\n          </div>\n          <h3 className=\"text-xl font-bold text-white tracking-tight\">Elena Rivera</h3>\n          <p className=\"mt-1 text-sm font-medium text-indigo-400\">Senior Product Designer</p>\n          <p className=\"mt-4 text-center text-sm text-zinc-400 leading-relaxed\">\n            Crafting digital experiences with a focus on motion and micro-interactions.\n          </p>\n          <div className=\"mt-8 flex gap-4\">\n            <button className=\"flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-indigo-500 hover:text-white shadow-lg\">\n              <Github className=\"h-4 w-4\" />\n            </button>\n            <button className=\"flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-sky-500 hover:text-white shadow-lg\">\n              <Twitter className=\"h-4 w-4\" />\n            </button>\n            <button className=\"flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-emerald-500 hover:text-white shadow-lg\">\n              <Mail className=\"h-4 w-4\" />\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}\n"
}
];
