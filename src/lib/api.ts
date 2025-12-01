import { AIModel } from "@/components/ModelSelector";
import { PromptTemplate } from "@/components/PromptEditor";

// Mock API for models
export async function fetchModels(): Promise<AIModel[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      description: "Most capable model, best for complex tasks",
      context: "128K context",
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      description: "High intelligence, reliable for production",
      context: "8K context",
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      description: "Fast and efficient for most tasks",
      context: "16K context",
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 Opus",
      description: "Anthropic's most powerful model",
      context: "200K context",
    },
    {
      id: "claude-3-sonnet",
      name: "Claude 3 Sonnet",
      description: "Balanced performance and speed",
      context: "200K context",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      description: "Google's advanced reasoning model",
      context: "32K context",
    },
  ];
}

// Mock API for templates
export async function fetchTemplates(): Promise<PromptTemplate[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const stored = localStorage.getItem("prompt-templates");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save template
export async function saveTemplate(name: string, content: string): Promise<void> {
  const templates = await fetchTemplates();
  const newTemplate: PromptTemplate = {
    id: Date.now().toString(),
    name,
    content,
  };
  const updated = [...templates, newTemplate];
  localStorage.setItem("prompt-templates", JSON.stringify(updated));
}

// Mock API for generating responses
export async function generateResponse(
  prompt: string,
  model: string,
  parameters: any
): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock response based on input
  return `Response from ${model}:\n\nThis is a simulated response to your prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}"\n\nParameters used:\n- Temperature: ${parameters.temperature}\n- Max Tokens: ${parameters.maxTokens}\n- Top P: ${parameters.topP}\n- Frequency Penalty: ${parameters.frequencyPenalty}\n- Presence Penalty: ${parameters.presencePenalty}\n\nIn a production environment, this would connect to the actual AI model API and return real results. The response would be generated based on your prompt and the selected parameters, providing contextually relevant and coherent text.`;
}
