"use server";

import { FormVisibilityProvider } from "@/components/FormVisibilityContext";
import { PickedDateProvider } from "@/components/PickedDateAndTimeContext";

import { BookingCalendar } from "./sections/BookingCalendar";
import FormPopup from "./sections/FormPopup";
import { UserData, ReservationData } from "@/entities/api-types";
import { createOrGetExistingUser } from "@/services/api-calls";

export default async function Home(): Promise<React.JSX.Element> {
  return (
    <>
      <h1 className="text-3xl">
        Book a <span className="text-orange-600 font-semibold">day</span>!
      </h1>

      <PickedDateProvider>
        <FormVisibilityProvider>
          <BookingCalendar />
          <FormPopup />
        </FormVisibilityProvider>
      </PickedDateProvider>
    </>
  );
}
