"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getComponent, getEnvironments } from "@/lib/api";
import { ComponentData, EnvironmentData } from "@/lib/storage";
import { Loader2, ArrowLeft } from "lucide-react";
import { SandpackViewer } from "@/components/SandpackViewer";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [component, setComponent] = useState<ComponentData | null>(null);
  const [environment, setEnvironment] = useState<EnvironmentData | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const [data, envs] = await Promise.all([
          getComponent(id),
          getEnvironments(),
        ]);
        setComponent(data);
        if (data.environmentId) {
          setEnvironment(envs.find((e) => e.id === data.environmentId));
        }
      } catch (e) {
        console.error("Failed to load component:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!component) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Component not found</h2>
        <Button variant="outline" onClick={() => router.push("/")}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

      <header className="flex h-16 items-center border-b border-white/10 px-4 md:px-6 bg-black/40 backdrop-blur-md">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-white"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vault
        </Button>
        <div className="ml-auto text-sm font-medium opacity-70">
          Previewing:{" "}
          <span className="text-white opacity-100">{component.name}</span>
        </div>
      </header>

      <PageTransition>
        <main className="flex-1 p-4 md:p-6 pb-0 shadow-inner">
          <SandpackViewer component={component} environment={environment} />
        </main>
      </PageTransition>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
