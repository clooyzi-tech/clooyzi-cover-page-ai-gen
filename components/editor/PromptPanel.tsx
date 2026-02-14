"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Palette, Wand2, Pencil, Sparkles, Youtube, Image as ImageIcon, Upload, X, Check } from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PromptPanel() {
    const {
        prompt,
        setPrompt,
        selectedColor,
        setColor,
        toggleSketchFullscreen,
        sketchReferenceImage,
        setSketchReferenceImage,
        generateImage,
        isGenerating,
        youtubeLink,
        setYoutubeLink,
        uploadedReferenceImage,
        setUploadedReferenceImage
    } = useEditorStore()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLinkHovered, setIsLinkHovered] = useState(false)

    const handleSketchToggle = () => {
        toggleSketchFullscreen()
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setUploadedReferenceImage(event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const colors = [
        { name: "Red", value: "#ef4444" },
        { name: "Blue", value: "#3b82f6" },
        { name: "Green", value: "#22c55e" },
        { name: "Yellow", value: "#eab308" },
        { name: "Purple", value: "#a855f7" },
        { name: "Pink", value: "#ec4899" },
        { name: "Orange", value: "#f97316" },
        { name: "Teal", value: "#14b8a6" },
    ]

    return (
        <div className="bg-background flex flex-col z-20 shrink-0 shadow-skeuo pb-6 relative">

            {/* COMPACT HEADER: Title | Link | Generate */}
            <div className="px-4 py-3 flex items-center justify-between gap-4 border-b bg-muted/20">

                {/* Left: Title + Link Input */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2 text-foreground/90 shrink-0">
                        <div className="p-1 bg-indigo-500/10 rounded-md">
                            <Wand2 className="size-3.5 text-indigo-500" />
                        </div>
                        <h3 className="text-xs font-bold tracking-wider uppercase">Studio</h3>
                    </div>

                    <div className="h-4 w-px bg-border/60 shrink-0" />

                    {/* YouTube Link */}
                    <div
                        className={cn(
                            "flex items-center gap-2.5 bg-background shadow-skeuo-inner px-4 py-1.5 rounded-full transition-all max-w-[400px] hover:border-red-500/50 hover:shadow-red-500/10 group cursor-text",
                            isLinkHovered || youtubeLink ? "w-full flex-1 ring-1 ring-red-500/10" : "w-[180px]"
                        )}
                        onMouseEnter={() => setIsLinkHovered(true)}
                        onMouseLeave={() => !youtubeLink && setIsLinkHovered(false)}
                    >
                        <Youtube className={cn("size-4 shrink-0 transition-colors", youtubeLink ? "text-red-600 drop-shadow-sm" : "text-muted-foreground/70")} />
                        <input
                            className="bg-transparent border-none text-xs w-full focus:outline-none placeholder:text-muted-foreground/70 h-full font-medium"
                            placeholder="Paste YouTube Link..."
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                        />
                        {youtubeLink && (
                            <button onClick={() => setYoutubeLink("")} className="hover:bg-muted p-0.5 rounded-full">
                                <X className="size-3.5 text-muted-foreground" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: Tokens + Generate Button */}
                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md border">
                        15 Tokens
                    </span>
                    <Button
                        size="sm"
                        className={cn(
                            "h-8 px-4 text-xs font-bold shadow-md shadow-indigo-500/20 transition-all rounded-full",
                            isGenerating
                                ? "bg-muted text-muted-foreground"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                        )}
                        onClick={generateImage}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="size-3.5 animate-spin" />
                                <span>Creating...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="size-3.5 fill-white/20" />
                                <span>GENERATE</span>
                            </div>
                        )}
                    </Button>
                </div>
            </div>

            {/* MAIN CONTENT: Input Box + Tools */}
            <div className="px-4 pt-4 pb-0 flex gap-4">

                {/* Unified Input Box with Gradient Border */}
                <div className="flex-1 rounded-3xl p-[1px] bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-indigo-500/50 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="flex flex-col h-full w-full rounded-[23px] bg-background shadow-skeuo-inner focus-within:bg-background/80 transition-all overflow-hidden group min-h-[120px] relative">
                        <textarea
                            className="flex-1 w-full bg-transparent px-5 py-3 text-sm resize-none focus:outline-none placeholder:text-muted-foreground/40 leading-relaxed font-medium"
                            placeholder="What are we creating today?"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        {/* Active Chips */}
                        {(sketchReferenceImage || uploadedReferenceImage) && (
                            <div className="px-4 pb-2 flex gap-2">
                                {sketchReferenceImage && (
                                    <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 px-2 py-1 rounded-lg text-[10px] text-indigo-600 font-medium">
                                        <img src={sketchReferenceImage} className="size-4 rounded object-cover border" />
                                        Sketch
                                        <button onClick={() => setSketchReferenceImage(null)}><X className="size-3 opacity-50 hover:opacity-100" /></button>
                                    </div>
                                )}
                                {uploadedReferenceImage && (
                                    <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 px-2 py-1 rounded-lg text-[10px] text-blue-600 font-medium">
                                        <img src={uploadedReferenceImage} className="size-4 rounded object-cover border" />
                                        Image
                                        <button onClick={() => setUploadedReferenceImage(null)}><X className="size-3 opacity-50 hover:opacity-100" /></button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Bottom Toolbar: Tools + Colors */}
                        <div className="px-3 py-2 border-t bg-background/50 flex items-center justify-between gap-4">
                            {/* Left: Tools */}
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={handleSketchToggle} className={cn("h-7 px-2 text-[11px] gap-1.5 rounded-lg text-muted-foreground font-medium", sketchReferenceImage && "bg-indigo-50 text-indigo-600")}>
                                    <Pencil className="size-3" />
                                    Sketch
                                </Button>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className={cn("h-7 px-2 text-[11px] gap-1.5 rounded-lg text-muted-foreground font-medium", uploadedReferenceImage && "bg-blue-50 text-blue-600")}>
                                    <ImageIcon className="size-3" />
                                    Image
                                </Button>
                            </div>

                            {/* Right: Colors (Inline) */}
                            <div className="flex items-center gap-1.5 bg-muted/20 px-2 py-1 rounded-full border">
                                {colors.slice(0, 5).map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setColor(c.value)}
                                        className={cn(
                                            "size-4 rounded-full border transition-transform",
                                            selectedColor === c.value ? "scale-125 ring-2 ring-primary ring-offset-1" : "hover:scale-125"
                                        )}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                    />
                                ))}
                                <button className="size-4 rounded-full border overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-green-500 to-blue-500" />
                                    <input type="color" className="opacity-0 absolute inset-0 cursor-pointer" onChange={(e) => setColor(e.target.value)} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="px-6 flex justify-between text-[10px] text-muted-foreground/50 mt-1 font-mono">
                <span>PRESS ENTER TO GENERATE</span>
                <span>{prompt.length}/500</span>
            </div>
        </div>
    )
}
