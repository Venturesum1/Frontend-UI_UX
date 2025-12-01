import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Parameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface ParametersPanelProps {
  parameters: Parameters;
  onChange: (parameters: Parameters) => void;
}

export function ParametersPanel({ parameters, onChange }: ParametersPanelProps) {
  const updateParameter = (key: keyof Parameters, value: number) => {
    onChange({ ...parameters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="temperature">Temperature</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Controls randomness. Lower = more focused, Higher = more creative
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={parameters.temperature}
            onChange={(e) =>
              updateParameter("temperature", parseFloat(e.target.value))
            }
            step={0.1}
            min={0}
            max={2}
            className="w-20 h-8 text-sm"
          />
        </div>
        <Slider
          id="temperature"
          value={[parameters.temperature]}
          onValueChange={([value]) => updateParameter("temperature", value)}
          min={0}
          max={2}
          step={0.1}
          className="w-full"
          aria-label="Temperature"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Maximum length of the response in tokens
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={parameters.maxTokens}
            onChange={(e) => updateParameter("maxTokens", parseInt(e.target.value))}
            step={100}
            min={1}
            max={4000}
            className="w-20 h-8 text-sm"
          />
        </div>
        <Slider
          id="maxTokens"
          value={[parameters.maxTokens]}
          onValueChange={([value]) => updateParameter("maxTokens", value)}
          min={1}
          max={4000}
          step={100}
          className="w-full"
          aria-label="Max tokens"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="topP">Top P</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Nucleus sampling: considers tokens with top_p probability mass
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={parameters.topP}
            onChange={(e) => updateParameter("topP", parseFloat(e.target.value))}
            step={0.1}
            min={0}
            max={1}
            className="w-20 h-8 text-sm"
          />
        </div>
        <Slider
          id="topP"
          value={[parameters.topP]}
          onValueChange={([value]) => updateParameter("topP", value)}
          min={0}
          max={1}
          step={0.1}
          className="w-full"
          aria-label="Top P"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="frequencyPenalty">Frequency Penalty</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Reduces repetition of token sequences
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={parameters.frequencyPenalty}
            onChange={(e) =>
              updateParameter("frequencyPenalty", parseFloat(e.target.value))
            }
            step={0.1}
            min={0}
            max={2}
            className="w-20 h-8 text-sm"
          />
        </div>
        <Slider
          id="frequencyPenalty"
          value={[parameters.frequencyPenalty]}
          onValueChange={([value]) => updateParameter("frequencyPenalty", value)}
          min={0}
          max={2}
          step={0.1}
          className="w-full"
          aria-label="Frequency penalty"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="presencePenalty">Presence Penalty</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Encourages model to talk about new topics
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={parameters.presencePenalty}
            onChange={(e) =>
              updateParameter("presencePenalty", parseFloat(e.target.value))
            }
            step={0.1}
            min={0}
            max={2}
            className="w-20 h-8 text-sm"
          />
        </div>
        <Slider
          id="presencePenalty"
          value={[parameters.presencePenalty]}
          onValueChange={([value]) => updateParameter("presencePenalty", value)}
          min={0}
          max={2}
          step={0.1}
          className="w-full"
          aria-label="Presence penalty"
        />
      </div>
    </div>
  );
}
