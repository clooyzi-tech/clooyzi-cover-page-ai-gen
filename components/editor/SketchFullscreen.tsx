"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Pencil, Eraser, X, Check, Palette, Undo2 } from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function SketchFullscreen() {
    const {
        isSketchFullscreen,
        toggleSketchFullscreen,
        selectedColor,
        setColor,
        setSketchReferenceImage
    } = useEditorStore()

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)

    // Set up local state for brush size if needed
    const [brushSize, setBrushSize] = useState(5)

    useEffect(() => {
        if (isSketchFullscreen) {
            const handleResize = () => {
                const canvas = canvasRef.current
                if (canvas) {
                    canvas.width = window.innerWidth
                    canvas.height = window.innerHeight
                }
            }

            window.addEventListener('resize', handleResize)
            handleResize()

            return () => window.removeEventListener('resize', handleResize)
        }
    }, [isSketchFullscreen])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
        draw(e)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        const ctx = canvasRef.current?.getContext('2d')
        ctx?.beginPath()
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left
        const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top

        ctx.lineWidth = brushSize
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = selectedColor

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    const handleDone = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const dataUrl = canvas.toDataURL()
            setSketchReferenceImage(dataUrl)
            toggleSketchFullscreen()
        }
    }

    if (!isSketchFullscreen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center select-none overflow-hidden"
            >
                {/* Toolbar */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 bg-muted/80 backdrop-blur-xl p-2 rounded-2xl border shadow-2xl">
                    <div className="flex items-center gap-1 px-2 border-r pr-4">
                        <div className="size-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                            <Pencil className="size-4" />
                        </div>
                        <span className="text-sm font-bold ml-2">Main Reference Sketch</span>
                    </div>

                    <div className="flex items-center gap-2 px-4">
                        {[
                            { name: "Red", value: "#ef4444" },
                            { name: "Blue", value: "#3b82f6" },
                            { name: "Green", value: "#22c55e" },
                            { name: "Black", value: "#000000" },
                            { name: "White", value: "#ffffff" },
                        ].map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setColor(c.value)}
                                className={cn(
                                    "size-6 rounded-full border shadow-sm transition-transform hover:scale-110",
                                    selectedColor === c.value ? "ring-2 ring-primary ring-offset-2" : ""
                                )}
                                style={{ backgroundColor: c.value }}
                            />
                        ))}
                    </div>

                    <div className="h-6 w-px bg-border" />

                    <Button variant="ghost" size="icon" onClick={clearCanvas} className="rounded-full h-10 w-10">
                        <Eraser className="size-5" />
                    </Button>

                    <div className="h-6 w-px bg-border" />

                    <Button variant="ghost" size="icon" onClick={toggleSketchFullscreen} className="rounded-full h-10 w-10 text-destructive">
                        <X className="size-5" />
                    </Button>

                    <Button onClick={handleDone} className="rounded-full px-6 bg-green-600 hover:bg-green-700 text-white ml-2">
                        <Check className="mr-2 size-4" />
                        Finish Reference
                    </Button>
                </div>

                {/* Canvas Area */}
                <div className="relative w-full h-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />

                    <canvas
                        ref={canvasRef}
                        className="w-full h-full touch-none cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                        <Pencil className="size-64" />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-mono bg-background/50 backdrop-blur px-4 py-1.5 rounded-full border">
                    DRAW YOUR LAYOUT REFERENCE HERE • AI WILL FOLLOW THIS BASE
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
