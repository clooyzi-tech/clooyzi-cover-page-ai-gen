"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, Download, Share2, Pencil, Eraser, Coins } from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function Canvas() {
    const { selectedRatio, selectedPlatform, selectedSizeLabel, generatedImage, isGenerating, isDrawingMode, toggleDrawingMode, selectedColor, tokens, nextDesign, prevDesign } = useEditorStore()
    const [zoom, setZoom] = useState(100)

    // Drawing Refs
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)

    // Calculate aspect ratio as a number for styles
    const getAspectRatio = (ratio: string) => {
        const [w, h] = ratio.split(':').map(Number)
        return w / h
    }

    const ratioValue = getAspectRatio(selectedRatio)

    // Initialize Canvas Size when Ratio Changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Small timeout to allow container to resize first
            setTimeout(() => {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.offsetWidth;
                    canvas.height = parent.offsetHeight;
                }
            }, 100) // Delay matching the transition duration
        }
    }, [selectedRatio, zoom]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawingMode) return;
        setIsDrawing(true);
        draw(e);
    }

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.beginPath(); // Reset path
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !isDrawingMode) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
        const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = selectedColor; // Use selected color from store

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    return (
        <div className="relative flex-1 bg-muted/10 flex items-center justify-center p-8 overflow-hidden group select-none">
            {/* CAD-like Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
               linear-gradient(to right, #808080 1px, transparent 1px),
               linear-gradient(to bottom, #808080 1px, transparent 1px)
             `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Info Tag (Top Left) */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 items-start">
                <div className="bg-background/80 backdrop-blur-md border shadow-sm rounded-md px-3 py-1.5 text-xs font-medium flex items-center gap-2">
                    <span className="text-muted-foreground">{selectedPlatform}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="text-foreground">{selectedSizeLabel}</span>
                    <span className="text-muted-foreground ml-2 px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">{selectedRatio}</span>
                </div>
            </div>

            {/* Drawing Toolbar (Visible when Drawing Mode is active) */}
            <AnimatePresence>
                {isDrawingMode && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-background/90 backdrop-blur border shadow-lg rounded-full px-2 py-1 flex items-center gap-1"
                    >
                        <div className="size-4 rounded-full mx-2 border shadow-sm" style={{ backgroundColor: selectedColor }} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={clearCanvas} title="Clear Canvas">
                            <Eraser className="size-4" />
                        </Button>
                        <div className="w-px h-4 bg-border mx-1" />
                        <span className="text-xs font-medium px-2 text-muted-foreground">Drawing Mode On</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Canvas Container with Animation (Fixed Zoom Behavior) */}
            <motion.div
                className="relative z-10 shadow-skeuo rounded-xl border-[6px] border-background ring-1 ring-black/5 bg-background origin-center"
                initial={false}
                animate={{
                    aspectRatio: selectedRatio.replace(':', '/'),
                    width: ratioValue >= 1 ? '90%' : 'auto',
                    height: ratioValue < 1 ? '90%' : 'auto',
                    maxWidth: ratioValue >= 1 ? '1200px' : 'auto',
                    maxHeight: ratioValue < 1 ? '900px' : 'auto',
                    scale: zoom / 100
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >

                {/* Canvas Content */}
                <div className="w-full h-full bg-neutral-900 shadow-skeuo-inner rounded-lg flex items-center justify-center text-neutral-500 relative overflow-hidden">

                    {/* HTML5 Drawing Canvas Layer */}
                    <canvas
                        ref={canvasRef}
                        className={cn(
                            "absolute inset-0 z-20 touch-none",
                            isDrawingMode ? "cursor-crosshair pointer-events-auto" : "pointer-events-none"
                        )}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                    />

                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950"
                            >
                                <div className="relative">
                                    <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-primary animate-pulse">AI</div>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground/80 font-mono animate-pulse">Diffusion in progress...</p>
                            </motion.div>
                        ) : generatedImage ? (
                            <motion.img
                                key="image"
                                src={generatedImage}
                                alt="Generated"
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.8 }}
                            />
                        ) : (
                            <motion.div
                                key="empty"
                                className="text-center p-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="mx-auto w-16 h-16 border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center mb-4">
                                    <Maximize2 className="size-6 text-neutral-700" />
                                </div>
                                <p className="text-sm font-medium text-neutral-400">Canvas Ready</p>
                                <p className="text-xs text-neutral-600 mt-1">Select a size and prompt to generate</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Overlay Controls (Hover) */}
                    <div className="absolute top-4 right-4 flex gap-2 transition-all duration-300 pointer-events-auto z-30">
                        <Button
                            size="icon"
                            variant="secondary"
                            onClick={toggleDrawingMode}
                            className={cn(
                                "h-8 w-8 rounded-full border-0 backdrop-blur-md transition-all",
                                isDrawingMode
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-black"
                                    : "bg-black/60 text-white hover:bg-black/80"
                            )}
                        >
                            <Pencil className="size-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-black/60 text-white border-0 hover:bg-black/80 backdrop-blur-md">
                            <Share2 className="size-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-primary/90 text-primary-foreground border-0 hover:bg-primary shadow-lg backdrop-blur-md">
                            <Download className="size-4" />
                        </Button>
                    </div>
                </div>

                {/* Slider Controls (Attached to Frame) */}
                <div className="absolute -left-14 top-1/2 z-50" style={{ transform: `translateY(-50%) scale(${100 / zoom})` }}>
                    <div className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/10 p-1 rounded-2xl shadow-xl hover:bg-black/30 transition-colors">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevDesign}
                            className="h-10 w-10 rounded-xl text-white hover:bg-white/20 hover:text-white"
                        >
                            <ChevronLeft className="size-6" />
                        </Button>
                    </div>
                </div>

                <div className="absolute -right-14 top-1/2 z-50" style={{ transform: `translateY(-50%) scale(${100 / zoom})` }}>
                    <div className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/10 p-1 rounded-2xl shadow-xl hover:bg-black/30 transition-colors">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextDesign}
                            className="h-10 w-10 rounded-xl text-white hover:bg-white/20 hover:text-white"
                        >
                            <ChevronRight className="size-6" />
                        </Button>
                    </div>
                </div>
            </motion.div>



            {/* Zoom Controls (Floating - Bottom Right) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-background/80 backdrop-blur-lg px-2 py-1.5 rounded-full border shadow-xl z-20">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={() => setZoom(z => Math.max(10, z - 10))}>
                    <ZoomOut className="size-3.5" />
                </Button>
                <div className="w-10 text-center text-xs font-mono font-medium">{zoom}%</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={() => setZoom(z => Math.min(200, z + 10))}>
                    <ZoomIn className="size-3.5" />
                </Button>
            </div>
        </div>
    )
}
