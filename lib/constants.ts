
import {
    MonitorPlay,
    Smartphone,
    Share2,
    MessageSquare,
    BookOpen,
    ShoppingBag,
    Briefcase,
    Newspaper,
    Layers
} from "lucide-react"

export const PLATFORMS_DATA = [
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
