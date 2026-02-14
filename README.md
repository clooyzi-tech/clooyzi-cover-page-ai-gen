# Clooyzi - AI Thumbnail & Cover Generator

**Clooyzi** is a next-generation AI-powered platform designed to create stunning thumbnails, cover images, and social media assets in seconds. Built with a modern, "VS Code-like" studio interface, it streamlines the creative process for content creators.

![Clooyzi Studio](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop) *(Replace with actual screenshot)*

## 🚀 Features

-   **Multi-Platform Support**: Presets for YouTube, TikTok, Instagram, Twitter/X, LinkedIn, and more.
-   **AI-Powered Generation**: Generate high-quality images from text prompts (Mock/Integration ready).
-   **Smart Studio**:
    -   **Sketch-to-Image**: Draw rough ideas on a digital canvas to guide the AI.
    -   **Reference Uploads**: Use existing images or YouTube links as style references.
    -   **Style Playground**: Choose from preset styles (Minimal, Cyberpunk, 3D Render, etc.) and color palettes.
-   **History & Gallery**: Auto-save your generations and restore settings with one click.
-   **Responsive Design**: Fully functional on Desktop and Mobile (with drawer navigation).

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persistence)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/clooyzi-tech/clooyzi-cover-page-ai-gen.git
    cd clooyzi-cover-page-ai-gen
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Project Structure

-   `actions/`: Server actions for backend logic (AI generation).
-   `app/`: Next.js App Router pages and layouts.
-   `components/`: Reusable UI components.
    -   `editor/`: Core studio components (Canvas, Sidebar, PromptPanel).
    -   `ui/`: Shadcn UI primitives.
-   `lib/`: Utility functions and global store (`store.ts`).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
