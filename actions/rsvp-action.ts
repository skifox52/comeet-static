"use server";

import { EVENT_ID, SEAT_LIMIT } from "@/config/constants";
import { rsvpFormSchema } from "../schema/formRSVP";

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitRsvpAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    // Extract form data
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      attending: formData.get("attending"),
      accompanied:
        formData.get("accompanied") === ""
          ? "non"
          : formData.get("accompanied"),
      guestCount: formData.get("guestCount")
        ? Number(formData.get("guestCount"))
        : 0,
      dietaryRestrictions: formData.get("dietaryRestrictions") || "",
      message: formData.get("message") || "",
      guests: [] as { firstName: string; lastName: string }[],
    };

    // Extract guest details
    const guestCount = rawData.guestCount;
    for (let i = 0; i < guestCount; i++) {
      rawData.guests.push({
        firstName: (formData.get(`guests.${i}.firstName`) as string) || "",
        lastName: (formData.get(`guests.${i}.lastName`) as string) || "",
      });
    }

    // Validate data
    const validatedData = rsvpFormSchema.parse(rawData);

    // Transform into API-compatible payload
    const allGuests = [
      {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: "",
      },
      ...(validatedData.guests ?? []).map((g) => ({
        firstName: g.firstName,
        lastName: g.lastName,
        email: "",
      })),
    ];

    const totalCount = allGuests.length;
    const attendingStatus =
      validatedData.attending === "oui"
        ? "1"
        : validatedData.attending === "pas-sur"
          ? "2"
          : "3";

    const apiPayload = {
      event_id: EVENT_ID,
      seatlimit: SEAT_LIMIT,
      total_attending_no: totalCount,
      name_title: Array(totalCount).fill("1"),
      first_name: allGuests.map((g) => g.firstName),
      last_name: allGuests.map((g) => g.lastName),
      email: Array(totalCount).fill(""),
      attending_status: [
        attendingStatus,
        ...(totalCount && totalCount > 1
          ? Array(totalCount - 1).fill(attendingStatus)
          : []),
      ],
      message: validatedData.message,
    };
    // Convert to FormData
    const body = new FormData();
    Object.entries(apiPayload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => body.append(`${key}[]`, v));
      } else {
        body.append(key, String(value));
      }
    });

    // Send request without JSON header
    const response = await fetch(
      "https://app.comeet.fr/event_invite_form_submit",
      {
        method: "POST",
        body,
      },
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erreur lors de la soumission du RSVP.");
    }

    return {
      success: true,
      message: "ta réponse a été enregistrée avec succès!",
    };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && "errors" in error) {
      const zodError = error as any;
      return {
        success: false,
        message: "Merci de corriger les erreurs dans le formulaire.",
        errors: zodError.errors?.reduce(
          (acc: Record<string, string[]>, curr: any) => {
            const path = curr.path.join(".");
            if (!acc[path]) acc[path] = [];
            acc[path].push(curr.message);
            return acc;
          },
          {},
        ),
      };
    }

    return {
      success: false,
      message: "Une erreur s'est produite. Merci de réessayer.",
    };
  }
}
