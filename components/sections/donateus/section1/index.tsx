import Section from "@/components/shared/Section";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo-nobackground-200.png";

const Section1 = () => {
  return (
    <Section>
      <h1 className="text-5xl text-navyblue font-bold text-center">
        Donate us
      </h1>
      <div className="flex items-center max-[900px]:flex-col-reverse">
        <h5 className="max-[900px]:text-center mt-10 text-xl font-semibold max-[900px]:max-w-full px-5 max-w-[800px]">
          The One Love Club is a registered organization dedicated to supporting
          individuals with intellectual and physical disabilities in Vermont
          through hosting a calendar of weekly fun activities that support
          inclusion and connection. With your help, we can expand our reach and
          impact, and your donation will directly fund inclusive events,
          informational resources, and support services. Would you please join
          us in creating a more inclusive and connected Vermont by contributing
          today?
        </h5>
        <Image
          src={logo}
          alt={"logo"}
          className="mx-auto"
          width={200}
          height={200}
        />
      </div>
    </Section>
  );
};

export default Section1;
