"use server";
import { HighlightedText } from "@/components/HighlightedText";
import { useDateFormat } from "@/hooks/useFormatDate";

export default async function ThankYou({
  params,
}: {
  params: { date: string; time: string };
}): Promise<React.JSX.Element> {
  const { date, time } = params;
  const formattedDate = useDateFormat(date);

  return (
    <>
      <h1 className="text-5xl">
        Thank <HighlightedText text="you" />!
      </h1>
      <p>
        your reservation for <HighlightedText text={formattedDate} /> at{" "}
        <HighlightedText text={time} /> was succesful.
      </p>
      <a
        className="text-sm font-bold tracking-widest w-fit bg-slate-800 hover:bg-orange-600 py-4 px-8 rounded-md transition-all uppercase"
        href="/"
      >
        Make another reservation
      </a>
    </>
  );
}
