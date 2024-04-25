"use client";

import { FormVisibilityContext } from "@/components/FormVisibilityContext";
import { HighlightedText } from "@/components/HighlightedText";
import { InputWithLabel } from "@/components/InputWithLabel";
import { PickedDateContext } from "@/components/PickedDateAndTimeContext";
import { UserData } from "@/entities/api-types";
import {
  createOrGetExistingUser,
  createReservation,
  patchAvailableSlot,
} from "@/services/api-calls";
import { useRouter } from "next/navigation";
import {
  FC,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const FormPopup = () => {
  const router = useRouter();
  const { pickedDate, pickedSlot } = useContext(PickedDateContext);
  const { formVisibility, toggleForm } = useContext(FormVisibilityContext);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
  });
  const [userId, setUserId] = useState<number | null>(0);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await createOrGetExistingUser(userData);
    if (user) setUserId(Number(user.user_id));
  };

  useEffect(() => {
    if (userId) makeReservation();
  }, [userId]);

  const makeReservation = async () => {
    if (userId) {
      const reservation = await createReservation({
        date: pickedDate,
        time: pickedSlot.slot_time,
        slotId: pickedSlot.slot_id,
        userId: userId,
      });
      if (reservation) {
        setUserId(null);
        setUserData({
          name: "",
          email: "",
          phone: "",
        });
        const numUpdatedRows = await patchAvailableSlot({
          slot_id: reservation.slot_id,
        });
        console.log("Number of updated rows:", numUpdatedRows);
        router.push(`/thank-you/${pickedDate}/${pickedSlot.slot_time}`);
      }
    }
  };

  if (!formVisibility) return;
  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center bg-gray-950/50">
      <div className="flex flex-col gap-10 bg-slate-600 max-w-md w-full p-10 rounded-md">
        <div className="flex gap-4 items-start relative text-left sm:text-center">
          <h2 className="pr-4 sm:px-6">
            Please fill out the form to make a reservation for{" "}
            <HighlightedText text={pickedDate} /> at{" "}
            <HighlightedText text={pickedSlot.slot_time} />
          </h2>
          <button
            type="button"
            className="cursor-pointer text-3xl text-slate-800 font-bold absolute top-0 right-0"
            onClick={toggleForm}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <InputWithLabel
            name="name"
            text="Username"
            type="text"
            placeholder="John Snow"
            value={userData.name}
            onChange={handleInputChange}
          />
          <InputWithLabel
            name="email"
            text="Email"
            type="email"
            placeholder="example@gmail.com"
            value={userData.email}
            onChange={handleInputChange}
          />
          <InputWithLabel
            name="phone"
            text="Phone"
            type="tel"
            placeholder="+420 733 293 618"
            value={userData.phone}
            onChange={handleInputChange}
          />
          <button
            className="w-full bg-slate-800 hover:bg-orange-600 p-4 rounded-md transition-all"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPopup;
