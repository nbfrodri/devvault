"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateComponent } from "@/lib/api";
import { ComponentData, EnvironmentData } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditComponentModalProps {
  component: ComponentData | null;
  environments: EnvironmentData[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

const PRESET_COLORS = [
  "#6366f1", // Indigo (default)
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#8b5cf6", // Violet
  "#0ea5e9", // Sky
  "#10b981", // Emerald
  "#f59e0b", // Amber
];

export function EditComponentModal({
  component,
  environments,
  isOpen,
  onOpenChange,
  onUpdated,
}: EditComponentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    tags: "",
    environmentId: "",
    color: "",
    dependencies: "",
  });

  useEffect(() => {
    if (component && isOpen) {
      setFormData({
        name: component.name,
        category: component.category || "",
        tags: component.tags.join(", "),
        environmentId: component.environmentId || "",
        color: component.color || "",
        dependencies:
          Object.keys(component.dependencies).length > 0
            ? JSON.stringify(component.dependencies, null, 2)
            : "",
      });
    }
  }, [component, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!component) return;

    let parsedDeps = {};
    if (formData.dependencies.trim()) {
      try {
        parsedDeps = JSON.parse(formData.dependencies);
      } catch {
        toast.error(
          'Dependencies must be valid JSON (e.g., {"react": "^18.2.0"})',
        );
        return;
      }
    }

    setLoading(true);
    try {
      await updateComponent(component.id, {
        name: formData.name,
        category: formData.category || "Uncategorized",
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        environmentId: formData.environmentId || undefined,
        color: formData.color || undefined,
        dependencies: parsedDeps,
      });

      onUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update component");
    } finally {
      setLoading(false);
    }
  };

  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-black/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Component</DialogTitle>
            <DialogDescription>
              Update your component details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                <Input
                  id="edit-tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-environment">Environment</Label>
                <select
                  id="edit-environment"
                  value={formData.environmentId}
                  onChange={(e) =>
                    setFormData({ ...formData, environmentId: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                >
                  <option value="" className="bg-zinc-900">
                    None (Standalone)
                  </option>
                  {environments.map((env) => (
                    <option key={env.id} value={env.id} className="bg-zinc-900">
                      {env.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-dependencies">Dependencies (JSON)</Label>
              <textarea
                id="edit-dependencies"
                value={formData.dependencies}
                onChange={(e) =>
                  setFormData({ ...formData, dependencies: e.target.value })
                }
                placeholder='{\n  "lucide-react": "^0.300.0"\n}'
                className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid gap-3 border-t border-white/10 pt-4">
              <Label>Card Glow Color</Label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, color: "" })}
                  className={`h-8 w-8 rounded-full border ${!formData.color ? "border-white border-2" : "border-white/20"} bg-transparent flex items-center justify-center`}
                >
                  <span className="text-[10px] text-white/50">Def</span>
                </button>
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: c })}
                    className={`h-8 w-8 rounded-full border-2 ${formData.color === c ? "border-white" : "border-transparent"}`}
                    style={{
                      backgroundColor: c,
                      boxShadow:
                        formData.color === c ? `0 0 10px ${c}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="shadow-[0_0_15px_-3px] shadow-primary/50"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
