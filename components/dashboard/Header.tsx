"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Image as ImageIcon, Sparkles, User, Settings, LogOut } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

import { useEditorStore } from "@/lib/store"

export function DashboardHeader() {
    const { tokens } = useEditorStore()

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b bg-background px-4 shadow-sm md:px-6">
            <div className="flex items-center gap-2 font-bold text-lg">
                <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <ImageIcon className="size-5" />
                </div>
                <span className="hidden md:inline">ThumbnailAI</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
                {/* Token Counter */}
                <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-bold shadow-sm">
                    <div className="size-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)] animate-pulse" />
                    <span>{tokens.toFixed(1)} T</span>
                </div>

                <ModeToggle />
                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                                <AvatarFallback>NK</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
