"use client"

import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryPanel } from "@/components/editor/HistoryPanel"
import {
    Users,
    Upload,
    Sparkles,
    Zap,
    UserPlus,
    Clock,
    Palette
} from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function RightPanelContent() {
    const {
        selectedTheme,
        setTheme,
        isGenerating,
        humanCount,
        setHumanCount,
        faceReferenceImage,
        setFaceReferenceImage,
        faceConsistency,
        toggleFaceConsistency
    } = useEditorStore()

    const faceInputRef = useRef<HTMLInputElement>(null)

    const handleFaceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setFaceReferenceImage(event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const themes = [
        { name: "Minimal", preview: "bg-slate-100 dark:bg-slate-800", textColor: "text-slate-900 dark:text-slate-100" },
        { name: "Professional", preview: "bg-blue-50 dark:bg-blue-900/20", textColor: "text-blue-900 dark:text-blue-100" },
        { name: "Comedy", preview: "bg-yellow-100 dark:bg-yellow-900/20", textColor: "text-yellow-900 dark:text-yellow-100" },
        { name: "Cinematic", preview: "bg-stone-900", textColor: "text-stone-100" },
        { name: "Viral", preview: "bg-red-100 dark:bg-red-900/20", textColor: "text-red-900 dark:text-red-100" },
        { name: "Luxury", preview: "bg-amber-100 dark:bg-amber-900/20", textColor: "text-amber-900 dark:text-amber-100" },
        { name: "Gaming", preview: "bg-violet-100 dark:bg-violet-900/20", textColor: "text-violet-900 dark:text-violet-100" },
        { name: "Tech", preview: "bg-cyan-100 dark:bg-cyan-900/20", textColor: "text-cyan-900 dark:text-cyan-100" },
    ]

    return (
        <div className="flex flex-col h-full w-full bg-background/50">
            <Tabs defaultValue="edit" className="flex flex-col h-full w-full">
                <div className="px-4 py-3 border-b border-border/50">
                    <TabsList className="grid w-full grid-cols-2 bg-background shadow-skeuo-inner rounded-xl p-1.5 h-auto">
                        <TabsTrigger value="edit" className="text-xs rounded-lg py-2 data-[state=active]:shadow-skeuo data-[state=active]:bg-background data-[state=active]:text-primary transition-all">
                            <Palette className="size-3.5 mr-2" />
                            Edit
                        </TabsTrigger>
                        <TabsTrigger value="history" className="text-xs rounded-lg py-2 data-[state=active]:shadow-skeuo data-[state=active]:bg-background data-[state=active]:text-primary transition-all">
                            <Clock className="size-3.5 mr-2" />
                            History
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    <TabsContent value="edit" className="h-full m-0 data-[state=active]:flex flex-col">
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="p-5 space-y-8">

                                {/* Theme Selector */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold tracking-tight">Design Theme</label>
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Style</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {themes.map((theme) => (
                                            <button
                                                key={theme.name}
                                                onClick={() => setTheme(theme.name)}
                                                className={cn(
                                                    "group relative h-20 rounded-xl text-xs font-medium transition-all duration-200 text-left p-3 flex flex-col justify-end overflow-hidden",
                                                    theme.preview,
                                                    selectedTheme === theme.name
                                                        ? "shadow-skeuo-pressed ring-2 ring-primary ring-offset-2 scale-[0.98]"
                                                        : "shadow-skeuo hover:shadow-skeuo-pressed hover:-translate-y-0.5 active:translate-y-0 border-none"
                                                )}
                                            >
                                                <span className={cn("relative z-10 font-bold", theme.textColor)}>
                                                    {theme.name}
                                                </span>

                                                {/* Active Indicator Checkmark */}
                                                {selectedTheme === theme.name && (
                                                    <div className="absolute top-2 right-2 size-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                                        <Zap className="size-2.5 fill-current" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-border/50" />

                                {/* Human Controls */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <Users className="size-4" />
                                        Human & Characters
                                    </label>

                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { label: "1 Person", icon: UserPlus },
                                            { label: "2 People", icon: Users },
                                            { label: "Group", icon: Users },
                                        ].map((item, i) => (
                                            <Button
                                                key={i}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setHumanCount(humanCount === item.label ? null : item.label)}
                                                className={cn(
                                                    "h-20 flex-col gap-2 transition-all border-none",
                                                    humanCount === item.label
                                                        ? "shadow-skeuo-pressed bg-primary/5 text-primary ring-1 ring-primary/10"
                                                        : "shadow-skeuo hover:shadow-skeuo-pressed hover:-translate-y-0.5 active:translate-y-0 text-muted-foreground bg-background"
                                                )}
                                            >
                                                <item.icon className={cn("size-5", humanCount === item.label ? "text-primary" : "text-muted-foreground")} />
                                                <span className="text-xs font-medium">{item.label}</span>
                                            </Button>
                                        ))}
                                    </div>

                                    <input type="file" ref={faceInputRef} className="hidden" accept="image/*" onChange={handleFaceUpload} />

                                    {faceReferenceImage ? (
                                        <div className="relative w-full h-24 rounded-xl overflow-hidden shadow-skeuo group">
                                            <img src={faceReferenceImage} alt="Face Ref" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Button size="sm" variant="secondary" className="h-7 text-xs" onClick={() => faceInputRef.current?.click()}>Change</Button>
                                                <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => setFaceReferenceImage(null)}>x</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            className="w-full h-12 shadow-skeuo hover:shadow-skeuo-pressed active:shadow-skeuo-pressed border-none bg-background text-muted-foreground hover:text-foreground transition-all"
                                            onClick={() => faceInputRef.current?.click()}
                                        >
                                            <Upload className="mr-2 size-4" />
                                            Upload Face Reference
                                        </Button>
                                    )}

                                    <div className="flex items-center gap-2 pt-2">
                                        <span className="text-xs text-muted-foreground">Face Consistency</span>
                                        <div
                                            className={cn(
                                                "h-5 w-9 rounded-full ml-auto relative cursor-pointer transition-colors shadow-inner",
                                                faceConsistency ? "bg-primary" : "bg-muted"
                                            )}
                                            onClick={toggleFaceConsistency}
                                        >
                                            <div className={cn(
                                                "absolute top-1 size-3 bg-background rounded-full shadow-sm transition-all",
                                                faceConsistency ? "left-5" : "left-1"
                                            )} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="history" className="h-full m-0 data-[state=active]:flex flex-col">
                        <HistoryPanel />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export function RightPanel() {
    return (
        <div className="hidden md:flex w-80 bg-background flex flex-col h-full shadow-skeuo z-20 shrink-0 relative">
            <RightPanelContent />
        </div>
    )
}
