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

export function SidebarContent() {
    const { setSize, selectedSizeLabel, selectedPlatform } = useEditorStore()
    const [searchQuery, setSearchQuery] = useState("")

    const platforms = [
        {
            category: "Video & Streaming",
            icon: MonitorPlay,
            color: "text-red-500",
            types: [
                { label: "YouTube Thumbnail", size: "1280x720", ratio: "16:9" },
                { label: "Kick Cover", size: "1920x1080", ratio: "16:9" },
                { label: "Rumble Thumbnail", size: "1280x720", ratio: "16:9" },
                { label: "Vimeo Thumbnail", size: "1280x720", ratio: "16:9" },
                { label: "Dailymotion Thumb", size: "1280x720", ratio: "16:9" },
                { label: "Twitch Offline", size: "1920x1080", ratio: "16:9" },
                { label: "Wistia Thumb", size: "1280x720", ratio: "16:9" },
                { label: "Brightcove Poster", size: "1280x720", ratio: "16:9" },
            ]
        },
        {
            category: "Short-Form (9:16)",
            icon: Smartphone,
            color: "text-purple-500",
            types: [
                { label: "TikTok Video", size: "1080x1920", ratio: "9:16" },
                { label: "IG Reel / Story", size: "1080x1920", ratio: "9:16" },
                { label: "YouTube Shorts", size: "1080x1920", ratio: "9:16" },
                { label: "Snapchat Story", size: "1080x1920", ratio: "9:16" },
                { label: "Pinterest Pin", size: "1000x1500", ratio: "2:3" },
                { label: "Idea Pin", size: "1080x1920", ratio: "9:16" },
            ]
        },
        {
            category: "Social Media",
            icon: Share2,
            color: "text-blue-500",
            types: [
                { label: "Instagram Square", size: "1080x1080", ratio: "1:1" },
                { label: "Instagram Portrait", size: "1080x1350", ratio: "4:5" },
                { label: "X / Twitter Post", size: "1200x675", ratio: "16:9" },
                { label: "X Header", size: "1500x500", ratio: "3:1" },
                { label: "Facebook Post", size: "1200x630", ratio: "1.91:1" },
                { label: "Facebook Cover", size: "820x312", ratio: "2.63:1" },
                { label: "LinkedIn Post", size: "1200x627", ratio: "1.91:1" },
                { label: "Threads Post", size: "1080x1080", ratio: "1:1" },
            ]
        },
        {
            category: "Community",
            icon: MessageSquare,
            color: "text-green-500",
            types: [
                { label: "Discord Banner", size: "600x240", ratio: "2.5:1" },
                { label: "Reddit Post", size: "1200x628", ratio: "1.91:1" },
                { label: "Telegram Image", size: "1280x720", ratio: "16:9" },
                { label: "WhatsApp Status", size: "1080x1920", ratio: "9:16" },
            ]
        },
        {
            category: "Publishing & Edu",
            icon: BookOpen,
            color: "text-orange-500",
            types: [
                { label: "Medium Standard", size: "1400x1400", ratio: "1:1" },
                { label: "Medium Banner", size: "1400x400", ratio: "3.5:1" },
                { label: "Substack Hero", size: "1456x819", ratio: "16:9" },
                { label: "Udemy Course", size: "750x422", ratio: "16:9" },
                { label: "Skillshare Class", size: "1280x720", ratio: "16:9" },
                { label: "Gumroad Cover", size: "1280x720", ratio: "16:9" },
            ]
        },
        {
            category: "E-Commerce & Gaming",
            icon: ShoppingBag,
            color: "text-pink-600",
            types: [
                { label: "Shopify Hero", size: "1600x900", ratio: "16:9" },
                { label: "Product Square", size: "1024x1024", ratio: "1:1" },
                { label: "Etsy Listing", size: "2000x1500", ratio: "4:3" },
                { label: "Roblox Thumbnail", size: "1280x720", ratio: "16:9" },
                { label: "Steam Capsule", size: "616x353", ratio: "16:9" },
                { label: "Patreon Post", size: "1600x400", ratio: "4:1" },
            ]
        },
        {
            category: "Professional",
            icon: Briefcase,
            color: "text-slate-500",
            types: [
                { label: "Upwork Project", size: "1000x750", ratio: "4:3" },
                { label: "Fiverr Gig", size: "1280x769", ratio: "16:9" },
                { label: "Fiverr Profile", size: "600x600", ratio: "1:1" },
                { label: "Polywork", size: "1200x630", ratio: "1.91:1" },
            ]
        },
        {
            category: "News & Discovery",
            icon: Newspaper,
            color: "text-sky-600",
            types: [
                { label: "Google Discover", size: "1200x800", ratio: "3:2" },
                { label: "Google News", size: "1200x675", ratio: "16:9" },
            ]
        },
        {
            category: "Other / Creative",
            icon: Layers,
            color: "text-indigo-500",
            types: [
                { label: "Spotify Cover", size: "640x640", ratio: "1:1" },
                { label: "Podcast Cover", size: "3000x3000", ratio: "1:1" },
                { label: "SoundCloud Art", size: "1000x1000", ratio: "1:1" },
                { label: "Dribbble Shot", size: "1600x1200", ratio: "4:3" },
                { label: "Wattpad Cover", size: "512x800", ratio: "2:3" },
            ]
        }
    ]

    const filteredPlatforms = platforms.map(platform => ({
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
                                                "w-full text-left text-xs py-2 px-3 rounded-md transition-all duration-200 border border-transparent group relative overflow-hidden",
                                                isActive
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                                            )}
                                            onClick={() => setSize(platform.category, type.ratio as AspectRatio, type.label)}
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
