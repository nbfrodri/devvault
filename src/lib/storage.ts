import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export interface ComponentData {
  id: string;
  name: string;
  category: string;
  tags: string[];
  code: string;
  dependencies: Record<string, string>;
  folderId?: string;
  environmentId?: string;
  orderIndex?: number;
  color?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FolderData {
  id: string;
  name: string;
  environmentId?: string;
  color?: string;
  createdAt: string;
}

export interface EnvironmentData {
  id: string;
  name: string;
  dependencies: Record<string, string>;
  color?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "components.json");

// Ensure the data directory and file exist
function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
}

export function getAllComponents(): ComponentData[] {
  initStorage();
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data) as ComponentData[];
  } catch (error) {
    console.error("Error reading components.json:", error);
    return [];
  }
}

export function saveComponent(
  componentInfo: Omit<ComponentData, "id" | "createdAt" | "updatedAt">,
): ComponentData {
  initStorage();
  const components = getAllComponents();

  const newComponent: ComponentData = {
    ...componentInfo,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  components.push(newComponent);
  fs.writeFileSync(FILE_PATH, JSON.stringify(components, null, 2));

  return newComponent;
}

export function updateComponent(
  id: string,
  updates: Partial<Omit<ComponentData, "id" | "createdAt" | "updatedAt">>,
): ComponentData | null {
  initStorage();
  const components = getAllComponents();

  const index = components.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updatedComponent = {
    ...components[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  components[index] = updatedComponent;
  fs.writeFileSync(FILE_PATH, JSON.stringify(components, null, 2));

  return updatedComponent;
}

export function deleteComponent(id: string): boolean {
  initStorage();
  const components = getAllComponents();

  const filtered = components.filter((c) => c.id !== id);
  if (filtered.length === components.length) return false;

  fs.writeFileSync(FILE_PATH, JSON.stringify(filtered, null, 2));
  return true;
}
