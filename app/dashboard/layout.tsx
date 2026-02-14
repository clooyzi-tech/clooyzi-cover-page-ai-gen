import { DashboardHeader } from "@/components/dashboard/Header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-full flex-col bg-muted/20 overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {children}
            </div>
        </div>
    )
}
