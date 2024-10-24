"use client";

import Image from "next/image";
import styles from "./CompetitionDashboard.module.css";
import editImg from "@/app/public/edit.svg";
import deleteImg from "@/app/public/delete.svg";
import lockImg from "@/app/public/locked.svg";
import { clsx } from "clsx";

type Props = {
  isLocked: boolean;
  competitionId: string;
};
export default function CompButtons({ isLocked, competitionId }: Props) {
  return (
    <div className={styles["comp-btns"]}>
      <button
        className={clsx(styles["edit-button"], {
          [styles["locked"]]: isLocked,
        })}
      >
        <Image width={24} height={24} src={editImg} alt="edit" />
      </button>
      <button
        className={clsx(styles["delete-button"], {
          [styles["locked"]]: isLocked,
        })}
      >
        <Image width={24} height={24} src={deleteImg} alt="delete" />
      </button>
      <button
        className={clsx(styles["lock-button"], {
          [styles["locked"]]: isLocked,
        })}
      >
        <Image width={24} height={24} src={lockImg} alt="lock" />
      </button>
    </div>
  );
}
