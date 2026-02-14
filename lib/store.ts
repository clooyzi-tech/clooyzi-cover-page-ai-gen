import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { generateImageAction } from "@/actions/generate"

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5" | "1.91:1" | "2:3" | "3:1" | "4:1" | "2:1" | "3.5:1" | "2.63:1";

export interface HistoryItem {
    id: string;
    imageUrl: string;
    prompt: string;
    timestamp: number;
    platform: string;
    ratio: AspectRatio;
    sizeLabel: string;
    style: string;
}

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
    isDrawingMode: boolean;

    // History
    history: HistoryItem[];
    addToHistory: (item: HistoryItem) => void;
    deleteFromHistory: (id: string) => void;
    clearHistory: () => void;
    restoreFromHistory: (item: HistoryItem) => void;

    // Actions
    setSize: (platform: string, ratio: AspectRatio, label: string) => void;
    setPrompt: (prompt: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: string) => void;
    generateImage: () => Promise<void>;
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

export const useEditorStore = create<EditorState>()(
    persist(
        (set, get) => ({
            selectedPlatform: "YouTube",
            selectedRatio: "16:9",
            selectedSizeLabel: "Thumbnail",

            prompt: "",
            selectedColor: "#ffffff",
            selectedTheme: "Minimal",

            isGenerating: false,
            generatedImage: null,
            isDrawingMode: false,

            history: [],
            addToHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
            deleteFromHistory: (id) => set((state) => ({ history: state.history.filter((i) => i.id !== id) })),
            clearHistory: () => set({ history: [] }),
            restoreFromHistory: (item) => set({
                prompt: item.prompt,
                generatedImage: item.imageUrl,
                selectedPlatform: item.platform,
                selectedRatio: item.ratio,
                selectedSizeLabel: item.sizeLabel,
                selectedTheme: item.style
            }),

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
                    const state = get();
                    const result = await generateImageAction({
                        prompt: state.prompt,
                        width: 1024,
                        height: 1024,
                        style: state.selectedTheme,
                        referenceImage: state.sketchReferenceImage || state.uploadedReferenceImage || undefined
                    });

                    if (result.success && result.imageUrl) {
                        set({ generatedImage: result.imageUrl });

                        // Auto-save to history
                        const newItem: HistoryItem = {
                            id: Date.now().toString(),
                            imageUrl: result.imageUrl,
                            prompt: state.prompt || "Untitled",
                            timestamp: Date.now(),
                            platform: state.selectedPlatform,
                            ratio: state.selectedRatio,
                            sizeLabel: state.selectedSizeLabel,
                            style: state.selectedTheme
                        };

                        set((state) => ({ history: [newItem, ...state.history] }));

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
        }),
        {
            name: 'thumbnail-editor-storage',
            partialize: (state) => ({
                history: state.history,
                selectedPlatform: state.selectedPlatform,
                selectedRatio: state.selectedRatio,
                // We persist history and minimal settings. 
                // Don't persist large base64 images (sketchReferenceImage) to avoid quota issues?
                // LocalStorage has 5MB limit. Base64 images can be large.
                // Safest to persist history (if URLs) and basic settings.
                // If history is big, we might fill it up.
                // For now, let's persist history and basic settings.
            }),
        }
    )
)
