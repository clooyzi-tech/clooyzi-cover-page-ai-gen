import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Image as ImageIcon, Zap, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <ImageIcon className="size-5" />
            </div>
            ThumbnailAI
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="transition-colors hover:text-primary">Features</Link>
            <Link href="#pricing" className="transition-colors hover:text-primary">Pricing</Link>
            <Link href="#showcase" className="transition-colors hover:text-primary">Showcase</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="container relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="flex size-2 me-2 rounded-full bg-primary animate-pulse"></span>
              v2.0 is now live with enhanced realism
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Create Viral Thumbnails & Images with AI in Seconds
            </h1>
            <p className="max-w-2xl text-xl text-muted-foreground mb-10">
              Perfect for YouTube, Instagram, Ads, Blogs & More. Generate high-converting visuals that stop the scroll.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button size="xl" variant="premium" className="group" asChild>
                <Link href="/register">
                  Get Started for Free
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#showcase">View Examples</Link>
              </Button>
            </div>
          </div>

          {/* Abstract Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Why Creators Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast Generation",
                  description: "Generate high-quality thumbnails in seconds. No more waiting hours for designers."
                },
                {
                  icon: Shield,
                  title: "Commercial Rights",
                  description: "Full ownership of every image you generate. Use them for any commercial project."
                },
                {
                  icon: Users,
                  title: "Tailored for Content",
                  description: "Presets optimized for YouTube CTR, Instagram engagement, and ad conversions."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background rounded-2xl p-8 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section id="pricing" className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground text-lg">Start for free, upgrade as you grow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$0",
                  period: "/month",
                  features: ["50 Tokens / mo", "Standard Resolution", "Personal Use", "Community Support"],
                  cta: "Start Free",
                  variant: "outline"
                },
                {
                  name: "Pro",
                  price: "$29",
                  period: "/month",
                  features: ["2,000 Tokens / mo", "4K Resolution", "Commercial License", "Priority Support", "Private Mode"],
                  cta: "Go Pro",
                  variant: "default",
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  features: ["Unlimited Tokens", "API Access", "Custom Models", "Dedicated Manager", "SSO"],
                  cta: "Contact Sales",
                  variant: "outline"
                }
              ].map((plan, i) => (
                <div key={i} className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-primary shadow-lg scale-105 bg-background' : 'bg-background/50'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 text-primary" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.variant as any} size="lg">
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <div className="size-6 rounded bg-primary text-primary-foreground flex items-center justify-center">
                <ImageIcon className="size-4" />
              </div>
              ThumbnailAI
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering creators with AI-driven design tools for the next generation of content.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Features</Link></li>
              <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary">Showcase</Link></li>
              <li><Link href="#" className="hover:text-primary">API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">About</Link></li>
              <li><Link href="#" className="hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Legal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary">Discord</Link></li>
              <li><Link href="#" className="hover:text-primary">Instagram</Link></li>
              <li><Link href="#" className="hover:text-primary">YouTube</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2026 ThumbnailAI Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
