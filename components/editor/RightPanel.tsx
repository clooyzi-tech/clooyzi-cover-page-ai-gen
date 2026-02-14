"use client"

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
    const { selectedTheme, setTheme, generateImage, isGenerating } = useEditorStore()

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
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="edit" className="text-xs">
                            <Palette className="size-3.5 mr-2" />
                            Edit
                        </TabsTrigger>
                        <TabsTrigger value="history" className="text-xs">
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
                                                    "group relative h-20 rounded-xl border text-xs font-medium transition-all duration-200 text-left p-3 flex flex-col justify-end overflow-hidden",
                                                    theme.preview,
                                                    selectedTheme === theme.name
                                                        ? "ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-md"
                                                        : "hover:scale-[1.02] hover:shadow-sm border-transparent"
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
                                            <Button key={i} variant="outline" size="sm" className="h-20 flex-col gap-2 hover:bg-accent/50 hover:border-primary/30">
                                                <item.icon className="size-5 text-muted-foreground" />
                                                <span className="text-xs font-medium">{item.label}</span>
                                            </Button>
                                        ))}
                                    </div>

                                    <Button variant="secondary" className="w-full border-dashed border-2 bg-transparent hover:bg-accent">
                                        <Upload className="mr-2 size-4" />
                                        Upload Face Reference
                                    </Button>

                                    <div className="flex items-center gap-2 pt-2">
                                        <span className="text-xs text-muted-foreground">Face Consistency</span>
                                        <div className="h-5 w-9 bg-muted rounded-full ml-auto relative cursor-pointer hover:bg-muted/80">
                                            <div className="absolute left-1 top-1 size-3 bg-background rounded-full shadow-sm" />
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
        <div className="hidden md:flex w-80 border-l border-border/50 bg-background flex flex-col h-full shadow-[-5px_0_30px_-10px_rgba(0,0,0,0.05)] z-20 shrink-0">
            <RightPanelContent />
        </div>
    )
}
