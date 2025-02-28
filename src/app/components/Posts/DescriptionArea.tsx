import React from "react";
import styles from "@/app/Posts/Posts.module.css";

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
            className={`${styles["description"]} ${styles["infoinputs"]}`}
            maxLength={4000}
            placeholder="Opis"
        />
    );
}

export default React.forwardRef<HTMLTextAreaElement, DescriptionAreaProps>(
    DescriptionArea,
);
