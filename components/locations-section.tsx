"use client"

import { useState } from "react"

export default function LocationsSection() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  const locations = [
    {
      title: "Cérémonie & Réception",
      name: "Mairie de Courbevoie",
      address: "2 Pl. de l'Hôtel de ville, 92400 Courbevoie",
      parking: "Parking Charras - 18 rue de l'Alma 92400 Courbevoie",
      coordinates: { lat: 48.8977, lng: 2.2567 },
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=2+Pl.+de+l'Hôtel+de+ville,+92400+Courbevoie",
    },
    {
      title: "Hébergement",
      name: "Salons Hoches - Salon Elysée",
      address: "9, avenue Hoche 75008",
      parking: "Avenue Hoche ou Parking INDIGO Hoche - 18 Avenue Hoche, 75008 Paris",
      coordinates: { lat: 48.8756, lng: 2.3019 },
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=9+avenue+Hoche+75008+Paris",
    },
    {
      title: "Transport",
      name: "Informations de transport",
      address: "Des informations de transport seront fournies prochainement",
      parking: "",
      coordinates: { lat: 48.8866, lng: 2.2793 },
      mapsUrl: "",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#8B2332] mb-4">Les lieux</h2>
        <p className="text-center text-gray-600 mb-12">Les emplacements des lieux</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Locations List */}
          <div className="space-y-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className="border-l-2 border-[#8B2332] pl-6 cursor-pointer hover:bg-gray-50 p-4 -ml-4 transition-colors"
                onClick={() => setSelectedLocation(index)}
              >
                <h3 className="text-[#8B2332] font-medium mb-2">{location.title}</h3>
                <p className="font-medium text-gray-900 mb-1">{location.name}</p>
                <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                {location.parking && <p className="text-xs text-gray-500 mb-2">Stationnement : {location.parking}</p>}
                {location.mapsUrl && (
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B2332] text-sm hover:underline inline-flex items-center gap-1"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10495.234567890123!2d2.2567!3d48.8977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec70fb1d8d%3A0x40b82c3688c9460!2sMairie%20de%20Courbevoie!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr&markers=color:red%7C48.8977,2.2567%7C48.8756,2.3019"
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
