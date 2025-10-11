"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const weddingDate = new Date("2025-11-15T14:00:00")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(timer)
  }, [])

  const scrollToRsvp = () => {
    const rsvpSection = document.getElementById("rsvp-section")
    rsvpSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[url('/hero.jpeg')]  bg-cover bg-center after:bg-[#a765235e] after:inset-0 after:absolute after:opacity-37 after:z-0">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-sm md:text-base mb-8 tracking-[0.3em] font-light uppercase">
          15 Novembre 2025
        </p>

        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8  tracking-[0.15em] font-bold">
          SOPHIE & YACINE
        </h1>

        <p className="text-sm md:text-base mb-10  leading-relaxed tracking-wide font-medium">
          ont la joie de te convier à leur mariage
          <br />
          le 15 novembre 2025 aux Salons Hoche
        </p>

        <Button
          onClick={scrollToRsvp}
          className="text-[#8B2332] hover:bg-[#6B1A26] hover:text-white bg-white px-10 py-6 text-sm tracking-wider rounded-xl transition-all duration-300 hover:scale-105 uppercase"
        >
          Confirmer sa présence
        </Button>

        <div className="mt-20 flex justify-center gap-12 md:gap-20 lg:gap-24">
          <div className="text-center">
            <div className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold mb-3 leading-none">
              {timeLeft.days}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] font-light">
              Jours
            </div>
          </div>
          <div className="text-center">
            <div className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold mb-3 leading-none">
              {timeLeft.hours}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] font-light">
              Heures
            </div>
          </div>
          <div className="text-center">
            <div className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold mb-3 leading-none">
              {timeLeft.minutes}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] font-light">
              Minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
