export default function Footer() {
  return (
    <footer className="bg-[#8B2332] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <svg viewBox="0 0 60 60" className="w-12 h-12 mb-4" fill="currentColor">
              <text x="30" y="38" fontSize="28" fontFamily="serif" textAnchor="middle" className="font-serif">
                S&Y
              </text>
            </svg>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Learn More</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Programme
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Lieux
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  RSVP
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Informations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Sophie Azem : 06 66 03 29 68</li>
              <li>Yacine Belhadj-Adda : 06 27 68 20 56</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Facebook"
          >
            <span className="text-sm">f</span>
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Twitter"
          >
            <span className="text-sm">𝕏</span>
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Instagram"
          >
            <span className="text-sm">📷</span>
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="YouTube"
          >
            <span className="text-sm">▶</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-75 border-t border-white/20 pt-8">
          <p>© 2025 Sophie Azem & Yacine Belhadj-Adda. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
