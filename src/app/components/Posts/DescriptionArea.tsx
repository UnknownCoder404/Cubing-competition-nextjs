import React from "react";
import postsStyles from "@/app/Posts/Posts.module.css";

interface DescriptionAreaProps {
    setValue: (value: string) => void;
    value: string;
}

function DescriptionArea(
    { setValue, value }: DescriptionAreaProps,
    ref: React.Ref<HTMLTextAreaElement>,
) {
    return (
        <textarea
            ref={ref}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={`${postsStyles["description"]} ${postsStyles["infoinputs"]}`}
            maxLength={4000}
            placeholder="Opis"
        />
    );
}

export default React.forwardRef<HTMLTextAreaElement, DescriptionAreaProps>(
    DescriptionArea,
);
