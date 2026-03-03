"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { ComponentData, EnvironmentData } from "@/lib/storage";

interface SandpackViewerProps {
  component: ComponentData;
  environment?: EnvironmentData;
}

export function SandpackViewer({
  component,
  environment,
}: SandpackViewerProps) {
  // Filter out core React deps — Sandpack provides its own.
  // Duplicating them causes fatal "Cannot read properties of undefined" crashes.
  const safeDeps: Record<string, string> = { ...environment?.dependencies };
  if (component.dependencies) {
    for (const [key, value] of Object.entries(component.dependencies)) {
      if (!["react", "react-dom", "react-scripts"].includes(key)) {
        safeDeps[key] = value;
      }
    }
  }

  // Failsafe for migrated components that might have lost their deps
  if (component.code.includes("framer-motion") && !safeDeps["framer-motion"]) {
    safeDeps["framer-motion"] = "^10.16.0";
  }

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
      <SandpackProvider
        template="react-ts"
        theme="dark"
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          classes: {
            "sp-wrapper": "h-full",
            "sp-layout": "h-full rounded-xl border-none",
          },
        }}
        files={{
          "/App.tsx": component.code,
          "/styles.css": {
            code: `/* Tailwind is loaded via external CDN script */
body {
  margin: 0;
  padding: 1.5rem;
  background-color: #09090b;
  color: white;
  color-scheme: dark;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}`,
            hidden: true,
          },
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            ...safeDeps,
          },
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showTabs={true}
            showLineNumbers={true}
            style={{ height: "calc(100vh - 12rem)" }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            style={{ height: "calc(100vh - 12rem)" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
