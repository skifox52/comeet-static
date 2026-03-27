"use client"

import { useState } from "react"

export default function LocationsSection() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  const locations = [
    {
      title: "Cérémonie civile",
      name: "",
      address: "118 Avenue du Général de Gaulle, 94700 Maisons-Alfort",
      parking: "",
      coordinates: { lat: 48.800826, lng: 2.429777},
      mapsUrl:
        "https://maps.app.goo.gl/336oz3yaR5JXWfnY9",
    },
    {
      title: "Dîner",
      name: "Château des hauts de provins",
      address: "Route de Ferreux, 77560",
      parking:
        "",
      coordinates: { lat :48.68000425161868, lng: 3.2967379846586806},
      mapsUrl:
        "https://maps.app.goo.gl/X3GvJH4auzd8x9Je6",
    },
  ]
const getMapSrc = (index: number | null) => {
  const loc = locations[index ?? 0]
  const { lat, lng } = loc.coordinates
  // This format shows a pin at the coordinates
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
}
  return (
    <section className="py-16 md:py-24 px-4 bg-white" id="locations-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#721c34] mb-4 mb-12">
          Les adresses du grand jour !
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Locations List */}
          <div className="space-y-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className="border-l-2 border-[#721c34] pl-6 cursor-pointer hover:bg-gray-50 p-4 -ml-4 transition-colors"
                onClick={() => setSelectedLocation(index)}
              >
                <h3 className="text-[#721c34] font-medium mb-2">
                  {location.title}
                </h3>
                <p className="font-medium text-gray-900 mb-1">
                  {location.name}
                </p>
                <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                {location.parking && (
                  <p className="text-xs text-gray-500 mb-2">
                    Stationnement : {location.parking}
                  </p>
                )}
                {location.mapsUrl && (
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#721c34] text-sm hover:underline inline-flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Obtenir l'itinéraire
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-lg overflow-hidden shadow-md h-[500px]">
            <iframe
              src={getMapSrc(selectedLocation)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte des lieux"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
