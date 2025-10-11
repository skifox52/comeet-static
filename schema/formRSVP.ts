import { SEAT_LIMIT } from "@/config/constants"
import { z } from "zod"

export const rsvpFormSchema = z
  .object({
    firstName: z.string().min(1, "Le prénom est obligatoire"),
    lastName: z.string().min(1, "Le nom est obligatoire"),
    attending: z.enum(["oui", "non", "pas-sur"], {
      required_error: "Indique ta présence",
    }),
    accompanied: z.enum(["oui", "non"], {
      required_error: "Merci d’indiquer si tu seras accompagné.",
    }),
    guestCount: z.number().min(0).max(SEAT_LIMIT).optional(),
    guests: z
      .array(
        z.object({
          firstName: z.string().min(1, "Le prénom est obligatoire"),
          lastName: z.string().min(1, "Le nom est obligatoire"),
        })
      )
      .optional(),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.accompanied === "oui") {
        return data.guestCount && data.guestCount > 0
      }
      return true
    },
    {
      message: "Indique le nombre de personnes qui t'accompagneront.",
      path: ["guestCount"],
    }
  )
  .refine(
    (data) => {
      if (data.accompanied === "oui" && data.guestCount) {
        return data.guests && data.guests.length === data.guestCount
      }
      return true
    },
    {
      message: "Merci de remplir tous les noms des invités.",
      path: ["guests"],
    }
  )

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>
