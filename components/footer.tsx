"use client"

export default function Footer() {
  const scrollToRsvp = () => {
    const rsvpSection = document.getElementById("rsvp-section")
    rsvpSection?.scrollIntoView({ behavior: "smooth" })
  }
  const scrollToLieux = () => {
    const locationsSection = document.getElementById("locations-section")
    locationsSection?.scrollIntoView({ behavior: "smooth" })
  }
  const scrollToContact = () => {
    const infoSection = document.getElementById("info-section")
    infoSection?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <footer className="bg-[#8B2332] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <svg
              viewBox="0 0 60 60"
              className="w-12 h-12 mb-4"
              fill="currentColor"
            >
              <text
                x="30"
                y="38"
                fontSize="28"
                fontFamily="serif"
                textAnchor="middle"
                className="font-serif italic font-2xl"
              >
                S&Y
              </text>
            </svg>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Lien utiles</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <button
                  type="button"
                  onClick={scrollToRsvp}
                  className="hover:opacity-100 transition-opacity bg-transparent text-white cursor-pointer"
                >
                  Confirmer ma présence
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToLieux}
                  className="hover:opacity-100 transition-opacity bg-transparent text-white cursor-pointer"
                >
                  Lieux
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="hover:opacity-100 transition-opacity bg-transparent text-white cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="/logo.png"
              alt="logo"
              className="rounded-md mx-auto"
              width={150}
            />
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-sm opacity-75 border-t border-white/20 pt-8 ">
          <p>© 2025 Sophie & Yacine by Comeet. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
