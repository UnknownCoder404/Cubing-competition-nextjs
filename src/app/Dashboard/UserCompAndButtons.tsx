"use client";
import { useState } from "react";
import UserButtons from "../components/Dashboard/UserButtons";
import dynamic from "next/dynamic";
const UserCompetition = dynamic(
    () => import("../components/Dashboard/UserCompetition"),
    { ssr: false },
);
import { CompetitionType, User } from "../Types/solve";

export default function UserCompAndButtons({
    user,
    competitions,
}: {
    user: User;
    competitions: CompetitionType[];
}) {
    const [showComp, setCompVisibility] = useState(false);

    function toggleCompVisibility() {
        setCompVisibility(!showComp);
    }
    return (
        <>
            <UserButtons
                toggleCompVisibility={toggleCompVisibility}
                user={user}
            />
            <UserCompetition
                show={showComp}
                user={user}
                competitions={competitions}
            />
        </>
    );
}
