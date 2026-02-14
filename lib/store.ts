import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateImageAction } from "@/actions/generate"
import { PLATFORMS_DATA } from './constants'

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5" | "4:3" | "2:3" | "3:1" | "3:2" | "2.5:1" | "1.91:1" | "2.63:1" | "3.5:1" | "4:1"

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
    width: number;
    height: number;

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
    tokens: number;

    // Fullscreen Sketch
    isSketchFullscreen: boolean;
    sketchReferenceImage: string | null;

    // Additional References
    youtubeLink: string;
    uploadedReferenceImage: string | null;

    // Human & Characters
    humanCount: string | null;
    faceReferenceImage: string | null;
    faceConsistency: boolean;

    // Actions
    setPlatform: (platform: string) => void;
    setSize: (label: string, ratio: AspectRatio, width: number, height: number) => void;
    setPrompt: (prompt: string) => void;
    setColor: (color: string) => void;
    setTheme: (theme: string) => void;
    setHumanCount: (count: string | null) => void;
    setFaceReferenceImage: (image: string | null) => void;
    toggleFaceConsistency: () => void;
    generateImage: () => Promise<void>;

    toggleSketchFullscreen: () => void;
    toggleDrawingMode: () => void;
    setSketchReferenceImage: (image: string | null) => void;

    setYoutubeLink: (link: string) => void;
    setUploadedReferenceImage: (image: string | null) => void;

    addToHistory: (item: HistoryItem) => void;
    deleteFromHistory: (id: string) => void;
    clearHistory: () => void;
    restoreFromHistory: (item: HistoryItem) => void;

    nextDesign: () => void;
    prevDesign: () => void;
}

export const useEditorStore = create<EditorState>()(
    persist(
        (set, get) => ({
            selectedPlatform: "YouTube",
            selectedRatio: "16:9",
            selectedSizeLabel: "YouTube Thumbnail",
            width: 1280,
            height: 720,

            prompt: "",
            selectedColor: "#ef4444",
            selectedTheme: "Minimal",

            isGenerating: false,
            generatedImage: null,
            isDrawingMode: false,

            history: [],
            tokens: 20.0,

            isSketchFullscreen: false,
            sketchReferenceImage: null,

            toggleDrawingMode: () => set((state) => ({ isDrawingMode: !state.isDrawingMode })),

            youtubeLink: "",
            uploadedReferenceImage: null,

            humanCount: null,
            faceReferenceImage: null,
            faceConsistency: false,

            setPlatform: (platform) => set({ selectedPlatform: platform }),
            setSize: (label, ratio, width, height) => set({
                selectedSizeLabel: label,
                selectedRatio: ratio,
                selectedPlatform: label.includes(" ") ? label.split(" ")[0] : label, // Simple heuristic for platform name
                width,
                height
            }),

            setPrompt: (prompt) => set({ prompt }),

            setColor: (color) => set({ selectedColor: color }),

            setTheme: (theme) => set({ selectedTheme: theme }),
            setHumanCount: (count) => set({ humanCount: count }),
            setFaceReferenceImage: (image) => set({ faceReferenceImage: image }),
            toggleFaceConsistency: () => set((state) => ({ faceConsistency: !state.faceConsistency })),

            generateImage: async () => {
                const { prompt, selectedColor, selectedTheme, addToHistory, generatedImage, selectedPlatform, selectedRatio, selectedSizeLabel, tokens, width, height, sketchReferenceImage, uploadedReferenceImage, humanCount, faceReferenceImage, faceConsistency } = get()

                if (tokens < 2) {
                    alert("Not enough tokens!")
                    return
                }

                set({ isGenerating: true })

                // Construct enhanced prompt with Human & Character settings
                let enhancedPrompt = prompt
                if (humanCount) enhancedPrompt += `. Subject count: ${humanCount}.`
                if (faceConsistency) enhancedPrompt += " Maintain consistent facial identity."

                try {
                    const result = await generateImageAction({
                        prompt: enhancedPrompt,
                        width: width,
                        height: height,
                        style: selectedTheme,
                        referenceImage: faceReferenceImage || sketchReferenceImage || uploadedReferenceImage || undefined
                    });

                    if (result.success && result.imageUrl) {
                        set((state) => ({
                            generatedImage: result.imageUrl,
                            isGenerating: false,
                            tokens: Math.max(0, state.tokens - 2.0)
                        }))

                        addToHistory({
                            id: Date.now().toString(),
                            imageUrl: result.imageUrl,
                            prompt: enhancedPrompt,
                            timestamp: Date.now(),
                            platform: selectedPlatform,
                            ratio: selectedRatio,
                            sizeLabel: selectedSizeLabel,
                            style: selectedTheme
                        })
                    } else {
                        console.error("Generation failed:", result.error);
                        set({ isGenerating: false });
                    }
                } catch (error) {
                    console.error("Generation error:", error);
                    set({ isGenerating: false });
                }
            },

            toggleSketchFullscreen: () => set((state) => ({ isSketchFullscreen: !state.isSketchFullscreen })),
            setSketchReferenceImage: (image) => set({ sketchReferenceImage: image }),

            setYoutubeLink: (link) => set({ youtubeLink: link }),
            setUploadedReferenceImage: (image) => set({ uploadedReferenceImage: image }),

            addToHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
            deleteFromHistory: (id) => set((state) => ({ history: state.history.filter((i) => i.id !== id) })),
            clearHistory: () => set({ history: [] }),
            restoreFromHistory: (item) => set({
                selectedPlatform: item.platform,
                selectedRatio: item.ratio,
                selectedSizeLabel: item.sizeLabel,
                prompt: item.prompt,
                generatedImage: item.imageUrl,
                selectedTheme: item.style
            }),

            nextDesign: () => {
                const { selectedSizeLabel, tokens } = get()
                if (tokens < 1.9) return // Check tokens

                const allTypes = PLATFORMS_DATA.flatMap(p => p.types.map(t => ({ ...t, platformCategory: p.category })))
                const currentIndex = allTypes.findIndex(t => t.label === selectedSizeLabel)
                const nextIndex = (currentIndex + 1) % allTypes.length
                const nextType = allTypes[nextIndex]

                if (nextType) {
                    const [w, h] = nextType.size.split('x').map(Number)
                    set((state) => ({
                        selectedSizeLabel: nextType.label,
                        selectedRatio: nextType.ratio as AspectRatio,
                        selectedPlatform: nextType.label.split(" ")[0], // Heuristic
                        width: w,
                        height: h,
                        tokens: Math.max(0, state.tokens - 1.9) // "Token should be cutted like that t=1.9"
                    }))
                }
            },

            prevDesign: () => {
                const { selectedSizeLabel, tokens } = get()
                if (tokens < 1.9) return

                const allTypes = PLATFORMS_DATA.flatMap(p => p.types.map(t => ({ ...t, platformCategory: p.category })))
                const currentIndex = allTypes.findIndex(t => t.label === selectedSizeLabel)
                const prevIndex = (currentIndex - 1 + allTypes.length) % allTypes.length
                const prevType = allTypes[prevIndex]

                if (prevType) {
                    const [w, h] = prevType.size.split('x').map(Number)
                    set((state) => ({
                        selectedSizeLabel: prevType.label,
                        selectedRatio: prevType.ratio as AspectRatio,
                        selectedPlatform: prevType.label.split(" ")[0],
                        width: w,
                        height: h,
                        tokens: Math.max(0, state.tokens - 1.9)
                    }))
                }
            }
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
