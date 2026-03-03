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
import { Textarea } from "@/components/ui/textarea";
import { createComponent } from "@/lib/api";
import { EnvironmentData } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateComponentModalProps {
  isOpen: boolean;
  environments: EnvironmentData[];
  defaultEnvironmentId?: string | null;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function CreateComponentModal({
  isOpen,
  environments,
  defaultEnvironmentId,
  onOpenChange,
  onCreated,
}: CreateComponentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    tags: "",
    environmentId: "",
    code: "export default function Component() {\n  return <div>Hello World</div>;\n}",
    dependencies: '{\n  "lucide-react": "latest"\n}',
  });

  // Sync defaultEnvironmentId down to local state when modal opens
  useEffect(() => {
    if (isOpen && defaultEnvironmentId) {
      setFormData((prev) => ({
        ...prev,
        environmentId: defaultEnvironmentId,
      }));
    }
  }, [isOpen, defaultEnvironmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let parsedDeps = {};
      try {
        parsedDeps = JSON.parse(formData.dependencies || "{}");
      } catch {
        toast.error("Dependencies must be valid JSON");
        setLoading(false);
        return;
      }

      await createComponent({
        name: formData.name,
        category: formData.category || "Uncategorized",
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        environmentId: formData.environmentId || undefined,
        code: formData.code,
        dependencies: parsedDeps,
      });

      setFormData({
        name: "",
        category: "",
        tags: "",
        environmentId: "",
        code: "export default function Component() {\n  return <div>Hello World</div>;\n}",
        dependencies: '{\n  "lucide-react": "latest"\n}',
      });
      onCreated();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create component");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] border-white/10 bg-black/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Component</DialogTitle>
            <DialogDescription>
              Add a new component to your local vault.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Glowing Button"
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g. Buttons"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="animations, dark-mode, hero"
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="environment">Environment</Label>
                <select
                  id="environment"
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
              <Label htmlFor="code">React Code</Label>
              <Textarea
                id="code"
                required
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="font-mono text-xs h-40 bg-white/5 border-white/10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deps">Dependencies (JSON)</Label>
              <Textarea
                id="deps"
                value={formData.dependencies}
                onChange={(e) =>
                  setFormData({ ...formData, dependencies: e.target.value })
                }
                className="font-mono text-xs h-20 bg-white/5 border-white/10"
              />
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
              Save to Vault
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
