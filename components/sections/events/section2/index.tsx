import Section from "@/components/shared/Section";
import Image from "next/image";
import React from "react";
import createEventRoadMap from "@/assets/images/create-an-event-roadmap.png";
import signupEventRoadMap from "@/assets/images/sign-up-for-an-event-roadmap.png";
const Section2 = () => {
  return (
    <Section>
      <Image
        src={createEventRoadMap}
        className="mx-auto my-4 block"
        alt="create road Map"
        width={800}
        height={800}
      />
      <Image
        src={signupEventRoadMap}
        className="mx-auto mt-20 mb-6 block"
        alt="  road Map"
        width={800}
        height={800}
      />
    </Section>
  );
};

export default Section2;
