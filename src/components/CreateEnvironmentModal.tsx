"use client";

import { useState } from "react";
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
import { createEnvironment } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateEnvironmentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const PRESET_COLORS = [
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#8b5cf6", // Violet
  "#0ea5e9", // Sky
  "#10b981", // Emerald
  "#f59e0b", // Amber
];

export function CreateEnvironmentModal({
  isOpen,
  onOpenChange,
  onCreated,
}: CreateEnvironmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dependencies: '{\n  "lucide-react": "latest"\n}',
    color: "",
  });

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

      await createEnvironment({
        name: formData.name,
        dependencies: parsedDeps,
        color: formData.color || undefined,
      });

      setFormData({
        name: "",
        dependencies: '{\n  "lucide-react": "latest"\n}',
        color: "",
      });
      onCreated();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create environment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-black/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Environment</DialogTitle>
            <DialogDescription>
              Define shared dependencies for a group of components.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="env-name">Environment Name</Label>
              <Input
                id="env-name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. React Native Web"
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="env-deps">Shared Dependencies (JSON)</Label>
              <Textarea
                id="env-deps"
                required
                value={formData.dependencies}
                onChange={(e) =>
                  setFormData({ ...formData, dependencies: e.target.value })
                }
                className="font-mono text-xs h-32 bg-white/5 border-white/10"
              />
            </div>

            <div className="grid gap-3 pt-2">
              <Label>Color Tag</Label>
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
              Create Environment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
