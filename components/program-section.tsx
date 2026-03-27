export default function ProgramSection() {
  const events = [
    {
      time: "14h00",
      title: "Cérémonie Civile",
      location: "118 Avenue du Général de Gaulle",
      address: "94700 Maisons-Alfort",
      parking:""
    },
    {
      time: "17h30",
      title: "Cocktail",
      location: "Château des hauts de provins",
      address: "Route de Ferreux, 77560",
    },
    {
      time: "20h30",
      title: "Dîner",
      location: "Château des hauts de provins",
      address: "Route de Ferreux, 77560"
    },
   
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#721c34] mb-4">
          Programme de la journée
        </h2>
        <p className="text-center text-gray-600 mb-12">Cérémonie & Réception</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Timeline */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="text-[#721c34] font-light text-lg min-w-[60px]">
                  {event.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                  <p className="text-xs text-gray-500">{event.address}</p>
                  {event?.parking && (
                    <p className="text-xs text-gray-500 mt-1">
                      Stationnement : {event?.parking}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="rounded-lg overflow-hidden w-fit mx-auto h-[400px] md:h-[500px]">
            <img
              src="/prog-2.1.png"
              alt="Hawa Mahal"
              className="w-fit h-full object-center mx-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
