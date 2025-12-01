import { Copy, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface OutputAreaProps {
  content: string;
  isLoading: boolean;
}

export function OutputArea({ content, isLoading }: OutputAreaProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content && contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify({ content, timestamp: new Date().toISOString() }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as JSON");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-serif font-semibold">Output</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!content || isLoading}
            aria-label="Copy output"
            className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 rounded-xl"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            disabled={!content || isLoading}
            aria-label="Download as JSON"
            className="hover:bg-accent/10 hover:text-accent transition-all hover:scale-110 rounded-xl"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 glass-intense rounded-2xl p-6 shadow-elevated">
        {isLoading ? (
          <div className="flex items-center justify-center h-full min-h-[280px]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <div className="absolute inset-0 h-10 w-10 animate-ping text-primary opacity-20">
                  <Loader2 className="h-10 w-10" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground animate-pulse font-light">Generating response...</p>
            </div>
          </div>
        ) : content ? (
          <div ref={contentRef} className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {content}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[280px]">
            <p className="text-sm text-muted-foreground font-light">
              Output will appear here after generation
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
