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
import { updateFolder } from "@/lib/api";
import { FolderData } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditFolderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  folder: FolderData | null;
  onUpdated: () => void;
}

export function EditFolderModal({
  isOpen,
  onOpenChange,
  folder,
  onUpdated,
}: EditFolderModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && folder) {
      setName(folder.name);
      setColor(folder.color || "#8b5cf6");
    }
  }, [isOpen, folder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !folder) return;

    setLoading(true);
    try {
      await updateFolder(folder.id, name.trim(), color);
      onUpdated();
      onOpenChange(false);
      toast.success("Group renamed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-white/10 bg-black/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Group</DialogTitle>
            <DialogDescription>
              Change the name of this logical group.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="bg-white/5 border-white/10"
                placeholder="e.g. Navigation"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-color">Group Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="edit-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 p-1 bg-white/5 border-white/10 cursor-pointer"
                />
                <span className="text-sm text-muted-foreground uppercase font-mono">
                  {color}
                </span>
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
