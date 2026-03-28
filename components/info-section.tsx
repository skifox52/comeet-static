export default function InfoSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white" id="info-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#721c34] mb-12">
          Plus d&apos;informations
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card - Placeholder */}
          <div className="bg-[#721c34] rounded-lg p-12 min-h-[300px] flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-lg">Informations complémentaires</p>
            </div>
          </div>

          {/* Right Card - Contacts */}
          <div className="bg-[#721c34] rounded-lg p-8 md:p-12 text-white">
            <h3 className="font-serif text-2xl mb-6 text-center">Contacts</h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm opacity-90 mb-2">
                  Pour toute question, tu peux nous joindre :
                </p>
                <div className="space-y-1">
                  <p className="text-sm">Katia : 06 09 42 17 86</p>
                  <p className="text-sm">Adel : 07 82 73 57 92</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm my-2 font-bold">Contacts le jour J</p>
                <div className="space-y-1 text-sm">
                  {/* <p className="text-sm font-bold mt-2 italic ">
                    Famille de la mariée :
                  </p> */}
                  <p>Sara : 06 52 84 92 78</p>
                  <p>Ali : 06 27 59 38 72</p>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
