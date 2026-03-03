/* eslint-disable @typescript-eslint/no-explicit-any */
export const inputComponents: any[] = [
{
  "name": "Animated Password Input",
  "category": "Inputs",
  "tags": [
    "Form",
    "Framer Motion",
    "Security",
    "Tailwind"
  ],
  "rawFolderId": "widgetsFolder",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Eye, EyeOff, Lock } from 'lucide-react';\nimport { motion, AnimatePresence } from 'framer-motion';\n\nexport default function AnimatedPasswordInput() {\n  const [password, setPassword] = useState(\"\");\n  const [show, setShow] = useState(false);\n  const [focused, setFocused] = useState(false);\n\n  // Simple strength check\n  const strength = Math.min(password.length * 10, 100);\n  const color = \n    strength < 30 ? \"bg-red-500\" :\n    strength < 70 ? \"bg-amber-400\" : \n    \"bg-emerald-500\";\n\n  return (\n    <div className=\"min-h-screen bg-[#09090b] flex items-center justify-center p-4\">\n      <div className=\"w-full max-w-sm\">\n        <div \n          className={`relative flex items-center rounded-xl border ${focused ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'} px-3 py-2 transition-colors duration-300`}\n        >\n          <Lock className={`h-5 w-5 mr-3 ${focused ? 'text-primary' : 'text-zinc-500'}`} />\n          <input\n            type={show ? \"text\" : \"password\"}\n            value={password}\n            onChange={(e) => setPassword(e.target.value)}\n            onFocus={() => setFocused(true)}\n            onBlur={() => setFocused(false)}\n            placeholder=\"Enter secure password\"\n            className=\"flex-1 bg-transparent text-white placeholder:text-zinc-600 focus:outline-none\"\n          />\n          <button \n            type=\"button\"\n            onClick={() => setShow(!show)}\n            className=\"text-zinc-500 hover:text-white transition-colors p-1\"\n          >\n            {show ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}\n          </button>\n        </div>\n\n        <AnimatePresence>\n          {password.length > 0 && (\n            <motion.div\n              initial={{ opacity: 0, height: 0 }}\n              animate={{ opacity: 1, height: 'auto' }}\n              exit={{ opacity: 0, height: 0 }}\n              className=\"mt-3 overflow-hidden\"\n            >\n              <div className=\"h-1.5 w-full bg-white/10 rounded-full overflow-hidden\">\n                <motion.div \n                  className={`h-full ${color}`}\n                  initial={{ width: 0 }}\n                  animate={{ width: `${strength}%` }}\n                  transition={{ type: \"spring\", bounce: 0, duration: 0.5 }}\n                />\n              </div>\n              <p className=\"text-xs text-zinc-500 mt-2 text-right\">\n                {strength < 30 ? 'Weak' : strength < 70 ? 'Fair' : 'Strong'}\n              </p>\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Animated Password Input",
  "category": "Inputs",
  "tags": [
    "Form",
    "Framer Motion",
    "Security",
    "Tailwind"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';\nimport { motion, AnimatePresence } from 'framer-motion';\n\nexport default function AnimatedPasswordInput() {\n  const [password, setPassword] = useState(\"\");\n  const [show, setShow] = useState(false);\n  const [focused, setFocused] = useState(false);\n\n  // Refined strict strength check\n  const getStrength = (pass: string) => {\n    let score = 0;\n    if (pass.length > 5) score += 20;\n    if (pass.length > 8) score += 20;\n    if (/[A-Z]/.test(pass)) score += 20;\n    if (/[0-9]/.test(pass)) score += 20;\n    if (/[^A-Za-z0-9]/.test(pass)) score += 20;\n    return score;\n  };\n\n  const strength = getStrength(password);\n  \n  const color = \n    strength === 0 ? \"bg-white/10\" :\n    strength <= 40 ? \"bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]\" :\n    strength <= 80 ? \"bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]\" : \n    \"bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]\";\n\n  const glow = \n    strength === 0 ? \"ring-white/10 text-zinc-500\" :\n    strength <= 40 ? \"ring-rose-500/50 text-rose-500\" :\n    strength <= 80 ? \"ring-amber-400/50 text-amber-400\" : \n    \"ring-emerald-500/50 text-emerald-500\";\n\n  return (\n    <div className=\"min-h-screen bg-[#09090b] flex items-center justify-center p-4\">\n      <div className=\"w-full max-w-sm\">\n        <motion.div \n          animate={{\n            x: strength > 0 && strength <= 20 && focused ? [-2, 2, -2, 2, 0] : 0\n          }}\n          transition={{ duration: 0.4 }}\n        >\n          <div \n            className={`relative flex items-center rounded-2xl border-none ring-1 ${focused ? `ring-2 bg-black/40 ${glow}` : 'ring-white/10 bg-white/5'} px-4 py-3 transition-all duration-300`}\n          >\n            <Lock className={`h-5 w-5 mr-3 transition-colors duration-300 ${focused ? 'text-current' : 'text-zinc-500'}`} />\n            <input\n              type={show ? \"text\" : \"password\"}\n              value={password}\n              onChange={(e) => setPassword(e.target.value)}\n              onFocus={() => setFocused(true)}\n              onBlur={() => setFocused(false)}\n              placeholder=\"Create secure password\"\n              className=\"flex-1 bg-transparent text-white placeholder:text-zinc-600 focus:outline-none font-medium tracking-wide\"\n            />\n            <button \n              type=\"button\"\n              onClick={() => setShow(!show)}\n              className=\"text-zinc-500 hover:text-white transition-colors p-2 -mr-2 rounded-full hover:bg-white/10\"\n            >\n              {show ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}\n            </button>\n          </div>\n        </motion.div>\n\n        <AnimatePresence>\n          {password.length > 0 && (\n            <motion.div\n              initial={{ opacity: 0, height: 0, y: -10 }}\n              animate={{ opacity: 1, height: 'auto', y: 0 }}\n              exit={{ opacity: 0, height: 0, y: -10 }}\n              className=\"mt-4 overflow-hidden\"\n            >\n              <div className=\"flex gap-1.5 h-1.5 w-full\">\n                {[20, 40, 60, 80, 100].map((step) => (\n                  <div key={step} className=\"h-full flex-1 bg-white/10 rounded-full overflow-hidden\">\n                    <motion.div\n                      initial={{ width: \"0%\" }}\n                      animate={{ width: strength >= step ? \"100%\" : \"0%\" }}\n                      transition={{ duration: 0.3, ease: \"easeOut\" }}\n                      className={`h-full ${strength >= step ? color.split(' ')[0] : 'bg-transparent'} ${strength >= step ? color.split(' ')[1] : ''}`}\n                    />\n                  </div>\n                ))}\n              </div>\n              <div className=\"flex justify-between items-center mt-3\">\n                <p className={`text-xs font-medium transition-colors duration-300 ${focused ? glow.split(' ')[1] : 'text-zinc-500'}`}>\n                  {strength <= 20 ? 'Too weak' : \n                   strength <= 40 ? 'Weak' : \n                   strength <= 80 ? 'Good' : 'Strong'}\n                </p>\n                {strength === 100 && (\n                  <motion.div \n                    initial={{ scale: 0, opacity: 0 }}\n                    animate={{ scale: 1, opacity: 1 }}\n                    className=\"flex items-center gap-1 text-xs text-emerald-400 font-medium\"\n                  >\n                    <CheckCircle2 className=\"h-3.5 w-3.5\" />\n                    Perfect\n                  </motion.div>\n                )}\n              </div>\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Floating Label Input",
  "category": "Inputs",
  "tags": [
    "TextField",
    "Input",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\nimport { Mail } from 'lucide-react';\n\nexport default function TextField() {\n  const [value, setValue] = useState('');\n  const [focused, setFocused] = useState(false);\n\n  return (\n    <div className=\"min-h-[300px] bg-[#09090b] flex flex-col items-center justify-center p-4\">\n      <div className=\"relative w-full max-w-sm\">\n        <motion.div\n          animate={{ \n            borderColor: focused ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.1)',\n            backgroundColor: focused ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.03)'\n          }}\n          className=\"relative flex items-center rounded-2xl border px-4 py-3 transition-colors duration-300\"\n        >\n          <Mail className={`mr-3 h-5 w-5 transition-colors duration-300 ${focused ? 'text-indigo-400' : 'text-zinc-500'}`} />\n          <div className=\"relative flex-1\">\n            <motion.label\n              initial={false}\n              animate={{\n                y: focused || value ? -24 : 0,\n                scale: focused || value ? 0.85 : 1,\n                color: focused ? 'rgba(165, 180, 252, 1)' : 'rgba(161, 161, 170, 1)'\n              }}\n              transition={{ duration: 0.2, ease: \"easeOut\" }}\n              className=\"absolute left-0 top-0.5 origin-left text-base pointer-events-none\"\n            >\n              Email Address\n            </motion.label>\n            <input\n              type=\"email\"\n              value={value}\n              onChange={(e) => setValue(e.target.value)}\n              onFocus={() => setFocused(true)}\n              onBlur={() => setFocused(false)}\n              className=\"w-full bg-transparent text-white focus:outline-none pt-1\"\n            />\n          </div>\n        </motion.div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Animated Custom Select",
  "category": "Inputs",
  "tags": [
    "Select",
    "Dropdown",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState, useRef, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { ChevronDown, Check } from 'lucide-react';\n\nconst options = [\n  { id: '1', label: 'Design System' },\n  { id: '2', label: 'Marketing Site' },\n  { id: '3', label: 'Web Application' },\n  { id: '4', label: 'Mobile App' },\n];\n\nexport default function Select() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [selected, setSelected] = useState(options[0]);\n  const ref = useRef<HTMLDivElement>(null);\n\n  useEffect(() => {\n    const handleClickOutside = (e: MouseEvent) => {\n      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);\n    };\n    document.addEventListener('mousedown', handleClickOutside);\n    return () => document.removeEventListener('mousedown', handleClickOutside);\n  }, []);\n\n  return (\n    <div className=\"min-h-[400px] bg-[#09090b] flex flex-col items-center justify-center p-4\">\n      <div className=\"relative w-full max-w-xs\" ref={ref}>\n        <label className=\"mb-2 block text-sm font-medium text-zinc-400\">Project Type</label>\n        <button\n          onClick={() => setIsOpen(!isOpen)}\n          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${isOpen ? 'border-indigo-500/50 bg-indigo-500/10 text-white' : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'}`}\n        >\n          <span className=\"block truncate\">{selected.label}</span>\n          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>\n            <ChevronDown className=\"h-4 w-4 text-zinc-400\" />\n          </motion.div>\n        </button>\n\n        <AnimatePresence>\n          {isOpen && (\n            <motion.div\n              initial={{ opacity: 0, y: -10, scale: 0.95 }}\n              animate={{ opacity: 1, y: 0, scale: 1 }}\n              exit={{ opacity: 0, y: -10, scale: 0.95 }}\n              transition={{ duration: 0.2 }}\n              className=\"absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-1 shadow-2xl\"\n            >\n              {options.map((option) => (\n                <button\n                  key={option.id}\n                  onClick={() => { setSelected(option); setIsOpen(false); }}\n                  className={`relative flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${selected.id === option.id ? 'text-indigo-400 bg-indigo-500/10 font-medium' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}\n                >\n                  <span className=\"flex-1 text-left\">{option.label}</span>\n                  {selected.id === option.id && <Check className=\"h-4 w-4\" />}\n                </button>\n              ))}\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Custom Checkbox Group",
  "category": "Inputs",
  "tags": [
    "Checkbox",
    "Radio",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\nimport { Check } from 'lucide-react';\n\nconst plans = [\n  { id: 'basic', name: 'Basic', price: '$9', desc: 'Perfect for side projects' },\n  { id: 'pro', name: 'Pro', price: '$29', desc: 'Everything you need to scale' },\n  { id: 'enterprise', name: 'Enterprise', price: '$99', desc: 'Advanced features for teams' },\n];\n\nexport default function CheckboxGroup() {\n  const [selected, setSelected] = useState<string[]>(['pro']);\n\n  const toggle = (id: string) => {\n    setSelected(prev => \n      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]\n    );\n  };\n\n  return (\n    <div className=\"min-h-[400px] bg-[#09090b] flex items-center justify-center p-4\">\n      <div className=\"w-full max-w-md space-y-3\">\n        <h3 className=\"text-lg font-medium text-white mb-4\">Select Add-ons</h3>\n        {plans.map((plan) => {\n          const isChecked = selected.includes(plan.id);\n          return (\n            <div\n              key={plan.id}\n              onClick={() => toggle(plan.id)}\n              className={`relative cursor-pointer overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${isChecked ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}\n            >\n              <div className=\"flex items-center gap-4\">\n                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${isChecked ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-zinc-600 bg-transparent'}`}>\n                  <motion.div\n                    initial={false}\n                    animate={{ opacity: isChecked ? 1 : 0, scale: isChecked ? 1 : 0 }}\n                    transition={{ duration: 0.2 }}\n                  >\n                    <Check className=\"h-4 w-4\" />\n                  </motion.div>\n                </div>\n                <div className=\"flex-1\">\n                  <div className=\"flex justify-between items-center\">\n                    <h4 className={`font-medium transition-colors ${isChecked ? 'text-emerald-400' : 'text-white'}`}>{plan.name}</h4>\n                    <span className={`text-sm font-semibold ${isChecked ? 'text-emerald-400' : 'text-zinc-400'}`}>{plan.price}</span>\n                  </div>\n                  <p className=\"text-sm text-zinc-500 mt-0.5\">{plan.desc}</p>\n                </div>\n              </div>\n              {isChecked && (\n                <motion.div\n                  layoutId=\"outline\"\n                  className=\"absolute inset-0 rounded-2xl border-2 border-emerald-500 pointer-events-none\"\n                  transition={{ type: \"spring\", stiffness: 300, damping: 30 }}\n                />\n              )}\n            </div>\n          );\n        })}\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Minimal Date Picker",
  "category": "Inputs",
  "tags": [
    "DatePicker",
    "Calendar",
    "Tailwind"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';\n\nexport default function DatePicker() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [date, setDate] = useState<Date | null>(new Date());\n\n  // Very basic mock calendar for UI purposes\n  const days = Array.from({ length: 31 }, (_, i) => i + 1);\n  \n  return (\n    <div className=\"min-h-[400px] bg-[#09090b] flex flex-col items-center justify-center p-4\">\n      <div className=\"relative w-full max-w-sm\">\n        <label className=\"mb-2 block text-sm font-medium text-zinc-400\">Due Date</label>\n        <button\n          onClick={() => setIsOpen(!isOpen)}\n          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${isOpen ? 'border-sky-500/50 bg-sky-500/10 text-white' : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20'}`}\n        >\n          <div className=\"flex items-center gap-3\">\n            <CalendarIcon className={`h-5 w-5 ${date ? 'text-sky-400' : 'text-zinc-500'}`} />\n            <span className={date ? 'text-white' : 'text-zinc-500'}>\n              {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Pick a date...'}\n            </span>\n          </div>\n        </button>\n\n        {isOpen && (\n          <div className=\"absolute z-50 mt-2 p-4 w-full rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl\">\n            <div className=\"flex items-center justify-between mb-4\">\n              <button className=\"p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white\"><ChevronLeft className=\"h-5 w-5\" /></button>\n              <span className=\"text-sm font-medium text-white\">November 2026</span>\n              <button className=\"p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white\"><ChevronRight className=\"h-5 w-5\" /></button>\n            </div>\n            <div className=\"grid grid-cols-7 gap-1 text-center mb-2\">\n              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (\n                <div key={d} className=\"text-xs font-semibold text-zinc-500\">{d}</div>\n              ))}\n            </div>\n            <div className=\"grid grid-cols-7 gap-1\">\n              {/* Spacer for 1st of month */}\n              <div /> <div /> <div />\n              {days.map((day) => (\n                <button\n                  key={day}\n                  onClick={() => { \n                    const newDate = new Date(2026, 10, day);\n                    setDate(newDate); \n                    setIsOpen(false); \n                  }}\n                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${day === date?.getDate() ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.5)] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}\n                >\n                  {day}\n                </button>\n              ))}\n            </div>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Combobox (Autocomplete)",
  "category": "Inputs",
  "tags": [
    "Combobox",
    "Autocomplete",
    "Search"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState, useRef, useEffect } from 'react';\nimport { Search, Check } from 'lucide-react';\n\nconst frameWorks = [\n  { value: \"react\", label: \"React\" },\n  { value: \"vue\", label: \"Vue\" },\n  { value: \"svelte\", label: \"Svelte\" },\n  { value: \"angular\", label: \"Angular\" },\n  { value: \"nextjs\", label: \"Next.js\" },\n];\n\nexport default function Combobox() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [query, setQuery] = useState('');\n  const [selected, setSelected] = useState('');\n  const ref = useRef<HTMLDivElement>(null);\n\n  useEffect(() => {\n    const handleClickOutside = (e: MouseEvent) => {\n      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);\n    };\n    document.addEventListener('mousedown', handleClickOutside);\n    return () => document.removeEventListener('mousedown', handleClickOutside);\n  }, []);\n\n  const filtered = query === '' \n    ? frameWorks \n    : frameWorks.filter((framework) => framework.label.toLowerCase().includes(query.toLowerCase()));\n\n  return (\n    <div className=\"min-h-[400px] bg-[#09090b] flex flex-col items-center justify-center p-4\">\n      <div className=\"relative w-full max-w-sm\" ref={ref}>\n        <div \n          className={`flex items-center rounded-xl border px-3 py-2 transition-colors duration-200 ${isOpen ? 'border-primary/50 bg-white/10' : 'border-white/10 bg-white/5'}`}\n          onClick={() => setIsOpen(true)}\n        >\n          <Search className=\"mr-2 h-4 w-4 text-zinc-500\" />\n          <input \n            type=\"text\"\n            value={isOpen ? query : selected ? frameWorks.find(f => f.value === selected)?.label : ''}\n            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}\n            placeholder=\"Search framework...\"\n            className=\"flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-600\"\n          />\n        </div>\n\n        {isOpen && (\n          <div className=\"absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-1 shadow-2xl\">\n            {filtered.length === 0 ? (\n              <div className=\"p-4 text-center text-sm text-zinc-500\">No results found.</div>\n            ) : (\n              filtered.map((fw) => (\n                <button\n                  key={fw.value}\n                  onClick={() => { setSelected(fw.value); setQuery(''); setIsOpen(false); }}\n                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${selected === fw.value ? 'bg-primary/20 text-primary font-medium' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}\n                >\n                  {fw.label}\n                  {selected === fw.value && <Check className=\"h-4 w-4\" />}\n                </button>\n              ))\n            )}\n          </div>\n        )}\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Smooth Toggle Switch",
  "category": "Inputs",
  "tags": [
    "Switch",
    "Toggle",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\n\nexport default function Switch() {\n  const [isOn, setIsOn] = useState(false);\n\n  return (\n    <div className=\"min-h-[300px] bg-[#09090b] flex items-center justify-center p-4\">\n      <div\n        className={`flex w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/10'}`}\n        onClick={() => setIsOn(!isOn)}\n      >\n        <motion.div\n          className=\"h-7 w-7 rounded-full bg-white shadow-md\"\n          animate={{ x: isOn ? 32 : 0 }}\n          transition={{ type: \"spring\", stiffness: 500, damping: 30 }}\n        />\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Animated Input OTP",
  "category": "Inputs",
  "tags": [
    "OTP",
    "Pin",
    "Input",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState, useRef } from 'react';\nimport { motion } from 'framer-motion';\nimport { ShieldCheck } from 'lucide-react';\n\nexport default function InputOTP() {\n  const [otp, setOtp] = useState(['', '', '', '', '', '']);\n  const [activeIndex, setActiveIndex] = useState(0);\n  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {\n    const value = e.target.value;\n    if (isNaN(Number(value))) return;\n\n    const newOtp = [...otp];\n    newOtp[index] = value.substring(value.length - 1);\n    setOtp(newOtp);\n\n    if (value && index < 5) {\n      setActiveIndex(index + 1);\n      inputRefs.current[index + 1]?.focus();\n    }\n  };\n\n  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {\n    if (e.key === 'Backspace' && !otp[index] && index > 0) {\n      setActiveIndex(index - 1);\n      inputRefs.current[index - 1]?.focus();\n    }\n  };\n\n  const isComplete = otp.every(val => val !== '');\n\n  return (\n    <div className=\"relative flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-[#09090b] p-4\">\n      <div className=\"w-full max-w-sm text-center\">\n        <motion.div\n          initial={{ scale: 0.8, opacity: 0 }}\n          animate={{ scale: 1, opacity: 1 }}\n          className=\"mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/20\"\n        >\n          <ShieldCheck className={`h-8 w-8 transition-colors duration-500 ${isComplete ? 'text-emerald-400' : 'text-indigo-400'}`} />\n        </motion.div>\n        \n        <h3 className=\"mb-2 text-2xl font-bold tracking-tight text-white\">Verification Code</h3>\n        <p className=\"mb-10 text-sm text-zinc-400\">We sent a 6-digit code to your device.</p>\n\n        <div className=\"flex justify-center gap-2 sm:gap-3\">\n          {otp.map((digit, index) => (\n            <div key={index} className=\"relative\">\n              <motion.input\n                ref={el => inputRefs.current[index] = el}\n                type=\"text\"\n                inputMode=\"numeric\"\n                maxLength={1}\n                value={digit}\n                onChange={e => handleChange(e, index)}\n                onKeyDown={e => handleKeyDown(e, index)}\n                onFocus={() => setActiveIndex(index)}\n                animate={{\n                  y: digit ? -5 : 0,\n                  borderColor: isComplete ? 'rgba(52, 211, 153, 0.5)' : activeIndex === index ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.1)',\n                  backgroundColor: isComplete ? 'rgba(52, 211, 153, 0.1)' : activeIndex === index ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)'\n                }}\n                transition={{ type: \"spring\", stiffness: 300, damping: 20 }}\n                className=\"h-12 w-12 sm:h-14 sm:w-14 rounded-xl border text-center text-xl sm:text-2xl font-semibold text-white shadow-sm focus:outline-none transition-shadow\"\n                style={isComplete ? { boxShadow: '0 0 20px rgba(52, 211, 153, 0.2)' } : activeIndex === index ? { boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' } : undefined}\n              />\n              {!digit && activeIndex === index && (\n                <motion.div\n                  animate={{ opacity: [1, 0] }}\n                  transition={{ repeat: Infinity, duration: 0.8, ease: \"linear\" }}\n                  className=\"absolute bottom-3 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-indigo-500 pointer-events-none\"\n                />\n              )}\n            </div>\n          ))}\n        </div>\n\n        <motion.div \n          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 10 }}\n          className=\"mt-8 text-sm font-medium text-emerald-400\"\n        >\n          Authentication successful!\n        </motion.div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Animated Slider",
  "category": "Inputs",
  "tags": [
    "Slider",
    "Range",
    "Input",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useState, useRef, useEffect } from 'react';\nimport { motion, useMotionValue } from 'framer-motion';\n\nexport default function Slider() {\n  const [value, setValue] = useState(50);\n  const trackRef = useRef<HTMLDivElement>(null);\n  const thumbRef = useRef<HTMLDivElement>(null);\n  const dragX = useMotionValue(0);\n  const [isDragging, setIsDragging] = useState(false);\n  const max = 100;\n\n  useEffect(() => {\n    if (trackRef.current && thumbRef.current && !isDragging) {\n      const trackWidth = trackRef.current.offsetWidth;\n      const thumbWidth = thumbRef.current.offsetWidth;\n      const maxDrag = trackWidth - thumbWidth;\n      dragX.set((value / max) * maxDrag);\n    }\n  }, [value, isDragging, max]);\n\n  const handleThumbDrag = (_: any, info: any) => {\n    if (!trackRef.current || !thumbRef.current) return;\n    const trackWidth = trackRef.current.offsetWidth;\n    const thumbWidth = thumbRef.current.offsetWidth;\n    const maxDrag = trackWidth - thumbWidth;\n    const currentX = dragX.get();\n    const percent = Math.max(0, Math.min(1, currentX / maxDrag));\n    setValue(Math.round(percent * max));\n  };\n\n  const handleTrackClick = (e: React.MouseEvent) => {\n    if (!trackRef.current || !thumbRef.current) return;\n    const rect = trackRef.current.getBoundingClientRect();\n    const thumbWidth = thumbRef.current.offsetWidth;\n    const maxDrag = rect.width - thumbWidth;\n    let clickX = e.clientX - rect.left - thumbWidth / 2;\n    clickX = Math.max(0, Math.min(clickX, maxDrag));\n    \n    const percent = clickX / maxDrag;\n    const newVal = Math.round(percent * max);\n    setValue(newVal);\n    dragX.set(clickX);\n  };\n\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"w-full max-w-md\">\n        <div className=\"mb-6 flex items-end justify-between\">\n          <div>\n            <label className=\"text-sm font-medium text-zinc-300\">Volume</label>\n            <p className=\"text-xs text-zinc-500\">Adjust the master playback volume</p>\n          </div>\n          <motion.div\n            animate={{ color: isDragging ? '#6366f1' : '#fff', scale: isDragging ? 1.1 : 1 }}\n            className=\"text-2xl font-bold tracking-tight\"\n          >\n            {value}%\n          </motion.div>\n        </div>\n\n        <div className=\"relative flex h-10 items-center group\" ref={trackRef}>\n          <div \n            className=\"absolute left-0 right-0 h-3 cursor-pointer rounded-full bg-white/10 transition-colors group-hover:bg-white/20\"\n            onClick={handleTrackClick}\n          >\n             <div \n                className=\"absolute left-0 top-0 bottom-0 bg-indigo-500 rounded-full pointer-events-none transition-all duration-150 ease-out\"\n                style={{ width: `${(value / max) * 100}%` }}\n             >\n                <div className=\"absolute inset-0 bg-white/20 rounded-full\" />\n             </div>\n          </div>\n\n          <motion.div\n            ref={thumbRef}\n            drag=\"x\"\n            dragConstraints={trackRef}\n            dragElastic={0}\n            dragMomentum={false}\n            style={{ x: dragX }}\n            onDragStart={() => setIsDragging(true)}\n            onDragEnd={() => setIsDragging(false)}\n            onDrag={handleThumbDrag}\n            whileHover={{ scale: 1.1 }}\n            whileTap={{ scale: 0.9 }}\n            className=\"absolute left-0 z-10 flex h-7 w-7 cursor-grab active:cursor-grabbing items-center justify-center rounded-full border-[3px] border-indigo-500 bg-white shadow-[0_0_20px_rgba(99,102,241,0.6)] outline-none\"\n          >\n             <motion.div \n               animate={{ scale: isDragging ? 1 : 0 }} \n               className=\"h-2 w-2 rounded-full bg-indigo-500\" \n             />\n          </motion.div>\n        </div>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Glowing Textarea",
  "category": "Inputs",
  "tags": [
    "Textarea",
    "Input",
    "Form",
    "Glow"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {},
  "code": "import React, { useState } from 'react';\n\nexport default function Textarea() {\n  const [text, setText] = useState('');\n  const maxChars = 280;\n\n  return (\n    <div className=\"relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"w-full max-w-lg\">\n        <label className=\"mb-2 block text-sm font-medium text-zinc-300\">\n          Feedback\n        </label>\n        <div className=\"group relative\">\n          {/* Glow effect */}\n          <div className=\"absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 blur backdrop-blur-xl transition-opacity duration-500 group-focus-within:opacity-30\" />\n          \n          <div className=\"relative\">\n            <textarea\n              value={text}\n              onChange={(e) => setText(e.target.value)}\n              placeholder=\"Tell us what you love or what could be improved...\"\n              maxLength={maxChars}\n              rows={5}\n              className=\"block w-full resize-y rounded-xl border border-white/10 bg-zinc-900/80 p-4 text-sm text-white placeholder:text-zinc-500 focus:border-white/20 focus:bg-zinc-900 focus:outline-none focus:ring-0 transition-colors custom-scrollbar\"\n            />\n            <div className=\"absolute bottom-3 right-3 flex items-center gap-2\">\n              <span className={`text-xs font-medium ${text.length >= maxChars ? 'text-rose-400' : 'text-zinc-500'}`}>\n                {text.length} / {maxChars}\n              </span>\n            </div>\n          </div>\n        </div>\n        <p className=\"mt-2 text-xs text-zinc-500\">Your feedback helps us improve our product.</p>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Animated Switch",
  "category": "Inputs",
  "tags": [
    "Switch",
    "Toggle",
    "Input",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\nimport { Moon, Sun } from 'lucide-react';\n\nexport default function Switch() {\n  const [isNotificationsOn, setIsNotificationsOn] = useState(false);\n  const [isAppearanceOn, setIsAppearanceOn] = useState(false);\n\n  return (\n    <div className=\"relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"flex flex-col items-center gap-6\">\n        \n        {/* Standard Smooth Switch */}\n        <div className=\"flex items-center gap-4 border border-white/10 bg-zinc-900/50 p-4 rounded-xl\">\n          <label className=\"text-sm font-medium text-white w-24\">Notifications</label>\n          <button\n            onClick={() => setIsNotificationsOn(!isNotificationsOn)}\n            className={`relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${isNotificationsOn ? 'bg-indigo-500' : 'bg-zinc-700'}`}\n            aria-label=\"Toggle notifications\"\n          >\n            <motion.span\n              animate={{ x: isNotificationsOn ? 20 : 0 }}\n              transition={{ type: \"spring\", stiffness: 700, damping: 30 }}\n              className=\"inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0\"\n            />\n          </button>\n        </div>\n\n        {/* Icon Theme Switch */}\n        <div className=\"flex items-center gap-4 border border-white/10 bg-zinc-900/50 p-4 rounded-xl\">\n          <label className=\"text-sm font-medium text-white w-24\">Appearance</label>\n          <button\n            onClick={() => setIsAppearanceOn(!isAppearanceOn)}\n            className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${isAppearanceOn ? 'bg-indigo-500' : 'bg-zinc-800 border border-white/10'}`}\n            aria-label=\"Toggle appearance\"\n          >\n            <motion.div\n              animate={{ x: isAppearanceOn ? 32 : 0 }}\n              transition={{ type: \"spring\", stiffness: 700, damping: 30 }}\n              className=\"flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md overflow-hidden relative\"\n            >\n               <motion.div\n                  initial={false}\n                  animate={{ y: isAppearanceOn ? 0 : 20, opacity: isAppearanceOn ? 1 : 0 }}\n                  transition={{ duration: 0.2 }}\n                  className=\"absolute\"\n               >\n                 <Moon className=\"h-3 w-3 text-indigo-500\" />\n               </motion.div>\n               <motion.div\n                  initial={false}\n                  animate={{ y: isAppearanceOn ? -20 : 0, opacity: isAppearanceOn ? 0 : 1 }}\n                  transition={{ duration: 0.2 }}\n                  className=\"absolute\"\n               >\n                 <Sun className=\"h-3 w-3 text-amber-500\" />\n               </motion.div>\n            </motion.div>\n          </button>\n        </div>\n\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Animated Checkbox",
  "category": "Inputs",
  "tags": [
    "Checkbox",
    "Input",
    "Form",
    "Framer Motion"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\n\nexport default function Checkbox() {\n  const [isChecked1, setIsChecked1] = useState(true);\n  const [isChecked2, setIsChecked2] = useState(false);\n\n  const tickVariants = {\n    checked: {\n      pathLength: 1,\n      opacity: 1,\n      transition: {\n        duration: 0.3,\n        delay: 0.1,\n        type: \"spring\",\n        stiffness: 300,\n        damping: 20\n      }\n    },\n    unchecked: {\n      pathLength: 0,\n      opacity: 0,\n      transition: { duration: 0.2 }\n    }\n  };\n\n  return (\n    <div className=\"relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"space-y-6 w-full max-w-xs\">\n        \n        {/* Custom Framer Motion Checkbox */}\n        <label className=\"flex cursor-pointer items-center gap-3 p-3 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-white/5 transition-colors\">\n          <div \n            className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors duration-200 ${isChecked1 ? 'bg-indigo-500 border-indigo-500' : 'bg-transparent border-zinc-600'}`}\n            onClick={(e) => {\n              e.preventDefault();\n              setIsChecked1(!isChecked1);\n            }}\n          >\n            <input type=\"checkbox\" className=\"sr-only\" checked={isChecked1} readOnly />\n            <motion.svg\n              viewBox=\"0 0 24 24\"\n              className=\"h-4 w-4 fill-none stroke-white stroke-2\"\n              initial={false}\n              animate={isChecked1 ? \"checked\" : \"unchecked\"}\n            >\n              <motion.path\n                strokeLinecap=\"round\"\n                strokeLinejoin=\"round\"\n                d=\"M5 13l4 4L19 7\"\n                variants={tickVariants}\n              />\n            </motion.svg>\n          </div>\n          <span className=\"text-sm font-medium text-white select-none\">Subscribe to newsletter</span>\n        </label>\n\n        {/* Circular Checkbox (Radio-like) */}\n        <label className=\"flex cursor-pointer items-center gap-3 p-3 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-white/5 transition-colors\">\n          <div \n            className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${isChecked2 ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-zinc-600'}`}\n            onClick={(e) => {\n              e.preventDefault();\n              setIsChecked2(!isChecked2);\n            }}\n          >\n            <input type=\"checkbox\" className=\"sr-only\" checked={isChecked2} readOnly />\n            <motion.svg\n              viewBox=\"0 0 24 24\"\n              className=\"h-4 w-4 fill-none stroke-white stroke-2\"\n              initial={false}\n              animate={isChecked2 ? \"checked\" : \"unchecked\"}\n            >\n              <motion.path\n                strokeLinecap=\"round\"\n                strokeLinejoin=\"round\"\n                d=\"M5 13l4 4L19 7\"\n                variants={tickVariants}\n              />\n            </motion.svg>\n          </div>\n          <span className=\"text-sm font-medium text-white select-none\">Accept terms of service</span>\n        </label>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Segmented Button Group",
  "category": "Inputs",
  "tags": [
    "Button",
    "Group",
    "Segmented Control",
    "Toggle"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0"
  },
  "code": "import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\n\nexport default function ButtonGroup() {\n  const [active, setActive] = useState('Monthly');\n  const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];\n\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"flex rounded-full border border-white/10 bg-zinc-900/50 p-1 backdrop-blur-md\">\n        {options.map((option) => (\n          <button\n            key={option}\n            onClick={() => setActive(option)}\n            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none ${active === option ? 'text-white' : 'text-zinc-400 hover:text-white'}`}\n          >\n            {active === option && (\n              <motion.div\n                layoutId=\"activeTabBg\"\n                className=\"absolute inset-0 rounded-full bg-zinc-800 border border-white/5 shadow-sm z-0\"\n                transition={{ type: \"spring\", stiffness: 400, damping: 30 }}\n              />\n            )}\n            <span className=\"relative z-10\">{option}</span>\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Combobox Dropdown",
  "category": "Inputs",
  "tags": [
    "Combobox",
    "Search",
    "Select",
    "Autocomplete"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState, useRef, useEffect, useMemo } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { Search, ChevronDown, Check } from 'lucide-react';\n\nexport default function Combobox() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [query, setQuery] = useState('');\n  const [selected, setSelected] = useState<string | null>(null);\n  const ref = useRef<HTMLDivElement>(null);\n\n  const frameworks = [\n    'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'Remix', 'Solid', 'Preact'\n  ];\n\n  const filtered = useMemo(() => {\n    if (!query) return frameworks;\n    return frameworks.filter((fw) => fw.toLowerCase().includes(query.toLowerCase()));\n  }, [query, frameworks]);\n\n  useEffect(() => {\n    const handleClickOutside = (e: MouseEvent) => {\n      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);\n    };\n    document.addEventListener('mousedown', handleClickOutside);\n    return () => document.removeEventListener('mousedown', handleClickOutside);\n  }, []);\n\n  return (\n    <div className=\"relative flex min-h-[400px] w-full justify-center rounded-xl border border-white/10 bg-[#09090b] p-24\">\n      <div className=\"relative w-64\" ref={ref}>\n        <button\n          onClick={() => setIsOpen(!isOpen)}\n          className=\"flex w-full items-center justify-between rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm font-medium transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500\"\n        >\n          <span className={selected ? 'text-white' : 'text-zinc-500'}>{selected || 'Select framework...'}</span>\n          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>\n            <ChevronDown className=\"h-4 w-4 text-zinc-400\" />\n          </motion.div>\n        </button>\n\n        <AnimatePresence>\n          {isOpen && (\n            <motion.div\n              initial={{ opacity: 0, y: -10, scale: 0.95 }}\n              animate={{ opacity: 1, y: 0, scale: 1 }}\n              exit={{ opacity: 0, y: -10, scale: 0.95 }}\n              transition={{ duration: 0.2 }}\n              className=\"absolute left-0 top-full mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl z-50 flex flex-col max-h-60\"\n            >\n              <div className=\"flex items-center gap-2 border-b border-white/10 px-3 py-2 bg-zinc-900/50\">\n                <Search className=\"h-4 w-4 text-zinc-400\" />\n                <input\n                  autoFocus\n                  placeholder=\"Search...\"\n                  value={query}\n                  onChange={(e) => setQuery(e.target.value)}\n                  className=\"flex-1 bg-transparent text-sm text-white focus:outline-none\"\n                />\n              </div>\n              \n              <div className=\"overflow-y-auto p-1 custom-scrollbar flex-1\">\n                {filtered.length === 0 ? (\n                  <p className=\"py-6 text-center text-sm text-zinc-500\">No framework found.</p>\n                ) : (\n                  filtered.map((fw) => (\n                    <button\n                      key={fw}\n                      onClick={() => { setSelected(fw); setIsOpen(false); setQuery(''); }}\n                      className=\"flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-colors\"\n                    >\n                      {fw}\n                      {selected === fw && <Check className=\"h-4 w-4 text-indigo-400\" />}\n                    </button>\n                  ))\n                )}\n              </div>\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Date Picker Simple",
  "category": "Inputs",
  "tags": [
    "Date",
    "Picker",
    "Input",
    "Calendar"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Calendar as CalendarIcon } from 'lucide-react';\n\nexport default function DatePicker() {\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"relative w-64\">\n        <div className=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n          <CalendarIcon className=\"h-4 w-4 text-zinc-500\" />\n        </div>\n        <input\n          type=\"date\"\n          className=\"block w-full rounded-xl border border-white/10 bg-zinc-900/50 p-2.5 pl-10 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer\"\n          placeholder=\"Select date\"\n        />\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Input Group Dropdown",
  "category": "Inputs",
  "tags": [
    "Input",
    "Group",
    "Addon"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React from 'react';\nimport { Link, Copy } from 'lucide-react';\n\nexport default function InputGroup() {\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"flex w-full max-w-sm items-center\">\n        <span className=\"flex items-center whitespace-nowrap rounded-l-xl border border-r-0 border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-400\">\n          https://\n        </span>\n        <input\n          type=\"text\"\n          className=\"block w-full min-w-0 flex-1 border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500\"\n          defaultValue=\"component-vault.com\"\n        />\n        <button className=\"flex items-center rounded-r-xl border border-l-0 border-white/10 bg-zinc-900 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors\">\n          <Copy className=\"h-4 w-4\" />\n        </button>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Native Styled Select",
  "category": "Inputs",
  "tags": [
    "Select",
    "Native",
    "Form"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {},
  "code": "import React from 'react';\n\nexport default function NativeSelect() {\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"w-full max-w-xs\">\n        <label htmlFor=\"theme\" className=\"block mb-2 text-sm font-medium text-white\">Select a theme</label>\n        <select id=\"theme\" className=\"block w-full rounded-xl border border-white/10 bg-zinc-900 p-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a1a1aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[size:1em] pr-10\">\n          <option>Dark Mode (Default)</option>\n          <option>Light Mode</option>\n          <option>System Theme</option>\n          <option>High Contrast</option>\n        </select>\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Radio Group Cards",
  "category": "Inputs",
  "tags": [
    "Radio",
    "Group",
    "Cards",
    "Selection"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Cpu, Cloud, Zap, CheckCircle2 } from 'lucide-react';\n\nexport default function RadioGroup() {\n  const [selected, setSelected] = useState('pro');\n\n  const plans = [\n    { id: 'starter', title: 'Starter', price: '$9', icon: Cloud, desc: 'Perfect for small side projects.' },\n    { id: 'pro', title: 'Pro', price: '$29', icon: Zap, desc: 'For professional developers & teams.' },\n    { id: 'enterprise', title: 'Enterprise', price: '$99', icon: Cpu, desc: 'Advanced features for scaling.' },\n  ];\n\n  return (\n    <div className=\"relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"w-full max-w-lg space-y-4\">\n        {plans.map((plan) => (\n          <button\n            key={plan.id}\n            onClick={() => setSelected(plan.id)}\n            className={`relative flex w-full cursor-pointer items-start gap-4 rounded-xl border p-4 text-left transition-all ${selected === plan.id ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'border-white/10 bg-zinc-900/50 hover:bg-white/5 hover:border-white/20'}`}\n          >\n            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${selected === plan.id ? 'border-indigo-500/30 bg-indigo-500/20 text-indigo-400' : 'border-white/10 bg-zinc-800 text-zinc-400'}`}>\n              <plan.icon className=\"h-5 w-5\" />\n            </div>\n            <div className=\"flex-1\">\n               <div className=\"flex items-center justify-between\">\n                 <h3 className={`font-medium ${selected === plan.id ? 'text-white' : 'text-zinc-300'}`}>{plan.title}</h3>\n                 <span className={`font-semibold ${selected === plan.id ? 'text-indigo-400' : 'text-white'}`}>{plan.price}<span className=\"text-xs text-zinc-500 font-normal\">/mo</span></span>\n               </div>\n               <p className=\"mt-1 text-sm text-zinc-500\">{plan.desc}</p>\n            </div>\n            {selected === plan.id && (\n               <CheckCircle2 className=\"absolute top-4 right-4 h-5 w-5 text-indigo-500 animate-in zoom-in duration-200\" />\n            )}\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n}\n"
},
{
  "name": "Toggle Button",
  "category": "Inputs",
  "tags": [
    "Toggle",
    "Button",
    "Interactive"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { Bold, Italic, Underline } from 'lucide-react';\n\nexport default function Toggle() {\n  const [isToggled, setIsToggled] = useState(false);\n\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <button\n        onClick={() => setIsToggled(!isToggled)}\n        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus:ring-2 focus:ring-indigo-500 ${isToggled ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'bg-transparent border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}\n        aria-pressed={isToggled}\n      >\n        <Bold className=\"h-4 w-4\" />\n      </button>\n    </div>\n  );\n}\n"
},
{
  "name": "Toggle Group Toolbar",
  "category": "Inputs",
  "tags": [
    "Toggle",
    "Group",
    "Toolbar"
  ],
  "rawFolderId": "uncategorized",
  "rawEnvironmentId": null,
  "dependencies": {
    "lucide-react": "^0.300.0"
  },
  "code": "import React, { useState } from 'react';\nimport { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';\n\nexport default function ToggleGroup() {\n  const [active, setActive] = useState('left');\n\n  return (\n    <div className=\"relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-8\">\n      <div className=\"inline-flex rounded-xl border border-white/10 bg-zinc-900/50 p-1 backdrop-blur-md\">\n        <button\n          onClick={() => setActive('left')}\n          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${active === 'left' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}\n        >\n          <AlignLeft className=\"h-4 w-4\" />\n        </button>\n        <button\n          onClick={() => setActive('center')}\n          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${active === 'center' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}\n        >\n          <AlignCenter className=\"h-4 w-4\" />\n        </button>\n        <button\n          onClick={() => setActive('right')}\n          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${active === 'right' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}\n        >\n          <AlignRight className=\"h-4 w-4\" />\n        </button>\n      </div>\n    </div>\n  );\n}\n"
}
];
