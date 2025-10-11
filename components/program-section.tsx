export default function ProgramSection() {
  const events = [
    {
      time: "14h00",
      title: "Cérémonie Civile",
      location: "Mairie de Courbevoie",
      address: "2 Pl. de l'Hôtel de ville, 92400 Courbevoie",
      parking: "Parking Charras - 18 rue de l'Alma 92400 Courbevoie",
    },
    {
      time: "15h30",
      title: "Séance Photo",
      location: "Parc Monceau",
      address: "1 Avenue Van Dyck 75008 Paris",
      parking: "Parking INDIGO Hoche - 18 Avenue Hoche, 75008 Paris",
    },
    {
      time: "18h30",
      title: "Début des festivités !",
      location: "Salons Hoche - Salon Elysée",
      address: "9, avenue Hoche 75008",
      parking:
        "Avenue Hoche ou Parking INDIGO Hoche - 18 Avenue Hoche, 75008 Paris",
    },
    {
      time: "19h00",
      title: "Arrivée des mariés & ouverture du cocktail",
      location: "Salons Hoche - Salon Elysée",
      address: "9, avenue Hoche 75008",
      parking:
        "Avenue Hoche ou Parking INDIGO Hoche - 18 Avenue Hoche, 75008 Paris",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#8B2332] mb-4">
          Programme de la journée
        </h2>
        <p className="text-center text-gray-600 mb-12">Cérémonie & Réception</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Timeline */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="text-[#8B2332] font-light text-lg min-w-[60px]">
                  {event.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                  <p className="text-xs text-gray-500">{event.address}</p>
                  {event.parking && (
                    <p className="text-xs text-gray-500 mt-1">
                      Stationnement : {event.parking}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="rounded-lg overflow-hidden w-fit mx-auto h-[400px] md:h-[500px]">
            <img
              src="/prog.jpg"
              alt="Hawa Mahal"
              className="w-fit h-full object-center mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
