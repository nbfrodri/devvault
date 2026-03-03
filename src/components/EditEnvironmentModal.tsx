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
import { updateEnvironment, deleteEnvironment } from "@/lib/api";
import { EnvironmentData } from "@/lib/storage";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

interface EditEnvironmentModalProps {
  environment: EnvironmentData | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
  onDeleted: () => void;
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

export function EditEnvironmentModal({
  environment,
  isOpen,
  onOpenChange,
  onUpdated,
  onDeleted,
}: EditEnvironmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dependencies: "",
    color: "",
  });

  useEffect(() => {
    if (environment && isOpen) {
      setFormData({
        name: environment.name,
        dependencies:
          Object.keys(environment.dependencies).length > 0
            ? JSON.stringify(environment.dependencies, null, 2)
            : "{}",
        color: environment.color || "",
      });
    }
  }, [environment, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!environment) return;
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

      await updateEnvironment(environment.id, {
        name: formData.name,
        dependencies: parsedDeps,
        color: formData.color || undefined,
      });

      onUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update environment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!environment) return;

    setLoading(true);
    try {
      await deleteEnvironment(environment.id);
      onDeleted();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete environment");
    } finally {
      setLoading(false);
    }
  };

  if (!environment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-black/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Environment</DialogTitle>
            <DialogDescription>
              Modify shared dependencies or update the environment tag.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-env-name">Environment Name</Label>
              <Input
                id="edit-env-name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-env-deps">Shared Dependencies (JSON)</Label>
              <Textarea
                id="edit-env-deps"
                required
                value={formData.dependencies}
                onChange={(e) =>
                  setFormData({ ...formData, dependencies: e.target.value })
                }
                className="font-mono text-xs h-32 bg-white/5 border-white/10"
              />
            </div>

            <div className="grid gap-3 pt-2 border-t border-white/10">
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
          <DialogFooter className="sm:justify-between flex items-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={loading}
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-white/10 bg-black/90 backdrop-blur-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Environment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{environment.name}
                    &quot;? Components using it will fall back to their own
                    internal dependencies and this environment will be
                    permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/5 border-white/10 hover:bg-white/10">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 border-red-500 border"
                  >
                    Delete Environment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex gap-2">
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
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
