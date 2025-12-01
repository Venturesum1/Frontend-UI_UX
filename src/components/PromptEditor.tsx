import { useState } from "react";
import { Save, FolderOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
}

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  templates: PromptTemplate[];
  onSaveTemplate: (name: string, content: string) => void;
  placeholder?: string;
}

export function PromptEditor({
  value,
  onChange,
  templates,
  onSaveTemplate,
  placeholder = "Enter your prompt here...",
}: PromptEditorProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    if (!value.trim()) {
      toast.error("Cannot save empty prompt");
      return;
    }
    onSaveTemplate(templateName, value);
    setTemplateName("");
    setShowSaveDialog(false);
    toast.success("Template saved successfully");
  };

  const handleLoadTemplate = (template: PromptTemplate) => {
    onChange(template.content);
    toast.success(`Loaded template: ${template.name}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="font-serif text-base">Prompt</span>
        </Label>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl hover:shadow-glow transition-all">
                <FolderOpen className="h-4 w-4" />
                Load
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 glass-intense rounded-2xl">
              {templates.length === 0 ? (
                <div className="px-2 py-8 text-center text-sm text-muted-foreground font-light">
                  No saved templates
                </div>
              ) : (
                templates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => handleLoadTemplate(template)}
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 rounded-xl p-3 my-1"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{template.name}</span>
                      <span className="text-xs text-muted-foreground truncate font-light mt-1">
                        {template.content.substring(0, 50)}...
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl hover:shadow-glow transition-all"
            onClick={() => setShowSaveDialog(true)}
            disabled={!value.trim()}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[240px] font-mono text-sm glass-intense resize-y rounded-2xl focus:shadow-glow transition-all duration-300"
        aria-label="Prompt input"
      />

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Prompt Template</DialogTitle>
            <DialogDescription>
              Give your prompt template a memorable name
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Code Review Assistant"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gradient-cosmic animate-gradient rounded-xl">
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
