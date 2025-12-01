import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface AIModel {
  id: string;
  name: string;
  description: string;
  context: string;
}

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  isLoading?: boolean;
}

export function ModelSelector({
  models,
  selectedModel,
  onSelectModel,
  isLoading,
}: ModelSelectorProps) {
  const current = models.find((m) => m.id === selectedModel);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between glass-intense hover:bg-card/80 hover:shadow-glow transition-all duration-300 group rounded-2xl h-auto py-4"
          disabled={isLoading}
          aria-label="Select AI model"
        >
          <div className="flex flex-col items-start">
            <span className="font-semibold group-hover:text-primary transition-colors text-base">
              {current?.name || "Select Model"}
            </span>
            <span className="text-xs text-muted-foreground font-light">{current?.context}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 glass-intense shadow-glow border-primary/20 rounded-2xl">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className="flex-col items-start cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all rounded-xl p-4 my-1"
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold text-base">{model.name}</span>
              {model.id === selectedModel && (
                <Check className="h-5 w-5 text-primary animate-in zoom-in-50 duration-200" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 font-light">
              {model.description}
            </p>
            <span className="text-xs text-primary/80 mt-1 font-medium">{model.context}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
