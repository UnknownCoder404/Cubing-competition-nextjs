import React, { forwardRef } from "react";
import postsStyles from "@/app/Posts/Posts.module.css";

interface TitleInputProps {
  setValue: (value: string) => void;
  value: string;
}

const TitleInput = forwardRef<HTMLInputElement, TitleInputProps>(
  ({ setValue, value }, ref) => (
    <input
      ref={ref}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      maxLength={16}
      type="text"
      className={`${postsStyles["title"]} ${postsStyles["infoinputs"]}`}
      placeholder="Naslov"
    />
  ),
);

// Add displayName property to fix eslint error

TitleInput.displayName = "TitleInput";

export default TitleInput;
