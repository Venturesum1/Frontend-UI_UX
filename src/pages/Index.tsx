import { useState, useEffect, useRef } from "react";
import { Brain, Send, Settings2, Sparkles, Zap } from "lucide-react";
import gsap from "gsap";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ModelSelector, AIModel } from "@/components/ModelSelector";
import { PromptEditor, PromptTemplate } from "@/components/PromptEditor";
import { ParametersPanel, Parameters } from "@/components/ParametersPanel";
import { OutputArea } from "@/components/OutputArea";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchModels, fetchTemplates, saveTemplate, generateResponse } from "@/lib/api";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const generateBtnRef = useRef<HTMLButtonElement>(null);

  const [parameters, setParameters] = useState<Parameters>({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
  });

  useEffect(() => {
    loadInitialData();
    initAnimations();
  }, []);

  const initAnimations = () => {
    // Animate header on mount
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Logo pulse animation
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  };

  const loadInitialData = async () => {
    try {
      setIsLoadingData(true);
      const [modelsData, templatesData] = await Promise.all([
        fetchModels(),
        fetchTemplates(),
      ]);
      setModels(modelsData);
      setTemplates(templatesData);
      if (modelsData.length > 0) {
        setSelectedModel(modelsData[0].id);
      }
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSaveTemplate = async (name: string, content: string) => {
    try {
      await saveTemplate(name, content);
      const updatedTemplates = await fetchTemplates();
      setTemplates(updatedTemplates);
    } catch (error) {
      toast.error("Failed to save template");
      console.error(error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    // Animate button on click
    if (generateBtnRef.current) {
      gsap.to(generateBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }

    try {
      setIsLoading(true);
      setOutput("");
      const response = await generateResponse(prompt, selectedModel, parameters);
      setOutput(response);
    } catch (error) {
      toast.error("Failed to generate response");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmic background mesh */}
      <div className="fixed inset-0 pointer-events-none gradient-mesh opacity-60" />
      
      {/* Floating cosmic orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="cosmic-orb w-[500px] h-[500px] bg-primary/30 top-[-10%] left-[-10%]" style={{ animationDelay: "0s" }} />
        <div className="cosmic-orb w-[400px] h-[400px] bg-accent/30 top-[20%] right-[-5%]" style={{ animationDelay: "2s" }} />
        <div className="cosmic-orb w-[350px] h-[350px] bg-primary-glow/30 bottom-[-10%] left-[30%]" style={{ animationDelay: "4s" }} />
        <div className="cosmic-orb w-[300px] h-[300px] bg-gold/20 bottom-[10%] right-[20%]" style={{ animationDelay: "6s" }} />
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className="border-b border-border/30 backdrop-blur-2xl bg-background/60 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              ref={logoRef}
              className="h-14 w-14 rounded-2xl gradient-cosmic animate-gradient flex items-center justify-center shadow-glow relative overflow-hidden"
            >
              <Brain className="h-7 w-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent">
                interfce ai
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-light tracking-wide">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Cosmic Prompt Engineering
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          {/* Left Column - Main Interface */}
          <div className="space-y-6">
            {/* Model Selector */}
            <AnimatedSection animation="fade" delay={0.1}>
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
                isLoading={isLoadingData}
              />
            </AnimatedSection>

            {/* Prompt Editor */}
            <AnimatedSection animation="slide" delay={0.2}>
              <PromptEditor
                value={prompt}
                onChange={setPrompt}
                templates={templates}
                onSaveTemplate={handleSaveTemplate}
                placeholder="Describe what you want the AI to do..."
              />
            </AnimatedSection>

            {/* Generate Button */}
            <AnimatedSection animation="scale" delay={0.3}>
              <div className="flex items-center gap-4">
                <Button
                  ref={generateBtnRef}
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="gradient-cosmic animate-gradient shadow-glow px-10 py-6 text-base font-semibold hover:shadow-[0_0_80px_hsl(var(--primary)/0.6)] transition-all relative overflow-hidden group rounded-2xl"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Zap className="mr-2 h-5 w-5 relative z-10" />
                  <span className="relative z-10">Generate</span>
                </Button>

                {/* Mobile Parameters Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="lg" className="lg:hidden glass-intense hover:bg-card/80 transition-all rounded-2xl">
                      <Settings2 className="mr-2 h-5 w-5" />
                      Parameters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Parameters</SheetTitle>
                      <SheetDescription>
                        Fine-tune the AI model behavior
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <ParametersPanel
                        parameters={parameters}
                        onChange={setParameters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </AnimatedSection>

            {/* Output Area */}
            <AnimatedSection animation="fade" delay={0.4}>
              <div className="min-h-[400px]">
                <OutputArea content={output} isLoading={isLoading} />
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Parameters Panel (Desktop) */}
          <aside className="hidden lg:block">
            <AnimatedSection animation="slide" delay={0.5}>
              <div className="glass-intense rounded-2xl p-8 sticky top-28 shadow-elevated hover:shadow-glow transition-all duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-gradient-cosmic">
                    <Settings2 className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-serif font-semibold">Parameters</h2>
                </div>
                <Separator className="mb-8 bg-border/50" />
                <ParametersPanel
                  parameters={parameters}
                  onChange={setParameters}
                />
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-24 relative z-10 backdrop-blur-xl bg-background/40">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground font-light tracking-wider">
            AI Interface Studio — Cosmic Intelligence Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
