export default function InfoSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#8B2332] mb-12">Plus d&apos;info</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card - Placeholder */}
          <div className="bg-[#8B2332] rounded-lg p-12 min-h-[300px] flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-lg">Informations complémentaires</p>
            </div>
          </div>

          {/* Right Card - Contacts */}
          <div className="bg-[#8B2332] rounded-lg p-8 md:p-12 text-white">
            <h3 className="font-serif text-2xl mb-6 text-center">Contacts</h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm opacity-90 mb-2">Pour toute question, vous pouvez nous joindre :</p>
                <div className="space-y-1">
                  <p className="text-sm">Sophie Azem : 06 66 03 29 68</p>
                  <p className="text-sm">Yacine Belhadj-Adda : 06 27 68 20 56</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Contact le jour J :</p>
                <div className="space-y-1 text-sm">
                  <p>Lisa Azem : 06 59 19 09 15</p>
                  <p>Samy Azem : 06 45 68 27 24</p>
                  <p>Nassima Belhadj-Adda : 06 59 76 00 44</p>
                  <p>Ines Belhadj-Adda : 06 59 76 91 72</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">Téléphone : 06 59 19 09 15</p>
                <p className="text-sm opacity-90 mt-1">Adresse e-mail : contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
