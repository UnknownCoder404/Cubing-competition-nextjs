"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "../HomePage/card";
import { markdownToHtml } from "@/app/utils/markdown";
import "../../Posts/Preview.css";

type Props = {
    description: string;
    title: string;
};

export default function Preview({ description, title }: Props) {
    const [authorUsername, setAuthorUsername] = useState<string | null>(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setAuthorUsername(username);
        }
    }, []);

    const descriptionHtml = useMemo(
        () => markdownToHtml(description || "Ovo je pretpregled."),
        [description],
    );

    return (
        <Card
            title={title || "Pretpregled"}
            description={
                <div
                    dangerouslySetInnerHTML={{
                        __html: descriptionHtml,
                    }}
                />
            }
            author={authorUsername ? { username: authorUsername } : undefined}
        />
    );
}
