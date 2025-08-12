"use client"

import { useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingPage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger animation
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          if (heroRef.current) {
            gsap.fromTo(
              heroRef.current,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              },
            )
          }
        })
      })
    }
  }, [])

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out IdeaSpark",
      icon: Zap,
      features: ["5 idea generations per day", "Basic keyword research", "Email support", "Standard templates"],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Best for content creators and bloggers",
      icon: Crown,
      features: [
        "Unlimited idea generations",
        "Advanced keyword research",
        "Priority support",
        "Custom templates",
        "Export to Google Docs",
        "Analytics dashboard",
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "/month",
      description: "For teams and agencies",
      icon: Rocket,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text-purple-blue">Simple, Transparent</span>
            <br />
            Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your content creation needs. Start free and upgrade as you grow.
          </p>
        </motion.section>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative p-8 rounded-2xl border backdrop-blur ${
                plan.popular
                  ? "border-purple-500/50 bg-card/80 shadow-2xl shadow-purple-500/20"
                  : "border-border/50 bg-card/30"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: plan.popular
                  ? "0 25px 50px -12px rgba(168, 85, 247, 0.4)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-purple-blue px-4 py-1 rounded-full text-sm font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${plan.popular ? "gradient-purple-blue" : "bg-muted"}`}
                >
                  <plan.icon className={`h-6 w-6 ${plan.popular ? "text-white" : "text-foreground"}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 + featureIndex * 0.05 }}
                  >
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "gradient-purple-blue hover-glow glow-purple text-white"
                    : "border border-border hover:bg-muted"
                } transition-all duration-300`}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.section
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 gradient-text-pink-orange">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. You can cancel your subscription at any time with no cancellation fees.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-card/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
