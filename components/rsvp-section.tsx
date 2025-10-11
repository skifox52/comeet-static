"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  // useEffect removed
  startTransition,
  useActionState,
  useTransition,
} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { submitRsvpAction, type FormState } from "../actions/rsvp-action"
import { rsvpFormSchema, type RsvpFormValues } from "../schema/formRSVP"
import { SEAT_LIMIT } from "@/config/constants"
import { Loader2 } from "lucide-react"

export default function RsvpSection() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      attending: undefined,
      accompanied: undefined,
      guestCount: 0,
      guests: [],
      message: "",
    },
  })

  const initialState: FormState = {
    success: false,
    message: "",
  }

  const [state, formAction] = useActionState(submitRsvpAction, initialState)
  const [isPending, startTransition] = useTransition()

  // Watch values for controlling the RadioGroup and conditional rendering
  const attending = watch("attending")
  const accompanied = watch("accompanied")
  const guestCount = watch("guestCount")
  const guests = watch("guests") || []

  // **The useEffect has been removed.**

  const handleAccompaniedChange = (value: "oui" | "non") => {
    setValue("accompanied", value)
    if (value === "non") {
      setValue("guestCount", 0)
      setValue("guests", [])
    } else {
      setValue("guestCount", 1)
      setValue("guests", [{ firstName: "", lastName: "" }])
    }
  }

  const handleGuestCountChange = (count: number) => {
    setValue("guestCount", count)
    const newGuests = Array.from(
      { length: count },
      (_, i) => guests[i] || { firstName: "", lastName: "" }
    )
    setValue("guests", newGuests)
  }

  const handleGuestChange = (
    index: number,
    field: "firstName" | "lastName",
    value: string
  ) => {
    const newGuests = [...guests]
    newGuests[index] = { ...newGuests[index], [field]: value }
    setValue("guests", newGuests)
  }

  const onSubmit = async (data: RsvpFormValues) => {
    const formData = new FormData()

    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("attending", data.attending || "")
    formData.append("accompanied", data.accompanied || "")
    formData.append("guestCount", data.guestCount?.toString() || "0")
    formData.append("message", data.message || "")

    if (data.guests) {
      data.guests.forEach((guest, index) => {
        formData.append(`guests.${index}.firstName`, guest.firstName)
        formData.append(`guests.${index}.lastName`, guest.lastName)
      })
    }

    startTransition(() => {
      formAction(formData)
      // Resetting the form state here
      reset({
        firstName: "",
        lastName: "",
        attending: undefined,
        accompanied: undefined,
        guestCount: 0,
        guests: [],
        message: "",
      })
    })
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
            On compte sur toi pour venir faire la fête avec nous !
          </p>
          <p className="text-sm text-gray-600 mt-4 max-w-md leading-relaxed">
            Ta présence (et ton sourire) rendront ce moment inoubliable ✨
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Merci d'indiquer ton nom et prénom{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Prénom"
                    {...register("firstName")}
                    className="border-gray-300"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Nom"
                    {...register("lastName")}
                    className="border-gray-300"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Attending */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Serais-tu présent à la réception ?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                // Controlled by watch("attending")
                value={attending || ""}
                onValueChange={(value) =>
                  setValue("attending", value as "oui" | "non" | "pas-sur")
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
                    Je ne suis pas encore sûr, je t'informerai de la réponse
                    plus tard.
                  </Label>
                </div>
              </RadioGroup>
              {errors.attending && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.attending.message}
                </p>
              )}
            </div>

            {/* Accompanied */}
            <div>
              <Label className="text-[#8B2332] mb-3 block">
                Seras-tu accompagné ? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                // Controlled by watch("accompanied")
                value={accompanied || ""}
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
              {errors.accompanied && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.accompanied.message}
                </p>
              )}
            </div>

            {accompanied === "oui" && (
              <div>
                <Label className="text-[#8B2332] mb-3 block">
                  Combien de personnes t'accompagneront ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  min="1"
                  max={SEAT_LIMIT}
                  value={guestCount || ""}
                  onChange={(e) =>
                    handleGuestCountChange(Number.parseInt(e.target.value) || 0)
                  }
                  className="border-gray-300 mb-4"
                  placeholder="Nombre de personnes"
                  inputMode="numeric"
                  maxLength={1}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement
                    if (input.value.length > 1) {
                      input.value = input.value.slice(0, 1)
                    }
                  }}
                />
                {errors.guestCount && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.guestCount.message}
                  </p>
                )}

                {!!guestCount && guestCount > 0 && (
                  <div className="space-y-4">
                    <Label className="text-[#8B2332] block">
                      Merci d’indiquer le(s) nom(s) et prénom(s) des personnes
                      qui t’accompagneront.
                    </Label>
                    {guests.map((guest, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <div>
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
                          {errors.guests?.[index]?.firstName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.guests[index].firstName?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            placeholder={`Nom personne ${index + 1}`}
                            value={guest.lastName}
                            onChange={(e) =>
                              handleGuestChange(
                                index,
                                "lastName",
                                e.target.value
                              )
                            }
                            className="border-gray-300"
                          />
                          {errors.guests?.[index]?.lastName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.guests[index].lastName?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    {errors.guests &&
                      typeof errors.guests.message === "string" && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.guests.message}
                        </p>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-[#8B2332] mb-3 block">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Ton message"
                {...register("message")}
                className="border-gray-300 min-h-[100px]"
              />
            </div>

            <p className="text-xs text-gray-500">
              * Indique un champ obligatoire
            </p>

            {state.message && (
              <div
                className={`p-4 rounded-md ${
                  state.success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {state.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#8B2332] hover:bg-[#6B1A26] text-white py-6 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
