import postsStyles from "@/app/Posts/Posts.module.css";

export default function TitleInput({
  setValue,
  value,
}: {
  setValue: (arg0: string) => void;
  value: string;
}) {
  return (
    <input
      onChange={(e) => setValue(e.target.value)}
      value={value}
      maxLength={16}
      type="text"
      className={`${postsStyles["title"]} ${postsStyles["infoinputs"]}`}
      placeholder="Naslov"
    />
  );
}
