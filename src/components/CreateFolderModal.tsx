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
import { createFolder } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateFolderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
  activeWorkspace: string | null;
}

export function CreateFolderModal({
  isOpen,
  onOpenChange,
  onCreated,
  activeWorkspace,
}: CreateFolderModalProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8b5cf6");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await createFolder(name.trim(), activeWorkspace || undefined, color);
      setName("");
      setColor("#8b5cf6");
      onCreated();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create folder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-white/10 bg-black/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Organize your components into manageable folders.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Navigation, Hooks, Core UI"
                className="bg-white/5 border-white/10"
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Group Color</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 p-1 bg-white/5 border-white/10 cursor-pointer"
                />
                <span className="text-sm text-white/50">{color}</span>
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
              disabled={loading || !name.trim()}
              className="shadow-[0_0_15px_-3px] shadow-primary/50"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
