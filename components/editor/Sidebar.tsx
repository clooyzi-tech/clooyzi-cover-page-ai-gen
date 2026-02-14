"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Search,
    Video,
    Share2,
    MessageSquare,
    BookOpen,
    Briefcase,
    ShoppingBag,
    Newspaper,
    Smartphone,
    Layers,
    MonitorPlay
} from "lucide-react"
import { useEditorStore, type AspectRatio } from "@/lib/store"
import { cn } from "@/lib/utils"
import { PLATFORMS_DATA } from "@/lib/constants"

export function SidebarContent() {
    const { setSize, selectedSizeLabel, selectedPlatform } = useEditorStore()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPlatforms = PLATFORMS_DATA.map(platform => ({
        ...platform,
        types: platform.types.filter(type =>
            type.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            platform.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(platform => platform.types.length > 0)

    return (
        <div className="flex flex-col h-full w-full">
            <div className="p-4 border-b border-border/40 space-y-3 sticky top-0 bg-background/95 backdrop-blur z-20">
                <h2 className="font-semibold text-sm text-foreground/80 tracking-tight">Dimensions</h2>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        placeholder="Search platforms..."
                        className="pl-8 h-8 text-xs bg-muted/40 border-muted focus-visible:ring-1 focus-visible:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-2 space-y-6">
                    {filteredPlatforms.map((platform) => (
                        <div key={platform.category} className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 sticky top-0 bg-background/95 backdrop-blur z-10">
                                <platform.icon className={cn("size-3", platform.color)} />
                                {platform.category}
                            </div>
                            <div className="grid gap-0.5">
                                {platform.types.map((type) => {
                                    const isActive = selectedPlatform === platform.category && selectedSizeLabel === type.label;
                                    return (
                                        <button
                                            key={type.label}
                                            className={cn(
                                                "w-full text-left text-xs py-3 px-4 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                                isActive
                                                    ? "shadow-skeuo-pressed text-primary font-bold bg-primary/5 ring-1 ring-primary/10"
                                                    : "shadow-skeuo hover:shadow-skeuo-pressed text-muted-foreground hover:text-foreground bg-background"
                                            )}
                                            onClick={() => {
                                                const [w, h] = type.size.split('x').map(Number)
                                                setSize(type.label, type.ratio as AspectRatio, w, h)
                                            }}
                                        >
                                            <div className="flex items-center justify-between w-full relative z-10">
                                                <span>{type.label}</span>
                                                {isActive && <div className="size-1.5 rounded-full bg-primary" />}
                                            </div>
                                            <span className="text-[9px] opacity-0 group-hover:opacity-60 transition-opacity font-mono block -mt-0.5">
                                                {type.size}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    {filteredPlatforms.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-xs">
                            No platforms found.
                        </div>
                    )}
                </div>
            </div>

            <div className="p-3 border-t border-border/40 bg-background/80 backdrop-blur-sm mt-auto">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                    Request a Platform
                </Button>
            </div>
        </div>
    )
}

export function Sidebar() {
    return (
        <div className="hidden md:flex w-72 bg-background flex flex-col h-full shadow-skeuo z-20 shrink-0 relative">
            <SidebarContent />
        </div>
    )
}
