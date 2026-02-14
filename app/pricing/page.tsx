"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Image as ImageIcon } from "lucide-react"

export default function PricingPage() {
    const router = useRouter()
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

    const handleSubscribe = (planName: string) => {
        setLoadingPlan(planName)
        // Simulate payment processing
        setTimeout(() => {
            router.push("/dashboard")
        }, 1500)
    }

    const plans = [
        {
            name: "Starter",
            price: "$0",
            description: "Perfect for hobbyists and trying it out.",
            features: ["50 Tokens / mo", "Standard Resolution", "Personal Use", "Community Support"],
            cta: "Get Started",
            variant: "outline"
        },
        {
            name: "Pro",
            price: "$29",
            description: "For creators who need high-quality visuals daily.",
            features: ["2,000 Tokens / mo", "4K Resolution", "Commercial License", "Priority Support", "Private Mode"],
            cta: "Subscribe Now",
            variant: "premium",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Scalable solutions for teams and agencies.",
            features: ["Unlimited Tokens", "API Access", "Custom Models", "Dedicated Manager", "SSO"],
            cta: "Contact Sales",
            variant: "outline"
        }
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container flex h-16 items-center justify-between border-b">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                        <ImageIcon className="size-5" />
                    </div>
                    ThumbnailAI
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">Skip for now (Dev)</Link>
                </Button>
            </header>

            <main className="flex-1 py-12 md:py-24">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Select Your Plan</h1>
                        <p className="text-xl text-muted-foreground">
                            Choose the package that suits your creative needs. Upgrade or cancel anytime.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative flex flex-col rounded-2xl border p-8 transition-shadow hover:shadow-lg ${plan.popular ? 'border-primary shadow-md bg-background' : 'bg-background/50'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Recommended
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                                </div>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-green-500 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className="w-full"
                                    variant={plan.variant as any}
                                    size="lg"
                                    disabled={loadingPlan !== null}
                                    onClick={() => handleSubscribe(plan.name)}
                                >
                                    {loadingPlan === plan.name ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        plan.cta
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
