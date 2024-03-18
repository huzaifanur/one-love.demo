import Section from "@/components/shared/Section";
import React from "react";
import Profile from "./Profile";

const Section1 = () => {
  return (
    <Section>
      <h2 className="text-center text-4xl font-semibold text-navyblue">
        My Profile
      </h2>
      <Profile />
    </Section>
  );
};

export default Section1;
