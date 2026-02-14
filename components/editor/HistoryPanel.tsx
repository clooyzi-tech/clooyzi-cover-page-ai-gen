"use client"

import { useEditorStore, HistoryItem } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area" // Assuming ScrollArea exists, or I'll use a div with overflow
import { Trash2, RotateCcw, Clock, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function HistoryPanel() {
    const { history, restoreFromHistory, deleteFromHistory, clearHistory } = useEditorStore()

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4 opacity-50">
                <Clock className="size-8 mb-2" />
                <p className="text-sm font-medium">No history yet</p>
                <p className="text-xs">Generated images will appear here</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Generations</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={clearHistory} title="Clear All">
                    <Trash2 className="size-3.5" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {history.map((item) => (
                    <div key={item.id} className="group relative bg-muted/20 rounded-lg overflow-hidden border hover:border-primary/50 transition-all">
                        <div className="aspect-video w-full bg-muted relative">
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.prompt} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="size-6 opacity-20" />
                                </div>
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-7 text-xs gap-1.5"
                                    onClick={() => restoreFromHistory(item)}
                                >
                                    <RotateCcw className="size-3" />
                                    Use
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="h-7 w-7"
                                    onClick={(e) => { e.stopPropagation(); deleteFromHistory(item.id); }}
                                >
                                    <Trash2 className="size-3" />
                                </Button>
                            </div>
                        </div>

                        <div className="p-2">
                            <p className="text-xs font-medium line-clamp-1 text-foreground/90">{item.prompt}</p>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                                <span>{item.platform}</span>
                                <span>•</span>
                                <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
