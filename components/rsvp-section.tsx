"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    attending: "",
    accompanied: "",
    guestCount: 0,
    guests: [] as { firstName: string; lastName: string }[],
    dietaryRestrictions: "",
    message: "",
  })

  const handleAccompaniedChange = (value: string) => {
    setFormData({
      ...formData,
      accompanied: value,
      guests: value === "oui" ? [{ firstName: "", lastName: "" }] : [],
      guestCount: value === "oui" ? 1 : 0,
    })
  }

  const handleGuestCountChange = (count: number) => {
    const newGuests = Array.from(
      { length: count },
      (_, i) => formData.guests[i] || { firstName: "", lastName: "" }
    )
    setFormData({
      ...formData,
      guestCount: count,
      guests: newGuests,
    })
  }

  const handleGuestChange = (
    index: number,
    field: "firstName" | "lastName",
    value: string
  ) => {
    const newGuests = [...formData.guests]
    newGuests[index] = { ...newGuests[index], [field]: value }
    setFormData({ ...formData, guests: newGuests })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="rsvp-section" className="py-16 md:py-24 px-4 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column - Logo and Text */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center">
          <div className="flex justify-center items-center mb-8 mx-[25%]">
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 text-[#8B2332]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image href="/Logo.svg" height="100" width="100" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#8B2332] mb-4">
            Confirmer sa présence
          </h2>
          <p className="text-sm text-gray-600 max-w-md leading-relaxed">
            Rejoignez-nous pour nos moments inoubliables !
          </p>
          <p className="text-sm text-gray-600 mt-4 max-w-md leading-relaxed">
            Votre présence rendra ce moment magique encore plus spécial.
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Merci d'indiquer votre nom et prénom{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="border-gray-300"
                  required
                />
                <Input
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Attending */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Serez-vous présent à la réception ?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.attending}
                onValueChange={(value) =>
                  setFormData({ ...formData, attending: value })
                }
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="oui" />
                  <Label htmlFor="oui" className="font-normal cursor-pointer">
                    Oui
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="non" />
                  <Label htmlFor="non" className="font-normal cursor-pointer">
                    Non
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pas-sur" id="pas-sur" />
                  <Label
                    htmlFor="pas-sur"
                    className="font-normal cursor-pointer"
                  >
                    Je ne suis pas encore sûr, je vous informerai de la réponse
                    plus tard
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Accompanied */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Serez-vous accompagné ? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.accompanied}
                onValueChange={handleAccompaniedChange}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="accompanied-oui" />
                  <Label
                    htmlFor="accompanied-oui"
                    className="font-normal cursor-pointer"
                  >
                    Oui
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="accompanied-non" />
                  <Label
                    htmlFor="accompanied-non"
                    className="font-normal cursor-pointer"
                  >
                    Non
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.accompanied === "oui" && (
              <div>
                <Label className="text-[#8B2332] mb-3 block">
                  Combien de personnes vous accompagneront ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guestCount || ""}
                  onChange={(e) =>
                    handleGuestCountChange(Number.parseInt(e.target.value) || 0)
                  }
                  className="border-gray-300 mb-4"
                  placeholder="Nombre de personnes"
                />

                {formData.guestCount > 0 && (
                  <div className="space-y-4">
                    <Label className="text-[#8B2332] block">
                      Merci d'indiquer le(s) nom(s) et prénom(s) des personnes
                      qui vous accompagneront
                    </Label>
                    {formData.guests.map((guest, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder={`Prénom personne ${index + 1}`}
                          value={guest.firstName}
                          onChange={(e) =>
                            handleGuestChange(
                              index,
                              "firstName",
                              e.target.value
                            )
                          }
                          className="border-gray-300"
                        />
                        <Input
                          placeholder={`Nom personne ${index + 1}`}
                          value={guest.lastName}
                          onChange={(e) =>
                            handleGuestChange(index, "lastName", e.target.value)
                          }
                          className="border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Dietary Restrictions */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Restriction alimentaire du banquet ?
              </Label>
              <Textarea
                placeholder="Indiquez vos restrictions alimentaires"
                value={formData.dietaryRestrictions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dietaryRestrictions: e.target.value,
                  })
                }
                className="border-gray-300 min-h-[80px]"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-[#8B2332] mb-3 block">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="border-gray-300 min-h-[100px]"
              />
            </div>

            <p className="text-xs text-gray-500">
              * Indique un champ obligatoire
            </p>

            <Button
              type="submit"
              className="w-full bg-[#8B2332] hover:bg-[#6B1A26] text-white py-6 text-base"
            >
              Envoyer
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
