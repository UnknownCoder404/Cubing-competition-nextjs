import Image from "next/image";
import { CompetitionType } from "../Types/solve";
import { getCompetitions } from "../utils/competitions";
import styles from "./CompetitionDashboard.module.css";
import editImg from "@/app/public/edit.svg";
import deleteImg from "@/app/public/delete.svg";
import lockImg from "@/app/public/locked.svg";

export const metadata = {
  title: "Upravljanje natjecanjima",
};
export const dynamic = "force-dynamic";

function CurrentCompetitions({
  competitions,
}: {
  competitions: CompetitionType[];
}) {
  return competitions.map((comp) => {
    const { name, isLocked, date, _id, events } = comp;
    return (
      <div className={styles["competitions"]}>
        <div className={styles["competition"]}>
          <h2>{name}</h2>
          <p>
            Datum:{" "}
            {new Date(date).toLocaleDateString(["hr-HR", "fr-FR"], {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <h2>Eventovi</h2>
          <ul className={styles["events-list"]}>
            <li className={styles["event"]}>3x3 (3)</li>
          </ul>
          <button className={styles["edit-button"]}>
            <Image width={24} height={24} src={editImg} alt="edit" />
          </button>
          <button className={styles["delete-button"]}>
            <Image width={24} height={24} src={deleteImg} alt="delete" />
          </button>
          <button className={styles["lock-button"]}>
            <Image width={24} height={24} src={lockImg} alt="lock" />
          </button>
        </div>
      </div>
    );
  });
}

export default async function CompetitionsDashboard() {
  console.log(styles);
  const competitions = await getCompetitions();
  if (!competitions.success)
    return <p>Dogodila se greška prilikom dobivanja natjecanje</p>;
  return (
    <>
      <CurrentCompetitions competitions={competitions.parsed} />
    </>
  );
}
