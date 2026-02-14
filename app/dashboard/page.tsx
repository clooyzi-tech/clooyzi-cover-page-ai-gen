"use client"

import { Sidebar, SidebarContent } from "@/components/editor/Sidebar"
import { Canvas } from "@/components/editor/Canvas"
import { PromptPanel } from "@/components/editor/PromptPanel"
import { RightPanel, RightPanelContent } from "@/components/editor/RightPanel"
import { SketchFullscreen } from "@/components/editor/SketchFullscreen"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PanelLeft, PanelRight } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex h-full w-full overflow-hidden relative group/dashboard">
            <SketchFullscreen />

            {/* Desktop Left Sidebar (Hidden on Mobile) */}
            <Sidebar />

            {/* Mobile Sidebar Trigger (Visible on Mobile) */}
            <div className="md:hidden absolute top-4 left-4 z-30">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shadow-md bg-background/80 backdrop-blur">
                            <PanelLeft className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Mobile Right Panel Trigger (Visible on Mobile) */}
            <div className="md:hidden absolute top-4 right-4 z-30">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shadow-md bg-background/80 backdrop-blur">
                            <PanelRight className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 w-80">
                        <RightPanelContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Center Stage - Canvas + Prompt */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">

                {/* Canvas Area */}
                <div className="flex-1 relative overflow-hidden bg-dot-pattern">
                    <Canvas />
                </div>

                {/* Prompt Panel */}
                <PromptPanel />
            </div>

            {/* Desktop Right Panel (Hidden on Mobile) */}
            <RightPanel />
        </div>
    )
}
