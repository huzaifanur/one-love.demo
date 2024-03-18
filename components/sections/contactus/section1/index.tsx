import Section from "@/components/shared/Section";
import Image from "next/image";
import React from "react";
import heartCardContact from "@/assets/images/heartCardContact.jpeg";
import MessageForm from "./form/MessageForm";
const Section1 = () => {
  return (
    <Section widthHandlerDivClasses={"flex justify-center"}>
      <div>
        <h1 className="text-navyblue text-7xl font-extrabold max-w-[450px]">
          We&apos;d love to hear from you!
        </h1>
        <Image
          src={heartCardContact}
          className="mt-10"
          alt="heart for you"
          width={450}
          height={400}
        />
      </div>
      <div>
        <MessageForm />
      </div>
    </Section>
  );
};

export default Section1;
