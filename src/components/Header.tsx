import {
  PlusCircle,
  Search,
  LayoutGrid,
  List,
  Columns3,
  ArrowUpDown,
  Boxes,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { EnvironmentData } from "@/lib/storage";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onNewClick?: () => void;
  search?: string;
  onSearchChange?: (val: string) => void;
  showFavorites?: boolean;
  onShowFavoritesChange?: (val: boolean) => void;
  viewMode?: "grid" | "list" | "compact";
  onViewModeChange?: (val: "grid" | "list" | "compact") => void;
  environments?: EnvironmentData[];
  activeWorkspace?: string | null;
  onWorkspaceChange?: (id: string | null) => void;
  onLoadTemplates?: () => void;
}

export default function Header({
  onNewClick,
  search,
  onSearchChange,
  showFavorites,
  onShowFavoritesChange,
  viewMode,
  onViewModeChange,
  environments = [],
  activeWorkspace = null,
  onWorkspaceChange,
  onLoadTemplates,
}: HeaderProps) {
  const activeEnv = environments.find((e) => e.id === activeWorkspace);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-xl tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            DevVault
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2 w-full">
          <div className="w-full flex-1 md:w-auto md:flex-none flex items-center justify-end gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <div className="relative w-full md:w-auto min-w-[120px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search components, tags..."
                className="w-full rounded-lg bg-background/50 border-white/10 md:w-[240px] pl-9 transition-colors focus-visible:bg-background"
              />
            </div>

            {onWorkspaceChange && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm min-w-[140px] justify-between"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {activeEnv ? (
                        <>
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: activeEnv.color || "#fff",
                              boxShadow: `0 0 8px ${activeEnv.color || "#fff"}`,
                            }}
                          />
                          <span className="truncate">{activeEnv.name}</span>
                        </>
                      ) : (
                        <>
                          <Boxes className="h-4 w-4 text-muted-foreground" />
                          <span>Global Vault</span>
                        </>
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-black/95 border-white/10 backdrop-blur-xl"
                >
                  <DropdownMenuLabel className="text-white/70 text-xs">
                    Workspaces
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className={`cursor-pointer focus:bg-white/10 ${!activeWorkspace ? "bg-white/5" : ""}`}
                    onClick={() => onWorkspaceChange(null)}
                  >
                    <Boxes className="mr-2 h-4 w-4" />
                    Global Vault
                  </DropdownMenuItem>

                  {environments.length > 0 && (
                    <DropdownMenuSeparator className="bg-white/10" />
                  )}

                  {environments.map((env) => (
                    <DropdownMenuItem
                      key={env.id}
                      className={`cursor-pointer focus:bg-white/10 ${activeWorkspace === env.id ? "bg-white/5" : ""}`}
                      onClick={() => onWorkspaceChange(env.id)}
                    >
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor: env.color || "#fff",
                          boxShadow: `0 0 8px ${env.color || "#fff"}`,
                        }}
                      />
                      <span className="truncate">{env.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {onShowFavoritesChange && (
              <Button
                variant={showFavorites ? "default" : "outline"}
                size="icon"
                onClick={() => onShowFavoritesChange(!showFavorites)}
                className={
                  showFavorites
                    ? "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_15px_-3px] shadow-rose-500/50"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-white backdrop-blur-sm"
                }
                title="Toggle Favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={showFavorites ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </Button>
            )}

            {onViewModeChange && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/5 border-white/10 text-muted-foreground hover:text-white backdrop-blur-sm"
                    title="View Options"
                  >
                    {viewMode === "grid" ? (
                      <LayoutGrid className="h-4 w-4" />
                    ) : viewMode === "compact" ? (
                      <Columns3 className="h-4 w-4" />
                    ) : (
                      <List className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 bg-black/90 border-white/10 backdrop-blur-xl"
                >
                  <DropdownMenuLabel className="text-white/70">
                    View Mode
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className={`cursor-pointer focus:bg-white/10 ${viewMode === "grid" ? "text-primary bg-primary/10" : "text-white/90"}`}
                    onClick={() => onViewModeChange("grid")}
                  >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Grid View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`cursor-pointer focus:bg-white/10 ${viewMode === "compact" ? "text-primary bg-primary/10" : "text-white/90"}`}
                    onClick={() => onViewModeChange("compact")}
                  >
                    <Columns3 className="mr-2 h-4 w-4" />
                    <span>Compact Grid</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`cursor-pointer focus:bg-white/10 ${viewMode === "list" ? "text-primary bg-primary/10" : "text-white/90"}`}
                    onClick={() => onViewModeChange("list")}
                  >
                    <List className="mr-2 h-4 w-4" />
                    <span>List View</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <nav className="flex items-center space-x-2">
            {onLoadTemplates && (
              <Button
                variant="outline"
                onClick={onLoadTemplates}
                className="bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm group hidden sm:flex"
              >
                <Zap className="mr-2 h-4 w-4 group-hover:text-pink-400 transition-colors" />
                Templates
              </Button>
            )}
            <Button
              variant="default"
              onClick={onNewClick}
              className="shadow-[0_0_15px_-3px] shadow-primary/50 group"
            >
              <PlusCircle className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
              New Component
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
