"use client";

import classNames from "classnames";

const PrimaryTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <>
      <h1
        className={classNames(
          "w-max text-lg sm:text-xl md:text-2xl font-bold font-inter text-black leading-[125%]",
          className
        )}
      >
        {title}
      </h1>
    </>
  );
};

export default PrimaryTitle;
