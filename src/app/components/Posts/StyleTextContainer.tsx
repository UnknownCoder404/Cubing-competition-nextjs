// StyleTextContainer.tsx
import postsStyles from "@/app/Posts/Posts.module.css";
import Image from "next/image";
import boldImage from "@/app/public/bold.svg";
import italicImage from "@/app/public/italic.svg";
import underlineImage from "@/app/public/underline.svg";
import linkImage from "@/app/public/link.svg";
import mailImage from "@/app/public/mail.svg";
import header3Image from "@/app/public/header3.svg";
import header4Image from "@/app/public/header4.svg";
import header5Image from "@/app/public/header5.svg";
import { RefObject } from "react";
import {
  boldText,
  italicText,
  underlineText,
  hyperlinkText,
  emailToText,
  headerText,
} from "@/app/utils/text";

const buttons = [
  { className: "bold-btn", src: boldImage, alt: "Bold" },
  { className: "italic-btn", src: italicImage, alt: "Italic" },
  { className: "underline-btn", src: underlineImage, alt: "Underline" },
  { className: "hyperlink-btn", src: linkImage, alt: "Hyperlink" },
  { className: "mail-btn", src: mailImage, alt: "Email" },
  { className: "header-btn header3", src: header3Image, alt: "Header 3" },
  { className: "header-btn header4", src: header4Image, alt: "Header 4" },
  { className: "header-btn header5", src: header5Image, alt: "Header 5" },
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
      className={`${postsStyles[className.split(" ")[0]]} ${
        postsStyles["style-text-btn"]
      }`}
      onClick={onClick}
    >
      <Image height={24} width={24} src={src} alt={alt} />
    </button>
  );
}

export default function StyleTextContainer({
  titleInputRef,
  descriptionInputRef,
}: {
  titleInputRef: RefObject<HTMLInputElement>;
  descriptionInputRef: RefObject<HTMLTextAreaElement>;
}) {
  // Helper function to apply formatting
  const applyFormatting = (
    formatFn: (text: string, start: number, end: number) => string,
    ref: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!ref.current) return;

    const inputElement = ref.current;
    const start = inputElement.selectionStart || 0;
    const end = inputElement.selectionEnd || 0;
    // const selectedText = inputElement.value.substring(start, end);

    const formattedText = formatFn(inputElement.value, start, end);
    inputElement.value = formattedText;

    inputElement.focus();
  };

  if (!titleInputRef || !descriptionInputRef) return <></>;

  return (
    <div className={postsStyles["style-text-container"]}>
      <div className={postsStyles["style-text-container"]}>
        {buttons.map((button, index) => {
          let onClick;

          // Assign appropriate formatting function to each button
          switch (button.className.split(" ")[0]) {
            case "bold-btn":
              onClick = () => applyFormatting(boldText, descriptionInputRef);
              break;
            case "italic-btn":
              onClick = () => applyFormatting(italicText, descriptionInputRef);
              break;
            case "underline-btn":
              onClick = () =>
                applyFormatting(underlineText, descriptionInputRef);
              break;
            case "hyperlink-btn":
              onClick = () => {
                const url = prompt("Enter URL:") || "https://example.com";
                applyFormatting(
                  (text, start, end) => hyperlinkText(text, start, end, url),
                  descriptionInputRef,
                );
              };
              break;
            case "mail-btn":
              onClick = () => {
                const email =
                  prompt("Enter email address:") || "example@example.com";
                applyFormatting(
                  (text, start, end) => emailToText(text, start, end, email),
                  descriptionInputRef,
                );
              };
              break;
            case "header-btn":
              const level = parseInt(
                button.className.split(" ")[1].replace("header", ""),
              );
              onClick = () =>
                applyFormatting(
                  (text, start, end) => headerText(text, start, end, level),
                  descriptionInputRef,
                );
              break;
            default:
              onClick = () => {};
              break;
          }

          return <Button key={index} {...button} onClick={onClick} />;
        })}
      </div>
    </div>
  );
}
