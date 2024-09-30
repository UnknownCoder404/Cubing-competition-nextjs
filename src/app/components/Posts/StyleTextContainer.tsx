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

const buttons = [
  { className: "bold-btn", src: boldImage, alt: "Bold" },
  { className: "italic-btn", src: italicImage, alt: "Italic" },
  { className: "underline-btn", src: underlineImage, alt: "Underline" },
  { className: "hyperlink-btn", src: linkImage, alt: "Hyperlink" },
  { className: "mail-btn", src: mailImage, alt: "Email" },
  { className: "header-btn header3", src: header3Image, alt: "Header" },
  { className: "header-btn header4", src: header4Image, alt: "Header" },
  { className: "header-btn header5", src: header5Image, alt: "Header" },
];

function Button({
  className,
  src,
  alt,
}: {
  className: string;
  src: string;
  alt: string;
}) {
  return (
    <button
      className={`${postsStyles[className.split(" ")[0]]} ${
        postsStyles["style-text-btn"]
      }`}
    >
      <Image height={24} width={24} src={src} alt={alt} />
    </button>
  );
}

export default function StyleTextContainer() {
  return (
    <div className={postsStyles["style-text-container"]}>
      <div className={postsStyles["style-text-container"]}>
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </div>
    </div>
  );
}
