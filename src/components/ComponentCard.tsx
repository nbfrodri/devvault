import { ComponentData, EnvironmentData } from "@/lib/storage";
import { EnvironmentBadge } from "./EnvironmentBadge";
import {
  Copy,
  Check,
  Eye,
  MoreVertical,
  Package,
  Tag as TagIcon,
  Trash2,
  CopyPlus,
  Pencil,
  Heart,
  FolderSymlink,
  FolderX,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
} from "./ui/alert-dialog";
import { useState } from "react";

const DEPENDENCY_COLORS: Record<string, string> = {
  "lucide-react": "text-rose-400 border-rose-400/20 bg-rose-400/10",
  "framer-motion": "text-purple-400 border-purple-400/20 bg-purple-400/10",
  motion: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  clsx: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  "tailwind-merge": "text-cyan-400 border-cyan-400/20 bg-cyan-400/10",
  react: "text-sky-400 border-sky-400/20 bg-sky-400/10",
  three: "text-gray-300 border-gray-300/20 bg-gray-300/10",
  "@react-three/fiber": "text-indigo-400 border-indigo-400/20 bg-indigo-400/10",
  "@react-three/drei": "text-orange-400 border-orange-400/20 bg-orange-400/10",
};

interface ComponentCardProps {
  component: ComponentData;
  environment?: EnvironmentData;
  onPreview: (id: string) => void;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string, currentStatus: boolean) => void;
  onUncategorize?: (id: string) => void;
  allEnvironments?: EnvironmentData[];
  onMoveToEnvironment?: (
    componentId: string,
    envId: string | undefined,
  ) => void;
  onCopyToEnvironment?: (
    componentId: string,
    envId: string | undefined,
  ) => void;
}

export function ComponentCard({
  component,
  environment,
  onPreview,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleFavorite,
  onUncategorize,
  allEnvironments,
  onMoveToEnvironment,
  onCopyToEnvironment,
}: ComponentCardProps) {
  const dependencyNames = Object.keys(component.dependencies);
  const [copied, setCopied] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(component.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  const cssVarStyle = component.color
    ? ({ "--card-glow": component.color } as React.CSSProperties)
    : {};

  return (
    <Card
      onDoubleClick={() => onPreview(component.id)}
      style={cssVarStyle}
      className={`group relative overflow-hidden bg-black/40 backdrop-blur-xl transition-all duration-300 ${
        component.color
          ? "border-(--card-glow) shadow-[0_4px_20px_var(--card-glow)]/40 hover:shadow-[0_8px_30px_var(--card-glow)]"
          : "border-white/10 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20"
      } hover:bg-black/60`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${component.color ? "opacity-20 group-hover:opacity-30" : "opacity-0 group-hover:opacity-10"}`}
        style={{
          background: component.color
            ? `linear-gradient(to bottom right, ${component.color}, transparent, transparent)`
            : undefined,
        }}
      />
      {!component.color && (
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5 flex-1 cursor-default">
            <h3 className="font-semibold text-lg tracking-tight bg-linear-to-br from-white to-white/70 bg-clip-text text-transparent">
              {component.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <Package className="h-3.5 w-3.5" />
              <span>{component.category}</span>
              {environment && (
                <div className="ml-2">
                  <EnvironmentBadge environment={environment} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {onToggleFavorite && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(component.id, !!component.isFavorite);
                }}
                className={`h-8 w-8 transition-colors ${component.isFavorite ? "text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" : "text-muted-foreground hover:text-white"}`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={component.isFavorite ? "currentColor" : "none"}
                />
              </Button>
            )}

            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-white -mr-2"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 bg-black/90 border-white/10 backdrop-blur-xl"
                >
                  <DropdownMenuItem
                    className="cursor-pointer text-white/90 focus:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      const deps = Object.entries(component.dependencies)
                        .map(([name, version]) => `${name}@${version}`)
                        .join(" ");
                      if (deps) {
                        navigator.clipboard.writeText(`npm i ${deps}`);
                      }
                    }}
                  >
                    <CopyPlus className="mr-2 h-4 w-4" />
                    <span>Copy Deps</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-white/90 focus:bg-white/10"
                    onClick={() => onEdit && onEdit(component.id)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-white/90 focus:bg-white/10"
                    onClick={() => onDuplicate && onDuplicate(component.id)}
                  >
                    <CopyPlus className="mr-2 h-4 w-4" />
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  {component.folderId && onUncategorize && (
                    <DropdownMenuItem
                      className="cursor-pointer text-amber-400 focus:bg-amber-400/10 focus:text-amber-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUncategorize(component.id);
                      }}
                    >
                      <FolderX className="mr-2 h-4 w-4" />
                      <span>Uncategorize</span>
                    </DropdownMenuItem>
                  )}
                  {allEnvironments && allEnvironments.length > 0 && (
                    <>
                      <DropdownMenuItem
                        className="cursor-pointer text-white/90 focus:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMoveOpen(true);
                        }}
                      >
                        <FolderSymlink className="mr-2 h-4 w-4" />
                        <span>Move to Workspace</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-white/90 focus:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCopyOpen(true);
                        }}
                      >
                        <CopyPlus className="mr-2 h-4 w-4" />
                        <span>Copy to Workspace</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-400/10 focus:text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent className="bg-black/95 border-white/10 backdrop-blur-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    Delete {component.name}?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    This action cannot be undone. This will permanently delete
                    this component from your local vault.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
                    onClick={() => onDelete && onDelete(component.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {allEnvironments && (
              <>
                <Dialog open={isMoveOpen} onOpenChange={setIsMoveOpen}>
                  <DialogContent className="bg-black/95 border-white/10 backdrop-blur-xl sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Move {component.name}
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Select a workspace to move this component to.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4 max-h-[60vh] overflow-y-auto">
                      <Button
                        variant="outline"
                        className="justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        disabled={!component.environmentId}
                        onClick={() => {
                          onMoveToEnvironment &&
                            onMoveToEnvironment(component.id, undefined);
                          setIsMoveOpen(false);
                        }}
                      >
                        Vault (Global)
                      </Button>
                      {allEnvironments.map((env) => (
                        <Button
                          key={env.id}
                          variant="outline"
                          className="justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white"
                          disabled={component.environmentId === env.id}
                          onClick={() => {
                            onMoveToEnvironment &&
                              onMoveToEnvironment(component.id, env.id);
                            setIsMoveOpen(false);
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: env.color }}
                          />
                          {env.name}
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isCopyOpen} onOpenChange={setIsCopyOpen}>
                  <DialogContent className="bg-black/95 border-white/10 backdrop-blur-xl sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Copy {component.name}
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Select a workspace to copy this component to.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4 max-h-[60vh] overflow-y-auto">
                      <Button
                        variant="outline"
                        className="justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        disabled={
                          !component.environmentId &&
                          component.folderId === undefined
                        }
                        onClick={() => {
                          onCopyToEnvironment &&
                            onCopyToEnvironment(component.id, undefined);
                          setIsCopyOpen(false);
                        }}
                      >
                        Vault (Global)
                      </Button>
                      {allEnvironments.map((env) => (
                        <Button
                          key={env.id}
                          variant="outline"
                          className="justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white"
                          onClick={() => {
                            onCopyToEnvironment &&
                              onCopyToEnvironment(component.id, env.id);
                            setIsCopyOpen(false);
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: env.color }}
                          />
                          {env.name}
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 cursor-default">
          {component.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/5 hover:bg-white/10 text-xs font-medium border-white/5 transition-colors"
            >
              <TagIcon className="h-3 w-3 mr-1 opacity-70" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/5 pt-4">
          <div className="flex flex-wrap gap-1.5 flex-1 pr-2 cursor-default">
            {dependencyNames.length === 0 && (
              <span className="text-xs text-muted-foreground/50">
                No dependencies
              </span>
            )}
            {dependencyNames.slice(0, 2).map((dep) => {
              const colorClass =
                DEPENDENCY_COLORS[dep] ||
                "text-muted-foreground/80 border-white/10 bg-black/20";
              return (
                <Badge
                  key={dep}
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 ${colorClass}`}
                >
                  {dep}
                </Badge>
              );
            })}
            {dependencyNames.length > 2 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-white/10 text-muted-foreground/80 bg-black/20"
              >
                +{dependencyNames.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-white/10 bg-black/50 hover:bg-white/10 text-white"
              onClick={() => onPreview(component.id)}
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 border-white/10 ${copied ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-black/50 hover:bg-white/10 text-white"}`}
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
