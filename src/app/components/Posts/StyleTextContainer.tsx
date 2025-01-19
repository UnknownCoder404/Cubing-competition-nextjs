import { useEffect } from "react";
import { RefObject } from "react";
import Image from "next/image";
import postsStyles from "@/app/Posts/Posts.module.css";
import boldImage from "@/app/public/bold.svg";
import italicImage from "@/app/public/italic.svg";
import underlineImage from "@/app/public/underline.svg";
import linkImage from "@/app/public/link.svg";
import mailImage from "@/app/public/mail.svg";
// Removed individual header image imports
import {
    boldSelectedTextFromInput,
    emailToSelectedTextFromInput,
    headerSelectedTextFromInput,
    hyperlinkSelectedTextFromInput,
    italizeSelectedTextFromInput,
    underlineSelectedTextFromInput,
} from "@/app/utils/text";
import { clsx } from "clsx";
import HeaderSvg from "@/app/components/Svg/header"; // Import the new HeaderSvg component
import { StaticImageData } from "next/image";

type ButtonConfig = {
    className: string;
    alt: string;
    action: (
        ref: RefObject<HTMLTextAreaElement>,
        setDescription: (arg0: string) => void,
    ) => void;
    shortcut?: string;
    src?: StaticImageData;
    headingLevel?: 3 | 4 | 5;
};

const buttons: ButtonConfig[] = [
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
        alt: "Header 3",
        action: (
            ref: RefObject<HTMLTextAreaElement>,
            setDescription: (arg0: string) => void,
        ) => {
            if (ref.current)
                headerSelectedTextFromInput(ref.current, setDescription, 3);
        },
        headingLevel: 3,
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
        headingLevel: 4,
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
        headingLevel: 5,
    },
];

function Button({
    className,
    src,
    alt,
    onClick,
    headingLevel,
}: {
    className: string;
    src?: StaticImageData;
    alt: string;
    onClick: () => void;
    headingLevel?: 3 | 4 | 5;
}) {
    return (
        <button
            className={clsx(
                postsStyles[className.split(" ")[0]],
                postsStyles["style-text-btn"],
            )}
            onClick={onClick}
        >
            {headingLevel ? (
                <HeaderSvg
                    headingLevel={headingLevel}
                    fill="currentColor"
                    width="24"
                    height="24"
                />
            ) : src ? (
                <Image height={24} width={24} src={src} alt={alt} />
            ) : (
                <span>{alt}</span>
            )}
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
                        src={button.src}
                        alt={button.alt}
                        onClick={() => {
                            if (!descriptionInputRef.current) return;
                            button.action(
                                descriptionInputRef as RefObject<HTMLTextAreaElement>,
                                setDescription,
                            );
                        }}
                        headingLevel={button.headingLevel}
                    />
                ))}
            </div>
        </div>
    );
}
