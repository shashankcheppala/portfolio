// src/components/SectionTitle.js
import React from "react";
import clsx from "clsx";

const SectionTitle = ({ children, className }) => {
  return (
    <h2
      className={clsx(
        "font-sans font-extrabold tracking-tight",
        "text-[28px] leading-[1.15] sm:text-[34px] md:text-[40px]",
        "text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
