import React, { forwardRef } from "react";
import postsStyles from "@/app/Posts/Posts.module.css";

interface DescriptionAreaProps {
  setValue: (value: string) => void;
  value: string;
}

const DescriptionArea = forwardRef<HTMLTextAreaElement, DescriptionAreaProps>(
  ({ setValue, value }, ref) => (
    <textarea
      ref={ref}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className={`${postsStyles["description"]} ${postsStyles["infoinputs"]}`}
      maxLength={4000}
      placeholder="Opis"
    />
  ),
);

// Add displayName property to fix eslint error
DescriptionArea.displayName = "DescriptionArea";

export default DescriptionArea;
