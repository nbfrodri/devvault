import { createComponent, createFolder, createEnvironment } from "./api";
import * as seedComponents from "./seed/index";
// Import ComponentData to use as type
import { ComponentData } from "./storage";

export function getTemplateComponents(): Omit<
  ComponentData,
  "id" | "createdAt" | "updatedAt"
>[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allComponents = Object.values(seedComponents).flat() as any[];

  return allComponents.map((component) => {
    const data = { ...component };
    // Clean up raw identifiers for the UI since they are only used during seeding
    delete data.rawFolderId;
    delete data.rawEnvironmentId;
    // Give some defaults so it fulfills Omit<ComponentData, ...>
    if (!data.folderId) data.folderId = "uncategorized";
    return data as Omit<ComponentData, "id" | "createdAt" | "updatedAt">;
  });
}

export async function seedSamples() {
  const uiFolder = await createFolder("UI Elements");
  const widgetsFolder = await createFolder("Widgets");

  const animatedEnv = await createEnvironment({
    name: "Animated UI (Framer + Lucide)",
    dependencies: {
      "lucide-react": "^0.300.0",
      "framer-motion": "^10.16.0",
      clsx: "^2.1.0",
      "tailwind-merge": "^2.2.0",
    },
    color: "#8b5cf6", // Violet
  });

  const tailwindEnv = await createEnvironment({
    name: "Base Tailwind",
    dependencies: {
      "lucide-react": "^0.300.0",
    },
    color: "#0ea5e9", // Sky
  });

  const folderMap: Record<string, string> = {
    uiFolder: uiFolder.id,
    widgetsFolder: widgetsFolder.id,
    uncategorized: "uncategorized",
  };

  const envMap: Record<string, string> = {
    animatedEnv: animatedEnv.id,
    tailwindEnv: tailwindEnv.id,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allComponents = Object.values(seedComponents).flat() as any[];

  for (const component of allComponents) {
    const data = { ...component };

    if (data.rawFolderId && folderMap[data.rawFolderId]) {
      data.folderId = folderMap[data.rawFolderId];
    } else {
      data.folderId = "uncategorized";
    }

    if (data.rawEnvironmentId && envMap[data.rawEnvironmentId]) {
      data.environmentId = envMap[data.rawEnvironmentId];
    }

    delete data.rawFolderId;
    delete data.rawEnvironmentId;

    await createComponent(data as any);
  }

  console.log(`Seedeed ${allComponents.length} components.`);
}
