import Section from "@/components/shared/Section";
import React from "react";
import TabsSection from "./tabs";

const Section1 = () => {
  return (
    <Section>
      <h1 className="text-5xl text-navyblue font-bold text-center">
        Jobs and Marketplace
      </h1>
      <p className="py-3 text-xl">
        Welcome to our Jobs and Services marketplace! Whether you&apos;re
        seeking support for your disabled loved one or offering your services as
        a direct support professional, you&apos;ve come to the right place.
        Browse through our listings or post your own to get started.
      </p>
      <TabsSection />
    </Section>
  );
};

export default Section1;
