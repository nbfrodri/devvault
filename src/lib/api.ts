import { ComponentData, FolderData, EnvironmentData } from "./storage";
import {
  readTextFile,
  writeTextFile,
  exists,
  BaseDirectory,
  mkdir,
} from "@tauri-apps/plugin-fs";
import { appDataDir } from "@tauri-apps/api/path";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    __TAURI_INTERNALS__?: Record<string, unknown>;
  }
}

const FILE_NAME = "components.json";
const FOLDERS_FILE_NAME = "folders.json";
const ENVIRONMENTS_FILE_NAME = "environments.json";

/**
 * Ensures the data directory and file exist.
 * Uses Tauri's `appDataDir` to store files locally in a system-appropriate path
 * (e.g., `~/.local/share/com.devvault.app` on Linux, `%APPDATA%` on Windows).
 */
async function initStorage() {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;
  if (isWeb) return; // Fallback for web preview during dev

  try {
    const appDataDirPath = await appDataDir();
    const dirExists = await exists(appDataDirPath, {
      baseDir: BaseDirectory.AppData,
    });
    if (!dirExists) {
      await mkdir(appDataDirPath, {
        recursive: true,
        baseDir: BaseDirectory.AppData,
      });
    }

    const fileExists = await exists(FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    if (!fileExists) {
      await writeTextFile(FILE_NAME, JSON.stringify([]), {
        baseDir: BaseDirectory.AppData,
      });
    }

    const foldersExists = await exists(FOLDERS_FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    if (!foldersExists) {
      await writeTextFile(FOLDERS_FILE_NAME, JSON.stringify([]), {
        baseDir: BaseDirectory.AppData,
      });
    }

    const envsExists = await exists(ENVIRONMENTS_FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    if (!envsExists) {
      await writeTextFile(ENVIRONMENTS_FILE_NAME, JSON.stringify([]), {
        baseDir: BaseDirectory.AppData,
      });
    }
  } catch (error) {
    console.error("Failed to init storage:", error);
  }
}

const mockFolders: FolderData[] = [];
const mockEnvironments: EnvironmentData[] = [];

export async function getEnvironments(): Promise<EnvironmentData[]> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;
  if (isWeb) return mockEnvironments;

  await initStorage();
  try {
    const data = await readTextFile(ENVIRONMENTS_FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    return JSON.parse(data) as EnvironmentData[];
  } catch (error) {
    console.error("Failed to get environments:", error);
    return [];
  }
}

export async function createEnvironment(
  data: Omit<EnvironmentData, "id" | "createdAt">,
): Promise<EnvironmentData> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const newEnv: EnvironmentData = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  if (isWeb) {
    mockEnvironments.push(newEnv);
    return newEnv;
  }

  await initStorage();
  const envs = await getEnvironments();
  envs.push(newEnv);
  await writeTextFile(ENVIRONMENTS_FILE_NAME, JSON.stringify(envs, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return newEnv;
}

export async function updateEnvironment(
  id: string,
  data: Partial<EnvironmentData>,
): Promise<EnvironmentData> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const envs = await getEnvironments();
  const index = envs.findIndex((e) => e.id === id);
  if (index === -1) throw new Error("Environment not found");

  const updated = {
    ...envs[index],
    ...data,
  };

  if (isWeb) {
    mockEnvironments[index] = updated;
    return updated;
  }

  envs[index] = updated;
  await writeTextFile(ENVIRONMENTS_FILE_NAME, JSON.stringify(envs, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return updated;
}

export async function deleteEnvironment(id: string): Promise<boolean> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  if (isWeb) {
    const idx = mockEnvironments.findIndex((e) => e.id === id);
    if (idx !== -1) mockEnvironments.splice(idx, 1);
    return true;
  }

  const envs = await getEnvironments();
  const filtered = envs.filter((e) => e.id !== id);
  if (filtered.length === envs.length) return false;

  await writeTextFile(
    ENVIRONMENTS_FILE_NAME,
    JSON.stringify(filtered, null, 2),
    {
      baseDir: BaseDirectory.AppData,
    },
  );
  return true;
}

export async function loadPresetEnvironment(): Promise<EnvironmentData | null> {
  const envs = await getEnvironments();
  const existingPreset = envs.find((e) => e.name === "Neon Next.js (Preset)");
  if (existingPreset) {
    return existingPreset;
  }

  return await createEnvironment({
    name: "Neon Next.js (Preset)",
    dependencies: {
      "lucide-react": "^0.300.0",
      "framer-motion": "^10.16.0",
      clsx: "^2.1.0",
      "tailwind-merge": "^2.2.0",
    },
    color: "#ec4899", // Neon Pink
  });
}

export async function getFolders(): Promise<FolderData[]> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;
  if (isWeb) return mockFolders;

  await initStorage();
  try {
    const data = await readTextFile(FOLDERS_FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    return JSON.parse(data) as FolderData[];
  } catch (error) {
    console.error("Failed to get folders:", error);
    return [];
  }
}

export async function createFolder(
  name: string,
  environmentId?: string,
  color?: string,
): Promise<FolderData> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const newFolder: FolderData = {
    id: uuidv4(),
    name,
    environmentId,
    color,
    createdAt: new Date().toISOString(),
  };

  if (isWeb) {
    mockFolders.push(newFolder);
    return newFolder;
  }

  await initStorage();
  const folders = await getFolders();
  folders.push(newFolder);
  await writeTextFile(FOLDERS_FILE_NAME, JSON.stringify(folders, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return newFolder;
}

export async function updateFolder(
  id: string,
  name: string,
  color?: string,
): Promise<FolderData> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const folders = await getFolders();
  const index = folders.findIndex((f) => f.id === id);
  if (index === -1) throw new Error("Folder not found");

  const updated = {
    ...folders[index],
    name,
    color: color !== undefined ? color : folders[index].color,
  };

  if (isWeb) {
    mockFolders[index] = updated;
    return updated;
  }

  folders[index] = updated;
  await writeTextFile(FOLDERS_FILE_NAME, JSON.stringify(folders, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return updated;
}

export async function deleteFolder(id: string): Promise<boolean> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  if (isWeb) {
    const idx = mockFolders.findIndex((f) => f.id === id);
    if (idx !== -1) mockFolders.splice(idx, 1);
    return true;
  }

  const folders = await getFolders();
  const filtered = folders.filter((f) => f.id !== id);
  if (filtered.length === folders.length) return false;

  await writeTextFile(FOLDERS_FILE_NAME, JSON.stringify(filtered, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return true;
}

/**
 * Mock API for Web Development (before Tauri wrapper is active)
 */
const mockComponents: ComponentData[] = [];

export async function getComponents(): Promise<ComponentData[]> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;
  if (isWeb) return mockComponents;

  await initStorage();
  try {
    const data = await readTextFile(FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    return JSON.parse(data) as ComponentData[];
  } catch (error) {
    console.error("Failed to get components:", error);
    return [];
  }
}

export async function getComponent(id: string): Promise<ComponentData> {
  const components = await getComponents();
  const component = components.find((c) => c.id === id);
  if (!component) throw new Error("Component not found");
  return component;
}

export async function createComponent(
  data: Omit<ComponentData, "id" | "createdAt" | "updatedAt">,
): Promise<ComponentData> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const newComponent: ComponentData = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isWeb) {
    mockComponents.push(newComponent);
    return newComponent;
  }

  await initStorage();
  const components = await getComponents();
  components.push(newComponent);
  await writeTextFile(FILE_NAME, JSON.stringify(components, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return newComponent;
}

export async function updateComponent(
  id: string,
  data: Partial<ComponentData>,
): Promise<ComponentData> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const components = await getComponents();
  const index = components.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Component not found");

  const updated = {
    ...components[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (isWeb) {
    mockComponents[index] = updated;
    return updated;
  }

  components[index] = updated;
  await writeTextFile(FILE_NAME, JSON.stringify(components, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return updated;
}

export async function reorderComponents(
  updates: { id: string; folderId?: string; orderIndex: number }[],
): Promise<boolean> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  const components = isWeb ? mockComponents : await getComponents();

  let changed = false;
  for (const update of updates) {
    const component = components.find((c) => c.id === update.id);
    if (component) {
      component.folderId = update.folderId;
      component.orderIndex = update.orderIndex;
      component.updatedAt = new Date().toISOString();
      changed = true;
    }
  }

  if (changed && !isWeb) {
    await writeTextFile(FILE_NAME, JSON.stringify(components, null, 2), {
      baseDir: BaseDirectory.AppData,
    });
  }

  return true;
}

export async function deleteComponent(id: string): Promise<boolean> {
  const isWeb = typeof window !== "undefined" && !window.__TAURI_INTERNALS__;

  if (isWeb) {
    const idx = mockComponents.findIndex((c) => c.id === id);
    if (idx !== -1) mockComponents.splice(idx, 1);
    return true;
  }

  const components = await getComponents();
  const filtered = components.filter((c) => c.id !== id);
  if (filtered.length === components.length) return false;

  await writeTextFile(FILE_NAME, JSON.stringify(filtered, null, 2), {
    baseDir: BaseDirectory.AppData,
  });
  return true;
}

export async function duplicateComponent(
  id: string,
  isExactClone: boolean = false,
): Promise<ComponentData> {
  const component = await getComponent(id);

  // Rebuild the component explicitly to break any React proxy reference chain
  const params: Omit<ComponentData, "id" | "createdAt" | "updatedAt"> = {
    name: isExactClone ? component.name : `${component.name} (Copy)`,
    category: component.category,
    environmentId: component.environmentId,
    folderId: component.folderId,
    orderIndex: component.orderIndex,
    isFavorite: false,
    tags: component.tags ? [...component.tags] : [],
    code: component.code,
    dependencies: { ...component.dependencies },
  };

  return createComponent(params);
}
