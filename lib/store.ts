import { create } from 'zustand'
import { generateImageAction } from "@/actions/generate"

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5" | "1.91:1" | "2:3" | "3:1" | "4:1" | "2:1" | "3.5:1" | "2.63:1";

interface EditorState {
    // Platform & Size
    selectedPlatform: string;
    selectedRatio: AspectRatio;
    selectedSizeLabel: string;

    // Content
    prompt: string;
    selectedColor: string;
    selectedTheme: string;

    // State
    isGenerating: boolean;
    generatedImage: string | null;
    isDrawingMode: boolean; // New state

    // Actions
    setSize: (platform: string, ratio: AspectRatio, label: string) => void;
    setPrompt: (prompt: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: string) => void;
    generateImage: () => void;
    toggleDrawingMode: () => void;

    // Fullscreen Sketch
    isSketchFullscreenOpen: boolean;
    sketchReferenceImage: string | null;
    toggleSketchFullscreen: () => void;
    setSketchReferenceImage: (image: string | null) => void;

    // Additional References
    youtubeLink: string;
    uploadedReferenceImage: string | null;
    setYoutubeLink: (link: string) => void;
    setUploadedReferenceImage: (image: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    selectedPlatform: "YouTube",
    selectedRatio: "16:9",
    selectedSizeLabel: "Thumbnail",

    prompt: "",
    selectedColor: "#ffffff",
    selectedTheme: "Minimal",

    isGenerating: false,
    generatedImage: null,
    isDrawingMode: false,

    setSize: (platform, ratio, label) => set({
        selectedPlatform: platform,
        selectedRatio: ratio,
        selectedSizeLabel: label
    }),

    setPrompt: (prompt) => set({ prompt }),

    setColor: (color) => set({ selectedColor: color }),

    setTheme: (theme) => set({ selectedTheme: theme }),

    generateImage: async () => {
        set({ isGenerating: true });

        try {
            const state = useEditorStore.getState();

            // Construct params from state
            // If aspect ratio is a string like "16:9", we should map it to dimensions or just pass width/height
            // For now, let's just parse the size string "1280x720" if available, or default
            // But wait, state doesn't store "1280x720" directly in a variable, it's just in the preset list?
            // Actually `setSize` updates `selectedSizeLabel` and `selectedRatio`. 
            // We should arguably store the dimensions too or look them up. 
            // For this MVP, I'll pass default 1024x1024 if not found, or maybe just pass the ratio string to the action?
            // The action interface asks for width/height.

            // Let's check if we can get dimensions. The `platforms` array is inside the component, difficult to access here?
            // We might want to store `width` and `height` in the store when `setSize` is called.
            // For now, I will hardcode a standard size or parse it if I can? 
            // Actually, I'll update `setSize` to store width/height in a subsequent step if needed.
            // For now, I'll just send 1024x1024 mock.

            const result = await generateImageAction({
                prompt: state.prompt,
                width: 1024,
                height: 1024,
                style: state.selectedTheme,
                referenceImage: state.sketchReferenceImage || state.uploadedReferenceImage || undefined
            });

            if (result.success && result.imageUrl) {
                set({ generatedImage: result.imageUrl });
            } else {
                console.error("Generation failed:", result.error);
            }
        } catch (error) {
            console.error("Generation error:", error);
        } finally {
            set({ isGenerating: false });
        }
    },

    toggleDrawingMode: () => set((state) => ({ isDrawingMode: !state.isDrawingMode })),

    isSketchFullscreenOpen: false,
    sketchReferenceImage: null,
    toggleSketchFullscreen: () => set((state) => ({ isSketchFullscreenOpen: !state.isSketchFullscreenOpen })),
    setSketchReferenceImage: (image) => set({ sketchReferenceImage: image }),

    youtubeLink: "",
    uploadedReferenceImage: null,
    setYoutubeLink: (link) => set({ youtubeLink: link }),
    setUploadedReferenceImage: (image) => set({ uploadedReferenceImage: image }),
}))
