"use client";
import React from "react";

type SmoothAnchorProps = {
    children: React.ReactNode;
    href: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export default function SmoothAnchor({
    children,
    href,
    ...props
}: SmoothAnchorProps) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (href) {
            const target = document.getElementById(href.slice(1));
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            {...props}
            style={{
                scrollBehavior: "smooth",
            }}
        >
            {children}
        </a>
    );
}
