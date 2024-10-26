"use client";

import { useEffect, useState } from "react";
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
        const authorUsername = localStorage.getItem("username");
        setAuthorUsername(authorUsername);
    }, []);

    const descriptionHtml = markdownToHtml(description);

    return (
        <Card
            title={title}
            description={
                <div
                    dangerouslySetInnerHTML={{
                        __html: descriptionHtml,
                    }}
                ></div>
            }
            author={authorUsername ? { username: authorUsername } : undefined}
        />
    );
}
