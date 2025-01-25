import { useEffect } from "react";
import { RefObject } from "react";
import postsStyles from "@/app/Posts/Posts.module.css";
import {
    boldSelectedTextFromInput,
    emailToSelectedTextFromInput,
    headerSelectedTextFromInput,
    hyperlinkSelectedTextFromInput,
    italizeSelectedTextFromInput,
    underlineSelectedTextFromInput,
} from "@/app/utils/text";
import { clsx } from "clsx";
import HeaderSvg from "@/app/components/Svg/header";
import React from "react";
import MailSvg from "../Svg/mail";
import LinkSvg from "../Svg/link";
import UnderlineSvg from "../Svg/underline";
import BoldSvg from "../Svg/bold";
import ItalicSvg from "../Svg/italic";

type ButtonConfig = {
    className: string;
    alt: string;
    action: (
        ref: RefObject<HTMLTextAreaElement>,
        setDescription: (arg0: string) => void,
    ) => void;
    shortcut?: string;
    element?: React.ReactNode;
};

const buttons: ButtonConfig[] = [
    {
        className: "bold-btn",
        element: <BoldSvg width="24px" height="24px" fill="#5e5d5d" />,
        alt: "Bold",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                boldSelectedTextFromInput(ref.current, setDescription);
        },
        shortcut: "b", // CTRL+B
    },
    {
        className: "italic-btn",
        element: <ItalicSvg width="24px" height="24px" fill="#5e5d5d" />,
        alt: "Italic",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                italizeSelectedTextFromInput(ref.current, setDescription);
        },
        shortcut: "i", // CTRL+I
    },
    {
        className: "underline-btn",
        element: <UnderlineSvg fill="#5e5d5d" width="24px" height="24px" />,
        alt: "Underline",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                underlineSelectedTextFromInput(ref.current, setDescription);
        },
        shortcut: "u", // CTRL+U
    },
    {
        className: "hyperlink-btn",
        element: <LinkSvg fill="#5e5d5d" width="24px" height="24px" />,
        alt: "Hyperlink",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                hyperlinkSelectedTextFromInput(ref.current, setDescription);
        },
    },
    {
        className: "mail-btn",
        element: <MailSvg height="24px" width="24px" fill="#5e5d5d" />,
        alt: "Email",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                emailToSelectedTextFromInput(ref.current, setDescription);
        },
    },
    {
        className: "header-btn header3",
        alt: "Header 3",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 3);
        },
        element: (
            <HeaderSvg headingLevel={3} fill="#5e5d5d" width="24" height="24" />
        ),
    },
    {
        className: "header-btn header4",
        alt: "Header 4",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 4);
        },
        element: (
            <HeaderSvg headingLevel={4} fill="#5e5d5d" width="24" height="24" />
        ),
    },
    {
        className: "header-btn header5",
        alt: "Header 5",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 5);
        },
        element: (
            <HeaderSvg headingLevel={5} fill="#5e5d5d" width="24" height="24" />
        ),
    },
];

function Button({
    className,
    alt,
    onClick,
    element,
}: {
    className: string;
    alt: string;
    onClick: () => void;
    element?: React.ReactNode;
}) {
    return (
        <button
            className={clsx(
                postsStyles[className.split(" ")[0]],
                postsStyles["style-text-btn"],
            )}
            onClick={onClick}
        >
            {element ? element : <span>{alt}</span>}
        </button>
    );
}

export default function StyleTextContainer({
    titleInputRef,
    descriptionInputRef,
    setDescription,
}: {
    titleInputRef: RefObject<HTMLInputElement | null>;
    descriptionInputRef: RefObject<HTMLTextAreaElement | null>;
    description: string;
    setDescription: (arg0: string) => void;
}) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.ctrlKey) {
                const button = buttons.find(
                    (b) => b.shortcut === event.key.toLowerCase(),
                );
                if (button && descriptionInputRef.current) {
                    event.preventDefault();
                    button.action(
                        descriptionInputRef as RefObject<HTMLTextAreaElement>,
                        setDescription,
                    );
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [descriptionInputRef, setDescription]);

    if (!titleInputRef || !descriptionInputRef) return null;

    return (
        <div className={postsStyles["style-text-container"]}>
            <div className={postsStyles["style-text-container"]}>
                {buttons.map((button) => (
                    <Button
                        key={button.className}
                        className={clsx(button.className)}
                        alt={button.alt}
                        onClick={() => {
                            if (!descriptionInputRef.current) return;
                            button.action(
                                descriptionInputRef as RefObject<HTMLTextAreaElement>,
                                setDescription,
                            );
                        }}
                        element={button.element}
                    />
                ))}
            </div>
        </div>
    );
}
