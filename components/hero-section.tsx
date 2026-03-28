"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const weddingDate = new Date("2026-04-17T13:00:00")
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('/hero-2.png')] bg-cover bg-center after:bg-[#721c3415] after:inset-0 after:absolute  after:z-0">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto h-full md:flex md:items-center md:justify-center md:py-0 py-16 flex flex-col justify-between">
        <p className="text-lg md:text-xl md:mb-8 tracking-[0.3em] font-light uppercase md:absolute md:top-12">
          17 Avril 2026
        </p>

        <div className="md:flex md:flex-col md:items-center md:justify-center">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl md:mb-8 tracking-[0.15em] font-bold mt-12 md:mt-0">
            KATIA & ADEL
          </h1>

          <p className="text-base md:text-2xl md:mb-10 leading-relaxed tracking-wide font-medium mt-12 md:mt-0">
            ont la joie de te convier à leur mariage
            <br />
            qui aura lieu le 17 avril 2026 aux Château des Hauts de Provins
          </p>

          <Button
            onClick={scrollToRsvp}
            className="text-[#721c34] hover:bg-[#6B1A26] hover:text-white bg-white px-10 py-6 text-sm tracking-wider rounded-xl transition-all duration-300 hover:scale-105 uppercase mt-12 md:mt-8"
          >
            Confirmer sa présence
          </Button>
        </div>

        <div className="mt-12 md:mt-0 pb-16 md:pb-0  md:absolute md:bottom-12 flex justify-center gap-12 md:gap-20 lg:gap-24 w-full">
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
