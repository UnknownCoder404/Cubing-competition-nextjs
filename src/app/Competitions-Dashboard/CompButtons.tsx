"use client";

import styles from "./CompetitionDashboard.module.css";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { deleteCompetition, lockCompetition } from "../utils/competitions";
import { CompetitionType } from "../Types/solve";
import { useState } from "react";
import dynamic from "next/dynamic";
import EditSvg from "../components/Svg/edit";
import LockSvg from "../components/Svg/lock";
import DeleteSvg from "../components/Svg/delete";
const EditCompDialog = dynamic(() => import("./EditCompDialog"));

const svgFillColor = "#e8eaed";

type Props = {
    isLocked: boolean;
    competitionId: string;
    competition: CompetitionType;
};
export default function CompButtons({
    isLocked,
    competitionId,
    competition,
}: Props) {
    const router = useRouter();
    const [isEditDialogShown, setIsEditDialogShown] = useState(false);

    async function lockThisCompetition() {
        if (
            !confirm(
                "Želite li zaključati/otključati ovo natjecanje? Kada se natjecanje zaključa više se ne mogu dodavati slaganja i rezultati se pokazuju. Ovo možete vratiti natrag bilo kada.",
            )
        )
            return;
        const competitionLocking = await lockCompetition(competitionId);
        if (!competitionLocking.success) {
            alert("Dogodila se greška prilikom zaključavanja natjecanja");
            return;
        }
        router.refresh();
    }
    async function deleteThisCompetition() {
        if (isLocked) {
            return alert("Natjecanje je zaključano.");
        }
        if (!confirm("Jeste li sigurni da želite izbrisati ovo natjecanje?")) {
            return;
        }

        const compDeletion = await deleteCompetition(competitionId);
        if (!compDeletion.success) {
            alert("Dogodila se greška prilikom brisanja natjecanja");
            return;
        }
        router.refresh();
    }

    async function editThisCompetition() {
        if (competition.isLocked) {
            return alert("Natjecanje je zaključano i ne može se uređivati.");
        }
        setIsEditDialogShown(true);
    }

    return (
        <>
            <div className={styles["comp-btns"]}>
                <button
                    className={clsx(styles["edit-button"], {
                        [styles["locked"]]: isLocked,
                    })}
                    onClick={editThisCompetition}
                >
                    <EditSvg fill={svgFillColor} width="24px" height="24px" />
                </button>

                <button
                    className={clsx(styles["lock-button"], {
                        [styles["locked"]]: isLocked,
                    })}
                    onClick={lockThisCompetition}
                >
                    <LockSvg
                        width="24px"
                        height="24px"
                        isLocked={isLocked}
                        fill={svgFillColor}
                    />
                </button>
                <button
                    className={clsx(styles["delete-button"], {
                        [styles["locked"]]: isLocked,
                    })}
                    onClick={deleteThisCompetition}
                >
                    <DeleteSvg fill="#eb4034" width="24px" height="24px" />
                </button>
            </div>
            <EditCompDialog
                competition={competition}
                show={isEditDialogShown}
                setVisibilityAction={setIsEditDialogShown}
            />
        </>
    );
}
