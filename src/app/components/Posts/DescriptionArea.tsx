import postsStyles from "@/app/Posts/Posts.module.css";

export default function DescriptionArea({
  setValue,
}: {
  setValue: (arg0: string) => void;
}) {
  return (
    <textarea
      onChange={(e) => setValue(e.target.value)}
      className={`${postsStyles["description"]} ${postsStyles["infoinputs"]}`}
      maxLength={4000}
      placeholder="Opis"
    />
  );
}
