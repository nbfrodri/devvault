"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Search } from "lucide-react";
import { createComponent } from "@/lib/api";
import { ComponentData } from "@/lib/storage";
import { toast } from "sonner";

interface TemplatesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeWorkspace: string | null;
  onTemplateAdded: () => void;
}

export function TemplatesModal({
  isOpen,
  onOpenChange,
  activeWorkspace,
  onTemplateAdded,
}: TemplatesModalProps) {
  const [addingId, setAddingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name-asc");
  const [templates, setTemplates] = useState<
    Omit<ComponentData, "id" | "createdAt" | "updatedAt">[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch the raw template data from the seed file
      import("@/lib/seed").then(({ getTemplateComponents }) => {
        setTemplates(getTemplateComponents());
      });
    }
  }, [isOpen]);

  const handleAddTemplate = async (
    template: Omit<ComponentData, "id" | "createdAt" | "updatedAt">,
  ) => {
    setAddingId(template.name);
    try {
      await createComponent({
        name: template.name,
        category: template.category || "Templates",
        tags: template.tags || [],
        environmentId: activeWorkspace || template.environmentId,
        code: template.code,
        dependencies: template.dependencies || {},
        folderId: template.folderId,
      });
      onTemplateAdded();
      toast.success(`"${template.name}" added to Vault!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add template");
    } finally {
      setAddingId(null);
    }
  };

  const filteredTemplates = templates
    .filter((t) => {
      const query = searchQuery.toLowerCase();
      const name = t.name?.toLowerCase() || "";
      const category = t.category?.toLowerCase() || "";
      const matchesSearch =
        name.includes(query) ||
        category.includes(query) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(query)));

      const matchesCat =
        filterCategory === "all" || t.category === filterCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto border-white/10 bg-black/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            Component Templates
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Preview and instantly add modern, pre-built components to your
            vault.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4 mt-4 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search templates by name, category, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mt-4 pb-8">
          {filteredTemplates.map((t, i) => (
            <div
              key={i}
              className="relative group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-white/90">
                    {t.name || "Unnamed Component"}
                  </h3>
                  <p className="text-xs text-white/50">
                    {t.category || "Uncategorized"}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-primary/20 hover:bg-primary/40 border-primary/50 text-white"
                  disabled={addingId === t.name}
                  onClick={() => handleAddTemplate(t)}
                >
                  {addingId === t.name ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </>
                  )}
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {t.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative h-32 w-full rounded-lg overflow-hidden bg-black/50 border border-white/5">
                {/* Visual placeholder depending on the template */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <span className="text-xs text-white/30 font-mono">
                    Ready to render
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
