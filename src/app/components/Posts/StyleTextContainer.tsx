import { useEffect } from "react";
import { RefObject } from "react";
import Image from "next/image";
import postsStyles from "@/app/Posts/Posts.module.css";
import boldImage from "@/app/public/bold.svg";
import italicImage from "@/app/public/italic.svg";
import underlineImage from "@/app/public/underline.svg";
import linkImage from "@/app/public/link.svg";
import mailImage from "@/app/public/mail.svg";
import header3Image from "@/app/public/header3.svg";
import header4Image from "@/app/public/header4.svg";
import header5Image from "@/app/public/header5.svg";
import {
    boldSelectedTextFromInput,
    emailToSelectedTextFromInput,
    headerSelectedTextFromInput,
    hyperlinkSelectedTextFromInput,
    italizeSelectedTextFromInput,
    underlineSelectedTextFromInput,
} from "@/app/utils/text";
import { clsx } from "clsx";

const buttons = [
    {
        className: "bold-btn",
        src: boldImage,
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
        src: italicImage,
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
        src: underlineImage,
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
        src: linkImage,
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
        src: mailImage,
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
        src: header3Image,
        alt: "Header 3",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 3);
        },
    },
    {
        className: "header-btn header4",
        src: header4Image,
        alt: "Header 4",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 4);
        },
    },
    {
        className: "header-btn header5",
        src: header5Image,
        alt: "Header 5",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 5);
        },
    },
];

function Button({
    className,
    src,
    alt,
    onClick,
}: {
    className: string;
    src: string;
    alt: string;
    onClick: () => void;
}) {
    return (
        <button
            className={clsx(
                postsStyles[className.split(" ")[0]],
                postsStyles["style-text-btn"],
            )}
            onClick={onClick}
        >
            <Image height={24} width={24} src={src} alt={alt} />
        </button>
    );
}

export default function StyleTextContainer({
    titleInputRef,
    descriptionInputRef,
    setDescription,
}: {
    titleInputRef: RefObject<HTMLInputElement>;
    descriptionInputRef: RefObject<HTMLTextAreaElement>;
    description: string;
    setDescription: (arg0: string) => void;
}) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // Check if CTRL key is pressed
            if (event.ctrlKey) {
                const button = buttons.find(
                    (b) => b.shortcut === event.key.toLowerCase(),
                );
                if (button && descriptionInputRef.current) {
                    event.preventDefault();
                    button.action(descriptionInputRef, setDescription);
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
                        src={button.src}
                        alt={button.alt}
                        onClick={() => {
                            button.action(descriptionInputRef, setDescription);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
