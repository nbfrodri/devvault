import { EnvironmentData } from "@/lib/storage";
import { Boxes } from "lucide-react";

interface EnvironmentBadgeProps {
  environment: EnvironmentData;
}

export function EnvironmentBadge({ environment }: EnvironmentBadgeProps) {
  const color = environment.color || "#6b7280"; // Default gray

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors"
      style={{
        borderColor: `${color}40`,
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <Boxes className="h-3 w-3" />
      {environment.name}
    </div>
  );
}
