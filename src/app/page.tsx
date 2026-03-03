"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import { ComponentCard } from "@/components/ComponentCard";
import { CreateComponentModal } from "@/components/CreateComponentModal";
import { CreateEnvironmentModal } from "@/components/CreateEnvironmentModal";
import { EditEnvironmentModal } from "@/components/EditEnvironmentModal";
import { TemplatesModal } from "@/components/TemplatesModal";
import {
  getComponents,
  getFolders,
  getEnvironments,
  deleteComponent,
  duplicateComponent,
  reorderComponents,
  deleteFolder,
  updateComponent,
} from "@/lib/api";
import { ComponentData, FolderData, EnvironmentData } from "@/lib/storage";
import {
  Loader2,
  Plus,
  FolderPlus,
  Boxes,
  Trash2,
  Settings2,
  Eraser,
  ArrowDownAZ,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Fuse, { FuseResult } from "fuse.js";
import PageTransition from "@/components/PageTransition";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { CreateFolderModal } from "@/components/CreateFolderModal";
import { EditFolderModal } from "@/components/EditFolderModal";
import { EditComponentModal } from "@/components/EditComponentModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const router = useRouter();
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [environments, setEnvironments] = useState<EnvironmentData[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<ComponentData[]>(
    [],
  );
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isEditEnvModalOpen, setIsEditEnvModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [groupSortOrders, setGroupSortOrders] = useState<
    Record<string, "a-z" | "z-a" | "newest" | "oldest" | "custom">
  >({});
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<FolderData | null>(null);
  const [isEnvModalOpen, setIsEnvModalOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const [editingComponent, setEditingComponent] =
    useState<ComponentData | null>(null);
  const [isReady, setIsReady] = useState(false); // Used to delay DnD render to prevent hydration mismatch

  async function fetchData() {
    try {
      const [compsData, foldersData, envsData] = await Promise.all([
        getComponents(),
        getFolders(),
        getEnvironments(),
      ]);
      setComponents(compsData);
      setFilteredComponents(compsData);
      setFolders(foldersData);
      setEnvironments(envsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      setIsReady(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let baseComponents = components;
    if (activeWorkspace) {
      baseComponents = baseComponents.filter(
        (c) => c.environmentId === activeWorkspace,
      );
    } else {
      baseComponents = baseComponents.filter((c) => !c.environmentId);
    }
    if (showFavorites) {
      baseComponents = baseComponents.filter((c) => c.isFavorite);
    }

    if (!search.trim()) {
      setFilteredComponents(baseComponents);
      return;
    }

    const fuse = new Fuse(baseComponents, {
      keys: ["name", "category", "tags"],
      threshold: 0.3,
    });

    const results = fuse.search(search);
    setFilteredComponents(
      results.map((r: FuseResult<ComponentData>) => r.item),
    );
  }, [search, components, showFavorites, activeWorkspace]);

  const activeEnvData = useMemo(() => {
    return environments.find((e) => e.id === activeWorkspace) || null;
  }, [environments, activeWorkspace]);

  const handleLoadTemplates = async () => {
    setIsTemplatesModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteComponent(id);
    if (success) {
      setComponents((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleDuplicate = async (id: string) => {
    const newComponent = await duplicateComponent(id);
    setComponents((prev) => [...prev, newComponent]);
  };

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    import("@/lib/api").then(async ({ updateComponent }) => {
      const updated = await updateComponent(id, { isFavorite: !currentStatus });
      setComponents((prev) => prev.map((c) => (c.id === id ? updated : c)));
    });
  };

  const handleMoveToEnvironment = async (
    id: string,
    envId: string | undefined,
  ) => {
    // To ensure complete independence, duplicate the component for the target environment,
    // then delete the original component from its current location.
    const newComponent = await duplicateComponent(id, true);
    const updated = await updateComponent(newComponent.id, {
      environmentId: envId,
      folderId: undefined,
    });

    await deleteComponent(id);

    // Update state explicitly before fetch to guarantee no UI ghosts
    setComponents((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      return [...filtered, updated];
    });

    await fetchData();
  };

  const handleCopyToEnvironment = async (
    id: string,
    envId: string | undefined,
  ) => {
    // Copying should create a completely new component with a new identity
    const newComponent = await duplicateComponent(id, true);
    const updated = await updateComponent(newComponent.id, {
      environmentId: envId,
      folderId: undefined,
    });

    // Explicit state push
    setComponents((prev) => [...prev, updated]);

    await fetchData();
  };

  const handleDeleteFolder = async (folderId: string) => {
    // Optimistic UI updates
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
    setComponents((prev) =>
      prev.map((c) =>
        c.folderId === folderId ? { ...c, folderId: undefined } : c,
      ),
    );

    try {
      // Find all components in this folder and update them directly via API
      const componentsToUpdate = components.filter(
        (c) => c.folderId === folderId,
      );
      for (const comp of componentsToUpdate) {
        await updateComponent(comp.id, { folderId: undefined });
      }
      // Finally, delete the actual folder reference
      await deleteFolder(folderId);
      fetchData();
    } catch (error) {
      console.error("Failed to delete folder", error);
      fetchData(); // Rollback on failure
    }
  };

  const handleDeleteAllInGroup = async (groupId: string) => {
    const isUncategorized = groupId === "uncategorized";
    const componentsToDelete = components.filter((c) => {
      if (activeWorkspace && c.environmentId !== activeWorkspace) return false;
      if (!activeWorkspace && c.environmentId) return false;
      if (isUncategorized) return !c.folderId || c.folderId === "uncategorized";
      return c.folderId === groupId;
    });

    if (componentsToDelete.length === 0) return;

    const idsToDelete = componentsToDelete.map((c) => c.id);
    setComponents((prev) => prev.filter((c) => !idsToDelete.includes(c.id)));

    try {
      for (const id of idsToDelete) {
        await deleteComponent(id);
      }
    } catch (error) {
      console.error("Failed to delete all components in group", error);
      fetchData();
    }
  };

  const handleDeleteAllInWorkspace = async () => {
    const componentsToDelete = activeWorkspace
      ? components.filter((c) => c.environmentId === activeWorkspace)
      : components.filter((c) => !c.environmentId);

    if (componentsToDelete.length === 0) return;

    const idsToDelete = componentsToDelete.map((c) => c.id);
    setComponents((prev) => prev.filter((c) => !idsToDelete.includes(c.id)));

    try {
      for (const id of idsToDelete) {
        await deleteComponent(id);
      }
    } catch (error) {
      console.error("Failed to delete all components", error);
      fetchData();
    }
  };

  const handleCreateFolder = () => {
    setIsFolderModalOpen(true);
  };

  const handleUncategorize = async (id: string) => {
    const updated = await updateComponent(id, { folderId: undefined });
    setComponents((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceFolderId =
      source.droppableId === "uncategorized" ? undefined : source.droppableId;
    const destFolderId =
      destination.droppableId === "uncategorized"
        ? undefined
        : destination.droppableId;

    if (sourceFolderId === destFolderId && source.index === destination.index)
      return;

    const movedItem = components.find((c) => c.id === result.draggableId);
    if (!movedItem) return;

    // Get exact visual groups from currently filtered items to preserve order map
    const activeFolders = activeWorkspace
      ? folders.filter((f) => f.environmentId === activeWorkspace)
      : folders;

    const map: Record<string, ComponentData[]> = { uncategorized: [] };
    activeFolders.forEach((f) => {
      map[f.id] = [];
    });

    filteredComponents.forEach((c) => {
      if (c.folderId && map[c.folderId]) {
        map[c.folderId].push(c);
      } else {
        if (!activeWorkspace || c.environmentId === activeWorkspace) {
          map.uncategorized.push(c);
        }
      }
    });

    const getSortedItems = (fid: string) => {
      const items = map[fid] || [];
      const sort = groupSortOrders[fid] || "custom";
      return [...items].sort((a, b) => {
        switch (sort) {
          case "a-z":
            return a.name.localeCompare(b.name);
          case "z-a":
            return b.name.localeCompare(a.name);
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "custom":
          default:
            return (a.orderIndex || 0) - (b.orderIndex || 0);
        }
      });
    };

    const newSourceItems = getSortedItems(source.droppableId);
    const newDestItems =
      source.droppableId === destination.droppableId
        ? newSourceItems
        : getSortedItems(destination.droppableId);

    // Remove from source array via robust identity check
    const sourceIdxIdentity = newSourceItems.findIndex(
      (c) => c.id === movedItem.id,
    );
    if (sourceIdxIdentity !== -1) {
      newSourceItems.splice(sourceIdxIdentity, 1);
    } else {
      newSourceItems.splice(source.index, 1);
    }

    // Insert into destination      // Find new position
    newDestItems.splice(destination.index, 0, movedItem);

    const targetGroupKey = destination.droppableId;
    const destSort = groupSortOrders[targetGroupKey] || "custom";
    if (destSort !== "custom") {
      setGroupSortOrders((prev) => ({ ...prev, [targetGroupKey]: "custom" }));
    }

    // Prepare robust updates
    const updates: { id: string; folderId?: string; orderIndex: number }[] = [];

    newDestItems.forEach((item, index) => {
      updates.push({ id: item.id, folderId: destFolderId, orderIndex: index });
    });

    if (source.droppableId !== destination.droppableId) {
      newSourceItems.forEach((item, index) => {
        updates.push({
          id: item.id,
          folderId: sourceFolderId,
          orderIndex: index,
        });
      });
    }

    setComponents((prev) =>
      prev.map((c) => {
        const update = updates.find((u) => u.id === c.id);
        if (update) {
          return {
            ...c,
            folderId: update.folderId,
            orderIndex: update.orderIndex,
          };
        }
        return c;
      }),
    );

    await reorderComponents(updates);
  };

  // Group filtered components by folder mapped over available folders
  const groups = useMemo(() => {
    const map: Record<string, ComponentData[]> = {
      uncategorized: [],
    };
    const activeFolders = activeWorkspace
      ? folders.filter((f) => f.environmentId === activeWorkspace)
      : folders.filter((f) => !f.environmentId);

    activeFolders.forEach((f) => {
      map[f.id] = [];
    });

    filteredComponents.forEach((c) => {
      if (c.folderId && map[c.folderId]) {
        map[c.folderId].push(c);
      } else {
        if (!activeWorkspace && !c.environmentId) {
          map.uncategorized.push(c);
        } else if (activeWorkspace && c.environmentId === activeWorkspace) {
          map.uncategorized.push(c);
        }
      }
    });

    const result = activeFolders.map((f) => {
      const gSort = groupSortOrders[f.id] || "custom";
      const sortedItems = [...map[f.id]].sort((a, b) => {
        switch (gSort) {
          case "a-z":
            return a.name.localeCompare(b.name);
          case "z-a":
            return b.name.localeCompare(a.name);
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "custom":
          default:
            return (a.orderIndex || 0) - (b.orderIndex || 0);
        }
      });
      return { id: f.id, name: f.name, color: f.color, items: sortedItems };
    });

    // Handle initial uncategorized sorting
    const uncatSort = groupSortOrders["uncategorized"] || "custom";
    const sortedUncat = [...map.uncategorized].sort((a, b) => {
      switch (uncatSort) {
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "custom":
        default:
          return (a.orderIndex || 0) - (b.orderIndex || 0);
      }
    });

    result.unshift({
      id: "uncategorized",
      name: "Uncategorized",
      color: undefined, // Uncategorized has no specific folder color
      items: sortedUncat,
    });

    return result;
  }, [folders, filteredComponents, activeWorkspace, groupSortOrders]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-[1000px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[128px]"></div>

      <Header
        onNewClick={() => setIsModalOpen(true)}
        search={search}
        onSearchChange={setSearch}
        showFavorites={showFavorites}
        onShowFavoritesChange={setShowFavorites}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        environments={environments}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
        onLoadTemplates={handleLoadTemplates}
      />

      <PageTransition>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5 md:gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-[linear-gradient(to_bottom_right,white,rgba(255,255,255,0.6))]">
                  Your Component Vault
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                  Manage and live-preview your modern React building blocks.
                </p>
              </div>
              <div className="flex w-full sm:w-auto items-center gap-4">
                {activeWorkspace && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm px-3"
                    onClick={() => setIsEditEnvModalOpen(true)}
                    title="Edit Environment"
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => setIsEnvModalOpen(true)}
                >
                  <Boxes className="mr-2 h-4 w-4" />
                  New Environment
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm"
                  onClick={handleCreateFolder}
                >
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Group
                </Button>
                {((activeWorkspace &&
                  components.some(
                    (c) => c.environmentId === activeWorkspace,
                  )) ||
                  (!activeWorkspace && components.length > 0)) && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-white bg-white/5 border-white/10 hover:bg-red-500 hover:text-white hover:border-red-500 backdrop-blur-sm shadow-xl"
                      >
                        <Eraser className="mr-2 h-4 w-4" />
                        {activeWorkspace ? "Clear Workspace" : "Clear Vault"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black/95 border-white/10 backdrop-blur-xl w-[90vw] sm:w-[500px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          {activeWorkspace
                            ? "Clear Workspace?"
                            : "Clear Vault?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                          {activeWorkspace
                            ? "This will permanently delete ALL components in the current environment. This action cannot be undone."
                            : "This will permanently delete ALL components across ALL environments. This action cannot be undone."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
                          onClick={() => handleDeleteAllInWorkspace()}
                        >
                          Clear Everything
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>

            {loading || !isReady ? (
              <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
              </div>
            ) : filteredComponents.length === 0 &&
              groups.filter((g) => g.id !== "uncategorized").length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 p-8 md:p-12 text-center backdrop-blur-sm mt-4 md:mt-8 mx-2 sm:mx-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-6 group hover:bg-primary/20 transition-colors"
                >
                  <Plus className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform" />
                </button>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  No components yet
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6 px-4">
                  Start building your library. Create a new component to see it
                  live-rendered here.
                </p>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-col gap-8 md:gap-12">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="flex flex-col gap-3 md:gap-4"
                    >
                      {groups.length > 1 && (
                        <div className="flex items-center justify-between group/header px-2 sm:px-0">
                          <h2
                            className="text-lg md:text-xl font-semibold tracking-tight"
                            style={{
                              color: group.color || "rgba(255,255,255,0.9)",
                            }}
                          >
                            {group.name}
                          </h2>
                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover/header:opacity-100 transition-all">
                            {group.items.length > 0 && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title={`Clear all components in ${group.name}`}
                                    className="h-8 w-8 text-muted-foreground hover:text-amber-400 hover:bg-amber-500/10"
                                  >
                                    <Eraser className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-black/95 border-white/10 backdrop-blur-xl w-[90vw] sm:w-[500px]">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-white">
                                      Delete all components in &apos;
                                      {group.name}&apos;?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-muted-foreground">
                                      This will permanently delete all{" "}
                                      {group.items.length} component(s) inside
                                      this group. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
                                      onClick={() =>
                                        handleDeleteAllInGroup(group.id)
                                      }
                                    >
                                      Delete All In Group
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Sort group"
                                  className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10"
                                >
                                  <ArrowDownAZ className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-zinc-950 border-white/10 text-white"
                              >
                                {[
                                  { label: "Custom", value: "custom" },
                                  { label: "Name (A-Z)", value: "a-z" },
                                  { label: "Name (Z-A)", value: "z-a" },
                                  { label: "Newest", value: "newest" },
                                  { label: "Oldest", value: "oldest" },
                                ].map((option) => (
                                  <DropdownMenuItem
                                    key={option.value}
                                    onClick={() =>
                                      setGroupSortOrders((prev) => ({
                                        ...prev,
                                        [group.id]: option.value as any,
                                      }))
                                    }
                                    className={`hover:bg-zinc-800 cursor-pointer ${
                                      (groupSortOrders[group.id] ||
                                        "custom") === option.value
                                        ? "bg-zinc-800 text-white"
                                        : "text-zinc-400"
                                    }`}
                                  >
                                    {option.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {group.id !== "uncategorized" && (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/10"
                                  onClick={() => {
                                    const folder = folders.find(
                                      (f) => f.id === group.id,
                                    );
                                    if (folder) {
                                      setEditingFolder(folder);
                                      setIsEditFolderModalOpen(true);
                                    }
                                  }}
                                >
                                  <Settings2 className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-black/95 border-white/10 backdrop-blur-xl w-[90vw] sm:w-[500px]">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-white">
                                        Delete &apos;{group.name}&apos;?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="text-muted-foreground">
                                        This will remove the folder. All
                                        components inside will be moved to
                                        &quot;Uncategorized&quot;, they will not
                                        be deleted.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
                                        onClick={() =>
                                          handleDeleteFolder(group.id)
                                        }
                                      >
                                        Delete Group
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <Droppable droppableId={group.id}>
                        {(provided: DroppableProvided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`grid gap-4 md:gap-6 min-h-[150px] rounded-xl border border-transparent transition-all duration-300 p-2 sm:-m-2 ${
                              viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : viewMode === "compact"
                                  ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
                                  : "grid-cols-1"
                            } ${
                              group.items.length === 0
                                ? "border-dashed border-white/10 bg-white/5"
                                : ""
                            }`}
                          >
                            {group.items.map((component, index) => (
                              <Draggable
                                key={component.id}
                                draggableId={component.id}
                                index={index}
                              >
                                {(
                                  provided: DraggableProvided,
                                  snapshot: any,
                                ) => {
                                  // react-beautiful-dnd grid layout shift fix
                                  const style = {
                                    ...provided.draggableProps.style,
                                    ...(snapshot.isDragging && {
                                      zIndex: 9999,
                                    }),
                                  };
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={style}
                                      className={
                                        snapshot.isDragging
                                          ? "opacity-90 shadow-2xl scale-[1.02] ring-2 ring-primary/50 transition-all rounded-xl cursor-grabbing"
                                          : ""
                                      }
                                    >
                                      <ComponentCard
                                        component={component}
                                        environment={environments.find(
                                          (e) =>
                                            e.id === component.environmentId,
                                        )}
                                        allEnvironments={environments}
                                        onPreview={(id) =>
                                          router.push(`/preview?id=${id}`)
                                        }
                                        onEdit={() =>
                                          setEditingComponent(component)
                                        }
                                        onDelete={handleDelete}
                                        onDuplicate={handleDuplicate}
                                        onToggleFavorite={handleToggleFavorite}
                                        onMoveToEnvironment={
                                          handleMoveToEnvironment
                                        }
                                        onCopyToEnvironment={
                                          handleCopyToEnvironment
                                        }
                                        onUncategorize={
                                          component.folderId
                                            ? handleUncategorize
                                            : undefined
                                        }
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            {group.items.length === 0 && (
                              <div className="col-span-full flex items-center justify-center h-full text-sm text-muted-foreground/50">
                                Drag components here
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            )}
          </div>
        </main>
      </PageTransition>

      <CreateComponentModal
        isOpen={isModalOpen}
        environments={environments}
        defaultEnvironmentId={activeWorkspace}
        onOpenChange={setIsModalOpen}
        onCreated={fetchData}
      />
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onOpenChange={setIsFolderModalOpen}
        activeWorkspace={activeWorkspace}
        onCreated={fetchData}
      />
      <EditFolderModal
        isOpen={isEditFolderModalOpen}
        onOpenChange={setIsEditFolderModalOpen}
        folder={editingFolder}
        onUpdated={fetchData}
      />
      <CreateEnvironmentModal
        isOpen={isEnvModalOpen}
        onOpenChange={setIsEnvModalOpen}
        onCreated={fetchData}
      />
      <EditComponentModal
        component={editingComponent}
        environments={environments}
        isOpen={!!editingComponent}
        onOpenChange={(open) => !open && setEditingComponent(null)}
        onUpdated={fetchData}
      />
      <EditEnvironmentModal
        environment={activeEnvData}
        isOpen={isEditEnvModalOpen}
        onOpenChange={setIsEditEnvModalOpen}
        onUpdated={fetchData}
        onDeleted={() => {
          setActiveWorkspace(null);
          fetchData();
        }}
      />
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onOpenChange={setIsTemplatesModalOpen}
        activeWorkspace={activeWorkspace}
        onTemplateAdded={fetchData}
      />
    </div>
  );
}
