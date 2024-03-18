import React from "react";

const Section = ({
  sectionClasses,
  widthHandlerDivClasses,
  children,
  ...props
}: any) => {
  return (
    <section className={`flex flex-col ${sectionClasses}`} {...props}>
      <div
        className={`mx-auto max-w-7xl w-full py-8 px-4 ${widthHandlerDivClasses}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
