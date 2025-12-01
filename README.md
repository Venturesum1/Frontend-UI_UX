# AI Interface Studio

**Advanced Prompt Engineering Platform** - A polished, frontend-only prototype combining the best features from leading AI platforms into a unified, professional interface.

## 🚀 Live Demo

Deployed at: [Your Deployment URL]

## 📚 Research

### Platforms Reviewed

1. **OpenAI Playground** - Clean, developer-focused interface with extensive parameter controls. Standout: Real-time parameter adjustment with clear documentation for each setting.

2. **Anthropic Claude UI** - Minimalist chat interface prioritizing conversation flow. Standout: Exceptional readability and conversation management with clean information hierarchy.

3. **Hugging Face Spaces** - Technical platform showcasing multiple models. Standout: Model comparison interface allowing side-by-side testing of different models.

4. **Microsoft Copilot Lab** - Modern gradient-heavy design with contextual suggestions. Standout: Intelligent prompt templates and contextual assistance during composition.

5. **Google AI Studio** - Parameter-rich interface with real-time previews. Standout: Advanced parameter tooltips with practical examples and use-case guidance.

### Selected Core Features

Based on the research, this prototype combines these 6 essential features:

1. **Model Selector** (from Hugging Face) - Dropdown interface with detailed model information including context windows and capabilities
2. **Advanced Prompt Editor** (from Microsoft Copilot) - Template save/load system for reusable prompts
3. **Comprehensive Parameters Panel** (from OpenAI Playground) - Full control over temperature, tokens, top-p, and penalties with tooltips
4. **Rich Output Area** (from Claude) - Clean display with copy and export functionality
5. **Theme Toggle** (universal best practice) - Light/dark mode with localStorage persistence
6. **Responsive Layout** (from Google AI Studio) - Mobile-first design adapting from phone to desktop

## 🎨 Design

### Design Philosophy

The interface follows a **futuristic-technical** aesthetic inspired by professional developer tools. It prioritizes clarity, precision, and visual polish while maintaining excellent usability.

### Design System Mapping

#### Color Tokens (HSL Values)
- **Primary**: `189 94% 53%` (Cyan-blue) - CTAs, active states, highlights
- **Primary Glow**: `189 94% 63%` - Glow effects and elevated surfaces
- **Accent**: `160 84% 49%` (Emerald) - Success states and secondary actions
- **Background**: `222 47% 7%` (Dark) / `210 40% 98%` (Light)
- **Foreground**: Automatic contrast based on theme

#### Typography
- **UI Font**: Inter (300-700 weights) - Clean, modern sans-serif for interface elements
- **Technical Font**: JetBrains Mono (400-600) - Monospace for code, prompts, and output

#### Spacing & Layout
- **Border Radius**: `0.75rem` (12px) - Slightly rounded for modern feel
- **Container**: Max-width with responsive padding (4-8 units)
- **Grid**: 2-column layout on desktop (main + sidebar), single column on mobile
- **Gaps**: Consistent 6-unit spacing between major sections

#### Visual Effects
- **Glass Morphism**: `backdrop-blur-xl` + semi-transparent backgrounds
- **Shadows**: Elevated surfaces with glow effects using primary color
- **Gradients**: Linear gradients for CTAs (135deg angle)
- **Animations**: Smooth scale transforms on hover (105%), fade-ins on mount

### Figma Mockup Notes

Key design decisions translated to code:

1. **Header**: Fixed 16-unit height, glass-morphism effect, sticky positioning
2. **Model Selector**: Full-width card with nested dropdown, supports long descriptions
3. **Prompt Editor**: Expandable textarea (min 200px) with toolbar for template actions
4. **Parameters Panel**: Vertical stack of sliders with numeric inputs, info tooltips
5. **Output Area**: Fixed-height scroll area with action buttons in header
6. **Mobile**: Bottom sheet for parameters, stacked layout for all sections

## 💻 Development

### Tech Stack

- **Framework**: React 18 with TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router v6
- **State Management**: React Context for theme, local state for data
- **UI Components**: Radix UI primitives (accessible by default)
- **Build Tool**: Vite
- **Deployment**: Netlify / Vercel ready

### Key Implementation Details

#### Model Selector (`src/components/ModelSelector.tsx`)
- Radix DropdownMenu for accessibility
- Displays model name, description, and context window
- Check icon indicates active selection
- Keyboard navigable with arrow keys and Enter

#### Prompt Editor (`src/components/PromptEditor.tsx`)
- Textarea with template management system
- Save dialog with input validation
- Load dropdown showing template preview
- Toast notifications for user feedback
- Keyboard shortcuts (Enter to save in dialog)

#### Parameters Panel (`src/components/ParametersPanel.tsx`)
- 5 parameter controls: temperature, max tokens, top-p, frequency penalty, presence penalty
- Dual input: slider + numeric field synchronized
- Tooltips explain each parameter's effect
- Proper ARIA labels for screen readers

#### Output Area (`src/components/OutputArea.tsx`)
- ScrollArea for long outputs
- Copy button using Clipboard API
- Download generates timestamped JSON file
- Loading state with spinner animation
- Empty state with helpful message

#### Theme Toggle (`src/components/ThemeToggle.tsx`)
- Icon button switching between Sun/Moon
- Persists preference to localStorage
- Updates `<html>` class for Tailwind dark mode
- Smooth icon transition animation

#### Mock API (`src/lib/api.ts`)
- Simulates network latency (500-2000ms)
- Returns 6 mock AI models with realistic specs
- Template storage in localStorage
- Mock response generation with parameter echo

### Responsive Breakpoints

- **Mobile**: < 768px - Single column, bottom sheet for parameters
- **Tablet**: 768px - 1024px - Two column with narrower sidebar
- **Desktop**: > 1024px - Full layout with 320px fixed sidebar

### Accessibility Features

✅ Semantic HTML structure  
✅ ARIA labels on all interactive elements  
✅ Keyboard navigation (Tab, Arrow keys, Enter, Esc)  
✅ Focus visible states with ring utility  
✅ High contrast text (WCAG AA compliant)  
✅ Screen reader announcements via toast system  
✅ Disabled states clearly indicated  
✅ Tooltips for complex parameters

### Known Limitations

1. **No Real AI Integration** - Uses mock responses only. Production would require API keys and backend.
2. **Template Storage** - Uses localStorage (max 5-10MB). Production needs database.
3. **No User Authentication** - All data is local. Production requires auth system.
4. **Limited Error Handling** - Basic try-catch. Production needs comprehensive error boundaries.
5. **No Rate Limiting** - Mock API has no throttling. Real APIs require queue management.
6. **Simple State Management** - React local state only. Large apps need Redux/Zustand.

### File Structure

```
src/
├── components/
│   ├── ui/                    # Radix UI primitives (shadcn)
│   ├── ModelSelector.tsx      # Model dropdown component
│   ├── PromptEditor.tsx       # Prompt input + templates
│   ├── ParametersPanel.tsx    # AI parameter controls
│   ├── OutputArea.tsx         # Response display
│   └── ThemeToggle.tsx        # Light/dark toggle
├── lib/
│   ├── api.ts                 # Mock API functions
│   └── utils.ts               # Utility functions
├── pages/
│   ├── Index.tsx              # Main application page
│   └── NotFound.tsx           # 404 error page
├── hooks/
│   └── use-toast.ts           # Toast notification hook
├── index.css                  # Design system tokens
└── main.tsx                   # Application entry
```

## 🧪 Component Library (Storybook)

### Setup Instructions

```bash
# Install Storybook
npx storybook@latest init

# Run Storybook
npm run storybook
```

### Stories Included

1. **Button.stories.tsx** - All button variants (default, outline, ghost, gradient-primary)
2. **Slider.stories.tsx** - Range input with min/max/step variations
3. **Dialog.stories.tsx** - Modal with save template example
4. **OutputArea.stories.tsx** - Loading, empty, and filled states

Each story includes:
- Default state
- Interactive controls
- Accessibility documentation
- Usage examples

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern browser with ES6 support

### Installation

```bash
# Clone repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

None required - this is a frontend-only prototype.

## 📦 Deployment

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### Vercel

```bash
# Automatically detects Vite configuration
# Just connect your repo
```

### GitHub Pages

```bash
# Set base in vite.config.ts
base: '/repo-name/'

# Build and deploy
npm run build
gh-pages -d dist
```

## 🔮 Future Enhancements

If this were a full production application:

1. **Real AI Integration** - Connect to OpenAI, Anthropic, or Google APIs
2. **User Accounts** - Authentication with conversation history
3. **Conversation Threading** - Multi-turn chat with context retention
4. **Advanced Templates** - Community templates with tags and ratings
5. **Analytics Dashboard** - Token usage tracking and cost analysis
6. **Team Collaboration** - Shared workspaces and prompt libraries
7. **API Key Management** - Secure storage for multiple providers
8. **Export Options** - Markdown, PDF, and code snippet exports

## 📄 License

MIT License - feel free to use this as a foundation for your own projects.

## 🙏 Acknowledgments

Inspired by the excellent work from:
- OpenAI Playground
- Anthropic Claude
- Hugging Face
- Microsoft Copilot Lab
- Google AI Studio

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
