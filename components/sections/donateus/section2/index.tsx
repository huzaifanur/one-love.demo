import Section from "@/components/shared/Section";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo-nobackground-200.png";
import Card from "./card";
import { cards } from "@/constants/donateus";

const Section2 = () => {
  return (
    <Section>
      <h1 className="text-3xl text-navyblue font-bold text-center">
        OLC’s Annual Corporate Sponsorship Packages
      </h1>
      <h6 className="text-sm my-5 text-navyblue text-center">
        Your sponsorship will directly support OLC’s programs and initiatives,
        helping us create a more inclusive and supportive community for
        individuals with disabilities.
      </h6>
      <div className="flex flex-wrap justify-center gap-5 mt-10">
        {cards?.map((card) => (
          <Card
            key={card?.type}
            amount={card?.amount}
            benefits={card?.benefits}
            type={card?.type}
          />
        ))}
      </div>
    </Section>
  );
};

export default Section2;
