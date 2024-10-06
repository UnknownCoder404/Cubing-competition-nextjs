import Image from "next/image";
import showImg from "@/app/public/show.svg";
import hideImg from "@/app/public/hide.svg";
import CompetitionStyles from "../../Competitions/Competitions.module.css";

export default function ShowAndHide({
  show,
  toggleVisibility,
  isTransitioning,
}: {
  show: boolean;
  toggleVisibility: () => void;
  isTransitioning: boolean;
}) {
  return (
    <button
      className={CompetitionStyles["show-hide"]}
      onClick={toggleVisibility}
      disabled={isTransitioning}
    >
      <Image
        src={show ? showImg : hideImg}
        width={undefined}
        height={24}
        alt={show ? "Hide" : "Show"}
      />
    </button>
  );
}
